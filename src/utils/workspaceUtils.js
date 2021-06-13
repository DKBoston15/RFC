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
