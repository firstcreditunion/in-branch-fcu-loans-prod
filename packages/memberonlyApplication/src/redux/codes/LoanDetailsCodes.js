import React from 'react'

export const baseRateTypes = [
  { key: 'BRINS', value: 'Base Rate Insured Loan' },
  { key: 'BRUINS', value: 'Base Rate Uninsured Loan' },
]

export const creditHistoryTypes = [
  { key: 'ADV', value: 'Adverse Data Not Paying' },
  { key: 'ADVPAY', value: 'Adverse Data but Paying' },
  { key: 'ADVPAID', value: 'Adverse Data Repaid in Full' },
  { key: 'ADVNONE', value: 'No Adverse Data' },
]

export const securityTypes = [
  { key: 'SEC1', value: 'Unsecured Above 50% LVR' },
  { key: 'SEC2', value: 'Partially Secured Below 50% LVR' },
  { key: 'SEC3', value: 'Fully Secured 100% LVR' },
]
