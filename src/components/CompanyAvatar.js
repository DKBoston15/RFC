import React, { useEffect, useState } from "react"
import { Box, Avatar, Typography, Menu, MenuItem } from "@material-ui/core"
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
    },
    menuItem: {
        color: "black"
    }
})

export default function CompanyAvatar({ user, signOut }) {
    const [workspaceName, setWorkspaceName] = useState("")
    const [workspaceAbv, setWorkspaceAbv] = useState("")
    const [anchorEl, setAnchorEl] = useState(null)
    const [randomColorBG, setRandomColorBG] = useState("")
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
        setRandomColorBG(randomColor())
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
                <MenuItem
                    className={classes.menuItem}
                    onClick={handleMenuClose}
                >
                    Workspace Settings
                </MenuItem>
                <MenuItem className={classes.menuItem} onClick={logout}>
                    Log out
                </MenuItem>
            </Menu>

            <Box
                display="flex"
                alignItems="center"
                onClick={openMenu}
                className={classes.companyHeader}
            >
                <Avatar
                    style={{
                        backgroundColor: randomColorBG,
                        color: "white"
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
