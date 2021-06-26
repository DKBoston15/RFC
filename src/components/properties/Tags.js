import React, { useState, useEffect } from "react"
import { makeStyles } from "@material-ui/core/styles"
import Chip from "@material-ui/core/Chip"
import { Box, Typography } from "@material-ui/core"
import { updateRfcTag, getRfc } from "../../utils/rfcUtils"
import { addWorkspaceTags, getWorkspaceTags } from "../../utils/workspaceUtils"

import FlexSelect from "../FlexSelect"

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

const filterByReference = (arr1, arr2) => {
    let res = []
    res = arr1.filter((el) => {
        return !arr2.find((element) => {
            return element.key === el.key
        })
    })
    return res
}

export default function Tags({ rfcInfo, workspaceTags, workspaceID }) {
    const classes = useStyles()

    const addTagComponent = (
        <Typography className={classes.addTag} variant="caption">
            + Add Tag
        </Typography>
    )

    const [createdItem, setCreatedItem] = useState(null)
    const [availableTags, setAvailableTags] = useState([])
    const [selectedItem, setSelectedItem] = useState(null)

    const [chipData, setChipData] = useState(rfcInfo.tags)

    useEffect(() => {
        if (selectedItem) {
            console.log(selectedItem)
            setChipData([...chipData, selectedItem])
            const updateRfc = async () => {
                await updateRfcTag(rfcInfo.id, [...chipData, selectedItem])
            }
            const updateUnused = async () => {
                const currentWorkspaceTags = await getWorkspaceTags(workspaceID)
                const unusedTags = filterByReference(
                    currentWorkspaceTags.tags,
                    [...chipData, selectedItem]
                )
                console.log(unusedTags)
                setAvailableTags(unusedTags.sort(compare))
            }
            updateRfc()
            updateUnused()
        }
    }, [selectedItem])

    const addNewWorkspaceTag = async () => {
        setSelectedItem(createdItem)
        console.log(createdItem)
        const newTagArr = [...chipData, ...availableTags, createdItem]
        console.log(newTagArr)
        await addWorkspaceTags(workspaceID, newTagArr)
        console.log("New Tag Added")
    }

    useEffect(() => {
        if (createdItem) {
            addNewWorkspaceTag()
        }
    }, [createdItem])

    const handleDelete = async (chipToDelete) => {
        console.log(chipToDelete)
        setChipData((chips) =>
            chips.filter((chip) => chip.key !== chipToDelete.key)
        )
        const newRfcTagArr = chipData.filter(
            (chip) => chip.key !== chipToDelete.key
        )
        console.log(newRfcTagArr)
        await updateRfcTag(rfcInfo.id, newRfcTagArr)

        // Update Unused Tags
        const currentRfcTags = await getRfc(rfcInfo.id)
        const currentWorkspaceTags = await getWorkspaceTags(workspaceID)
        console.log(currentRfcTags[0].tags)
        console.log(availableTags)
        const unusedTags = filterByReference(
            currentWorkspaceTags.tags,
            currentRfcTags[0].tags
        )
        console.log(unusedTags)
        setAvailableTags(unusedTags.sort(compare))
    }

    useEffect(() => {
        if (workspaceTags) {
            setAvailableTags(workspaceTags.tags.sort(compare))
            const unusedTags = filterByReference(
                workspaceTags.tags,
                rfcInfo.tags
            )
            console.log(unusedTags)
            setAvailableTags(unusedTags.sort(compare))
        }
    }, [workspaceTags, rfcInfo.tags])

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
                    <FlexSelect
                        placeholder="Tags..."
                        setSelectedItem={setSelectedItem}
                        items={availableTags}
                        allowCreation={true}
                        setCreatedItem={setCreatedItem}
                        clickableComponent={addTagComponent}
                    />
                </Box>
            </Box>
        </Box>
    )
}

// <Menu
//                         id="simple-menu"
//                         anchorEl={anchorEl}
//                         keepMounted
//                         open={Boolean(anchorEl)}
//                         onClose={handleClose}
//                         autoFocus
//                         elevation={1}
//                     >
//                         <Box className={classes.tagAddContainer}>
//                             <Autocomplete
//                                 ListboxProps={{
//                                     style: {
//                                         maxHeight: "10em",
//                                         maxWidth: "250px"
//                                     }
//                                 }}
//                                 value={value}
//                                 onChange={(event, newValue) => {
//                                     if (typeof newValue === "string") {
//                                         console.log(newValue)
//                                         setValue({
//                                             label: newValue
//                                         })
//                                         addNewRfcTag(newValue.label)
//                                     } else if (
//                                         newValue &&
//                                         newValue.inputValue
//                                     ) {
//                                         // Create a new value from the user input
//                                         setValue({
//                                             label: newValue.inputValue
//                                         })
//                                         addNewRfcTag(newValue.inputValue)
//                                         addNewWorkspaceTag(newValue.inputValue)
//                                     } else {
//                                         console.log(newValue)
//                                         setValue(newValue)
//                                         addNewRfcTag(newValue.label)
//                                     }
//                                 }}
//                                 filterOptions={(options, params) => {
//                                     const filtered = filter(options, params)

//                                     // Suggest the creation of a new value
//                                     if (params.inputValue !== "") {
//                                         filtered.push({
//                                             inputValue: params.inputValue,
//                                             label: `Add "${params.inputValue}"`
//                                         })
//                                     }

//                                     return filtered
//                                 }}
//                                 clearOnBlur
//                                 openOnFocus
//                                 handleHomeEndKeys
//                                 id="free-solo-with-text-demo"
//                                 options={unusedChips}
//                                 getOptionLabel={(option) => {
//                                     // Value selected with enter, right from the input
//                                     if (typeof option === "string") {
//                                         return option
//                                     }
//                                     // Add "xxx" option created dynamically
//                                     if (option.inputValue) {
//                                         return option.inputValue
//                                     }
//                                     // Regular option
//                                     return option.label
//                                 }}
//                                 renderOption={(option) => option.label}
//                                 className={classes.autocomplete}
//                                 freeSolo
//                                 renderInput={(params) => (
//                                     <TextField
//                                         className={classes.textInput}
//                                         placeholder="Add Tag..."
//                                         {...params}
//                                         variant="outlined"
//                                         size="small"
//                                         inputRef={(input) =>
//                                             setTimeout(() => {
//                                                 input && input.focus()
//                                             }, 100)
//                                         }
//                                     />
//                                 )}
//                             />
//                         </Box>
//                     </Menu>
