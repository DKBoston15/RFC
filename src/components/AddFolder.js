import React, { useState } from "react"
import { Box, Menu, MenuItem } from "@material-ui/core"
import Add from "@material-ui/icons/Add"
import { makeStyles } from "@material-ui/core/styles"
const useStyles = makeStyles({
    addIcon: {
        color: "#9E9E9E",
        fontSize: "16px !important",
        cursor: "pointer"
    },
    menuItem: {
        color: "black"
    }
})

export default function AddFolder({ user }) {
    const [anchorEl, setAnchorEl] = useState(null)
    const classes = useStyles()

    const handleMenuClose = () => {
        setAnchorEl(null)
    }

    const openMenu = (event) => {
        setAnchorEl(event.currentTarget)
    }

    const createNewFolder = {}

    return (
        <Box display="flex" justifyContent="space-between">
            <Menu
                id="company-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
            >
                <MenuItem className={classes.menuItem}>
                    Create new document
                </MenuItem>
                <MenuItem
                    className={classes.menuItem}
                    onClick={createNewFolder}
                >
                    Create new folder
                </MenuItem>
            </Menu>
            <Add onClick={openMenu} className={classes.addIcon} />
        </Box>
    )
}
