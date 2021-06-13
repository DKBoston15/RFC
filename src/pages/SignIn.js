import React, { useState } from "react"
import { useAuth } from "../config/auth"
import { useHistory, Link } from "react-router-dom"
import { makeStyles } from "@material-ui/core/styles"

import { Box, Button, TextField, Typography, SvgIcon } from "@material-ui/core"

import Logo from "../images/logo.svg"

const useStyles = makeStyles({
    root: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
        alignItems: "center",
        height: "50vh",
        marginTop: "8%",
        "& label.Mui-focused": {
            color: "#AEBDD1"
        },
        "& .MuiInput-underline:after": {
            borderBottomColor: "#AEBDD1"
        },
        "& .MuiOutlinedInput-root": {
            "& fieldset": {
                borderColor: "#AEBDD1"
            },
            "&:hover fieldset": {
                borderColor: "#AEBDD1"
            },
            "&.Mui-focused fieldset": {
                borderColor: "#AEBDD1"
            }
        }
    },
    logo: {
        marginBottom: "3em"
    },
    input: {
        minHeight: "48px",
        width: "22rem"
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
    disclaimerText: {
        width: "40%",
        paddingTop: "5em"
    },
    formContainer: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "2em"
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

// TODO: Finish setting up Sign in with Email form & validation

const SignIn = () => {
    const classes = useStyles()
    // const { signIn, signOut, signUpGoogle, resetPassword } = useAuth()
    const { signIn, signUpGoogle } = useAuth()
    const [signUpFormDisplay, setSignUpFormDisplay] = useState(false)
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    let history = useHistory()

    const onEmailChange = (e) => {
        setEmail(e.target.value)
    }
    const onPasswordChange = (e) => {
        setPassword(e.target.value)
    }
    const login = () => {
        console.log("Logging In")
        try {
            signIn({ email: email, password: password })
            setTimeout(() => {
                history.push("/")
            }, 1000)
        } catch (error) {
            console.log(error)
        }
    }
    const loginGoogle = () => {
        try {
            signUpGoogle()
        } catch (error) {
            console.log(error)
        }
    }
    // const resetPass = () => {
    //     resetPassword(email)
    // }

    return (
        <Box className={classes.root}>
            <img src={Logo} alt="logo" className={classes.logo} />
            <Typography variant="h4">Sign in to your RFC Account</Typography>
            <Button
                className={classes.buttonOne}
                onClick={() => {
                    loginGoogle()
                }}
                variant="contained"
                startIcon={
                    <SvgIcon className={classes.svgIcon}>
                        <svg
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M10.5157 3.9635L13.1074 1.84175C11.7219 0.691437 9.9421 0 8.00101 0C4.90913 0 2.22695 1.75384 0.895508 4.32088H0.895945L0.896119 4.32102L0.894938 4.3208H0.8945C0.322625 5.42233 0 6.67333 0 7.99993C0 9.37169 0.345005 10.6626 0.953253 11.7908L0.952881 11.7911C2.3041 14.2971 4.95288 15.9999 7.99947 15.9999C9.89529 15.9999 11.6368 15.3406 13.0078 14.2386L13.0077 14.2385C14.4173 13.1053 15.4348 11.504 15.8242 9.67021C15.939 9.13131 15.9992 8.57262 15.9992 7.99987C15.9992 7.48909 15.9513 6.98931 15.8594 6.50537H12.5153H8.17505V9.67021H12.4529C12.0678 10.6979 11.3368 11.5564 10.4014 12.1049L10.4015 12.1051C9.6969 12.5186 8.87586 12.7555 7.99947 12.7555C5.96065 12.7555 4.22153 11.4724 3.54572 9.66975L3.54594 9.66893C3.35078 9.14983 3.24441 8.58718 3.24434 7.99993C3.24434 7.45883 3.33491 6.93883 3.50106 6.45443L3.50053 6.45321L3.5021 6.4545C4.14385 4.58678 5.91573 3.24437 8.00101 3.24437C8.92451 3.24437 9.78651 3.50769 10.5157 3.9635Z"
                                fill="white"
                            />
                        </svg>
                    </SvgIcon>
                }
            >
                <span>Continue With Google</span>
            </Button>
            {!signUpFormDisplay && (
                <Button
                    className={classes.buttonTwo}
                    variant="contained"
                    onClick={() => {
                        setSignUpFormDisplay(true)
                    }}
                >
                    Continue With Email
                </Button>
            )}
            {signUpFormDisplay && (
                <Box className={classes.formContainer}>
                    <Box>
                        <Typography variant="subtitle1">Email</Typography>

                        <TextField
                            className={classes.input}
                            id="outlined-basic"
                            variant="outlined"
                            onChange={onEmailChange}
                        />
                    </Box>
                    <Box>
                        <Typography variant="subtitle1">Password</Typography>

                        <TextField
                            className={classes.input}
                            id="outlined-basic"
                            variant="outlined"
                            type="password"
                            onChange={onPasswordChange}
                        />
                    </Box>
                    <Button
                        className={classes.buttonTwo}
                        variant="contained"
                        onClick={() => {
                            login()
                        }}
                    >
                        Sign In
                    </Button>
                </Box>
            )}
            <Link to="/sign-up" className={classes.link}>
                <Typography variant="body1" align="center">
                    New User? Get Started Here
                </Typography>
            </Link>
        </Box>
    )
}

export default SignIn
