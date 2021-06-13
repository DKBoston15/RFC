import { supabase } from "../config/supabase"

export const getUserData = async (id) => {
    const { data, error } = await supabase
        .from("users")
        .select(`id, role, avatar_url, signup_flow_complete`)
        .eq("id", id)
    if (error) {
        return { status: "error", msg: error.message }
    }
    return data
}

export const addUser = async (id) => {
    const { data, error } = await supabase.from("users").insert([{ id: id }])
    if (error) {
        return error
    }
    return data
}
