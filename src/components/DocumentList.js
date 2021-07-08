import React, { useEffect, useState } from "react"
import { Box, Button, Typography } from "@material-ui/core"
import { Link } from "react-router-dom"
import { makeStyles } from "@material-ui/core/styles"
import { getDocuments } from "../utils/rfcUtils"
import TreeView from "@material-ui/lab/TreeView"
import TreeItem from "@material-ui/lab/TreeItem"
import ExpandMoreIcon from "@material-ui/icons/ExpandMore"
import ChevronRightIcon from "@material-ui/icons/ChevronRight"
import "./tree_styles/styles.scss"

const useStyles = makeStyles({
    root: {
        "& .MuiTreeItem-iconContainer svg": {
            fill: "white"
        }
    },
    searchButton: {
        color: "white",
        textAlign: "left",
        display: "flex",
        justifyContent: "flex-start",
        paddingLeft: "2px",
        height: "3em",
        textTransform: "none"
    },
    title: {
        fontWeight: 600
    },
    subTreeItem: {
        marginTop: "1em"
    }
})

export default function DocuemntList({ user }) {
    const classes = useStyles()
    const [rfcArray, setRfcArray] = useState()
    useEffect(() => {
        const getDocumentRfcs = async () => {
            const documentRfcs = await getDocuments(user.id)
            console.log(documentRfcs)
            setRfcArray(documentRfcs)
        }
        getDocumentRfcs()
    }, [user.id])

    return (
        <>
            <TreeView
                className={classes.root}
                defaultCollapseIcon={<ExpandMoreIcon />}
                defaultExpandIcon={<ChevronRightIcon />}
            >
                {rfcArray &&
                    rfcArray.map((rfc) => (
                        <TreeItem
                            nodeId={`${Math.random()}`}
                            key={rfc.id}
                            label={rfc.name}
                        >
                            {rfc.rfcs.map((item) => (
                                <Link to={`/dashboard/${item.id}`}>
                                    <TreeItem
                                        nodeId={item.id}
                                        label={item.name}
                                        key={item.id}
                                    />
                                </Link>
                            ))}
                        </TreeItem>
                    ))}
            </TreeView>
        </>
    )
}
