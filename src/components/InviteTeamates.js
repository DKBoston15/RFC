import React, { useState } from "react"
import { Box, Typography, TextField, Button } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import Snackbar from "@material-ui/core/Snackbar"
import { useHistory } from "react-router-dom"
import Alert from "@material-ui/lab/Alert"
import { useForm, Controller } from "react-hook-form"
import { inviteUser } from "../utils/lambdaUtils"

const useStyles = makeStyles({
    root: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
        alignItems: "center",

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
        width: "100%",
        marginTop: "1em"
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
        background: "none",
        border: "1px solid white",
        fontWeight: 600,
        width: "30vw",
        marginTop: "2em",
        "&:hover": {
            backgroundColor: "rgba(44, 157, 219, 1)",
            border: "none"
        }
    },
    description: {
        width: "35%",
        textAlign: "center",
        marginBottom: "1em"
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
        minHeight: "55vh"
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
    },
    labelText: {
        fontWeight: 600,
        marginBottom: "1em"
    },
    header: {
        marginBottom: "1em"
    }
})

export default function InviteTeamates() {
    const classes = useStyles()
    const history = useHistory()
    const [invitedUsers, setInvitedUsers] = useState(false)
    const [addButtonDisplay, setAddButtonDisplay] = useState(true)
    const [additionalFields, setAdditionalFields] = useState(0)

    const { handleSubmit, control } = useForm()

    const addMoreFields = () => {
        setAdditionalFields(additionalFields + 1)
        if (additionalFields === 2) {
            setAddButtonDisplay(false)
        }
    }

    const onSubmit = async (values) => {
        for (const email in values) {
            await inviteUser(encodeURIComponent(values[email]))
            //Get User
            //Add Workspace ID to User
        }
        setInvitedUsers(true)
        setTimeout(() => {
            history.push("/dashboard")
        }, 1500)
    }
    return (
        <Box className={classes.root}>
            <Typography variant="h4" className={classes.header}>
                Invite Co-Workers to your team
            </Typography>
            <Typography variant="subtitle1" className={classes.description}>
                RFC is meant to be used with your team. Invite some co-workers
                to test it out with.
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Box className={classes.formContainer}>
                    <Box className={classes.inputContainer}>
                        <Typography
                            variant="subtitle1"
                            className={classes.labelText}
                        >
                            Invite people to collaborate in RFC:
                        </Typography>
                        <Controller
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    className={classes.input}
                                    id="outlined-basic"
                                    name="email-3"
                                    variant="outlined"
                                />
                            )}
                            control={control}
                            name="email-1"
                        />
                        <Controller
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    className={classes.input}
                                    id="outlined-basic"
                                    name="email-3"
                                    variant="outlined"
                                />
                            )}
                            control={control}
                            name="email-2"
                        />
                        <Controller
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    className={classes.input}
                                    id="outlined-basic"
                                    name="email-3"
                                    variant="outlined"
                                />
                            )}
                            control={control}
                            name="email-3"
                        />
                        {additionalFields > 0 && (
                            <Controller
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        className={classes.input}
                                        id="outlined-basic"
                                        name="email-3"
                                        variant="outlined"
                                    />
                                )}
                                control={control}
                                name="email-4"
                            />
                        )}
                        {additionalFields > 1 && (
                            <Controller
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        className={classes.input}
                                        id="outlined-basic"
                                        name="email-3"
                                        variant="outlined"
                                    />
                                )}
                                control={control}
                                name="email-5"
                            />
                        )}
                        {additionalFields > 2 && (
                            <Controller
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        className={classes.input}
                                        id="outlined-basic"
                                        name="email-3"
                                        variant="outlined"
                                    />
                                )}
                                control={control}
                                name="email-6"
                            />
                        )}
                    </Box>
                </Box>
                <Box display="flex" flexDirection="column" alignItems="center">
                    {addButtonDisplay && (
                        <Button
                            className={classes.button}
                            variant="contained"
                            onClick={() => addMoreFields()}
                        >
                            Add More +
                        </Button>
                    )}
                    <Button
                        className={classes.button}
                        variant="contained"
                        type="submit"
                    >
                        Continue
                    </Button>
                </Box>
            </form>
            <Snackbar
                open={invitedUsers}
                autoHideDuration={5000}
                onClose={() => setInvitedUsers(false)}
            >
                <Alert severity="success" variant="filled">
                    Users Invited
                </Alert>
            </Snackbar>
        </Box>
    )
}
