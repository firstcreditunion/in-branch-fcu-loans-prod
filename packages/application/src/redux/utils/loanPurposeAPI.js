import axios from 'axios'

const LOAN_PURPOSE_URL = '/loanpurposecodes'

const fectchLoanPurpose = () => {
  axios.get(LOAN_PURPOSE_URL).catch(function (error) {
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
