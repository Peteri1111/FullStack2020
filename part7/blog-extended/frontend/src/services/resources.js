import axios from 'axios'


let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const create = async (newObject, baseUrl) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = async (id, newObject, baseUrl) => {

  const request = await axios.put(`${baseUrl}/${id}`, newObject)

  return request.data
}

const getAll = async (baseUrl) => {
  const response = await axios.get(baseUrl)
  return response.data
}

const remove = async (id, baseUrl) => {
  const config = {
    headers: { Authorization: token },
  }
  console.log(config)
  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response.data
}

export default { getAll, create, update, setToken, remove }