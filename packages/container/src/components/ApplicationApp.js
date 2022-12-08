import { mount } from 'application/ApplicationApp'
import React, { useRef, useEffect } from 'react'
import { useHistory } from 'react-router-dom'

export default ({ loanAmount, interestRate, term, paymentFrequency, creditCheck, creditSense, motorWebCheck, ppsrRegistration, docuSignSigning, cloudCheckIdVerification, cloudCheckPEP, hasLpiPrimeDeath, hasLpiPrimeDisability, hasLpiPrimeCriticalIllness, hasLpiPrimeBankruptcy, awsCalculatedLpiAmount, themeMode, memberInstance }) => {
  const ref = useRef(null)
  const history = useHistory()

  // Call the useEffect only on first instance
  useEffect(() => {
    // the micro app returns parentNavigate object.
    const { onParentNavigate } = mount(ref.current, {
      initialPath: history.location.pathname,
      onNavigate: ({ pathname: nextPathname }) => {
        const { pathname } = history.location

        if (pathname !== nextPathname) {
          history.push(nextPathname)
        }
      },
      loanAmount,
      interestRate,
      term,
      paymentFrequency,
      creditCheck,
      creditSense,
      motorWebCheck,
      ppsrRegistration,
      docuSignSigning,
      cloudCheckIdVerification,
      cloudCheckPEP,
      hasLpiPrimeDeath,
      hasLpiPrimeDisability,
      hasLpiPrimeCriticalIllness,
      hasLpiPrimeBankruptcy,
      awsCalculatedLpiAmount,
      themeMode,
      memberInstance,
    })

    // A change in browser history is communicated down to sub app by calling onParentNavigate.
    // History.listen sends the current location down to sub app through onParentNavigate.

    history.listen(onParentNavigate)
  }, [])

  return <div ref={ref} />
}
// git control 1
