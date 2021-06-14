import axios from "axios"

export const inviteUser = async (email) => {
    try {
        const response = await axios.get(
            `https://6qc03nxhnh.execute-api.us-west-2.amazonaws.com/default/supabase-invite-user?email=${email}`
        )
        console.log(response.data.data)
        return response.data.data
    } catch (error) {
        console.log(error)
    }
}
