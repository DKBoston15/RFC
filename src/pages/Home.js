import React, { useEffect, useState } from "react"
import { makeStyles } from "@material-ui/core/styles"
import { Button, Box, Typography } from "@material-ui/core"
import { useHistory, Link } from "react-router-dom"
import Logo from "../images/logo.svg"
import { useAuth } from "../config/auth"
import { addUser, getUserData, updateUserInfo } from "../utils/userUtils"
import Snackbar from "@material-ui/core/Snackbar"
import Alert from "@material-ui/lab/Alert"
import { Helmet } from "react-helmet"

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
    },
    link: {
        textDecoration: "none",
        color: "white",
        "&:visited": {
            textDecoration: "none"
        },
        "&:hover": {
            textDecoration: "none"
        },
        "&:active": {
            textDecoration: "none"
        }
    }
})

export default function Home() {
    const history = useHistory()
    const classes = useStyles()
    const { user, signOut } = useAuth()
    const [errorMessage, setErrorMessage] = useState("")
    const [openError, setOpenError] = useState(false)

    const logout = () => {
        signOut()
    }
    useEffect(() => {
        const handleUser = async () => {
            if (user) {
                console.log(user)
                let userData = await getUserData(user.id)
                console.log("userdata", userData)
                if (user.user_metadata.full_name) {
                    await updateUserInfo(
                        user.id,
                        user.user_metadata.full_name,
                        user.user_metadata.avatar_url
                    )
                }
                if (userData.status !== "error" && userData.length === 0) {
                    if (user.id) {
                        addUser(user.id)
                        console.log("User Added")
                    } else {
                        setErrorMessage(userData.msg)
                        setOpenError(true)
                    }
                }
                if (!userData[0]) {
                    window.location.reload()
                }
                if (userData[0].signup_flow_complete === false) {
                    history.push("/workspace-setup")
                }
            }
        }
        handleUser()
    }, [user, history])
    return (
        <Box className={classes.root}>
            <Helmet>
                <title>RFC | Home</title>
            </Helmet>
            <img src={Logo} alt="logo" className={classes.logo} />
            <Typography variant="h4">Welcome to RFC</Typography>
            {user == null && (
                <>
                    <Typography variant="body1">
                        In order to access the dashboard, you need to login
                    </Typography>
                    <Link to="/sign-up" className={classes.link}>
                        <Button
                            className={classes.buttonOne}
                            variant="contained"
                        >
                            Sign Up
                        </Button>
                    </Link>
                    <Link to="/sign-in" className={classes.link}>
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
                <>
                    <Link to="/dashboard">
                        <Button
                            className={classes.buttonOne}
                            variant="contained"
                        >
                            Dashboard
                        </Button>
                    </Link>
                    <Button
                        className={classes.buttonTwo}
                        variant="contained"
                        onClick={() => {
                            logout()
                        }}
                    >
                        Log Out
                    </Button>
                </>
            )}
            <Snackbar
                open={openError}
                autoHideDuration={5000}
                onClose={() => setOpenError(false)}
            >
                <Alert severity="error" variant="filled">
                    {errorMessage}
                </Alert>
            </Snackbar>
        </Box>
    )
}
