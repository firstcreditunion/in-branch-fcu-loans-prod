import React from 'react'

export function debounce_fn(callbackFn, delay = 250) {
  let timeout

  return (...args) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      callbackFn(...args)
    }, delay)
  }
}

export function throttle_fn(callbackFn, delay = 250) {
  let shouldWait = false

  return (...args) => {
    if (shouldWait) return

    callbackFn(...args)
    shouldWait = true
    setTimeout(() => {
      shouldWait = false
    }, delay)
  }
}

export function throttle_fn_wait(callbackFn, delay = 1000) {
  let shouldWait = false
  let waitingArgs

  // console.log('CALLBACK - ', callbackFn)

  const timeoutFn = () => {
    if (waitingArgs == null) {
      // console.log('No Waiting args')
      shouldWait = false
    } else {
      // console.log('Executing Function 1')
      callbackFn(...waitingArgs)
      waitingArgs = null
      setTimeout(timeoutFn, delay)
    }
  }

  return (...args) => {
    if (shouldWait) {
      // console.log('Saving Args - ', args)
      waitingArgs = args
      return
    }
    // console.log('Executing Function 2')
    callbackFn(...args)
    shouldWait = true
    setTimeout(timeoutFn, delay)
  }
}
