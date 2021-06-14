import React, { useState } from "react"
import { Box, Typography, TextField, Button, Select } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import { addWorkspace } from "../utils/workspaceUtils"
import { addUserRole } from "../utils/userUtils"
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
        backgroundColor: "rgba(44, 157, 219)",
        fontWeight: 600,
        width: "30vw",
        marginTop: "2em",
        "&:hover": {
            backgroundColor: "rgba(44, 157, 219, 0.5)"
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

export default function WorkspaceForm({ setWorkspaceSetupComplete, user }) {
    const classes = useStyles()
    const [workspaceName, setWorkspaceName] = useState("")
    const [workspaceUrl, setworkspaceUrl] = useState("")
    const [companySize, setCompanySize] = useState("")
    const [role, setRole] = useState("")
    const [errorMessage, setErrorMessage] = useState("")
    const [openError, setOpenError] = useState(false)

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
    const onSubmit = async () => {
        let workspaceData = await addWorkspace(
            workspaceName,
            workspaceUrl,
            companySize
        )
        if (workspaceData.status !== "error") {
            console.log("Workspace Created")
            let userRole = await addUserRole(role, user.id, workspaceData[0].id)
            if (userRole.status === "error") {
                setErrorMessage(userRole.msg)
                setOpenError(true)
            }
            setWorkspaceSetupComplete(true)
        } else {
            setErrorMessage(workspaceData.msg)
            setOpenError(true)
        }
    }
    return (
        <Box className={classes.root}>
            <Typography variant="h4" className={classes.header}>
                Create a new workspace
            </Typography>
            <Typography variant="subtitle1" className={classes.description}>
                Workspaces are shared environments where teams can collaborate
                with their teams asynchronously to make impactful business
                decisions.
            </Typography>
            <Box className={classes.formContainer}>
                <Box className={classes.inputContainer}>
                    <Typography
                        variant="subtitle1"
                        className={classes.labelText}
                    >
                        Workspace name
                    </Typography>

                    <TextField
                        className={classes.input}
                        id="outlined-basic"
                        name="workspaceName"
                        variant="outlined"
                        value={workspaceName}
                        onChange={handleChange}
                    />
                </Box>
                <Box className={classes.inputContainer}>
                    <Typography
                        variant="subtitle1"
                        className={classes.labelText}
                    >
                        Workspace Url
                    </Typography>

                    <TextField
                        className={classes.input}
                        id="outlined-basic"
                        name="workspaceUrl"
                        variant="outlined"
                        placeholder="rfc.app/"
                        onChange={handleChange}
                    />
                </Box>
                <Box className={classes.inputContainer}>
                    <Typography
                        variant="subtitle1"
                        className={classes.labelText}
                    >
                        How large is your company
                    </Typography>
                    <Select
                        native
                        name="companySize"
                        className={classes.input}
                        variant="outlined"
                        onChange={handleChange}
                        inputProps={{
                            classes: {
                                icon: classes.icon
                            }
                        }}
                    >
                        <option aria-label="None" value="" />
                        <option value={"1 - 10"}>1 - 10</option>
                        <option value={"11 - 50"}>11 - 50</option>
                        <option value={"51 - 500"}>51 - 500</option>
                        <option value={"501+"}>501+</option>
                    </Select>
                </Box>
                <Box className={classes.inputContainer}>
                    <Typography
                        variant="subtitle1"
                        className={classes.labelText}
                    >
                        What is your role?
                    </Typography>

                    <Select
                        native
                        name="role"
                        className={classes.input}
                        onChange={handleChange}
                        variant="outlined"
                        inputProps={{
                            classes: {
                                icon: classes.icon
                            }
                        }}
                    >
                        <option aria-label="None" value="" />
                        <option value="Executive">Executive</option>
                        <option value="Accounting">Accounting</option>
                        <option value="Human Resources">Human Resources</option>
                        <option value="Marketing">Marketing</option>
                        <option value="Sales">Sales</option>
                        <option value="Development">Development</option>
                        <option value="Other">Other</option>
                    </Select>
                </Box>
            </Box>
            <Button
                className={classes.button}
                variant="contained"
                onClick={() => onSubmit()}
            >
                Create Workspace
            </Button>
            <Button onClick={() => setWorkspaceSetupComplete(true)}>
                SKIP (DEV)
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
