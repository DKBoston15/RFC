import React from "react"
import { Drawer, Box, Badge } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import CompanyAvatar from "./CompanyAvatar"
import UserAvatar from "./UserAvatar"

const useStyles = makeStyles({
    drawer: {
        width: "20em",
        flexShrink: 0
    },
    drawerPaper: {
        width: "20em",
        background: "#202124",
        padding: "1em"
    },
    companyName: {
        color: "white",
        paddingLeft: "10px"
    },
    companyHeader: {
        cursor: "pointer"
    }
})

export default function Sidebar({ user, signOut }) {
    const classes = useStyles()

    return (
        <Drawer
            variant="permanent"
            anchor="left"
            className={classes.drawer}
            classes={{
                paper: classes.drawerPaper
            }}
        >
            <Box display="flex" flexDirection="column">
                <Box display="flex" justifyContent="space-between">
                    <CompanyAvatar user={user} signOut={signOut} />
                    <UserAvatar user={user} signOut={signOut} />
                </Box>
            </Box>
        </Drawer>
    )
}
