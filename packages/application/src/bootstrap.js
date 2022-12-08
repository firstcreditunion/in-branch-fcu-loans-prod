import React from 'react'
import ReactDOM from 'react-dom'

import { createMemoryHistory, createBrowserHistory } from 'history'
import { HelmetProvider } from 'react-helmet-async'

import App from './App'
import { Provider } from 'react-redux'
import store from './redux/store'

// Mount funcion to start up the app
const mount = (el, { loanAmount, interestRate, term, paymentFrequency, creditCheck, creditSense, motorWebCheck, ppsrRegistration, docuSignSigning, cloudCheckIdVerification, cloudCheckPEP, hasLpiPrimeDeath, hasLpiPrimeDisability, hasLpiPrimeCriticalIllness, hasLpiPrimeBankruptcy, awsCalculatedLpiAmount, onNavigate, defaultHistory, initialPath, themeMode, memberInstance }) => {
  // uses Dfualt history in isolation mode. Uses createMemoryHistory in production mode
  const history =
    defaultHistory ||
    createMemoryHistory({
      initialEntries: [initialPath],
    })
  if (onNavigate) {
    history.listen(onNavigate)
  }

  ReactDOM.render(
    <HelmetProvider>
      <Provider store={store}>
        <App loanAmount={loanAmount} interestRate={interestRate} term={term} paymentFrequency={paymentFrequency} creditCheck={creditCheck} creditSense={creditSense} motorWebCheck={motorWebCheck} ppsrRegistration={ppsrRegistration} docuSignSigning={docuSignSigning} cloudCheckIdVerification={cloudCheckIdVerification} cloudCheckPEP={cloudCheckPEP} hasLpiPrimeDeath={hasLpiPrimeDeath} hasLpiPrimeDisability={hasLpiPrimeDisability} hasLpiPrimeCriticalIllness={hasLpiPrimeCriticalIllness} hasLpiPrimeBankruptcy={hasLpiPrimeBankruptcy} awsCalculatedLpiAmount={awsCalculatedLpiAmount} history={history} themeMode={themeMode} memberInstance={memberInstance} />
      </Provider>
    </HelmetProvider>,
    el
  )

  return {
    // When you call history.listen in container, it return the location. This is accepted onNavigate and passed on to the memory history
    // the location object has pathname wich we are interested in
    onParentNavigate({ pathname: nextPathname }) {
      // Get current loacation
      const { pathname } = history.location

      // If current loacation is not same as new location then update
      if (pathname !== nextPathname) {
        history.push(nextPathname)
      }
    },
  }
}

// If we are in development and in isolation, call mount immediately
if (process.env.NODE_ENV === 'development') {
  const devRoot = document.querySelector('#_firstloan-application-root')

  // Passing browser history instance to mount function if dev mode
  if (devRoot) {
    mount(devRoot, { defaultHistory: createBrowserHistory() })
  }
}

// if we are in running through container. we should export the mount function
export { mount }
