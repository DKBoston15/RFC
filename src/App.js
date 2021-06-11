import React, { useState, useEffect } from "react"
import {
    BrowserRouter as Router,
    Switch as RouterSwitch,
    Route,
    Link
} from "react-router-dom"
import { useAuth } from "./config/auth"

import Switch from "@material-ui/core/Switch"

import ProtectedRoute from "./components/ProtectedRoute"

//Pages
import Home from "./pages/Home"
import SignUp from "./pages/SignUp"
import SignIn from "./pages/SignIn"
import Dashboard from "./pages/Dashboard"
import PasswordReset from "./pages/PasswordReset"

import CssBaseline from "@material-ui/core/CssBaseline"
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles"
import Button from "@material-ui/core/Button"

//On password reset page, redirect back to sign in if not auth is present
//Add password reset form

export default function App() {
    const { user } = useAuth()
    const themeLight = createMuiTheme({
        palette: {
            background: {
                default: "#fff"
            }
        }
    })

    const themeDark = createMuiTheme({
        palette: {
            background: {
                default: "#202124"
            },
            text: {
                primary: "#ffffff"
            }
        }
    })
    const [light, setLight] = useState(false)
    return (
        <MuiThemeProvider theme={light ? themeLight : themeDark}>
            <CssBaseline />
            <Button onClick={() => setLight((prev) => !prev)}>
                Toggle Theme
            </Button>

            <Router>
                <div>
                    {/* <nav>
                        <ul>
                            <li>
                                <Link to="/">Home</Link>
                            </li>
                            <li>
                                <Link to="/sign-up">Sign Up</Link>
                            </li>
                            <li>
                                <Link to="/sign-in">Sign In</Link>
                            </li>
                            <li>
                                <Link to="/dashboard">Dashboard</Link>
                            </li>
                        </ul>
                    </nav> */}
                    <RouterSwitch>
                        <Route path="/reset-password">
                            <PasswordReset />
                        </Route>
                        <ProtectedRoute
                            path="/dashboard"
                            component={Dashboard}
                            isAuth={user}
                        />
                        <Route path="/sign-up">
                            <SignUp />
                        </Route>
                        <Route path="/sign-in">
                            <SignIn />
                        </Route>
                        <Route path="/">
                            <Home />
                        </Route>
                    </RouterSwitch>
                </div>
            </Router>
        </MuiThemeProvider>
    )
}
