import { supabase } from "../config/supabase"

export const getProjects = async (workspace_id) => {
    const { data, error } = await supabase
        .from("projects")
        .select(`id, name`)
        .eq("workspace_id", workspace_id)
    if (error) {
        return { status: "error", msg: error.message }
    }
    return data
}

export const createNewProject = async (name, workspace_id) => {
    const { data, error } = await supabase
        .from("projects")
        .insert([{ name: name, workspace_id: workspace_id }])
    if (error) {
        return { status: "error", msg: error.message }
    }
    return data
}

export const getProject = async (project_id) => {
    const { data, error } = await supabase
        .from("projects")
        .select(`id, name`)
        .eq("id", project_id)
    if (error) {
        return { status: "error", msg: error.message }
    }
    return data
}
