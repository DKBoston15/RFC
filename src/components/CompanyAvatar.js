import React, { useEffect, useState } from "react"
import {
    Box,
    Avatar,
    Badge,
    Typography,
    Menu,
    MenuItem
} from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import { randomColor } from "../utils/utils"
import { getWorkspaceName } from "../utils/workspaceUtils"
const useStyles = makeStyles({
    companyName: {
        color: "white",
        paddingLeft: "10px"
    },
    companyHeader: {
        cursor: "pointer"
    }
})

export default function CompanyAvatar({ user, signOut }) {
    const [workspaceName, setWorkspaceName] = useState("")
    const [workspaceAbv, setWorkspaceAbv] = useState("")
    const [anchorEl, setAnchorEl] = useState(null)
    const classes = useStyles()
    const getName = async () => {
        let name = await getWorkspaceName(user.id)
        const matches = name.match(/\b(\w)/g)
        setWorkspaceAbv(matches.join(""))
        name = `${name.substring(0, 6)}...`
        setWorkspaceName(name.replace(/\s/g, ""))
    }

    useEffect(() => {
        getName()
    }, [user])

    const handleMenuClose = () => {
        setAnchorEl(null)
    }

    const openMenu = (event) => {
        setAnchorEl(event.currentTarget)
    }

    const logout = () => {
        signOut()
        handleMenuClose()
    }
    return (
        <Box display="flex" justifyContent="space-between">
            <Menu
                id="company-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
            >
                <MenuItem onClick={handleMenuClose}>
                    Workspace Settings
                </MenuItem>
                <MenuItem onClick={logout}>Log out</MenuItem>
            </Menu>

            <Box
                display="flex"
                alignItems="center"
                onClick={openMenu}
                className={classes.companyHeader}
            >
                <Avatar
                    style={{
                        backgroundColor: randomColor()
                    }}
                >
                    {workspaceAbv}
                </Avatar>
                <Typography variant="subtitle1" className={classes.companyName}>
                    {workspaceName}
                </Typography>
            </Box>
        </Box>
    )
}
