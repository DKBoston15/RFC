import React from "react"
import { Box, Divider, Typography } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import { Link } from "react-router-dom"
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos"

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
        width: "90%",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: ".5em"
    },
    backIcon: {
        cursor: "pointer",
        textDecoration: "none",
        color: "black",
        paddingTop: ".2em"
    }
})

export default function TipTapContainer() {
    const classes = useStyles()
    return (
        <Box className={classes.container}>
            <Typography className={classes.linkHeader}>
                <Link to="/dashboard">
                    <ArrowBackIosIcon
                        className={classes.backIcon}
                        fontSize="small"
                    />
                </Link>
                Example RFC
                <div />
            </Typography>
            <Divider className={classes.divider} />
        </Box>
    )
}
