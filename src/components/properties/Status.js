import React, { useState, useEffect } from "react"
import { Box, Typography } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import WbIridescentIcon from "@material-ui/icons/WbIridescent"
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline"
import ScheduleIcon from "@material-ui/icons/Schedule"
import UpdateIcon from "@material-ui/icons/Update"
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline"
import HighlightOffIcon from "@material-ui/icons/HighlightOff"
import ArchiveOutlinedIcon from "@material-ui/icons/ArchiveOutlined"

import FlexSelect from "../FlexSelect"

import { updateRfcStatus } from "../../utils/rfcUtils"

const useStyles = makeStyles({
    container: {
        width: "25em",
        display: "flex",
        alignItems: "center"
    },
    menuText: {
        color: "#42474D",
        marginLeft: ".5em"
    },
    discoveryIcon: {
        color: "#219653"
    },
    todoIcon: {
        color: "#2196F3"
    },
    inProgressIcon: {
        color: "#FFC107"
    },
    inReviewIcon: {
        color: "#9B51E0"
    },
    completeIcon: {
        color: "#00C853"
    },
    onHoldIcon: {
        color: "#C62828"
    },
    archivedIcon: {
        color: "#9E9E9E"
    },
    selectedContainer: {
        display: "flex",
        alignItems: "center",
        cursor: "pointer"
    },
    statusContainer: {
        display: "flex",
        alignItems: "center"
    },
    sectionHeader: {
        width: "5em",
        marginRight: "1em"
    }
})

export default function Status({ rfcInfo }) {
    const classes = useStyles()
    const currentStatus = (key) => {
        switch (key) {
            case "discovery":
                return (
                    <Box className={classes.selectedContainer}>
                        <WbIridescentIcon className={classes.discoveryIcon} />
                        <Typography
                            variant="caption"
                            className={classes.menuText}
                        >
                            Discovery
                        </Typography>
                    </Box>
                )
            case "todo":
                return (
                    <Box className={classes.selectedContainer}>
                        <PlayCircleOutlineIcon className={classes.todoIcon} />
                        <Typography
                            variant="caption"
                            className={classes.menuText}
                        >
                            Todo
                        </Typography>
                    </Box>
                )
            case "in_progress":
                return (
                    <Box className={classes.selectedContainer}>
                        <ScheduleIcon className={classes.inProgressIcon} />
                        <Typography
                            variant="caption"
                            className={classes.menuText}
                        >
                            In Progress
                        </Typography>
                    </Box>
                )
            case "in_review":
                return (
                    <Box className={classes.selectedContainer}>
                        <UpdateIcon className={classes.inReviewIcon} />
                        <Typography
                            variant="caption"
                            className={classes.menuText}
                        >
                            In Review
                        </Typography>
                    </Box>
                )
            case "complete":
                return (
                    <Box className={classes.selectedContainer}>
                        <CheckCircleOutlineIcon
                            className={classes.completeIcon}
                        />
                        <Typography
                            variant="caption"
                            className={classes.menuText}
                        >
                            Complete
                        </Typography>
                    </Box>
                )
            case "on_hold":
                return (
                    <Box className={classes.selectedContainer}>
                        <HighlightOffIcon className={classes.onHoldIcon} />
                        <Typography
                            variant="caption"
                            className={classes.menuText}
                        >
                            On Hold
                        </Typography>
                    </Box>
                )
            case "archived":
                return (
                    <Box className={classes.selectedContainer}>
                        <ArchiveOutlinedIcon className={classes.archivedIcon} />
                        <Typography
                            variant="caption"
                            className={classes.menuText}
                        >
                            Archived
                        </Typography>
                    </Box>
                )

            default:
                break
        }
    }
    const [selectedStatus, setSelectedStatus] = useState("")
    const [statusItems, setStatusItems] = useState([
        { key: "discovery", label: "Discovery", icon: "discovery" },
        { key: "todo", label: "Todo", icon: "todo" },
        { key: "in_progress", label: "In Progress", icon: "in_progress" },
        { key: "in_review", label: "In Review", icon: "in_review" },
        { key: "complete", label: "Complete", icon: "complete" },
        { key: "on_hold", label: "On Hold", icon: "on_hold" },
        { key: "archived", label: "Archived", icon: "archived" }
    ])
    const [staticStatus, setStaticStatus] = useState("")
    useEffect(() => {
        setStaticStatus(currentStatus(selectedStatus.key))
        updateRfcStatus(rfcInfo.id, selectedStatus.key)
    }, [selectedStatus, rfcInfo])

    useEffect(() => {
        let initialStatus = statusItems.filter(
            (item) => item.key === rfcInfo.status
        )
        setStaticStatus(currentStatus(initialStatus[0].key))
    }, [rfcInfo])

    return (
        <Box className={classes.container}>
            <Typography variant="caption" className={classes.sectionHeader}>
                Status
            </Typography>
            <FlexSelect
                placeholder="Status..."
                setSelectedItem={setSelectedStatus}
                items={statusItems}
                clickableComponent={staticStatus}
            />
        </Box>
    )
}
