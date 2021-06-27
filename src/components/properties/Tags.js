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
        width: "5em",
        marginRight: "1em"
    },
    container: {
        width: "25em",
        display: "flex"
    },
    addTag: {
        marginLeft: "0.3rem",
        cursor: "pointer"
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
