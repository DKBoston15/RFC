import React, { useState } from "react"
import { Box, Typography, TextField, Button, Select } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import { addWorkspace } from "../utils/workspaceUtils"
import Snackbar from "@material-ui/core/Snackbar"
import Alert from "@material-ui/lab/Alert"

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
    const [workspaceName, setWorkspaceName] = useState("")
    const [workspaceUrl, setworkspaceUrl] = useState("")
    const [companySize, setCompanySize] = useState("")
    const [role, setRole] = useState("")
    const [errorMessage, setErrorMessage] = useState("")
    const [openError, setOpenError] = useState(false)
    const [additionalFields, setAdditionalFields] = useState([0])
    const [addButtonDisplay, setAddButtonDisplay] = useState(true)

    const handleChange = (e) => {
        switch (e.target.name) {
            case "workspaceName":
                setWorkspaceName(e.target.value)
                break
            case "workspaceUrl":
                setworkspaceUrl(e.target.value)
                break
            case "companySize":
                setCompanySize(e.target.value)
                break
            case "role":
                setRole(e.target.value)
                break
            default:
                break
        }
    }
    const addMoreFields = () => {
        let num = additionalFields.length - 1
        let arr = [...additionalFields]
        if (num + 1 === 3) {
            setAddButtonDisplay(false)
            return
        }
        arr.push(num + 1)
        setAdditionalFields(arr)
        console.log(additionalFields)
    }

    const onSubmit = async () => {}
    return (
        <Box className={classes.root}>
            <Typography variant="h4" className={classes.header}>
                Invite Co-Workers to your team
            </Typography>
            <Typography variant="subtitle1" className={classes.description}>
                RFC is meant to be used with your team. Invite some co-workers
                to test it out with.
            </Typography>
            <Box className={classes.formContainer}>
                <Box className={classes.inputContainer}>
                    <Typography
                        variant="subtitle1"
                        className={classes.labelText}
                    >
                        Invite people to collaborate in RFC:
                    </Typography>
                    <TextField
                        className={classes.input}
                        id="outlined-basic"
                        name="workspaceName"
                        variant="outlined"
                        value={workspaceName}
                        onChange={handleChange}
                    />
                    <TextField
                        className={classes.input}
                        id="outlined-basic"
                        name="workspaceName"
                        variant="outlined"
                        value={workspaceName}
                        onChange={handleChange}
                    />
                    <TextField
                        className={classes.input}
                        id="outlined-basic"
                        name="workspaceName"
                        variant="outlined"
                        value={workspaceName}
                        onChange={handleChange}
                    />
                    {additionalFields.map((number) => (
                        <TextField
                            className={classes.input}
                            id="outlined-basic"
                            name="workspaceName"
                            key={number}
                            variant="outlined"
                            value={workspaceName}
                            onChange={handleChange}
                        />
                    ))}
                </Box>
            </Box>
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
                onClick={() => onSubmit()}
            >
                Continue
            </Button>
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
