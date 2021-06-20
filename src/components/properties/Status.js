import React, { useState, useEffect } from "react"
import { Box, Typography, Button, Menu, MenuItem } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import WbIridescentIcon from "@material-ui/icons/WbIridescent"
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline"
import ScheduleIcon from "@material-ui/icons/Schedule"
import UpdateIcon from "@material-ui/icons/Update"
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline"
import HighlightOffIcon from "@material-ui/icons/HighlightOff"
import ArchiveOutlinedIcon from "@material-ui/icons/ArchiveOutlined"

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
        alignItems: "center"
    },
    statusContainer: {
        marginLeft: "1em",
        display: "flex",
        alignItems: "center"
    },
    sectionHeader: {
        width: "4em"
    }
})

export default function Status({ rfcInfo }) {
    const classes = useStyles()
    const [anchorEl, setAnchorEl] = useState(null)
    console.log(rfcInfo.status)
    const [currentSelection, setCurrentSelection] = useState("")

    useEffect(() => {
        setCurrentSelection(rfcInfo.status)
    }, [rfcInfo])

    let status
    const currentStatus = () => {
        switch (currentSelection) {
            case "discovery":
                status = (
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
                break
            case "todo":
                status = (
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
                break
            case "in-progress":
                status = (
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
                break
            case "in-review":
                status = (
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
                break
            case "complete":
                status = (
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
                break
            case "on-hold":
                status = (
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
                break
            case "archived":
                status = (
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
                break

            default:
                break
        }
    }

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = (event) => {
        setCurrentSelection(event.currentTarget.dataset.selection)
        currentStatus()
        setAnchorEl(null)
        updateRfcStatus(rfcInfo.id, event.currentTarget.dataset.selection)
    }
    currentStatus()

    return (
        <Box className={classes.container}>
            <Typography variant="caption" className={classes.sectionHeader}>
                Status
            </Typography>
            <Box
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={handleClick}
                className={classes.statusContainer}
            >
                {status}
            </Box>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem
                    className={classes.discoveryIcon}
                    onClick={handleClose}
                    data-selection="discovery"
                >
                    <WbIridescentIcon />
                    <Typography variant="caption" className={classes.menuText}>
                        Discovery
                    </Typography>
                </MenuItem>
                <MenuItem
                    className={classes.todoIcon}
                    onClick={handleClose}
                    data-selection="todo"
                >
                    <PlayCircleOutlineIcon />
                    <Typography variant="caption" className={classes.menuText}>
                        Todo
                    </Typography>
                </MenuItem>
                <MenuItem
                    className={classes.inProgressIcon}
                    onClick={handleClose}
                    data-selection="in-progress"
                >
                    <ScheduleIcon />
                    <Typography variant="caption" className={classes.menuText}>
                        In Progress
                    </Typography>
                </MenuItem>
                <MenuItem
                    className={classes.inReviewIcon}
                    onClick={handleClose}
                    data-selection="in-review"
                >
                    <UpdateIcon />
                    <Typography variant="caption" className={classes.menuText}>
                        In Review
                    </Typography>
                </MenuItem>
                <MenuItem
                    className={classes.completeIcon}
                    onClick={handleClose}
                    data-selection="complete"
                >
                    <CheckCircleOutlineIcon />
                    <Typography variant="caption" className={classes.menuText}>
                        Complete
                    </Typography>
                </MenuItem>
                <MenuItem
                    className={classes.onHoldIcon}
                    onClick={handleClose}
                    data-selection="on-hold"
                >
                    <HighlightOffIcon />
                    <Typography variant="caption" className={classes.menuText}>
                        On Hold
                    </Typography>
                </MenuItem>
                <MenuItem
                    className={classes.archivedIcon}
                    onClick={handleClose}
                    data-selection="archived"
                >
                    <ArchiveOutlinedIcon />
                    <Typography variant="caption" className={classes.menuText}>
                        Archived
                    </Typography>
                </MenuItem>
            </Menu>
        </Box>
    )
}
