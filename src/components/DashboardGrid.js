import React, { useState, useEffect } from "react"
import { makeStyles } from "@material-ui/core/styles"
import { Box } from "@material-ui/core"
import { Link } from "react-router-dom"
import { AgGridColumn, AgGridReact } from "ag-grid-react"
import { getRfcs } from "../utils/rfcUtils"
import WbIridescentIcon from "@material-ui/icons/WbIridescent"
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline"
import ScheduleIcon from "@material-ui/icons/Schedule"
import UpdateIcon from "@material-ui/icons/Update"
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline"
import HighlightOffIcon from "@material-ui/icons/HighlightOff"
import ArchiveOutlinedIcon from "@material-ui/icons/ArchiveOutlined"

import SmallUserAvatar from "../components/SmallUserAvatar"

import "ag-grid-community/dist/styles/ag-grid.css"
import "ag-grid-community/dist/styles/ag-theme-material.css"

const useStyles = makeStyles({
    text: {
        color: "white !important"
    },
    discoveryIcon: {
        marginTop: "0.2em",
        fontSize: "2.5em",
        color: "#219653"
    },
    todoIcon: {
        marginTop: "0.2em",
        fontSize: "2.5em",
        color: "#2196F3"
    },
    inProgressIcon: {
        marginTop: "0.2em",
        fontSize: "2.5em",
        color: "#FFC107"
    },
    inReviewIcon: {
        marginTop: "0.2em",
        fontSize: "2.5em",
        color: "#9B51E0"
    },
    completeIcon: {
        marginTop: "0.2em",
        fontSize: "2.5em",
        color: "#00C853"
    },
    onHoldIcon: {
        marginTop: "0.2em",
        fontSize: "2.5em",
        color: "#C62828"
    },
    archivedIcon: {
        marginTop: "0.2em",
        fontSize: "2.5em",
        color: "#9E9E9E"
    },
    link: {
        textDecoration: "none",
        color: "black"
    }
})

export default function FlexSelectTest() {
    const classes = useStyles()

    const currentStatus = (key) => {
        switch (key) {
            case "discovery":
                return <WbIridescentIcon className={classes.discoveryIcon} />
            case "todo":
                return <PlayCircleOutlineIcon className={classes.todoIcon} />
            case "in-progress":
                return <ScheduleIcon className={classes.inProgressIcon} />
            case "in-review":
                return <UpdateIcon className={classes.inReviewIcon} />
            case "complete":
                return (
                    <CheckCircleOutlineIcon className={classes.completeIcon} />
                )
            case "on_hold":
                return <HighlightOffIcon className={classes.onHoldIcon} />
            case "archived":
                return <ArchiveOutlinedIcon className={classes.archivedIcon} />

            default:
                break
        }
    }

    const columnDefs = [
        {
            headerName: "Status",
            field: "status",
            cellRendererFramework: (params) =>
                currentStatus(params.data.status.toLowerCase())
        },
        {
            headerName: "Document Name",
            field: "name",
            filter: true,
            sortable: true.valueOf,
            width: 796,
            cellRendererFramework: (params) => (
                <Link
                    className={classes.link}
                    to={`/dashboard/${params.data.id}`}
                >
                    {params.data.name}
                </Link>
            )
        },
        { headerName: "", field: "due_date" },
        {
            headerName: "",
            field: "author",
            cellRendererFramework: (params) => (
                <SmallUserAvatar authorID={params.data.author} />
            )
        }
    ]
    const [rowData, setRowData] = useState([])

    useEffect(() => {
        const getData = async () => {
            const data = await getRfcs("58471174-46de-4448-8f9c-ba6c777d39e1")
            console.log(data)
            setRowData(data)
        }
        getData()
    }, [])

    return (
        <>
            <link
                href="https://fonts.googleapis.com/css?family=Roboto"
                rel="stylesheet"
            />
            <div
                className="ag-theme-material"
                style={{ height: "30em", width: "100%" }}
            >
                <AgGridReact rowData={rowData} columnDefs={columnDefs}>
                    <AgGridColumn field="status"></AgGridColumn>
                    <AgGridColumn field="name"></AgGridColumn>
                    <AgGridColumn field="due_date"></AgGridColumn>
                    <AgGridColumn field="author"></AgGridColumn>
                </AgGridReact>
            </div>
        </>
    )
}
