import axios from 'axios'

const EMPLOYMENT_TYPES_URL = '/employmenttypes'

const fectchEmploymentTypes = () => {
  apiInstance
    .get(EMPLOYMENT_TYPES_URL)
    .then((response) => {})
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
