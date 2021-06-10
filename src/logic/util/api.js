import axios from 'axios'

export const get = async (url) => {
  const { data } = await axios({
    url: url,
    method: 'GET',
  })

  return {
    data,
  }
}

export const post = async (url, params) => {
  const { data } = await axios({
    url: url,
    method: 'POST',
    data: {
      ...params,
    },
  })

  return {
    data,
  }
}

export const put = async (url, params) => {
  const { data } = await axios({
    url: url,
    method: 'PUT',
    data: {
      ...params,
    },
  })

  return {
    data,
  }
}

export const patch = async (url, params) => {
  const { data } = await axios({
    url: url,
    method: 'PATCH',
    data: {
      ...params,
    },
  })

  return {
    data,
  }
}

export const remove = async (url, params) => {
  const { data } = await axios({
    url: url,
    method: 'DELETE',
    data: {
      ...params,
    },
  })

  return {
    data,
  }
}
