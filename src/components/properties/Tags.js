import React, { useState } from "react"
import { makeStyles } from "@material-ui/core/styles"
import Chip from "@material-ui/core/Chip"
import { Box, Typography } from "@material-ui/core"
import TextField from "@material-ui/core/TextField"
import Autocomplete from "@material-ui/lab/Autocomplete"

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
    root: {
        "& .MuiInputBase-root": {
            color: "black",
            height: "18px",
            fontSize: "12px",
            width: "10em"
        },
        "& .MuiAutocomplete-inputFocused": {
            marginTop: "-.7em"
        }
    }
}))

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
        { key: 8, label: "Level 9" },
        { key: 9, label: "Level 10" }
    ])
    const [addTag, setAddTag] = useState(false)

    const handleDelete = (chipToDelete) => () => {
        setChipData((chips) =>
            chips.filter((chip) => chip.key !== chipToDelete.key)
        )
    }

    const addNewTag = () => {
        setAddTag(true)
    }

    const onTagChange = (event, newValue) => {
        console.log(newValue.label)
        let newChip = {
            key: chipData[chipData.length - 1].key + 1,
            label: newValue.label
        }
        console.log(newChip)
        // let newChips = chips.push(newValue.label)
        // console.log(newChips)
        // setChipData(newChips)
        setAddTag(false)
    }
    const onClose = (event, newValue) => {
        setTimeout(() => {
            console.log("Close Detected")
        }, 500)
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
                </Box>
                {!addTag && (
                    <Typography
                        onClick={addNewTag}
                        className={classes.addTag}
                        variant="caption"
                    >
                        + Add Tag
                    </Typography>
                )}
                {addTag && (
                    <Autocomplete
                        options={chipData}
                        size="small"
                        freeSolo
                        className={classes.autocomplete}
                        getOptionLabel={(option) => option.label}
                        value={value}
                        onChange={onTagChange}
                        onClose={onClose}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                size="small"
                                variant="outlined"
                                className={classes.root}
                            />
                        )}
                    />
                )}
            </Box>
        </Box>
    )
}
