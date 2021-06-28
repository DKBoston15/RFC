import React, { useState } from "react"
import { Drawer, Box, Button, Typography } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import CompanyAvatar from "./CompanyAvatar"
import UserAvatar from "./UserAvatar"
import AddFolder from "./AddFolder"
import FavoritesList from "./FavoritesList"
import DocumentList from "./DocumentList"
import PostAdd from "@material-ui/icons/PostAdd"
import Search from "@material-ui/icons/Search"
import Add from "@material-ui/icons/Add"
import HelpOutline from "@material-ui/icons/HelpOutline"
import InviteUserModal from "../components/InviteUserModal"

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
    },
    newPostButton: {
        background: "#7B61FF",
        color: "white",
        textAlign: "left",
        display: "flex",
        justifyContent: "flex-start",
        paddingLeft: "2em",
        height: "3em",
        textTransform: "none"
    },
    searchButton: {
        color: "white",
        textAlign: "left",
        display: "flex",
        justifyContent: "flex-start",
        paddingLeft: "2em",
        height: "3em",
        textTransform: "none"
    },
    subHeader: {
        color: "#9E9E9E",
        textAlign: "left"
    },
    modalStyles: {
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        backgroundColor: "#fff",
        padding: "50px",
        zIndex: 1000
    }
})

export default function Sidebar({ user, signOut }) {
    const classes = useStyles()
    const [isOpen, setIsOpen] = useState(false)

    return (
        <>
            <Drawer
                variant="permanent"
                anchor="left"
                className={classes.drawer}
                classes={{
                    paper: classes.drawerPaper
                }}
            >
                <Box display="flex" justifyContent="space-between">
                    <CompanyAvatar user={user} signOut={signOut} />
                    <UserAvatar user={user} signOut={signOut} />
                </Box>
                <Box
                    display="flex"
                    flexDirection="column"
                    justifyContent="space-between"
                    height="100%"
                >
                    <Box>
                        <Box
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                            flexDirection="column"
                            marginTop="2em"
                        >
                            <Button
                                className={classes.newPostButton}
                                startIcon={<PostAdd />}
                                fullWidth
                            >
                                <Typography variant="body2">
                                    New Post
                                </Typography>
                            </Button>
                            <Button
                                startIcon={<Search />}
                                className={classes.searchButton}
                                fullWidth
                            >
                                <Typography variant="body2">Search</Typography>
                            </Button>
                        </Box>
                        <Box
                            display="flex"
                            justifyContent="space-between"
                            alignItems="flex-start"
                            flexDirection="column"
                            marginTop="2em"
                        >
                            <Box
                                display="flex"
                                justifyContent="flex-start"
                                alignItems="center"
                                marginTop="2em"
                            >
                                <Typography
                                    className={classes.subHeader}
                                    variant="body2"
                                >
                                    Favorites
                                </Typography>
                            </Box>
                            <FavoritesList user={user} />
                        </Box>
                        <Box
                            display="flex"
                            justifyContent="space-between"
                            alignItems="flex-start"
                            flexDirection="column"
                            marginTop="-1em"
                        >
                            <Box
                                display="flex"
                                justifyContent="space-between"
                                alignItems="center"
                                marginTop="2em"
                                width="100%"
                            >
                                <Typography
                                    className={classes.subHeader}
                                    variant="body2"
                                >
                                    Documents
                                </Typography>
                                <AddFolder />
                            </Box>
                            <DocumentList user={user} />
                        </Box>
                    </Box>
                    <Box>
                        <Button
                            startIcon={<Add />}
                            className={classes.searchButton}
                            fullWidth
                            onClick={() => setIsOpen(true)}
                        >
                            Invite People
                        </Button>
                        <Button
                            startIcon={<HelpOutline />}
                            className={classes.searchButton}
                            fullWidth
                        >
                            Help & Feedback
                        </Button>
                    </Box>
                </Box>
            </Drawer>
            <InviteUserModal isOpen={isOpen} setIsOpen={setIsOpen} />
        </>
    )
}
