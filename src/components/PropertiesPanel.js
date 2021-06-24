import React, { useEffect } from "react"
import { Box, Divider, Typography } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import LinkIcon from "@material-ui/icons/Link"
import { useAuth } from "../config/auth"

import Status from "./properties/Status"
import Priority from "./properties/Priority"
import Author from "./properties/Author"
import Tags from "./properties/Tags"

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
        marginTop: ".5em",
        color: "#42474D"
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

export default function PropertiesPanel({ rfcInfo, tags, workspaceID }) {
    const classes = useStyles()
    const { user } = useAuth()
    useEffect(() => {
        console.log(rfcInfo)
    }, [rfcInfo])
    return (
        <>
            {rfcInfo && (
                <Box className={classes.panel}>
                    <Typography
                        variant="caption"
                        className={classes.linkHeader}
                    >
                        {rfcInfo.name}
                        <LinkIcon />
                    </Typography>
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
                                    tags={tags}
                                    workspaceID={workspaceID}
                                />
                            </Typography>
                        </Box>
                        <Box>
                            <Typography
                                variant="caption"
                                className={classes.propertyHeader}
                            >
                                Assignees
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
                                Project
                            </Typography>
                        </Box>
                        <Box>
                            <Typography
                                variant="caption"
                                className={classes.propertyHeader}
                            >
                                Due Date
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            )}
        </>
    )
}
