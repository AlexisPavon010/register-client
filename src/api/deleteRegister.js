import axios from 'axios'

export default async function deleteRegister(_id) {
    return await axios.delete(`http://localhost:3000/api/deleteRegister/${_id}`)
}