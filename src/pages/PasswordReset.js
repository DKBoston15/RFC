import React, { useEffect } from "react"
import { useHistory } from "react-router-dom"
import queryString from "query-string"

export default function PasswordReset() {
    let history = useHistory()
    useEffect(() => {
        const parsed = queryString.parse(window.location.search)
        if (parsed.type === "recovery") {
            return
        }
        history.push("/sign-in")
    })

    return (
        <div>
            <h1>Reset Password Here!</h1>
        </div>
    )
}
