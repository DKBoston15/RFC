// import React, { useState, useEffect } from "react"
// import { makeStyles } from "@material-ui/core/styles"
// import Modal from "../components/Modal"
// import { Box, Typography } from "@material-ui/core"

// const useStyles = makeStyles({
//     modalStyles: {
//         position: "fixed",
//         top: "50%",
//         left: "50%",
//         transform: "translate(-50%, -50%)",
//         backgroundColor: "#fff",
//         padding: "50px",
//         zIndex: 1000
//     }
// })

// export default function FlexSelectTest() {
//     const [isOpen, setIsOpen] = useState(false)
//     const classes = useStyles()

//     return (
//         <div className={classes.modalStyles}>
//             <button onClick={() => setIsOpen(true)}>Open Modal</button>
//             <Modal open={isOpen} onClose={() => setIsOpen(false)}>
//                 <Box>Hello</Box>
//             </Modal>
//             <div>Other Content</div>
//         </div>
//     )
// }
