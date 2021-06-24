import React, { useState, useEffect } from "react"
import { makeStyles } from "@material-ui/core/styles"
import Chip from "@material-ui/core/Chip"
import { Box, Typography, Menu } from "@material-ui/core"
import Autocomplete, {
    createFilterOptions
} from "@material-ui/lab/Autocomplete"
import TextField from "@material-ui/core/TextField"
import { updateRfcTag } from "../../utils/rfcUtils"
import { addWorkspaceTags } from "../../utils/workspaceUtils"

const useStyles = makeStyles(() => ({
    statusContainer: {
        marginLeft: "2.5em",
        display: "flex",
        flexDirection: "column"
    },
    tagContainer: {
        display: "flex",
        flexWrap: "wrap",
        width: "28em",
        alignItems: "center"
    },
    chip: {
        backgroundColor: "#4F4F4F",
        color: "white",
        height: "18px",
        fontSize: "10px",
        margin: "0.2em"
    },
    sectionHeader: {
        width: "4em"
    },
    container: {
        width: "25em",
        display: "flex"
    },
    addTag: {
        marginLeft: "0.3rem",
        cursor: "pointer"
    },
    autocomplete: {
        marginTop: ".5em"
    },
    tagAddContainer: {
        display: "flex",
        flexDirection: "column"
    }
}))
const filter = createFilterOptions()

export default function Tags({ rfcInfo, tags, workspaceID }) {
    const classes = useStyles()
    const [value, setValue] = useState(null)
    const [chipData, setChipData] = useState([])
    const [unusedChips, setUnusedChips] = useState([])
    const [addTag, setAddTag] = useState(false)

    const handleDelete = async (chipToDelete) => {
        console.log("Deleting")
        setChipData((chips) =>
            chips.filter((chip) => chip.key !== chipToDelete.key)
        )
        const newRfcTagArr = chipData.filter(
            (chip) => chip.key !== chipToDelete.key
        )
        await updateRfcTag(rfcInfo.id, newRfcTagArr)
    }

    const addNewTag = (event) => {
        setAnchorEl(event.currentTarget)
        setAddTag(true)
    }

    const [anchorEl, setAnchorEl] = React.useState(null)

    const handleClose = () => {
        setAnchorEl(null)
    }

    const filterByReference = (arr1, arr2) => {
        let res = []
        res = arr1.filter((el) => {
            return !arr2.find((element) => {
                return element.key === el.key
            })
        })
        return res
    }

    const addNewRfcTag = async (newTag) => {
        const newTagObj = { key: newTag, label: newTag }
        const newTagArr = [...rfcInfo.tags, newTagObj]
        await updateRfcTag(rfcInfo.id, newTagArr)
        setAnchorEl(null)
        console.log("New RFC Tag Added")
        const newArr = [...chipData, newTagObj]
        setChipData([...chipData, newTagObj])
        const unusedTags = filterByReference(unusedChips, newArr)
        setUnusedChips(unusedTags)
        setValue("")
    }

    const addNewWorkspaceTag = async (newTag) => {
        setAnchorEl(null)
        const newTagObj = { key: newTag, label: newTag }
        const newTagArr = [...tags.tags, newTagObj]
        await addWorkspaceTags(workspaceID, newTagArr)
        console.log("New Tag Added")
    }

    useEffect(() => {
        setChipData(rfcInfo.tags)
        if (tags) {
            setUnusedChips(tags.tags)
            const unusedTags = filterByReference(tags.tags, rfcInfo.tags)
            setUnusedChips(unusedTags)
        }
    }, [rfcInfo.tags, tags])

    return (
        <Box className={classes.container}>
            <Typography variant="caption" className={classes.sectionHeader}>
                Tags
            </Typography>
            <Box className={classes.statusContainer}>
                <Box className={classes.tagContainer}>
                    {chipData.map((data) => {
                        let icon
                        return (
                            <Chip
                                size="small"
                                icon={icon}
                                label={data.label}
                                onDelete={() => handleDelete(data)}
                                className={classes.chip}
                            />
                        )
                    })}
                    <Typography
                        onClick={addNewTag}
                        className={classes.addTag}
                        variant="caption"
                        aria-controls="simple-menu"
                        aria-haspopup="true"
                    >
                        + Add Tag
                    </Typography>
                    <Menu
                        id="simple-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        <Box className={classes.tagAddContainer}>
                            <Autocomplete
                                value={value}
                                onChange={(event, newValue) => {
                                    if (typeof newValue === "string") {
                                        console.log(newValue)
                                        setValue({
                                            label: newValue
                                        })
                                        addNewRfcTag(newValue.label)
                                    } else if (
                                        newValue &&
                                        newValue.inputValue
                                    ) {
                                        // Create a new value from the user input
                                        setValue({
                                            label: newValue.inputValue
                                        })
                                        addNewRfcTag(newValue.inputValue)
                                        addNewWorkspaceTag(newValue.inputValue)
                                    } else {
                                        console.log(newValue)
                                        setValue(newValue)
                                        addNewRfcTag(newValue.label)
                                    }
                                }}
                                filterOptions={(options, params) => {
                                    const filtered = filter(options, params)

                                    // Suggest the creation of a new value
                                    if (params.inputValue !== "") {
                                        filtered.push({
                                            inputValue: params.inputValue,
                                            label: `Add "${params.inputValue}"`
                                        })
                                    }

                                    return filtered
                                }}
                                selectOnFocus
                                clearOnBlur
                                handleHomeEndKeys
                                id="free-solo-with-text-demo"
                                options={unusedChips}
                                getOptionLabel={(option) => {
                                    // Value selected with enter, right from the input
                                    if (typeof option === "string") {
                                        return option
                                    }
                                    // Add "xxx" option created dynamically
                                    if (option.inputValue) {
                                        return option.inputValue
                                    }
                                    // Regular option
                                    return option.label
                                }}
                                renderOption={(option) => option.label}
                                style={{ width: 300 }}
                                freeSolo
                                renderInput={(params) => (
                                    <TextField {...params} variant="outlined" />
                                )}
                            />
                        </Box>
                    </Menu>
                </Box>
            </Box>
        </Box>
    )
}
