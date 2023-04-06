import React, { Suspense, lazy } from 'react'
import { Switch, Route, Router } from 'react-router-dom'

import ThemeConfig from './theme'
import GlobalStyles from './theme/globalStyles'
import ThemePrimaryColor from './components/ui/FirstLoanThemeForCalculator'

import SplashScreen from './components/SplashScreen'

const LoanCalculator = lazy(() => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(import('./LoanCalulator')), 1300)
  })
})

// Git commit control 3

export default ({ history, onLoanAmountChange, onInterestChange, onTermChange, onPaymentFrequencyChange, setCreditSense, setCreditCheck, setMotorwebCheck, setPPSR, setDocusign, setCloudCheckId, setCloudCheckPEP, sethasLpiPrimeDeath, sethasLpiPrimeDisability, sethasLpiPrimeCriticalIllness, sethasLpiPrimeBankruptcy, setLPIUpfrontFee }) => {
  return (
    <>
      <ThemeConfig>
        <ThemePrimaryColor>
          <GlobalStyles />
          <Router history={history}>
            <Suspense fallback={<SplashScreen />}>
              <Switch>
                <Route path='/'>
                  <LoanCalculator onLoanAmountChange={onLoanAmountChange} onInterestChange={onInterestChange} onTermChange={onTermChange} onPaymentFrequencyChange={onPaymentFrequencyChange} setCreditSense={setCreditSense} setCreditCheck={setCreditCheck} setMotorwebCheck={setMotorwebCheck} setPPSR={setPPSR} setDocusign={setDocusign} setCloudCheckId={setCloudCheckId} setCloudCheckPEP={setCloudCheckPEP} sethasLpiPrimeDeath={sethasLpiPrimeDeath} sethasLpiPrimeDisability={sethasLpiPrimeDisability} sethasLpiPrimeCriticalIllness={sethasLpiPrimeCriticalIllness} sethasLpiPrimeBankruptcy={sethasLpiPrimeBankruptcy} setLPIUpfrontFee={setLPIUpfrontFee} />
                </Route>
              </Switch>
            </Suspense>
          </Router>
        </ThemePrimaryColor>
      </ThemeConfig>
    </>
  )
}
