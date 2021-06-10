import React from "react"
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"
import { useAuth } from "./config/auth"

import ProtectedRoute from "./components/ProtectedRoute"

//Pages
import SignUp from "./pages/SignUp"
import SignIn from "./pages/SignIn"
import Users from "./pages/Users"

export default function App() {
    const { user } = useAuth()
    return (
        <Router>
            <div>
                <nav>
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
                            <Link to="/users">Users</Link>
                        </li>
                    </ul>
                </nav>
                <Switch>
                    <ProtectedRoute
                        path="/users"
                        component={Users}
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
                </Switch>
            </div>
        </Router>
    )
}

function Home() {
    return <h2>Home</h2>
}
