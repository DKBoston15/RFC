import React, { useState, useEffect } from "react"
import { makeStyles } from "@material-ui/core/styles"
import Chip from "@material-ui/core/Chip"
import { Box, Typography, Tooltip } from "@material-ui/core"
import { getRfc, updateRfcAssignees } from "../../utils/rfcUtils"
import { getUsers, getUserData } from "../../utils/userUtils"

import FlexSelect from "../FlexSelect"
import SmallUserAvatar from "../SmallUserAvatar"

const useStyles = makeStyles(() => ({
    statusContainer: {
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
    },
    avatar: {
        margin: ".2em"
    },
    pointer: {
        cursor: "pointer"
    }
}))

function compare(a, b) {
    const tag1 = a.full_name.toUpperCase()
    const tag2 = b.full_name.toUpperCase()

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
            return element.id === el.id
        })
    })
    return res
}

export default function Assignee({ rfcInfo, workspaceID }) {
    const classes = useStyles()

    const addAssigneeComponent = (
        <Typography className={classes.addTag} variant="caption">
            + Add Assignee
        </Typography>
    )

    const [availableAssignees, setAvailableAssignees] = useState([])
    const [selectedItem, setSelectedItem] = useState(null)

    const [chipData, setChipData] = useState([])

    useEffect(() => {
        if (selectedItem) {
            setChipData([...chipData, selectedItem])
            const updateRfc = async () => {
                let idArray = []
                for (let i = 0; i < chipData.length; i++) {
                    idArray.push(chipData[i].id)
                }
                idArray.push(selectedItem.id)
                await updateRfcAssignees(rfcInfo.id, idArray)
            }
            const updateUnused = async () => {
                const currentUsers = await getUsers(workspaceID)
                const unusedAssignees = filterByReference(currentUsers, [
                    ...chipData,
                    selectedItem
                ])
                setAvailableAssignees(unusedAssignees)
            }
            updateRfc()
            updateUnused()
        }
    }, [selectedItem])

    const handleDelete = async (assigneeToDelete) => {
        setChipData((chips) =>
            chips.filter((chip) => chip.id !== assigneeToDelete.id)
        )
        const newRfcAssigneeArr = chipData.filter(
            (chip) => chip.id !== assigneeToDelete.id
        )
        let idArray = []
        for (let i = 0; i < newRfcAssigneeArr.length; i++) {
            idArray.push(newRfcAssigneeArr[i].id)
        }
        await updateRfcAssignees(rfcInfo.id, idArray)
        // Update Unused Tags
        let assigneeArray = []
        const getRfcUsers = await getRfc(rfcInfo.id)
        for (let i = 0; i < getRfcUsers[0].assignees.length; i++) {
            if (getRfcUsers[0].assignees[i]) {
                const data = await getUserData(getRfcUsers[0].assignees[i])
                assigneeArray.push(data[0])
            }
        }
        const currentUsers = await getUsers(workspaceID)
        const unusedAssignees = filterByReference(currentUsers, assigneeArray)
        setAvailableAssignees(unusedAssignees)
    }

    useEffect(() => {
        const getData = async () => {
            const getAllUsers = await getUsers(workspaceID)
            let newUserArr = []
            for (let i = 0; i < getAllUsers.length; i++) {
                let newUser = getAllUsers[i]
                newUser["key"] = getAllUsers[i].id
                newUser["label"] = getAllUsers[i].full_name
                newUser["avatar"] = getAllUsers[i].avatar_url
                newUserArr.push(newUser)
            }
            let assigneeArray = []
            for (let i = 0; i < rfcInfo.assignees.length; i++) {
                const data = await getUserData(rfcInfo.assignees[i])
                assigneeArray.push(data[0])
            }
            setChipData(assigneeArray)

            const unassignedAssignees = filterByReference(
                newUserArr,
                assigneeArray
            )
            setAvailableAssignees(unassignedAssignees)
        }
        getData()
    }, [])

    return (
        <Box className={classes.container}>
            <Typography variant="caption" className={classes.sectionHeader}>
                Assignees
            </Typography>
            <Box className={classes.statusContainer}>
                <Box className={classes.tagContainer}>
                    {chipData.map((data) => {
                        return (
                            <Tooltip
                                title={
                                    <>
                                        {data.full_name}{" "}
                                        <span
                                            className={classes.pointer}
                                            onClick={() => handleDelete(data)}
                                        >
                                            X
                                        </span>
                                    </>
                                }
                                interactive
                            >
                                <span className={classes.avatar}>
                                    <SmallUserAvatar author={[data]} />
                                </span>
                            </Tooltip>
                        )
                    })}
                    <FlexSelect
                        placeholder="Assignees..."
                        setSelectedItem={setSelectedItem}
                        items={availableAssignees}
                        clickableComponent={addAssigneeComponent}
                        avatar={true}
                    />
                </Box>
            </Box>
        </Box>
    )
}
