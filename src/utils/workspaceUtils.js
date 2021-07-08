import { supabase } from "../config/supabase"

export const addWorkspace = async (name, url, company_size) => {
    const { data, error } = await supabase
        .from("workspaces")
        .insert([{ name, url, company_size }])
    if (error) {
        if (
            error.message.includes(
                "duplicate key value violates unique constraint"
            )
        ) {
            return {
                status: "error",
                msg: "Url Unavailable, please choose another"
            }
        }
        return { status: "error", msg: error.message }
    }
    return data
}

export const getWorkspaceName = async (user_id) => {
    const { data, error } = await supabase
        .from("users")
        .select(`workspace_id`)
        .eq("id", user_id)
    if (error) {
        return { status: "error", msg: error.message }
    }
    const workspace_id = data[0].workspace_id
    const { data: workspace_data, workspace_error } = await supabase
        .from("workspaces")
        .select(`name`)
        .eq("id", workspace_id)
    if (workspace_error) {
        console.log(workspace_error)
        return { status: "error", msg: workspace_error.message }
    }
    return workspace_data[0].name
}

export const getWorkspaceID = async (user_id) => {
    const { data, error } = await supabase
        .from("users")
        .select(`workspace_id`)
        .eq("id", user_id)
    if (error) {
        return { status: "error", msg: error.message }
    }
    return data[0].workspace_id
}

export const getWorkspaceTags = async (workspace_id) => {
    const { data: workspace_data, workspace_error } = await supabase
        .from("workspaces")
        .select(`tags`)
        .eq("id", workspace_id)
    if (workspace_error) {
        return { status: "error", msg: workspace_error.message }
    }
    if (workspace_data) {
        return workspace_data[0]
    }
    return []
}

export const addWorkspaceTags = async (workspace_id, tags) => {
    console.log(tags)
    const { data, error } = await supabase
        .from("workspaces")
        .update({ tags: tags })
        .eq("id", workspace_id)
    if (error) {
        console.log(error)
        return { status: "error", msg: error.message }
    }
    return data
}
