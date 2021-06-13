import React, { useState, useEffect } from "react"
import { Box, Typography } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import { useAuth } from "../config/auth"

import WorkspaceForm from "../components/WorkspaceForm"
import InviteTeamMates from "../components/InviteTeamates"

const useStyles = makeStyles({
    container: {
        margin: "0 2em 0 2em"
    },
    grayText: {
        color: "#969696"
    },
    textLeft: {
        textAlign: "left",
        lineHeight: ".2rem"
    },
    textRight: {
        textAlign: "right"
    }
})

export default function WorkspaceSetup() {
    const classes = useStyles()
    const { user } = useAuth()
    const [workspaceSetupComplete, setWorkspaceSetupComplete] = useState(false)

    return (
        <>
            <Box display="flex" flex={12} className={classes.container}>
                <Box flex={1} className={classes.textLeft}>
                    <Typography
                        variant="subtitle2"
                        className={classes.grayText}
                    >
                        Logged in as:
                    </Typography>
                    <br />
                    <Typography variant="subtitle2">{user.email}</Typography>
                </Box>
                <Box flex={10}></Box>
                <Box flex={1} className={classes.textRight}>
                    <Typography variant="subtitle2">Logout</Typography>
                </Box>
            </Box>
            {!workspaceSetupComplete && (
                <WorkspaceForm
                    setWorkspaceSetupComplete={setWorkspaceSetupComplete}
                />
            )}
            {workspaceSetupComplete && <InviteTeamMates />}
        </>
    )
}
