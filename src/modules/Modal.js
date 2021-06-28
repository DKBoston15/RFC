import React from "react"
import ReactDom from "react-dom"
import { makeStyles } from "@material-ui/core/styles"
import IconButton from "@material-ui/core/IconButton"
import CloseIcon from "@material-ui/icons/Close"
import { Paper } from "@material-ui/core"

const useStyles = makeStyles({
    modalStyles: {
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        backgroundColor: "#fff",
        padding: "2em",
        zIndex: 1000
    },
    overlayStyles: {
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0,0,0,0.7)",
        zIndex: 1000
    },
    button: {
        position: "fixed",
        top: 0,
        right: 0,
        padding: ".3em"
    }
})

export default function Modal({ open, children, onClose }) {
    const classes = useStyles()
    if (!open) return null

    return ReactDom.createPortal(
        <>
            <div className={classes.overlayStyles} onClick={onClose} />
            <Paper elevation={3} className={classes.modalStyles}>
                <IconButton
                    onClick={onClose}
                    aria-label="close"
                    className={classes.button}
                    size="small"
                >
                    <CloseIcon fontSize="inherit" />
                </IconButton>
                {children}
            </Paper>
        </>,
        document.getElementById("portal")
    )
}
