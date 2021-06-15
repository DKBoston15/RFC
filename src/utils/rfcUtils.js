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
