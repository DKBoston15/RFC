import React, { useEffect, useState } from "react"
import { Box, TextField, Typography, Button } from "@material-ui/core"
import { supabase } from "../config/supabase"
import { useHistory } from "react-router-dom"

import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles({
    root: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "15em",

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
    input: {
        minHeight: "48px",
        width: "100%"
    },
    icon: {
        fill: "white"
    },
    inputContainer: {
        width: "85%"
    },
    button: {
        color: "white",
        minHeight: "48px",
        backgroundColor: "rgba(44, 157, 219)",
        fontWeight: 600,
        width: "30vw",
        marginTop: "2em",
        "&:hover": {
            backgroundColor: "rgba(44, 157, 219, 0.5)"
        }
    },
    formContainer: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
        alignItems: "center",
        background: "#313C4E",
        width: "35vw",
        padding: ".5em 0",
        borderRadius: "5px",
        minHeight: "15vh"
    },
    labelText: {
        fontWeight: 600,
        marginBottom: "1em"
    },
    header: {
        marginBottom: "1em"
    }
})

export default function PasswordReset() {
    const classes = useStyles()
    const [password, setPass] = useState("")
    const history = useHistory()
    useEffect(() => {
        const { data: authListener } = supabase.auth.onAuthStateChange(
            (event) => {
                if (event === "PASSWORD_RECOVERY")
                    console.log("Time to reset pass")
                if (event === "USER_UPDATED") {
                    console.log("USER UPDATED")
                    history.push("/dashboard?reset=true")
                }
            }
        )
        return () => {
            authListener.unsubscribe()
        }
    }, [history])

    const onPasswordChange = (e) => {
        setPass(e.target.value)
    }

    const updatePass = async () => {
        const { user, error } = await supabase.auth.update({
            password,
            data: { password_updated: new Date() }
        })
        if (error) console.log(error)
        console.log(user)
    }

    return (
        <Box className={classes.root}>
            <Typography variant="h4" className={classes.header}>
                Reset Password
            </Typography>
            <Box className={classes.formContainer}>
                <Box className={classes.inputContainer}>
                    <Typography
                        variant="subtitle1"
                        className={classes.labelText}
                    >
                        Password
                    </Typography>

                    <TextField
                        className={classes.input}
                        id="outlined-basic"
                        variant="outlined"
                        type="password"
                        onChange={onPasswordChange}
                    />
                </Box>
            </Box>
            <Button
                className={classes.button}
                variant="contained"
                onClick={() => {
                    updatePass()
                }}
            >
                Update Password
            </Button>
        </Box>
    )
}
