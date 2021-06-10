import React, { useState } from "react"
import { useAuth } from "../config/auth"

import Button from "@material-ui/core/Button"
import TextField from "@material-ui/core/TextField"

const SignIn = () => {
    const { user, signIn, signOut, signUpGoogle } = useAuth()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()

    const onEmailChange = (e) => {
        setEmail(e.target.value)
    }
    const onPasswordChange = (e) => {
        setPassword(e.target.value)
    }
    const login = () => {
        console.log(user)
        try {
            signIn({ email: email, password: password })
            console.log(user)
        } catch (error) {
            console.log(error)
        }
    }
    const loginGoogle = () => {
        try {
            signUpGoogle()
        } catch (error) {
            console.log(error)
        }
    }

    const logout = () => {
        signOut()
    }

    return (
        <div>
            <TextField
                id="standard-basic"
                label="Email"
                onChange={onEmailChange}
            />
            <TextField
                id="filled-basic"
                label="Password"
                onChange={onPasswordChange}
            />
            <Button
                variant="contained"
                color="primary"
                onClick={() => {
                    login()
                }}
            >
                Sign In
            </Button>
            <Button
                variant="contained"
                color="primary"
                onClick={() => {
                    loginGoogle()
                }}
            >
                Sign In With Google
            </Button>
            <Button
                variant="contained"
                color="primary"
                onClick={() => {
                    logout()
                }}
            >
                Logout
            </Button>
        </div>
    )
}

export default SignIn
