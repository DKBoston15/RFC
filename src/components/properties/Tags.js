import React, { useState, useEffect } from "react"
import { makeStyles } from "@material-ui/core/styles"
import Chip from "@material-ui/core/Chip"
import { Box, Typography } from "@material-ui/core"
import { updateRfcTag, getRfc } from "../../utils/rfcUtils"
import { addWorkspaceTags, getWorkspaceTags } from "../../utils/workspaceUtils"

import FlexSelect from "../FlexSelect"

const useStyles = makeStyles(() => ({
    statusContainer: {
        display: "flex",
        flexDirection: "column"
    },
    tagContainer: {
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        maxWidth: "90%"
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
        marginRight: "30px"
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
                setAvailableTags(unusedTags.sort(compare))
            }
            updateRfc()
            updateUnused()
        }
    }, [selectedItem])

    const addNewWorkspaceTag = async () => {
        setSelectedItem(createdItem)
        const newTagArr = [...chipData, ...availableTags, createdItem]
        await addWorkspaceTags(workspaceID, newTagArr)
    }

    useEffect(() => {
        if (createdItem) {
            addNewWorkspaceTag()
        }
    }, [createdItem])

    const handleDelete = async (chipToDelete) => {
        setChipData((chips) =>
            chips.filter((chip) => chip.key !== chipToDelete.key)
        )
        const newRfcTagArr = chipData.filter(
            (chip) => chip.key !== chipToDelete.key
        )
        await updateRfcTag(rfcInfo.id, newRfcTagArr)

        // Update Unused Tags
        const currentRfcTags = await getRfc(rfcInfo.id)
        const currentWorkspaceTags = await getWorkspaceTags(workspaceID)
        const unusedTags = filterByReference(
            currentWorkspaceTags.tags,
            currentRfcTags[0].tags
        )
        setAvailableTags(unusedTags.sort(compare))
    }

    useEffect(() => {
        setChipData(rfcInfo.tags)
        if (workspaceTags) {
            setAvailableTags(workspaceTags.tags.sort(compare))
            const unusedTags = filterByReference(
                workspaceTags.tags,
                rfcInfo.tags
            )
            setAvailableTags(unusedTags.sort(compare))
        }
    }, [workspaceTags, rfcInfo])

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
