import axios from 'axios'

export const updateRegister = (_id, data) => {
  return axios.post(`${process.env.REACT_APP_BASE_URL}/api/updateRegister/${_id}`, data)
}
