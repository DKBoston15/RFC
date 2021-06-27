import React, { useState, useEffect } from "react"
import { Box, Typography } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import InsertInvitationIcon from "@material-ui/icons/InsertInvitation"

import DateSelect from "../DateSelect"

import { updateRfcDueDate } from "../../utils/rfcUtils"

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
        width: "5em",
        marginRight: "1em"
    },
    staticContainer: {
        display: "flex",
        alignItems: "center"
    },
    icon: {
        fontSize: "16px",
        marginRight: ".5em"
    }
})

export default function DueDate({ rfcInfo }) {
    const classes = useStyles()
    const [date, setDate] = useState()
    const [staticDate, setStaticDate] = useState("")
    useEffect(() => {
        if (date) {
            setStaticDate(`${date.toISOString().substring(0, 10)}`)
            updateRfcDueDate(rfcInfo.id, date)
        }
    }, [date, rfcInfo])

    useEffect(() => {
        setStaticDate(rfcInfo.due_date)
    }, [])

    return (
        <Box className={classes.container}>
            <Typography variant="caption" className={classes.sectionHeader}>
                Due Date
            </Typography>
            <DateSelect
                date={date}
                setDate={setDate}
                clickableComponent={
                    <Box className={classes.staticContainer}>
                        <InsertInvitationIcon className={classes.icon} />
                        {staticDate}
                    </Box>
                }
            />
        </Box>
    )
}
