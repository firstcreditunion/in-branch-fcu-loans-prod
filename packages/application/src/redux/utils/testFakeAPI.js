import axios from 'axios'

const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts'

const fectchPosts = () => {
  axios
    .get(POSTS_URL)
    .then()
    .catch(function (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
      } else {
      }
    })
}

export default fectchPosts
