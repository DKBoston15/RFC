import React, { useState, useEffect } from "react"
import FlexSelect from "../components/FlexSelect"
import { makeStyles } from "@material-ui/core/styles"
import { getUsers } from "../utils/userUtils"

import DateSelect from "../components/DateSelect"

const useStyles = makeStyles({
    text: {
        color: "white !important"
    }
})

export default function FlexSelectTest() {
    const classes = useStyles()
    const [selectedStatus, setSelectedStatus] = useState(null)
    const [statusItems, setStatusItems] = useState([
        { key: "discovery", label: "Discovery", icon: "discovery" },
        { key: "todo", label: "Todo", icon: "todo" },
        { key: "in_progress", label: "In Progress", icon: "in_progress" },
        { key: "in_review", label: "In Review", icon: "in_review" },
        { key: "complete", label: "Complete", icon: "complete" },
        { key: "on_hold", label: "On Hold", icon: "on_hold" },
        { key: "archived", label: "Archived", icon: "archived" }
    ])

    const [selectedPriority, setSelectedPriority] = useState(null)
    const [priorityIcons, setPriorityIcons] = useState([
        { key: "low", label: "Low", icon: "low" },
        { key: "medium", label: "Medium", icon: "medium" },
        { key: "high", label: "High", icon: "high" },
        { key: "urgent", label: "Urgent", icon: "urgent" }
    ])

    const [createdItem, setCreatedItem] = useState()
    const [availableTags, setAvailableTags] = useState([
        {
            key: "dasd",
            label: "dasd"
        },
        {
            key: "bark",
            label: "bark"
        },
        {
            key: "New Tag!",
            label: "New Tag!"
        },
        {
            key: "tag4",
            label: "tag4"
        },
        {
            key: "rtg",
            label: "rtg"
        }
    ])

    const [assignees, setAssignees] = useState([])

    const [projects, setProjects] = useState([
        {
            key: "project_1",
            label: "Project 1",
            icon: "project"
        },
        {
            key: "project_2",
            label: "Project 2",
            icon: "project"
        },
        {
            key: "project_3",
            label: "Project 3",
            icon: "project"
        },
        {
            key: "project_4",
            label: "Project 4",
            icon: "project"
        },
        {
            key: "project_5",
            label: "Project 5",
            icon: "project"
        },
        {
            key: "project_6",
            label: "Project 6",
            icon: "project"
        }
    ])

    const [date, setDate] = useState(new Date())

    useEffect(() => {
        const workspace_id = "58471174-46de-4448-8f9c-ba6c777d39e1"

        const getData = async () => {
            const getAllUsers = await getUsers(workspace_id)
            let newUserArr = []
            for (let i = 0; i < getAllUsers.length; i++) {
                let newUser = getAllUsers[i]
                newUser["key"] = getAllUsers[i].id
                newUser["label"] = getAllUsers[i].full_name
                newUser["avatar"] = getAllUsers[i].avatar_url
                newUserArr.push(newUser)
            }
            setAssignees(newUserArr)
        }
        getData()
    }, [])

    return (
        <div>
            {/* Status Example */}
            <h4 className={classes.text}>
                {selectedStatus && selectedStatus.label}
            </h4>
            <FlexSelect
                placeholder="Status..."
                setSelectedItem={setSelectedStatus}
                items={statusItems}
            />
            {/* Priority Example */}
            <h4 className={classes.text}>
                {selectedPriority && selectedPriority.label}
            </h4>
            <FlexSelect
                placeholder="Status..."
                setSelectedItem={setSelectedPriority}
                items={priorityIcons}
            />
            {/* Tag Example */}
            <FlexSelect
                placeholder="Tags..."
                setSelectedItem={setAvailableTags}
                items={availableTags}
                allowCreation={true}
                setCreatedItem={setCreatedItem}
            />
            {/* Assignee Example */}
            {assignees && assignees.label}
            <FlexSelect
                placeholder="Assignee..."
                setSelectedItem={setAssignees}
                items={assignees}
                avatar={true}
            />
            {/* Project Example */}
            {projects && projects.label}
            <FlexSelect
                placeholder="Project..."
                setSelectedItem={setProjects}
                items={projects}
            />
            {/* Due Date Example */}
            {date && JSON.stringify(date)}
            <DateSelect date={date} setDate={setDate} />
        </div>
    )
}
