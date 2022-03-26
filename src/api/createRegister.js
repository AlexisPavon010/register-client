import axios from 'axios'

export default async function createRegister(data) {
   return await axios.post(`${process.env.REACT_APP_BASE_URL}/api/createRegister`, data)
}