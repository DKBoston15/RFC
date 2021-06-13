import React from "react"
import { useAuth } from "../config/auth"
import { Button, Box } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"

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
    const { signOut } = useAuth()
    const logout = () => {
        signOut()
    }
    return (
        <Box className={classes.root}>
            <p>You are logged in!</p>
            <Button
                className={classes.buttonTwo}
                variant="contained"
                onClick={() => {
                    logout()
                }}
            >
                Log Out
            </Button>
        </Box>
    )
}

export default Dashboard
