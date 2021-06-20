import React, { useEffect, useState } from "react"
import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import "./tiptap_styles/styles.scss"
import { updateRfcContent } from "../utils/rfcUtils"

import TipTapMenu from "./TipTapMenu"

export const TipTap = ({ rfcID }) => {
    let editor = useEditor({
        extensions: [StarterKit],
        onUpdate() {
            const json = this.getJSON()
            // console.log(json)
            console.log("Updating RFC with ID ", rfcID)
            // updateRfcContent(rfcID, json)
        },
        content: ``
    })
    return (
        <div className="tiptapContainer">
            <TipTapMenu editor={editor} />
            <EditorContent editor={editor} />
        </div>
    )
}

export default TipTap
