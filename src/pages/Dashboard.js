import React, { useState, useEffect } from "react"
import { useAuth } from "../config/auth"
import { Box, Grid } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import Snackbar from "@material-ui/core/Snackbar"
import Alert from "@material-ui/lab/Alert"
import queryString from "query-string"
import { useLocation, withRouter } from "react-router-dom"
import Sidebar from "../components/Sidebar"
import Tiptap from "../components/Tiptap"
import TipTapContainer from "../components/TipTapContainer"
import PropertiesPanel from "../components/PropertiesPanel"
import { Helmet } from "react-helmet"
import { getRfc } from "../utils/rfcUtils"
import "./dashboard_styles.scss"

const useStyles = makeStyles({
    // buttonOne: {
    //     color: "white",
    //     minHeight: "48px",
    //     backgroundColor: "rgba(49, 60, 78, 1)",
    //     fontWeight: 600,
    //     width: "22rem",
    //     marginTop: "2em",
    //     "&:hover": {
    //         backgroundColor: "rgba(49, 60, 78, 0.5)"
    //     }
    // },
    // buttonTwo: {
    //     color: "white",
    //     minHeight: "48px",
    //     backgroundColor: "rgba(138, 151, 177, 1)",
    //     fontWeight: 600,
    //     width: "22rem",
    //     marginTop: "1.5em",
    //     "&:hover": {
    //         backgroundColor: "rgba(138, 151, 177, 0.5)"
    //     }
    // },
    // tiptapContainer: {
    //     marginLeft: "20em"
    // }
})

const Dashboard = (props) => {
    const classes = useStyles()
    const { user, signOut } = useAuth()
    const [openRecoveryMsg, setOpenRecoveryMsg] = useState(false)
    const [rfcInfo, setRfcInfo] = useState()
    const { search } = useLocation()
    useEffect(() => {
        const values = queryString.parse(search)
        if (values.reset) {
            setOpenRecoveryMsg(true)
        }
        const getRFCData = async () => {
            const data = await getRfc(props.match.params.id)
            setRfcInfo(data[0])
        }
        getRFCData()
    }, [props, search])

    return (
        <div class="container">
            <div class="Sidebar">
                <Sidebar user={user} signOut={signOut} />
            </div>
            <div class="Content">
                <TipTapContainer />
            </div>
            <div class="Properties">
                <PropertiesPanel rfcInfo={rfcInfo} />
            </div>
        </div>
        // <>
        //     <Helmet>
        //         <title>RFC | Dashboard</title>
        //     </Helmet>
        //     <Box className={classes.root}>
        //         <Grid container spacing={10}>
        //             <Grid item xs={2}>
        //                 <Sidebar user={user} signOut={signOut} />
        //             </Grid>
        //             <Grid item xs={7}>
        //                 {rfcInfo && (
        //                     <>
        //                         <h1>{rfcInfo.name}</h1>
        //                         <Tiptap rfcID={rfcInfo.id} />
        //                     </>
        //                 )}
        //             </Grid>
        //             <Grid item xs={2}>
        //                 <PropertiesPanel />
        //             </Grid>
        //         </Grid>
        //     </Box>

        //     <Snackbar
        //         open={openRecoveryMsg}
        //         autoHideDuration={5000}
        //         onClose={() => setOpenRecoveryMsg(false)}
        //     >
        //         <Alert severity="success" variant="filled">
        //             Password Successfully Reset
        //         </Alert>
        //     </Snackbar>
        // </Box>
    )
}

export default withRouter(Dashboard)
