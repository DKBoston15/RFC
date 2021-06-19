import { supabase } from "../config/supabase"

export const getRfcs = async (workspace_id) => {
    const { data, error } = await supabase
        .from("rfcs")
        .select(`id, name`)
        .eq("workspace_id", workspace_id)
    if (error) {
        return { status: "error", msg: error.message }
    }
    return data
}

export const getRfc = async (rfc_id) => {
    const { data, error } = await supabase
        .from("rfcs")
        .select(`name`)
        .eq("id", rfc_id)
    if (error) {
        return { status: "error", msg: error.message }
    }
    return data
}

export const getFavoriteRfcs = async (user_id) => {
    const favoriteRfcs = []
    const { data, error } = await supabase
        .from("users")
        .select(`favorite_rfcs`)
        .eq("id", user_id)
    if (error) {
        return { status: "error", msg: error.message }
    }
    const favRfcs = data[0].favorite_rfcs
    for (let i = 0; i < favRfcs.length; i++) {
        const name = await getRfc(favRfcs[i])
        favoriteRfcs.push({
            id: favRfcs[i],
            name: name[0].name
        })
    }
    return favoriteRfcs
}

export const getDocuments = async (user_id) => {
    //Get Folders & RFCS
    const { data, error } = await supabase
        .from("folders")
        .select(`name, rfcs`)
        .eq("user_id", user_id)
    if (error) {
        return { status: "error", msg: error.message }
    }
    const folderArray = []
    for (let i = 0; i < data.length; i++) {
        let rfcDataArray = []
        for (let x = 0; x < data[i].rfcs.length; x++) {
            let rfcData = await getRfc(data[i].rfcs[x])
            rfcDataArray.push({ name: rfcData[0].name, id: data[i].rfcs[x] })
        }
        folderArray.push({ name: data[i].name, rfcs: rfcDataArray })
        rfcDataArray = []
    }
    return folderArray
}
