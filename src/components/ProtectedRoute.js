import React from "react"
import { Route, Redirect } from "react-router-dom"

export default function ProtectedRoute({
    isAuth,
    component: Component,
    ...rest
}) {
    return (
        <Route
            {...rest}
            render={(props) => {
                if (isAuth) {
                    return <Component />
                }
                return <Redirect to={"/sign-in"} />
            }}
        />
    )
}
