import React from 'react'

export const genericStatusCodes = [
  {
    Code: '-99',
    Type: 'Unable to contact Credit Sense',
    Terminal: 'Yes',
    Description: 'Returned when the Credit Sense server cannot be reached. This can occur at any stage in the application journey.',
  },
  {
    Code: '-98',
    Type: 'T&Cs declined',
    Terminal: 'Yes',
    Description: 'Returned when the Credit Sense server cannot be reached. This can occur at any stage in the application journey.',
  },
  {
    Code: '1',
    Type: 'Iframe initialised',
    Terminal: 'No',
    Description: 'Returned when the Credit Sense server cannot be reached. This can occur at any stage in the application journey.',
  },
  {
    Code: '3',
    Type: 'App ID generated',
    Terminal: 'No',
    Description: 'Returned when the Credit Sense server cannot be reached. This can occur at any stage in the application journey.',
  },
  {
    Code: '97',
    Type: 'Account credentials submitted',
    Terminal: 'No',
    Description: 'Returned when the Credit Sense server cannot be reached. This can occur at any stage in the application journey.',
  },
  {
    Code: '100',
    Type: 'Application success',
    Terminal: 'Yes',
    Description: 'Returned when the Credit Sense server cannot be reached. This can occur at any stage in the application journey.',
  },
]

export const bankStatusCodes = [
  {
    Code: '-4',
    Type: 'Generic bank error',
    Terminal: 'Yes',
    Description: 'Returned when communications to the bank cannot be made. e.g. The banks service is down, or the bank is not supported.',
  },
  {
    Code: '-3',
    Type: 'Too many attempts',
    Terminal: 'Yes',
    Description: 'Returned when three attempts to log into the account fail.',
  },
  {
    Code: '-2',
    Type: 'Unable to log in',
    Terminal: 'No',
    Description: 'Returned when the provided credentials cannot be used to log into the account.',
  },
  {
    Code: '99',
    Type: 'Bank success',
    Terminal: 'Conditional',
    Description: 'Returned when the Credit Sense server cannot be reached. This can occur at any stage in the application journey.',
  },
  {
    Code: '150',
    Type: 'MFA form displayed',
    Terminal: 'No',
    Description: 'Returned when the MFA form is shown to the customer.',
  },
  {
    Code: '151',
    Type: 'MFA form refreshed',
    Terminal: 'No',
    Description: 'Returned when the user hits the refresh button on the MFA form after it has expired. You can expect a 1001 status code at the point that the MFA has expired before this code is sent.',
  },
  {
    Code: '152',
    Type: 'MFA form submitted',
    Terminal: 'No',
    Description: 'Returned when the Credit Sense server cannot be reached. This can occur at any stage in the application journey.',
  },
  {
    Code: '153',
    Type: 'Change bank form clicked',
    Terminal: 'No',
    Description: 'Clicked Changed Bank',
  },
  {
    Code: '400',
    Type: 'Bank error',
    Terminal: 'No',
    Description: 'Bank Login Failed',
  },
]

export const supportingDocsStatusCodes = [
  {
    Code: '-18',
    Type: 'Failed due to government agency service error',
    Terminal: 'Yes',
    Description: 'Clicked Changed Bank',
  },
  {
    Code: '-17',
    Type: 'Failed due to internal error',
    Terminal: 'Yes',
    Description: 'myGov or WINZ websites are inaccessible and the user will need to try again later',
  },
  {
    Code: '-16',
    Type: 'Failed due to client-side error',
    Terminal: 'Yes',
    Description: 'Error within the iframe prevents the credentials from being submitted',
  },
  {
    Code: '-15',
    Type: 'Not yet authenticated',
    Terminal: 'No',
    Description: 'User credentials are not able to be authenticated.',
  },
  {
    Code: '98',
    Type: 'Supporting docs complete',
    Terminal: 'Yes',
    Description: 'Supporting docs are retrieved successfully.',
  },
]
