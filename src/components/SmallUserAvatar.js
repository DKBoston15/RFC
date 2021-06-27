import React, { useEffect, useState } from "react"
import { Avatar, Badge } from "@material-ui/core"
import { withStyles, makeStyles } from "@material-ui/core/styles"
import { randomColor } from "../utils/utils"
import { getUserData } from "../utils/userUtils"

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

const useStyles = makeStyles({
    smallBadge: {
        width: "1em",
        height: "1em"
    }
})

export default function SmallUserAvatar({ author, authorID }) {
    const classes = useStyles()
    const [userName, setUserName] = useState("")
    const [userImage, setUserImage] = useState("")
    useEffect(() => {
        if (author) {
            const getName = async (name) => {
                const matches = name.match(/\b(\w)/g)
                setUserName(matches.join(""))
            }
            console.log(author)
            if (author[0].avatar_url) {
                setUserImage(author[0].avatar_url)
            }
            if (author[0].full_name) {
                getName(author[0].full_name)
            }
        }
    }, [author])

    useEffect(() => {
        const getName = async (name) => {
            const matches = name.match(/\b(\w)/g)
            setUserName(matches.join(""))
        }
        const getUser = async (authorID) => {
            console.log(authorID)
            let userData = await getUserData(authorID)
            console.log(userData)
            if (userData[0].avatar_url) {
                setUserImage(userData[0].avatar_url)
            }
            if (userData[0].full_name) {
                getName(userData[0].full_name)
            }
        }
        getUser(authorID)
    }, [authorID])

    return (
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
                className={classes.smallBadge}
                style={{
                    backgroundColor: randomColor()
                }}
            >
                {userName}
            </Avatar>
        </StyledBadge>
    )
}
