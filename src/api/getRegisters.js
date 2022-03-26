import axios from 'axios'

export default async function getRegisters() {
    return await axios.get(`${process.env.REACT_APP_BASE_URL}/api/getRegisters`)
}
