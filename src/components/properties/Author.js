import React, { useState, useEffect } from "react"
import { Box, Typography } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import { getUserData } from "../../utils/userUtils"

import SmallUserAvatar from "../SmallUserAvatar"
const useStyles = makeStyles({
    container: {
        width: "25em",
        display: "flex",
        alignItems: "center"
    },
    statusContainer: {
        marginLeft: "1em",
        display: "flex",
        alignItems: "center"
    },
    sectionHeader: {
        width: "4em"
    },
    authorName: {
        marginLeft: "1em"
    }
})

export default function Author({ rfcInfo }) {
    const classes = useStyles()
    const [author, setCurrentAuthor] = useState()

    useEffect(() => {
        const setAuthor = async () => {
            const data = await getUserData(rfcInfo.author)
            setCurrentAuthor(data)
        }
        setAuthor()
    }, [rfcInfo])

    return (
        <>
            {author && (
                <Box className={classes.container}>
                    <Typography
                        variant="caption"
                        className={classes.sectionHeader}
                    >
                        Author
                    </Typography>
                    <Box className={classes.statusContainer}>
                        <SmallUserAvatar author={author} />
                        <Typography
                            variant="caption"
                            className={classes.authorName}
                        >
                            {author[0].full_name}
                        </Typography>
                    </Box>
                </Box>
            )}
        </>
    )
}
