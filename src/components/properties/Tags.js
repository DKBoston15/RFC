import React, { useState } from "react"
import { makeStyles } from "@material-ui/core/styles"
import Chip from "@material-ui/core/Chip"
import {
    Box,
    Typography,
    Menu,
    Divider,
    FormControlLabel,
    Checkbox
} from "@material-ui/core"
import Autocomplete, {
    createFilterOptions
} from "@material-ui/lab/Autocomplete"
import TextField from "@material-ui/core/TextField"

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

// * TODO Tag Operations
// TODO Get Current RFC Tags
// TODO Populate Tags on Property Panel
// TODO Get list of available workspace tags, not already on RFC
// TODO On new tag, supply autocomplete with unused tags
// TODO On available tag addition, update RFC tags, update unused tags array
// TODO On new tag creation, update RFC tags, update unused tags array, update available workspace tags

export default function Tags() {
    const classes = useStyles()
    const [value, setValue] = useState(null)
    const [chipData, setChipData] = useState([
        { key: 0, label: "Level 1" },
        { key: 1, label: "Level 2" },
        { key: 2, label: "Level 3" },
        { key: 3, label: "Level 4" },
        { key: 4, label: "Level 5" },
        { key: 5, label: "Level 6" },
        { key: 6, label: "Level 7" },
        { key: 7, label: "Level 8" },
        { key: 8, label: "Level 9" }
    ])
    const [unusedChips, setUnusedChips] = useState([
        { key: 11, label: "Test" },
        { key: 12, label: "Test 2" }
    ])
    const [addTag, setAddTag] = useState(false)

    const handleDelete = (chipToDelete) => () => {
        setChipData((chips) =>
            chips.filter((chip) => chip.key !== chipToDelete.key)
        )
    }

    const addNewTag = (event) => {
        setAnchorEl(event.currentTarget)
        setAddTag(true)
    }

    const [anchorEl, setAnchorEl] = React.useState(null)

    const handleClose = () => {
        setAnchorEl(null)
    }

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
                                onDelete={handleDelete(data)}
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
                                        setValue({
                                            label: newValue
                                        })
                                    } else if (
                                        newValue &&
                                        newValue.inputValue
                                    ) {
                                        // Create a new value from the user input
                                        setValue({
                                            label: newValue.inputValue
                                        })
                                    } else {
                                        setValue(newValue)
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
                                    console.log(option)
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
