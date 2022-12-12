import React from 'react'

export const genericStatusCodes = [
  {
    Code: '-99',
    Type: 'Unable to contact Credit Sense',
    Terminal: 'Yes',
    AlertTitle: 'Error',
    AlertContent: 'Credit Sense cannot be reached!',
    SeverityType: 'error',
    Description: 'Returned when the Credit Sense server cannot be reached. This can occur at any stage in the application journey.',
  },
  {
    Code: '-98',
    Type: 'T&Cs declined',
    Terminal: 'Yes',
    AlertTitle: 'Error',
    AlertContent: 'The Terms&Conditions were Declined!',
    SeverityType: 'error',
    Description: 'Returned when the customer clicks the decline button on the Terms and Conditions screen.',
  },
  {
    Code: '1',
    Type: 'Iframe initialised',
    Terminal: 'No',
    AlertTitle: 'Info',
    AlertContent: 'Credit Sense Portal Initialised',
    SeverityType: 'info',
    Description: 'Returned once the iframe has been successfully initialised.',
  },
  {
    Code: '3',
    Type: 'App ID generated',
    Terminal: 'No',
    AlertTitle: 'Select Bank',
    AlertContent: 'Please select the bank from which you would like to upload your statements.',
    SeverityType: 'info',
    Description: 'Returned once an App ID has been generated for the current application.',
  },
  {
    Code: '97',
    Type: 'Account credentials submitted',
    Terminal: 'No',
    AlertTitle: 'Login Details Sent',
    AlertContent: 'Login Details Sent to Credit Sense',
    SeverityType: 'info',
    Description: 'Returned when the user hits the status stage of the application journey and their credentials have been sent to our server.',
  },
  {
    Code: '100',
    Type: 'Application success',
    Terminal: 'Yes',
    AlertTitle: 'Login Success',
    AlertContent: 'You have successfully logged in!',
    SeverityType: 'info',
    Description: 'Returned when the application successfully completes with successes for all logins.',
  },
]

export const bankStatusCodes = [
  {
    Code: '-4',
    Type: 'Generic bank error',
    Terminal: 'Yes',
    AlertTitle: 'Internet Banking Error',
    AlertContent: 'The internet banking service for your bank is not operational!',
    SeverityType: 'error',
    Description: 'Returned when communications to the bank cannot be made. e.g. The banks service is down, or the bank is not supported.',
  },
  {
    Code: '-3',
    Type: 'Too many attempts',
    Terminal: 'Yes',
    AlertTitle: 'Too Many Attempts',
    AlertContent: 'You failed to log into your internet banking 3 times.',
    SeverityType: 'error',
    Description: 'Returned when three attempts to log into the account fail.',
  },
  {
    Code: '-2',
    Type: 'Unable to log in',
    Terminal: 'No',
    AlertTitle: 'Incorrect Credentials',
    AlertContent: 'Your login details are incorrect!',
    SeverityType: 'error',
    Description: 'Returned when the provided credentials cannot be used to log into the account.',
  },
  {
    Code: '99',
    Type: 'Bank success',
    Terminal: 'Conditional',
    AlertTitle: 'Login Success',
    AlertContent: 'Your bank statements were uploaded successfully!',
    SeverityType: 'info',
    Description: 'Returned when a success response has been received for the provided credentials.',
  },
  {
    Code: '150',
    Type: 'MFA form displayed',
    Terminal: 'No',
    AlertTitle: 'Verification Code',
    AlertContent: 'Please enter the verification code!',
    SeverityType: 'info',
    Description: 'Returned when the MFA form is shown to the customer.',
  },
  {
    Code: '151',
    Type: 'MFA form refreshed',
    Terminal: 'No',
    AlertTitle: 'Refreshing MFA',
    AlertContent: 'MFA Form Expired. Refreshing MFA!',
    SeverityType: 'info',
    Description: 'Returned when the user hits the refresh button on the MFA form after it has expired. You can expect a 1001 status code at the point that the MFA has expired before this code is sent.',
  },
  {
    Code: '152',
    Type: 'MFA form submitted',
    Terminal: 'No',
    AlertTitle: 'Code Submitted',
    AlertContent: 'You verification code has been submitted!',
    SeverityType: 'info',
    Description: 'Returned when the user submits the MFA form.',
  },
  {
    Code: '153',
    Type: 'Change bank form clicked',
    Terminal: 'No',
    AlertTitle: 'Change Bank',
    AlertContent: 'Please choose another bank!',
    SeverityType: 'info',
    Description: 'Returned when the user clicks the change bank button.',
  },
  {
    Code: '400',
    Type: 'Bank error',
    Terminal: 'No',
    AlertTitle: 'Login Failed',
    AlertContent: 'Inetrnet Banking Login Failed!',
    SeverityType: 'error',
    Description: 'Returned when a bank login attempt fails; followed by a -2 status code. The code will indicate the specific error that was encountered.',
  },
]

export const supportingDocsStatusCodes = [
  {
    Code: '-18',
    Type: 'Failed due to government agency service error',
    Terminal: 'Yes',
    AlertTitle: 'Service Unavalable',
    AlertContent: 'WINZ or myGov services are not accessible! Please try again.',
    SeverityType: 'error',
    Description: 'Returned when the myGov or WINZ websites are inaccessible and the user will need to try again later.',
  },
  {
    Code: '-17',
    Type: 'Failed due to internal error',
    Terminal: 'Yes',
    AlertTitle: 'Internal Error',
    AlertContent: '',
    SeverityType: 'error',
    Description: 'Returned when an error is encountered and the request is unable to be completed.',
  },
  {
    Code: '-16',
    Type: 'Failed due to client-side error',
    Terminal: 'Yes',
    AlertTitle: 'Error',
    AlertContent: 'Please refresh!',
    SeverityType: 'error',
    Description: 'Returned when an error within the iframe prevents the credentials from being submitted.',
  },
  {
    Code: '-15',
    Type: 'Not yet authenticated',
    Terminal: 'No',
    AlertTitle: 'Authentication Fail',
    AlertContent: 'You credentials were cannot be authenticated!',
    SeverityType: 'error',
    Description: 'Returned when the users credentials arent able to be authenticated.',
  },
  {
    Code: '98',
    Type: 'Supporting docs complete',
    Terminal: 'Yes',
    AlertTitle: 'Documents retrieved',
    AlertContent: 'Your supporting docuemts have been retrieved successfully!',
    SeverityType: 'success',
    Description: 'Returned when the users credentials arent able to be authenticated.',
  },
]
