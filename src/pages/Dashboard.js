import React, { useState, useEffect } from "react"
import { useAuth } from "../config/auth"
import { Box, Grid, Button } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import Snackbar from "@material-ui/core/Snackbar"
import Alert from "@material-ui/lab/Alert"
import queryString from "query-string"
import { useLocation, withRouter, Link } from "react-router-dom"
import Sidebar from "../components/Sidebar"
import Tiptap from "../components/Tiptap"
import TipTapContainer from "../components/TipTapContainer"
import PropertiesPanel from "../components/PropertiesPanel"
import { Helmet } from "react-helmet"
import "./dashboard_styles.scss"
import { getRfc, getRfcs } from "../utils/rfcUtils"
import { getWorkspaceID, getWorkspaceTags } from "../utils/workspaceUtils"
import DashboardGrid from "../components/DashboardGrid"

const useStyles = makeStyles({})

const Dashboard = ({ match }) => {
    const classes = useStyles()
    const { user, signOut } = useAuth()
    const [openRecoveryMsg, setOpenRecoveryMsg] = useState(false)
    const [rfcInfo, setRfcInfo] = useState()
    const [rfcList, setRfcList] = useState()
    const [workspaceID, setWorkspaceID] = useState()
    const [workspaceTags, setWorkspaceTags] = useState()
    const { search } = useLocation()
    useEffect(() => {
        const values = queryString.parse(search)
        if (values.reset) {
            setOpenRecoveryMsg(true)
        }
        const getRFCData = async () => {
            const data = await getRfc(match.params.id)
            setRfcInfo(data[0])

            const retrievedWorkspaceID = await getWorkspaceID(user.id)
            setWorkspaceID(retrievedWorkspaceID)
            const rfcs = await getRfcs(retrievedWorkspaceID)
            setRfcList(rfcs)
            const tags = await getWorkspaceTags(retrievedWorkspaceID)
            setWorkspaceTags(tags)
        }
        getRFCData()
    }, [search, match, user.id])

    return (
        <>
            {rfcInfo && (
                <div class="container">
                    <div class="Sidebar">
                        <Sidebar user={user} signOut={signOut} />
                    </div>
                    <div class="Content">
                        <TipTapContainer />
                    </div>
                    <div class="Properties">
                        <PropertiesPanel
                            rfcInfo={rfcInfo}
                            workspaceTags={workspaceTags}
                            workspaceID={workspaceID}
                        />
                    </div>
                </div>
            )}
            {!rfcInfo && rfcList && (
                <div>
                    {/* Dashboard
                    {rfcList.map((rfc) => (
                        <Link to={`dashboard/${rfc.id}`}>
                            <Button key={rfc.id}>{rfc.id}</Button>
                        </Link>
                    ))} */}
                    <div class="mainContainer">
                        <div class="mainSidebar">
                            <Sidebar user={user} signOut={signOut} />
                        </div>
                        <div class="mainContent">
                            <DashboardGrid />
                        </div>
                    </div>
                </div>
            )}
        </>
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
