import React, { useState, useRef } from "react"
import Button from "@material-ui/core/Button"
import Menu from "@material-ui/core/Menu"
import Box from "@material-ui/core/Box"
import { makeStyles } from "@material-ui/core/styles"
import { MuiPickersUtilsProvider } from "@material-ui/pickers"
import { DatePicker } from "@material-ui/pickers"
import DateFnsUtils from "@date-io/date-fns"
import { createMuiTheme } from "@material-ui/core"
import { ThemeProvider } from "@material-ui/styles"
import lightBlue from "@material-ui/core/colors/lightBlue"

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
    }
})

const materialTheme = createMuiTheme({
    overrides: {
        MuiPickersToolbar: {
            toolbar: {
                backgroundColor: "#56657F"
            }
        },
        MuiPickersCalendarHeader: {
            switchHeader: {
                // backgroundColor: lightBlue.A200,
                // color: "white",
            }
        },
        MuiPickersDay: {
            day: {
                color: "#7f8c8d"
            },
            daySelected: {
                backgroundColor: "#56657F",
                "&:hover": {
                    backgroundColor: "#56657F"
                }
            },
            dayDisabled: {
                color: lightBlue["100"]
            },
            current: {
                color: "black"
            }
        },
        MuiPickersModal: {
            dialogAction: {
                color: "#56657F"
            }
        }
    }
})

export default function DateSelect({ date, setDate, clickableComponent }) {
    const classes = useStyles()

    const [anchorEl, setAnchorEl] = useState(null)

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    const onChange = (date) => {
        handleClose()
        console.log(date)
        setDate(date)
    }

    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <ThemeProvider theme={materialTheme}>
                {clickableComponent && (
                    <Box
                        aria-controls="simple-menu"
                        aria-haspopup="true"
                        onClick={handleClick}
                    >
                        {clickableComponent}
                    </Box>
                )}
                {!clickableComponent && (
                    <Box
                        aria-controls="simple-menu"
                        aria-haspopup="true"
                        onClick={handleClick}
                        className={classes.button}
                    >
                        + Add Due Date
                    </Box>
                )}

                <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    <Box className={classes.menuContainer}>
                        <DatePicker
                            autoOk
                            disableToolbar={true}
                            variant="static"
                            openTo="date"
                            value={date}
                            onChange={onChange}
                        />
                    </Box>
                </Menu>
            </ThemeProvider>
        </MuiPickersUtilsProvider>
    )
}
