import React, { useEffect, useState } from "react"
import { Box, Avatar, Badge, Menu, MenuItem } from "@material-ui/core"
import { withStyles } from "@material-ui/core/styles"
import { randomColor } from "../utils/utils"
import { getWorkspaceName } from "../utils/workspaceUtils"

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

export default function UserAvatar({ user, signOut }) {
    const [anchorEl, setAnchorEl] = useState(null)
    const [userName, setUserName] = useState("")
    const [userImage, setUserImage] = useState("")

    useEffect(() => {
        const getName = async (name) => {
            const matches = name.match(/\b(\w)/g)
            setUserName(matches.join(""))
        }

        console.log(user)
        if (user.user_metadata.avatar_url) {
            setUserImage(user.user_metadata.avatar_url)
        }
        if (user.user_metadata.full_name) {
            getName(user.user_metadata.full_name)
        }
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
                id="user-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
            >
                <MenuItem onClick={handleMenuClose}>View Profile</MenuItem>
                <MenuItem onClick={handleMenuClose}>Settings</MenuItem>
                <MenuItem onClick={handleMenuClose}>Help</MenuItem>
                <MenuItem onClick={logout}>Log out</MenuItem>
            </Menu>
            <Box onClick={openMenu}>
                <StyledBadge
                    overlap="circle"
                    anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "right"
                    }}
                    variant="dot"
                >
                    <Avatar
                        src={userImage}
                        style={{
                            backgroundColor: randomColor()
                        }}
                    >
                        {userName}
                    </Avatar>
                </StyledBadge>
            </Box>
        </Box>
    )
}
