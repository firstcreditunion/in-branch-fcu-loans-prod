export const primeAndJointOnlyDataTest = {
  draft: 'N',
  loanAmount: 3000,
  interestRate: 12.5,
  repayAmount: 23.55,
  repayFreq: 'W',
  loanPurpose: 'MTRV',
  term: 36,
  tradingBranch: 'VIR',
  insurance: [
    {
      component: 'DEATH',
      joint: 'N',
      discount: 'N',
    },
  ],
  associatedClients: {
    data: [
      {
        id: '0001022184',
        type: 'associatedClients',
      },
    ],
  },
  securities: {
    data: [
      {
        type: 'securities',
        id: '0000299612',
      },
    ],
  },
  memoLines: ['', '------ Vehicle Details for Security ------', '', 'Vehicle-related Loan Purpose? : Yes', '', 'Would you like to provide vehicle as loan security? : N/A', '', 'Have you purchased the vehicle yet? : Yes', '', 'Vehicle Rego : FAM958', '', '------ Preliminary Questions ------', '', 'Are you applying for a joint loan? : No', '', 'What is the purpose of this loan? : Vehicle Financing', '', 'Trading Branch : Virtual', '', 'Citizenship? : New Zealand', '', 'Residency : N/A', '', 'Do you have a work permit? : N/A', '', 'Do you have a regular income? : Yes', '', 'Is your income credited to your FCU Account?: Yes', '', 'Have you been declared bankrupt before? : No', '', 'Bankruptcy Date: N/A', '', '------ Privacy Declaration -------', '', '1. Accepted Credit Assesment Checks- Yes', '', '2. Authorise FCU to disclose data to third parties - Yes', '', '3. Information is true and correct - Yes', '', '4. Comply with AML/CFT obligations - Yes', '', '5. Authorise FCU to collect, use and store data - Yes'],
  included: [
    {
      type: 'associatedClients',
      id: '0001022184',
      attributes: {
        role: 'PRIMEB',
        seq: '1',
        signatureRequired: 'M',
        creditCheckAuthorised: 'Y',
        order: '1',
        clientReference: null,
        clientMaint: {
          clientID: '0001022184',
          generalDetails: {
            externalSystemReference: '',
            clientType: 'I',
            status: {
              code: 'A',
            },
            gna: 'N',
            existingClient: 'Y',
            defaultManager: '0000148335',
            individualDetails: {
              title: 'Mr',
              forename: 'Isaac',
              surname: 'Vicliph',
              clientOtherNamesExist: 'N',
              gender: 'Male',
              dateOfBirth: '1991-06-20T00:00:00.000Z',
              dateOfBirthRefused: 'N',
              maritalStatus: 'S',
              countryOfResidence: null,
              countryOfCitizenship: 'NZ',
              numberOfDependants: '3',
              accommodation: {
                code: 'RNTX',
                description: 'Renting More than 2 years',
              },
              resident: 'Y',
              smoker: 'N',
            },
          },
          clientIdentifications: [
            {
              idCode1: 'PASPRT',
              effectiveDate: '2012-06-20T00:00:00.000Z',
              expiryDate: '2022-12-20T00:00:00.000Z',
              reference: 'XE123456',
              seq: '1',
            },
          ],
          contactDetails: {
            address: [
              {
                careOfName: '',
                unitType: 'Unit',
                apartment: '2',
                building: null,
                streetNumber: {
                  from: '16',
                  to: null,
                },
                alpha: null,
                streetOrPostalName: 'Manning Street',
                streetDirection: null,
                streetType: null,
                suburb: 'Hamilton Central',
                city: 'Hamilton',
                state: '',
                postCode: '3204',
                country: {
                  code: 'NZD',
                  description: 'New Zealand',
                },
                contactId: '258790',
                purpose: 'R',
                effectiveDate: '2018-11-28T00:00:00.000Z',
                type: 'S',
                seq: '1',
                externalSystemReference: '',
              },
            ],
            phone: [],
            mobile: [
              {
                countryCode: '64',
                networkCode: '21',
                number: '2549633',
                preferredMethod: 'N',
                effectiveDate: '2022-11-28T00:00:00.000Z',
                type: 'MB',
                seq: '1',
              },
            ],
            email: [
              {
                address: 'samisaac75@gmail.com',
                preferredMethod: 'Y',
                effectiveDate: '2022-11-28T00:00:00.000Z',
                type: 'HM',
                seq: '1',
              },
            ],
          },
          employmentDetails: [
            {
              employmentType: {
                type: 'FTM',
                description: 'Full-Time Employment',
              },
              occupation: '001',
              jobDescription: 'Managers',
              employerName: 'FCU',
              effectiveDate: '2019-11-28T00:00:00.000Z',
              seq: '1',
            },
          ],
          clientCapacity: {
            capacityAssessment: {
              anyExpectedChanges: 'Y',
              changeDetails: 'N',
              assessmentQuestionsAsked: 'Y',
              selfDeclarationAccepted: 'Y',
            },
            joint: 'N',
            assets: [],
            liabilities: [],
            incomes: [],
            expenses: [],
          },
          mode: 'Add',
        },
      },
    },
    {
      type: 'securities',
      id: '0000299612',
      attributes: {
        seq: '1',
        accountSecurity: {
          primaryCollateral: 'P',
          effectiveDate: '2022-11-28T00:00:00.000Z',
          clientSecurityRelationship: 'O',
        },
        asset: {
          assetType: 'S',
          classificationCode: 'VEHI',
          securityPercentageToUse: '100',
          condition: {
            code: 'U',
            description: '',
          },
          securityStatus: {
            code: 'C',
            description: '',
          },
        },
        vehicleMaint: {
          assetExtras: [],
          vehicle: {
            value: '0000000000',
            refType: 'ASSIGN',
          },
          vehicleDetails: {
            externalSystemReference: '',
            make: '',
            model: '',
            registrationYear: '',
            colour: '',
            nonStandardVehicle: {
              code: 'Y',
              description: '',
            },
            registrationNumber: 'FAM958',
            odometer: '0',
          },
        },
      },
    },
  ],
}
