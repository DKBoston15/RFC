import React, { useState } from "react"
import Modal from "../modules/Modal"
import { makeStyles } from "@material-ui/core/styles"
import CircularProgress from "@material-ui/core/CircularProgress"
import { Box, Typography, TextField, Button } from "@material-ui/core"
import { useForm, Controller } from "react-hook-form"
import { inviteUser } from "../utils/lambdaUtils"
import Snackbar from "@material-ui/core/Snackbar"
import Alert from "@material-ui/lab/Alert"

const useStyles = makeStyles({
    modalStyles: {
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        backgroundColor: "#fff",
        padding: "50px",
        zIndex: 1000
    },
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
    sendInviteButton: {
        color: "white",
        minHeight: "30px",
        background: "#2C9DDB",
        fontWeight: 600,
        width: "10em",
        "&:hover": {
            backgroundColor: "rgba(44, 157, 219, 0.5)",
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
        width: "25vw",
        padding: ".5em 0",
        borderRadius: "5px"
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
    },
    buttonContainer: {
        alignItems: "center",
        justifyContent: "flex-end",
        maxWidth: "85%",
        marginTop: "2em"
    },
    buttonProgress: {
        color: "blue",
        position: "absolute",
        top: "50%",
        left: "50%",
        marginTop: -12,
        marginLeft: -12
    }
})

export default function InviteUserModal({ isOpen, setIsOpen }) {
    const classes = useStyles()
    const [invitedUsers, setInvitedUsers] = useState(false)
    const [addButtonDisplay, setAddButtonDisplay] = useState(true)
    const [loading, setLoading] = useState(false)

    const { handleSubmit, control, reset } = useForm()

    const onSubmit = async (values) => {
        if (!loading) {
            setLoading(true)
            await inviteUser(encodeURIComponent(values["email-1"]))
            reset()
            setInvitedUsers(true)
            setIsOpen(false)
            setLoading(false)
        }
    }
    return (
        <>
            <div className={classes.modalStyles}>
                <Modal open={isOpen} onClose={() => setIsOpen(false)}>
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
                            </Box>
                            <Box
                                display="flex"
                                width="90%"
                                className={classes.buttonContainer}
                            >
                                {!addButtonDisplay && <Typography />}
                                <div className={classes.wrapper}>
                                    <Button
                                        className={classes.sendInviteButton}
                                        variant="contained"
                                        type="submit"
                                        disabled={loading}
                                    >
                                        Send Invites
                                        {loading && (
                                            <CircularProgress
                                                size={24}
                                                className={
                                                    classes.buttonProgress
                                                }
                                            />
                                        )}
                                    </Button>
                                </div>
                            </Box>
                        </Box>
                    </form>
                </Modal>
            </div>
            <Snackbar
                open={invitedUsers}
                autoHideDuration={5000}
                onClose={() => setInvitedUsers(false)}
            >
                <Alert severity="success" variant="filled">
                    User Invited
                </Alert>
            </Snackbar>
        </>
    )
}
