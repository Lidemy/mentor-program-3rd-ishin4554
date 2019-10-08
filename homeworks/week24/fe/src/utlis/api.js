import storage from "../utlis/storage";

const baseUrl = '/v1/api'
const token = storage.getCookie('token');

export const getPosts = (category) => 
  fetch(`${baseUrl}/posts?category=${category}`)
    .then(res => res.json())

export const getPost = (id) => 
  fetch(`${baseUrl}/posts/${id}`)
    .then(res => res.json())

export const createPost = (post) => fetch(`${baseUrl}/posts`, {
    body: JSON.stringify(post),
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'authorization' : token
    }
  })

export const deletePost = (id) => fetch(`${baseUrl}/posts/${id}`, {
    method: 'DELETE',
    headers: {
      'authorization' : token
    }
  })

export const editPost = (id, post) => 
  fetch(`${baseUrl}/posts/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(post),
    headers: {
      'Content-Type': 'application/json',
      'authorization': token
    }
  })

export const getCategories = () => 
  fetch(`${baseUrl}/categories`,)
    .then(res => res.json())
  
export const getTags = () => 
  fetch(`${baseUrl}/tags`,)
    .then(res => res.json())