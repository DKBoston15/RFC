import React, { useEffect, useState } from "react"
import { Box, Button, Typography } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import Star from "@material-ui/icons/Star"
import { getFavoriteRfcs } from "../utils/rfcUtils"

const useStyles = makeStyles({
    searchButton: {
        color: "white",
        textAlign: "left",
        display: "flex",
        justifyContent: "flex-start",
        paddingLeft: "2px",
        height: "3em",
        textTransform: "none"
    },
    title: {
        fontWeight: 600
    }
})

export default function FavoritesList({ user }) {
    const classes = useStyles()
    const [rfcArray, setRfcArray] = useState([""])
    useEffect(() => {
        const getFavoriteRfcsFunc = async () => {
            const favoriteRfcsArray = await getFavoriteRfcs(user.id)
            setRfcArray(favoriteRfcsArray)
        }
        getFavoriteRfcsFunc()
    }, [user.id])

    return (
        <>
            {rfcArray.map((rfc) => (
                <Box key={rfc.id}>
                    <Button
                        startIcon={
                            <Star
                                style={{ color: "#FFC107", fontSize: "16px" }}
                            />
                        }
                        className={classes.searchButton}
                        fullWidth
                    >
                        <Typography
                            className={classes.title}
                            variant="subtitle2"
                        >
                            {rfc.name}
                        </Typography>
                    </Button>
                </Box>
            ))}
        </>
    )
}
