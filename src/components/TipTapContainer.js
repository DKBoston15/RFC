import React from "react"
import { Box, Divider, Typography } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import LinkIcon from "@material-ui/icons/Link"

const useStyles = makeStyles({
    container: {
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },
    divider: {
        marginTop: "1em",
        width: "90%"
    },
    linkHeader: {
        display: "flex",
        alignItems: "center",
        marginTop: ".5em"
    }
})

export default function TipTapContainer() {
    const classes = useStyles()
    return (
        <Box className={classes.container}>
            <Typography className={classes.linkHeader}>
                Example RFC
                <LinkIcon />
            </Typography>
            <Divider className={classes.divider} />
        </Box>
    )
}
