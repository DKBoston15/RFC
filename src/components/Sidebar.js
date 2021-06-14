import React, { useEffect, useState } from "react"
import {
    Drawer,
    Box,
    Avatar,
    Badge,
    Typography,
    Menu,
    MenuItem
} from "@material-ui/core"
import { makeStyles, withStyles } from "@material-ui/core/styles"
import { randomColor } from "../utils/utils"
import { getWorkspaceName } from "../utils/workspaceUtils"

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

const StyledBadge = withStyles((theme) => ({
    badge: {
        backgroundColor: "#44b700",
        color: "#44b700",
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
        "&::after": {
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            borderRadius: "50%",
            animation: "$ripple 1.2s infinite ease-in-out",
            border: "1px solid currentColor",
            content: '""'
        }
    },
    "@keyframes ripple": {
        "0%": {
            transform: "scale(.8)",
            opacity: 1
        },
        "100%": {
            transform: "scale(2.4)",
            opacity: 0
        }
    }
}))(Badge)

export default function Sidebar({ user, signOut }) {
    const classes = useStyles()
    const [workspaceName, setWorkspaceName] = useState("")
    const [workspaceAbv, setWorkspaceAbv] = useState("")
    const [anchorEl, setAnchorEl] = useState(null)
    // const [menuOpen, setMenuOpen] = useState(false)
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

    const handleClose = () => {
        setAnchorEl(null)
    }

    const openMenu = (event) => {
        setAnchorEl(event.currentTarget)
    }

    const logout = () => {
        signOut()
        handleClose()
    }

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
                    <Menu
                        id="lame-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={handleClose}>
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
                        <Typography
                            variant="subtitle1"
                            className={classes.companyName}
                        >
                            {workspaceName}
                        </Typography>
                    </Box>
                    <StyledBadge
                        overlap="circle"
                        anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "right"
                        }}
                        variant="dot"
                    >
                        <Avatar
                            style={{
                                backgroundColor: randomColor()
                            }}
                        >
                            IG
                        </Avatar>
                    </StyledBadge>
                </Box>
            </Box>
        </Drawer>
    )
}
