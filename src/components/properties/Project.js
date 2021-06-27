import React, { useState, useEffect } from "react"
import { Box, Typography } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import PermMediaIcon from "@material-ui/icons/PermMedia"

import FlexSelect from "../FlexSelect"

import {
    getProjects,
    createNewProject,
    getProject
} from "../../utils/projectUtils"
import { updateRfcProject } from "../../utils/rfcUtils"

const useStyles = makeStyles({
    container: {
        width: "25em",
        display: "flex",
        alignItems: "center"
    },
    menuText: {
        color: "#42474D",
        marginLeft: ".5em"
    },
    icon: {
        color: "#56657F"
    },
    selectedContainer: {
        display: "flex",
        alignItems: "center"
    },
    statusContainer: {
        marginLeft: "1em",
        display: "flex",
        alignItems: "center"
    },
    sectionHeader: {
        width: "5em",
        marginRight: "1em"
    },
    staticContainer: {
        display: "flex",
        alignItems: "center"
    },
    icon: {
        fontSize: "16px",
        marginRight: ".5em"
    }
})

function compare(a, b) {
    const tag1 = a.label.toUpperCase()
    const tag2 = b.label.toUpperCase()

    let comparison = 0
    if (tag1 > tag2) {
        comparison = 1
    } else if (tag1 < tag2) {
        comparison = -1
    }
    return comparison
}

export default function Project({ rfcInfo, workspaceID }) {
    const classes = useStyles()
    const [selectedProject, setSelectedProject] = useState()
    const [projects, setProjects] = useState([])
    const [staticProject, setStaticProject] = useState("+ New Project")
    const [createdItem, setCreatedItem] = useState(null)

    useEffect(() => {
        const getData = async () => {
            // Get Current Project
            let currentProject = await getProject(rfcInfo.project_id)
            console.log(currentProject)
            if (currentProject[0]) {
                setStaticProject(currentProject[0].name)
            }

            // Get Available Projects
            let availableProjects = await getProjects(workspaceID)
            for (let i = 0; i < availableProjects.length; i++) {
                availableProjects[i]["label"] = availableProjects[i]["name"]
            }
            if (currentProject[0]) {
                let filteredProjects = availableProjects.filter(
                    (item) => item.id !== currentProject[0].id
                )
                setProjects(filteredProjects.sort(compare))
            }
            setProjects(availableProjects.sort(compare))
        }
        getData()
    }, [])

    useEffect(() => {
        if (selectedProject) {
            setStaticProject(selectedProject.name)
            const updateRfc = async () => {
                await updateRfcProject(rfcInfo.id, selectedProject.id)
            }
            const updateUnused = async () => {
                let availableProjects = await getProjects(workspaceID)
                for (let i = 0; i < availableProjects.length; i++) {
                    availableProjects[i]["label"] = availableProjects[i]["name"]
                }
                let filteredProjects = availableProjects.filter(
                    (item) => item.id !== selectedProject.id
                )
                setProjects(filteredProjects.sort(compare))
            }
            updateRfc()
            updateUnused()
        }
    }, [selectedProject])

    const addNewProject = async () => {
        const newProject = await createNewProject(
            createdItem.label,
            workspaceID
        )
        setSelectedProject(newProject[0])
    }

    useEffect(() => {
        if (createdItem) {
            addNewProject()
        }
    }, [createdItem])

    return (
        <Box className={classes.container}>
            <Typography variant="caption" className={classes.sectionHeader}>
                Project
            </Typography>
            <FlexSelect
                placeholder="Project..."
                setSelectedItem={setSelectedProject}
                items={projects}
                clickableComponent={
                    <Box className={classes.staticContainer}>
                        <PermMediaIcon className={classes.icon} />
                        {staticProject}
                    </Box>
                }
                allowCreation={true}
                setCreatedItem={setCreatedItem}
            />
        </Box>
    )
}
