import React, { useState, useEffect } from "react"
import { Box, Typography } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import { useAuth } from "../config/auth"
import { Helmet } from "react-helmet"

import WorkspaceForm from "../components/WorkspaceForm"
import InviteTeamMates from "../components/InviteTeamates"

const useStyles = makeStyles({
    container: {
        margin: "0 2em 0 2em",
        color: "white"
    },
    grayText: {
        color: "#969696"
    },
    textLeft: {
        textAlign: "left",
        lineHeight: ".2rem",
        marginTop: "1em"
    },
    textRight: {
        textAlign: "right",
        marginTop: "1em",
        cursor: "pointer"
    }
})

export default function WorkspaceSetup() {
    const classes = useStyles()
    const { user, signOut } = useAuth()
    const [workspaceSetupComplete, setWorkspaceSetupComplete] = useState(false)
    useEffect(() => {}, [workspaceSetupComplete])

    const logout = () => {
        signOut()
    }

    return (
        <>
            <Helmet>
                <title>RFC | Workspace Setup</title>
            </Helmet>
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
                    <Typography variant="subtitle2" onClick={logout}>
                        Logout
                    </Typography>
                </Box>
            </Box>
            {!workspaceSetupComplete && (
                <WorkspaceForm
                    user={user}
                    setWorkspaceSetupComplete={setWorkspaceSetupComplete}
                />
            )}
            {workspaceSetupComplete && <InviteTeamMates />}
        </>
    )
}
