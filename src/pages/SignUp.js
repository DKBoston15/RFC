import React, { useState } from "react"
import { useAuth } from "../config/auth"

import Button from "@material-ui/core/Button"
import TextField from "@material-ui/core/TextField"

const SignUp = () => {
    const { signUp, signUpGoogle } = useAuth()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()

    const onEmailChange = (e) => {
        setEmail(e.target.value)
    }
    const onPasswordChange = (e) => {
        setPassword(e.target.value)
    }
    const login = () => {
        try {
            signUp({ email: email, password: password })
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
                Sign Up
            </Button>
            <Button
                variant="contained"
                color="primary"
                onClick={() => {
                    loginGoogle()
                }}
            >
                Sign Up With Google
            </Button>
        </div>
    )
}

export default SignUp
