
const postAPI = {
  getPost: (id) => {
    return (
      fetch(`/api/posts/${id}`)
        .then(res => res.json())
        .catch(err => console.log(err))
    );
  },
  getAllPosts: () => {
    return (
      fetch('/api/posts')
        .then(res => res.json())
        .catch(err => console.log(err))
    );
  },
  getAllTags: () => {
    return (
      fetch('/api/tags')
        .then(res => res.json())
        .catch(err => console.log(err))
    )
  },
  getAllCategories: () => {
    return (
      fetch('/api/categories')
        .then(res => res.json())
        .catch(err => console.log(err))
    )
  },
  updatePost: (id, data) => {
    return (
      fetch(`/api/posts/${id}`,{
        headers: {
          'content-type': 'application/json'
        },
        method: 'PATCH',
        body: JSON.stringify(data),
      }).catch(err => console.log(err))
    );
  }
}

const userAPI = {

}

export {postAPI, userAPI}