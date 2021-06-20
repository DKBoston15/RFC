import React, { useState, useEffect } from "react"
import { Box, Typography, Button, Menu, MenuItem } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import SignalCellularNullIcon from "@material-ui/icons/SignalCellularNull"
import SignalCellular3BarIcon from "@material-ui/icons/SignalCellular3Bar"
import SignalCellular4BarIcon from "@material-ui/icons/SignalCellular4Bar"
import SignalCellularConnectedNoInternet4BarIcon from "@material-ui/icons/SignalCellularConnectedNoInternet4Bar"

import { updateRfcPriority } from "../../utils/rfcUtils"

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
    icon: {
        color: "#56657F"
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

export default function Priority({ rfcInfo }) {
    const classes = useStyles()
    const [anchorEl, setAnchorEl] = useState(null)
    const [currentSelection, setCurrentSelection] = useState(rfcInfo.priority)

    let priority
    const currentStatus = () => {
        switch (currentSelection) {
            case "low":
                priority = (
                    <Box className={classes.selectedContainer}>
                        <SignalCellularNullIcon className={classes.icon} />
                        <Typography
                            variant="caption"
                            className={classes.menuText}
                        >
                            Low
                        </Typography>
                    </Box>
                )
                break
            case "medium":
                priority = (
                    <Box className={classes.selectedContainer}>
                        <SignalCellular3BarIcon className={classes.icon} />
                        <Typography
                            variant="caption"
                            className={classes.menuText}
                        >
                            Medium
                        </Typography>
                    </Box>
                )
                break
            case "high":
                priority = (
                    <Box className={classes.selectedContainer}>
                        <SignalCellular4BarIcon className={classes.icon} />
                        <Typography
                            variant="caption"
                            className={classes.menuText}
                        >
                            High
                        </Typography>
                    </Box>
                )
                break
            case "urgent":
                priority = (
                    <Box className={classes.selectedContainer}>
                        <SignalCellularConnectedNoInternet4BarIcon
                            className={classes.icon}
                        />
                        <Typography
                            variant="caption"
                            className={classes.menuText}
                        >
                            Urgent
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
        updateRfcPriority(rfcInfo.id, event.currentTarget.dataset.selection)
    }
    currentStatus()

    return (
        <Box className={classes.container}>
            <Typography variant="caption" className={classes.sectionHeader}>
                Status
            </Typography>
            <Box
                aria-controls="priority-menu"
                aria-haspopup="true"
                onClick={handleClick}
                className={classes.statusContainer}
            >
                {priority}
            </Box>
            <Menu
                id="priority-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem
                    className={classes.icon}
                    onClick={handleClose}
                    data-selection="low"
                >
                    <SignalCellularNullIcon />
                    <Typography variant="caption" className={classes.menuText}>
                        Low
                    </Typography>
                </MenuItem>
                <MenuItem
                    className={classes.icon}
                    onClick={handleClose}
                    data-selection="medium"
                >
                    <SignalCellular3BarIcon />
                    <Typography variant="caption" className={classes.menuText}>
                        Medium
                    </Typography>
                </MenuItem>
                <MenuItem
                    className={classes.icon}
                    onClick={handleClose}
                    data-selection="high"
                >
                    <SignalCellular4BarIcon />
                    <Typography variant="caption" className={classes.menuText}>
                        High
                    </Typography>
                </MenuItem>
                <MenuItem
                    className={classes.icon}
                    onClick={handleClose}
                    data-selection="urgent"
                >
                    <SignalCellularConnectedNoInternet4BarIcon />
                    <Typography variant="caption" className={classes.menuText}>
                        Urgent
                    </Typography>
                </MenuItem>
            </Menu>
        </Box>
    )
}
