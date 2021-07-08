import React, { useState, useEffect } from "react"
import { Box, Typography, Button, Menu, MenuItem } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import SignalCellularNullIcon from "@material-ui/icons/SignalCellularNull"
import SignalCellular3BarIcon from "@material-ui/icons/SignalCellular3Bar"
import SignalCellular4BarIcon from "@material-ui/icons/SignalCellular4Bar"
import SignalCellularConnectedNoInternet4BarIcon from "@material-ui/icons/SignalCellularConnectedNoInternet4Bar"

import FlexSelect from "../FlexSelect"

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
        display: "flex",
        alignItems: "center"
    },
    sectionHeader: {
        width: "5em",
        marginRight: "1em"
    }
})

export default function Priority({ rfcInfo }) {
    const classes = useStyles()
    const currentStatus = (key) => {
        switch (key) {
            case "low":
                return (
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
            case "medium":
                return (
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
            case "high":
                return (
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
                return (
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

            default:
                break
        }
    }

    const [selectedPriority, setSelectedPriority] = useState("")
    const [priorityItems, setPriorityItems] = useState([
        { key: "low", label: "Low", icon: "low" },
        { key: "medium", label: "Medium", icon: "medium" },
        { key: "high", label: "High", icon: "high" },
        { key: "urgent", label: "Urgent", icon: "urgent" }
    ])
    const [staticPriority, setStaticPriority] = useState("")
    useEffect(() => {
        setStaticPriority(currentStatus(selectedPriority.key))
        updateRfcPriority(rfcInfo.id, selectedPriority.key)
    }, [selectedPriority, rfcInfo])

    useEffect(() => {
        let initialPriority = priorityItems.filter(
            (item) => item.key === rfcInfo.priority
        )
        setStaticPriority(currentStatus(initialPriority[0].key))
    }, [rfcInfo])

    return (
        <Box className={classes.container}>
            <Typography variant="caption" className={classes.sectionHeader}>
                Priority
            </Typography>
            <FlexSelect
                placeholder="Priority..."
                setSelectedItem={setSelectedPriority}
                items={priorityItems}
                clickableComponent={staticPriority}
            />
        </Box>
    )
}
