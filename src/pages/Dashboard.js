import React, { useState, useEffect } from "react"
import { useAuth } from "../config/auth"
import { Box } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import Snackbar from "@material-ui/core/Snackbar"
import Alert from "@material-ui/lab/Alert"
import queryString from "query-string"
import { useLocation } from "react-router-dom"
import Sidebar from "../components/Sidebar"

const useStyles = makeStyles({
    root: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
        alignItems: "center",
        height: "50vh",
        marginTop: "8%"
    },
    buttonOne: {
        color: "white",
        minHeight: "48px",
        backgroundColor: "rgba(49, 60, 78, 1)",
        fontWeight: 600,
        width: "22rem",
        marginTop: "2em",
        "&:hover": {
            backgroundColor: "rgba(49, 60, 78, 0.5)"
        }
    },
    buttonTwo: {
        color: "white",
        minHeight: "48px",
        backgroundColor: "rgba(138, 151, 177, 1)",
        fontWeight: 600,
        width: "22rem",
        marginTop: "1.5em",
        "&:hover": {
            backgroundColor: "rgba(138, 151, 177, 0.5)"
        }
    }
})

const Dashboard = () => {
    const classes = useStyles()
    const { user, signOut } = useAuth()
    const [openRecoveryMsg, setOpenRecoveryMsg] = useState(false)
    const { search } = useLocation()
    useEffect(() => {
        const values = queryString.parse(search)
        if (values.reset) {
            setOpenRecoveryMsg(true)
        }
    }, [search])

    return (
        <>
            <Box className={classes.root}>
                <Sidebar user={user} signOut={signOut} />
            </Box>
            <Snackbar
                open={openRecoveryMsg}
                autoHideDuration={5000}
                onClose={() => setOpenRecoveryMsg(false)}
            >
                <Alert severity="success" variant="filled">
                    Password Successfully Reset
                </Alert>
            </Snackbar>
        </>
    )
}

export default Dashboard
