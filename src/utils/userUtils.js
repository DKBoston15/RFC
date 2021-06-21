import { supabase } from "../config/supabase"

export const getUserData = async (id) => {
    const { data, error } = await supabase
        .from("users")
        .select(`id, role, avatar_url, signup_flow_complete, full_name`)
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

export const addUserRole = async (role, id, workspace_id) => {
    const { data, error } = await supabase
        .from("users")
        .update({
            role: role,
            workspace_id: workspace_id,
            signup_flow_complete: true
        })
        .eq("id", id)
    if (error) {
        return error
    }
    return data
}

export const updateUserInfo = async (user_id, full_name, avatar_url) => {
    const { data, error } = await supabase
        .from("users")
        .update({ full_name: full_name, avatar_url: avatar_url })
        .eq("id", user_id)
    if (error) {
        return { status: "error", msg: error.message }
    }

    return data
}
