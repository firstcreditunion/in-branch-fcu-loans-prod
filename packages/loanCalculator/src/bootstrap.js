import React from 'react'
import ReactDOM from 'react-dom'

import { createMemoryHistory, createBrowserHistory } from 'history'
import { HelmetProvider } from 'react-helmet-async'

import App from './App'
import { Provider } from 'react-redux'
import store from './redux/store'
import { useDispatch } from 'react-redux'

// Mount funcion to start up the app
const mount = (el, { onLoanAmountChange, onInterestChange, onTermChange, onPaymentFrequencyChange, setCreditSense, setCreditCheck, setMotorwebCheck, setPPSR, setDocusign, setCloudCheckId, setCloudCheckPEP, sethasLpiPrimeDeath, sethasLpiPrimeDisability, sethasLpiPrimeCriticalIllness, sethasLpiPrimeBankruptcy, setLPIUpfrontFee, onNavigate, defaultHistory, initialPath }) => {
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
        <App onLoanAmountChange={onLoanAmountChange} onInterestChange={onInterestChange} onTermChange={onTermChange} onPaymentFrequencyChange={onPaymentFrequencyChange} setCreditSense={setCreditSense} setCreditCheck={setCreditCheck} setMotorwebCheck={setMotorwebCheck} setPPSR={setPPSR} setDocusign={setDocusign} setCloudCheckId={setCloudCheckId} setCloudCheckPEP={setCloudCheckPEP} sethasLpiPrimeDeath={sethasLpiPrimeDeath} sethasLpiPrimeDisability={sethasLpiPrimeDisability} sethasLpiPrimeCriticalIllness={sethasLpiPrimeCriticalIllness} sethasLpiPrimeBankruptcy={sethasLpiPrimeBankruptcy} setLPIUpfrontFee={setLPIUpfrontFee} history={history} />
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

      // Id current loacation is not same as new location then update
      if (pathname !== nextPathname) {
        history.push(nextPathname)
      }
    },
  }
}

// If we are in development and in isolation, call mount immediately
if (process.env.NODE_ENV === 'development') {
  const devRoot = document.querySelector('#_firstloan-calculator')

  // Passing browser history instance to mount function if dev mode
  if (devRoot) {
    mount(devRoot, { defaultHistory: createBrowserHistory() })
  }
}

// if we are in running through container. we should export the mount function
export { mount }
