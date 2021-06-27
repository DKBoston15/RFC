import React, { useState, useRef, useEffect } from "react"
import Button from "@material-ui/core/Button"
import Menu from "@material-ui/core/Menu"
import Box from "@material-ui/core/Box"
import InputBase from "@material-ui/core/InputBase"
import { makeStyles } from "@material-ui/core/styles"
import snakeCase from "lodash/snakeCase"

//Icons
import WbIridescentIcon from "@material-ui/icons/WbIridescent"
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline"
import ScheduleIcon from "@material-ui/icons/Schedule"
import UpdateIcon from "@material-ui/icons/Update"
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline"
import HighlightOffIcon from "@material-ui/icons/HighlightOff"
import ArchiveOutlinedIcon from "@material-ui/icons/ArchiveOutlined"
import SignalCellularNullIcon from "@material-ui/icons/SignalCellularNull"
import SignalCellular3BarIcon from "@material-ui/icons/SignalCellular3Bar"
import SignalCellular4BarIcon from "@material-ui/icons/SignalCellular4Bar"
import SignalCellularConnectedNoInternet4BarIcon from "@material-ui/icons/SignalCellularConnectedNoInternet4Bar"
import AccountTreeIcon from "@material-ui/icons/AccountTree"

import SmallUserAvatar from "./SmallUserAvatar"

const iconSelector = {
    discovery: <WbIridescentIcon style={{ color: "#219653" }} />,
    todo: <PlayCircleOutlineIcon style={{ color: "#2196F3" }} />,
    in_progress: <ScheduleIcon style={{ color: "#FFC107" }} />,
    in_review: <UpdateIcon style={{ color: "#9B51E0" }} />,
    complete: <CheckCircleOutlineIcon style={{ color: "#00C853" }} />,
    on_hold: <HighlightOffIcon style={{ color: "#C62828" }} />,
    archived: <ArchiveOutlinedIcon style={{ color: "#9E9E9E" }} />,
    low: <SignalCellularNullIcon style={{ color: "#56657F" }} />,
    medium: <SignalCellular3BarIcon style={{ color: "#56657F" }} />,
    high: <SignalCellular4BarIcon style={{ color: "#56657F" }} />,
    urgent: (
        <SignalCellularConnectedNoInternet4BarIcon
            style={{ color: "#56657F" }}
        />
    ),
    project: <AccountTreeIcon style={{ color: "#56657F" }} />
}

const useStyles = makeStyles({
    button: {
        cursor: "pointer"
    },
    menuContainer: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minWidth: "7em",
        maxHeight: "20em",
        overflow: "scroll"
    },
    input: {
        width: "70%"
    },
    divider: {
        borderTop: "1px solid #3F3F3F",
        width: "100%"
    },
    item: {
        display: "flex",
        width: "100%",
        padding: ".2em",
        alignItems: "center",
        "&:hover": {
            background: "lightgray",
            cursor: "pointer"
        }
    },
    icon: {
        display: "flex",
        alignItems: "center",
        marginLeft: "15%",
        marginRight: "1em"
    },
    createNewItem: {
        display: "flex",
        justifyContent: "center",
        padding: ".2em",
        paddingRight: "1.4em",
        textAlign: "left",
        "&:hover": {
            background: "lightgray",
            cursor: "pointer"
        }
    },
    avatar: {
        marginLeft: "-.6em",
        paddingRight: ".5em"
    }
})

export default function FlexSelect({
    placeholder,
    items,
    setSelectedItem,
    allowCreation,
    setCreatedItem,
    avatar,
    clickableComponent
}) {
    const classes = useStyles()
    const inputRefs = useRef(null)

    const [anchorEl, setAnchorEl] = useState(null)

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
        setTimeout(() => {
            inputRefs.current.focus()
        }, 10)
    }

    const handleClose = () => {
        setAnchorEl(null)
        setSearchValue("")
    }

    const [filteredItems, setFilteredItems] = useState(items)
    const [searchValue, setSearchValue] = useState(null)

    const onChange = (event) => {
        setSearchValue(event.target.value)
        if (event.target.value === "") {
            setFilteredItems(items)
            return
        }
        console.log(event.target.value)
        let filteredData = items.filter((item) =>
            item.label.toLowerCase().includes(event.target.value.toLowerCase())
        )
        setFilteredItems(filteredData)
    }

    const onSelect = (label) => {
        handleClose()
        let filteredItem = items.filter((item) => item.label === label)
        setSelectedItem(filteredItem[0])
    }

    const createNewItem = (submittedSearchValue) => {
        handleClose()
        setCreatedItem({
            key: snakeCase(submittedSearchValue),
            label: submittedSearchValue
        })
    }

    useEffect(() => {
        setFilteredItems(items)
    }, [items])

    return (
        <Box>
            <Box
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={handleClick}
                className={classes.button}
            >
                {clickableComponent}
            </Box>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <Box className={classes.menuContainer}>
                    <InputBase
                        inputRef={inputRefs}
                        placeholder={placeholder}
                        onChange={(event) => {
                            onChange(event)
                        }}
                        value={searchValue}
                        autoFocus={true}
                        className={classes.input}
                    />
                    <hr className={classes.divider} />
                </Box>
                {filteredItems.length > 0 && (
                    <div>
                        {filteredItems.map((item, index, arrayRef) => (
                            <div>
                                {arrayRef.length > 0 && (
                                    <Box
                                        className={classes.item}
                                        onClick={() => onSelect(item.label)}
                                    >
                                        <Box className={classes.icon}>
                                            {iconSelector[item.icon]}
                                        </Box>
                                        {avatar && (
                                            <Box className={classes.avatar}>
                                                <SmallUserAvatar
                                                    author={[item]}
                                                />
                                            </Box>
                                        )}
                                        {item.label || item.full_name}
                                    </Box>
                                )}
                            </div>
                        ))}
                    </div>
                )}
                {filteredItems.length === 0 && allowCreation && (
                    <Box
                        className={classes.createNewItem}
                        onClick={() => createNewItem(searchValue)}
                    >
                        {searchValue && <span>{`Create ${searchValue}`}</span>}
                    </Box>
                )}
            </Menu>
        </Box>
    )
}
