import React, { useState, useEffect } from "react"
import { makeStyles } from "@material-ui/core/styles"
import Chip from "@material-ui/core/Chip"
import { Box, Typography, Menu } from "@material-ui/core"
import Autocomplete, {
    createFilterOptions
} from "@material-ui/lab/Autocomplete"
import TextField from "@material-ui/core/TextField"
import { updateRfcTag, getRfc } from "../../utils/rfcUtils"
import { addWorkspaceTags, getWorkspaceTags } from "../../utils/workspaceUtils"

const useStyles = makeStyles(() => ({
    statusContainer: {
        marginLeft: "2.5em",
        display: "flex",
        flexDirection: "column"
    },
    tagContainer: {
        display: "flex",
        flexWrap: "wrap",
        width: "24em",
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
        marginTop: ".5em",
        marginLeft: ".5rem",
        marginRight: ".5rem",
        width: 150,
        borderColor: "red !important",
        "& 	.MuiAutocomplete-paper": {
            elevation: 0
        }
    },
    tagAddContainer: {
        display: "flex",
        flexDirection: "column"
    },
    textInput: {
        "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
            borderColor: "white"
        },
        "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
            borderColor: "white"
        },
        "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
            {
                borderColor: "white"
            },
        "& .MuiOutlinedInput-input": {
            color: "gray"
        },
        "&:hover .MuiOutlinedInput-input": {
            color: "gray"
        },
        "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-input": {
            color: "gray"
        },
        "& .MuiInputLabel-outlined": {
            color: "gray"
        },
        "&:hover .MuiInputLabel-outlined": {
            color: "gray"
        },
        "& .MuiInputLabel-outlined.Mui-focused": {
            color: "gray"
        }
    }
}))
const filter = createFilterOptions()

export default function Tags({ rfcInfo, tags, workspaceID }) {
    const classes = useStyles()
    const [value, setValue] = useState(null)
    const [chipData, setChipData] = useState([])
    const [unusedChips, setUnusedChips] = useState([])
    const [addTag, setAddTag] = useState(false)

    function compare(a, b) {
        const tag1 = a.label.toUpperCase()
        const tag2 = b.label.toUpperCase()

        let comparison = 0
        if (tag1 > tag2) {
            comparison = 1
        } else if (tag1 < tag2) {
            comparison = -1
        }
        return comparison
    }

    const handleDelete = async (chipToDelete) => {
        // Update Tag UI
        setChipData((chips) =>
            chips.filter((chip) => chip.key !== chipToDelete.key)
        )

        // Create New RFC Tag Array
        const newRfcTagArr = chipData.filter(
            (chip) => chip.key !== chipToDelete.key
        )

        // Update RFC Tag Array
        await updateRfcTag(rfcInfo.id, newRfcTagArr)

        // Update Unused Tags
        // Get Current RFC Tags
        const currentRfcTags = await getRfc(rfcInfo.id)
        const currentWorkspaceTags = await getWorkspaceTags(workspaceID)
        console.log(currentRfcTags[0].tags)
        console.log(unusedChips)
        const unusedTags = filterByReference(
            currentWorkspaceTags.tags,
            currentRfcTags[0].tags
        )
        console.log(unusedTags)
        setUnusedChips(unusedTags.sort(compare))
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
        // Close Menu
        setAnchorEl(null)
        setValue(null)
        // Get Current RFC Tags
        const currentRfcTags = await getRfc(rfcInfo.id)

        // Construct New Full RFC Tag Array
        const newRfcTagArr = [
            ...currentRfcTags[0].tags,
            { key: newTag, label: newTag }
        ]

        console.log(newRfcTagArr)

        // Update UI With New Tag Array
        setChipData(newRfcTagArr)

        // Update Unused Tag Array
        const unusedTags = filterByReference(unusedChips, newRfcTagArr)
        setUnusedChips(unusedTags.sort(compare))

        // Update RFC Tag Array In DB
        await updateRfcTag(rfcInfo.id, newRfcTagArr)
    }

    const addNewWorkspaceTag = async (newTag) => {
        setAnchorEl(null)
        const newTagObj = { key: newTag, label: newTag }
        const newTagArr = [...chipData, ...unusedChips, newTagObj]
        await addWorkspaceTags(workspaceID, newTagArr)
        console.log("New Tag Added")
    }

    useEffect(() => {
        setChipData(rfcInfo.tags)
        if (tags) {
            setUnusedChips(tags.tags.sort(compare))
            const unusedTags = filterByReference(tags.tags, rfcInfo.tags)
            setUnusedChips(unusedTags.sort(compare))
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
                        autoFocus
                        elevation={1}
                    >
                        <Box className={classes.tagAddContainer}>
                            <Autocomplete
                                ListboxProps={{
                                    style: {
                                        maxHeight: "10em",
                                        maxWidth: "250px"
                                    }
                                }}
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
                                clearOnBlur
                                openOnFocus
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
                                className={classes.autocomplete}
                                freeSolo
                                renderInput={(params) => (
                                    <TextField
                                        className={classes.textInput}
                                        placeholder="Add Tag..."
                                        {...params}
                                        variant="outlined"
                                        size="small"
                                        inputRef={(input) =>
                                            setTimeout(() => {
                                                input && input.focus()
                                            }, 100)
                                        }
                                    />
                                )}
                            />
                        </Box>
                    </Menu>
                </Box>
            </Box>
        </Box>
    )
}
