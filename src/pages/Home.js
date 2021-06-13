import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import { Button, Box, Typography } from "@material-ui/core"
import { Link } from "react-router-dom"
import Logo from "../images/logo.svg"
import { useAuth } from "../config/auth"

const useStyles = makeStyles({
    root: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
        alignItems: "center",
        height: "50vh",
        marginTop: "8%"
    },
    logo: {
        marginBottom: "3em"
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
    },
    svgIcon: {
        marginTop: ".4rem",
        position: "absolute",
        left: "16%",
        top: "22%"
    }
})

export default function Home() {
    const classes = useStyles()
    const { user } = useAuth()
    return (
        <Box className={classes.root}>
            <img src={Logo} alt="logo" className={classes.logo} />
            <Typography variant="h4">Welcome to RFC</Typography>
            {user == null && (
                <>
                    <Typography variant="body1">
                        In order to access the dashboard, you need to login
                    </Typography>
                    <Link to="/sign-up">
                        <Button
                            className={classes.buttonOne}
                            variant="contained"
                        >
                            Sign Up
                        </Button>
                    </Link>
                    <Link to="/sign-in">
                        <Button
                            className={classes.buttonTwo}
                            variant="contained"
                        >
                            Sign In
                        </Button>
                    </Link>
                </>
            )}
            {user != null && (
                <Link to="/dashboard">
                    <Button className={classes.buttonOne} variant="contained">
                        Dashboard
                    </Button>
                </Link>
            )}
        </Box>
    )
}
