import React, { useEffect, useState } from "react"
import { Box, Divider, Typography, Snackbar } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import LinkIcon from "@material-ui/icons/Link"
import { useAuth } from "../config/auth"
import { CopyToClipboard } from "react-copy-to-clipboard"
import Alert from "@material-ui/lab/Alert"

import Status from "./properties/Status"
import Priority from "./properties/Priority"
import Author from "./properties/Author"
import Tags from "./properties/Tags"
import Assignee from "./properties/Assignee"
import DueDate from "./properties/DueDate"
import Project from "./properties/Project"

const useStyles = makeStyles({
    panel: {
        background: "#FBFCFD",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        color: "black"
    },
    divider: {
        marginTop: "1em",
        width: "90%"
    },
    linkHeader: {
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        width: "90%",
        marginTop: ".5em",
        paddingTop: ".5em",
        color: "#42474D",
        cursor: "pointer"
    },
    linkIcon: {
        marginLeft: ".5em",
        fontSize: "16px",
        marginBottom: "0.1em"
    },
    propertiesPanel: {
        display: "flex",
        width: "90%",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "space-evenly",
        height: "20em"
    },
    propertiesPanel2: {
        display: "flex",
        width: "90%",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "space-evenly",
        height: "6em"
    },
    propertyHeader: {
        color: "#42474D"
    }
})

export default function PropertiesPanel({
    rfcInfo,
    workspaceTags,
    workspaceID
}) {
    const classes = useStyles()
    const { user } = useAuth()
    const [alert, setAlert] = React.useState({
        open: false,
        vertical: "top",
        horizontal: "center"
    })

    const { vertical, horizontal, open } = alert

    const handleClick = (newState) => () => {
        setAlert({ open: true, ...newState })
    }

    const handleClose = () => {
        setAlert({ ...alert, open: false })
    }
    return (
        <>
            {rfcInfo && (
                <Box className={classes.panel}>
                    <CopyToClipboard
                        text={`http://localhost:3000/dashboard/${rfcInfo.id}`}
                    >
                        <Typography
                            onClick={handleClick({
                                vertical: "top",
                                horizontal: "right"
                            })}
                            variant="caption"
                            className={classes.linkHeader}
                        >
                            {rfcInfo.name}
                            <LinkIcon className={classes.linkIcon} />
                        </Typography>
                    </CopyToClipboard>

                    <Divider className={classes.divider} />
                    <Box className={classes.propertiesPanel}>
                        <Box>
                            <Typography
                                variant="caption"
                                className={classes.propertyHeader}
                            >
                                <Status rfcInfo={rfcInfo} />
                            </Typography>
                        </Box>
                        <Box>
                            <Typography
                                variant="caption"
                                className={classes.propertyHeader}
                            >
                                <Priority rfcInfo={rfcInfo} />
                            </Typography>
                        </Box>
                        <Box>
                            <Typography
                                variant="caption"
                                className={classes.propertyHeader}
                            >
                                <Author rfcInfo={rfcInfo} />
                            </Typography>
                        </Box>
                        <Box>
                            <Typography
                                variant="caption"
                                className={classes.propertyHeader}
                            >
                                <Tags
                                    rfcInfo={rfcInfo}
                                    workspaceTags={workspaceTags}
                                    workspaceID={workspaceID}
                                />
                            </Typography>
                        </Box>
                        <Box>
                            <Typography
                                variant="caption"
                                className={classes.propertyHeader}
                            >
                                <Assignee
                                    rfcInfo={rfcInfo}
                                    workspaceID={workspaceID}
                                />
                            </Typography>
                        </Box>
                    </Box>
                    <Divider className={classes.divider} />
                    <Box className={classes.propertiesPanel2}>
                        <Box>
                            <Typography
                                variant="caption"
                                className={classes.propertyHeader}
                            >
                                <Project
                                    rfcInfo={rfcInfo}
                                    workspaceID={workspaceID}
                                />
                            </Typography>
                        </Box>
                        <Box>
                            <Typography
                                variant="caption"
                                className={classes.propertyHeader}
                            >
                                <DueDate rfcInfo={rfcInfo} />
                            </Typography>
                        </Box>
                    </Box>
                    <Snackbar
                        open={open}
                        autoHideDuration={3000}
                        onClose={handleClose}
                        anchorOrigin={{ vertical, horizontal }}
                        key={vertical + horizontal}
                    >
                        <Alert severity="info">RFC Link Copied</Alert>
                    </Snackbar>
                </Box>
            )}
        </>
    )
}
