import axios from 'axios'

export const getRegisterById = (_id) => {
  return axios.get(`${process.env.REACT_APP_BASE_URL}/api/getRegisterById/${_id}`)
}
