import { createSlice } from '@reduxjs/toolkit'

const today = new Date()

function convertUnixToUTCTimestamp(date) {
  const unixTimestamp = date

  const dateFormat = new Date(unixTimestamp)

  dateFormat.setUTCHours(0, 0, 0, 0)
  const isoDate = dateFormat.toISOString()
  return isoDate
}

function convertToUTCTimestamp(date, callfrom) {
  if (date === null) {
    return
  }

  if (typeof date === 'number') {
    return convertUnixToUTCTimestamp(date)
  }

  date.setUTCHours(0, 0, 0, 0)

  const isoDate = date.toISOString()

  return isoDate
}

const defIssueDate = new Date()
const defExpiryDate = today.setDate(today.getDate() + 1)
const defDobDate = convertToUTCTimestamp(new Date().setFullYear(new Date().getFullYear() - 18), 'defDobDate')

const namespace = 'IdentificationDetails'

export const initialState = {
  identificationTypes: {
    drivers_licence: {
      data: {
        driversLicenceNo: '',
        driversLicenceVersion: '',
        licenceType: '',
        drLicenceIssueDate: null,
        defDrLicenceIssueDate: defIssueDate,
        drLicenceExpiryDate: null,
        defDrLicenceExpiryDate: defExpiryDate,
        drLicencePhotoUrl: {},
        sovdriversLicenceNo: '',
        sovdriversLicenceVersion: '',
        sovdriversLicenceIssueDate: null,
        sovdriversLicenceExpiryDate: null,
        sovdrLicenceIsDirty: false,
        sovid: null,
        sovidversion: null,
        sovType: null,
        sovTypeversion: null,
        sovAttributes: null,
        sovAttributesversion: null,
        sovAttributeId: null,
        sovTypeUpdated: null,
        sovTypeExpire: null,
      },
      jointdata: {
        driversLicenceNo: '',
        driversLicenceVersion: '',
        licenceType: '',
        drLicenceIssueDate: null,
        defDrLicenceIssueDate: defIssueDate,
        drLicenceExpiryDate: null,
        defDrLicenceExpiryDate: defExpiryDate,
        drLicencePhotoUrl: {},
      },
      autoComplete: { title: 'Driver Licence', code: 'DRVLSC' },
    },
    passport: {
      data: {
        passportNo: '',
        passportIssueDate: null,
        defPassportIssueDate: defIssueDate,
        passportExpiryDate: null,
        defPassportExpiryDate: defExpiryDate,
        passportPhotoUrl: {},
        sovpassportNo: '',
        sovpassportIssueDate: null,
        sovpassportExpiryDate: null,
        sovpassportIsDirty: false,
        sovid: null,
        sovType: null,
        sovAttributes: null,
        sovAttributeId: null,
        sovTypeUpdated: null,
        sovTypeExpire: null,
      },
      jointdata: {
        passportNo: '',
        passportIssueDate: null,
        defPassportIssueDate: defIssueDate,
        passportExpiryDate: null,
        defPassportExpiryDate: defExpiryDate,
        passportPhotoUrl: {},
      },
      autoComplete: { title: 'Passport', code: 'PASPRT' },
    },
    firearms_licence: {
      data: {
        firearmsLicenceNo: '',
        firearmsLicenceVersion: '',
        firearmsLicenceIssueDate: null,
        defFirearmsLicenceIssueDate: defIssueDate,
        firearmsLicenceExpiryDate: null,
        defFirearmsLicenceExpiryDate: defExpiryDate,
        firearmsLicencePhotoUrl: {},
        sovfirearmsLicenceNo: '',
        sovfirearmsLicenceIssueDate: null,
        sovfirearmsLicenceExpiryDate: null,
        sovfirearmsLicenceIsDirty: false,
        sovid: null,
        sovType: null,
        sovAttributes: null,
        sovAttributeId: null,
        sovTypeUpdated: null,
        sovTypeExpire: null,
      },
      jointdata: {
        firearmsLicenceNo: '',
        firearmsLicenceVersion: '',
        firearmsLicenceIssueDate: null,
        defFirearmsLicenceIssueDate: defIssueDate,
        firearmsLicenceExpiryDate: null,
        defFirearmsLicenceExpiryDate: defExpiryDate,
        firearmsLicencePhotoUrl: {},
      },
      autoComplete: { title: 'Firearms Licence', code: 'FIRELICENS' },
    },
    kiwi_access_card: {
      data: {
        kiwiAccessCardNo: '',
        kiwiAccessCardIssueDate: null,
        defKiwiAccessCardIssueDate: defIssueDate,
        kiwiAccessCardExpiryDate: null,
        defKiwiAccessCardExpiryDate: defExpiryDate,
        kiwiAccessCardPhotoUrl: {},
        sovkiwiAccessCardNo: '',
        sovkiwiAccessCardIssueDate: null,
        sovkiwiAccessCardExpiryDate: null,
        sovkiwiAccessCardIsDirty: false,
        sovid: null,
        sovType: null,
        sovAttributes: null,
        sovAttributeId: null,
        sovTypeUpdated: null,
        sovTypeExpire: null,
      },
      jointdata: {
        kiwiAccessCardNo: '',
        kiwiAccessCardIssueDate: null,
        defKiwiAccessCardIssueDate: defIssueDate,
        kiwiAccessCardExpiryDate: null,
        defKiwiAccessCardExpiryDate: defExpiryDate,
        kiwiAccessCardPhotoUrl: {},
      },
      autoComplete: { title: 'Kiwi Access Card', code: 'KIWACCCRD' },
    },
    community_service_card: {
      data: {
        commServiceCardNo: '',
        commServiceCardIssueDate: null,
        defCommServiceCardIssueDate: defIssueDate,
        commServiceCardExpiryDate: null,
        defCommServiceCardExpiryDate: defExpiryDate,
        commServiceCardPhotoUrl: {},
        sovcommServiceCardNo: '',
        sovcommServiceCardIssueDate: null,
        sovcommServiceCardExpiryDate: null,
        sovcommServiceCardIsDirty: false,
        sovid: null,
        sovType: null,
        sovAttributes: null,
        sovAttributeId: null,
        sovTypeUpdated: null,
        sovTypeExpire: null,
      },
      jointdata: {
        commServiceCardNo: '',
        commServiceCardIssueDate: null,
        defCommServiceCardIssueDate: defIssueDate,
        commServiceCardExpiryDate: null,
        defCommServiceCardExpiryDate: defExpiryDate,
        commServiceCardPhotoUrl: {},
      },
      autoComplete: { title: 'Community Service Card', code: 'COMSERVCRD' },
    },
    birth_certificate: {
      data: {
        birthCertificateRegNo: '',
        sovbirthCertificateRegNo: '',
        datOfBirth: null,
        defDateofBirth: defDobDate,
        placeOfBirth: '',
        birthCertificatePhotoUrl: {},
        sovbirthCertificateRegNo: '',
        sovbirthCertificateIssueDate: null,
        sovbirthCertificateIsDirty: false,
        sovid: null,
        sovType: null,
        sovAttributes: null,
        sovAttributeId: null,
        sovTypeUpdated: null,
        sovTypeExpire: null,
      },
      jointdata: {
        birthCertificateRegNo: '',
        datOfBirth: null,
        defDateofBirth: defDobDate,
        placeOfBirth: '',
        birthCertificatePhotoUrl: {},
      },
      autoComplete: { title: 'Birth Certificate', code: 'BIRTHCERT' },
    },
    current_Student_id: {
      data: {
        currStudentIdNo: '',
        sovcurrStudentIdNo: '',
        currStudentIdIssueDate: null,
        defCurrStudentIdIssueDate: defIssueDate,
        currStudentIdExpiryDate: null,
        defCurrStudentIdExpiryDate: defExpiryDate,
        currStudentIdPhotoUrl: {},
        sovcurrStudentIdNo: '',
        sovcurrStudentIdIssueDate: null,
        sovcurrStudentIdExpiryDate: null,
        sovcurrStudentIdIsDirty: false,
        sovid: null,
        sovType: null,
        sovAttributes: null,
        sovAttributeId: null,
        sovTypeUpdated: null,
        sovTypeExpire: null,
      },
      jointdata: {
        currStudentIdNo: '',
        currStudentIdIssueDate: null,
        defCurrStudentIdIssueDate: defIssueDate,
        currStudentIdExpiryDate: null,
        defCurrStudentIdExpiryDate: defExpiryDate,
        currStudentIdPhotoUrl: {},
      },
      autoComplete: { title: 'Current Student ID', code: 'CURSTUDID' },
    },
    gold_card: {
      data: {
        goldCardNo: '',
        sovgoldCardNo: '',
        goldCardValidFromDate: null,
        defGoldCardValidFromDate: defIssueDate,
        goldCardPhotoUrl: {},
        sovgoldCardNo: '',
        sovgoldCardIssueDate: null,
        sovgoldCardIsDirty: false,
        sovid: null,
        sovType: null,
        sovAttributes: null,
        sovAttributeId: null,
        sovTypeUpdated: null,
        sovTypeExpire: null,
      },
      jointdata: {
        goldCardNo: '',
        goldCardValidFromDate: null,
        defGoldCardValidFromDate: defIssueDate,
        goldCardPhotoUrl: {},
      },
      autoComplete: { title: 'Gold Card', code: 'GOLDCARD' },
    },
    // proof_of_address: {
    //   data: {
    //     proofOfAddress_Address: '',
    //     proofOfAddressIssueDate: defIssueDate,
    //     defProofOfAddressIssueDate: defIssueDate,
    //     proofOfAddressPhotoUrl: {},
    //   },
    //   autoComplete: { title: 'Proof of Address', code: 'PRFADD' },
    // },
    // marriage_certificate: {
    //   data: {
    //     marriageCerrificateRegNo: '',
    //     marriageCerrificateIssueDate: defIssueDate,
    //     defMarriageCerrificateIssueDate: defIssueDate,
    //     marriageCerrificatePhotoUrl: {},
    //   },
    //   autoComplete: { title: 'Marriage Certificate', code: 'MARCERT' },
    // },
  },

  checkedIdentificationTypes: [],
  checkedJointIdentificationTypes: [],

  idsInSovereignOnMount: 0,
  idSelected: 0,
  jointidSelected: 0,

  validIds: 0,
  jointValidIds: 0,

  idsRequired: 1,
  jointIdsRequired: 1,

  onSubmitIdentificationDetails: null,
  isValidIdentificationDetails: null,
  jointonSubmitIdentificationDetails: null,
  jointisValidIdentificationDetails: null,

  onSubmitDrLicenceDetails: null,
  isValidDrLicenceDetails: null,
  validDrLicenceCounter: 0,
  jointonSubmitDrLicenceDetails: null,
  jointisValidDrLicenceDetails: null,
  jointvalidDrLicenceCounter: 0,

  onSubmitPassportDetails: null,
  isValidPassportDetails: null,
  validPassportCounter: 0,
  jointonSubmitPassportDetails: null,
  jointisValidPassportDetails: null,
  jointvalidPassportCounter: 0,

  onSubmitFirearmsLicenceDetails: null,
  isValidFirearmsLicenceDetails: null,
  validFirearmsLicenceCounter: 0,
  jointonSubmitFirearmsLicenceDetails: null,
  jointisValidFirearmsLicenceDetails: null,
  jointvalidFirearmsLicenceCounter: 0,

  onSubmitKiwiAccessCardDetails: null,
  isValidKiwiAccessCardDetails: null,
  validKiwiAccessCardCounter: 0,
  jointonSubmitKiwiAccessCardDetails: null,
  jointisValidKiwiAccessCardDetails: null,
  jointvalidKiwiAccessCardCounter: 0,

  onSubmitCommunityServiceCardDetails: null,
  isValidCommunityServiceCardDetails: null,
  validCommunityServiceCardCounter: 0,
  jointonSubmitCommunityServiceCardDetails: null,
  jointisValidCommunityServiceCardDetails: null,
  jointvalidCommunityServiceCardCounter: 0,

  onSubmitBrithCertificateDetails: null,
  isValidBrithCertificateDetails: null,
  validBrithCertificateCounter: 0,
  jointonSubmitBrithCertificateDetails: null,
  jointisValidBrithCertificateDetails: null,
  jointvalidBrithCertificateCounter: 0,

  onSubmitCurrStudentIDDetails: null,
  isValidCurrStudentIDDetails: null,
  validCurrStudentIDCounter: 0,
  jointonSubmitCurrStudentIDDetails: null,
  jointisValidCurrStudentIDDetails: null,
  jointvalidCurrStudentIDCounter: 0,

  onSubmitGoldCardDetails: null,
  isValidGoldCardDetails: null,
  validGoldCardCounter: 0,
  jointonSubmitGoldCardDetails: null,
  jointisValidGoldCardDetails: null,
  jointvalidGoldCardCounter: 0,

  // >>>>>> Sovereign ID Relationships <<<<<< //

  sovIdentificationRelationships: [],

  // >>>>>> Sovereign Data checks <<<<<< //

  // Driver's licence
  isValidSovDriversLicence: null,
  isValidSovDriversLicenceNo: null,
  isValidSovDriversLicenceVersion: null,
  isValidSovDriversLicenceIssuedDate: null,
  isValidSovDriversLicenceExpiryDate: null,

  // Passport
  isValidSovPassport: null,
  isValidSovPassportNo: null,
  isValidSovPassportIssuedDate: null,
  isValidSovPassportExpiryDate: null,

  // Friearms Licence
  isValidSovFireArmsLicence: null,
  isValidSovFirearmsLicenceNo: null,
  isValidSovFirearmsLicenceIssuedDate: null,
  isValidSovFirearmsLicenceExpiryDate: null,

  // Kiwi Access Card
  isValidSovKiwiAccessCard: null,
  isValidSovKiwiAccessCardNo: null,
  isValidSovKiwiAccessCardIssuedDate: null,
  isValidSovKiwiAccessCardExpiryDate: null,

  // Community Service Card
  isValidSovCommunityServiceCard: null,
  isValidSovCommunityServiceCardNo: null,
  isValidSovCommunityServiceCardIssuedDate: null,
  isValidSovCommunityServiceCardExpiryDate: null,

  // Birth Certificate
  isValidSovBirthCertificate: null,
  isValidSovBirthCertificateRegNo: null,
  isValidSovBirthCertificateRegDate: null,

  // Current Student ID
  isValidSovCurrentStudentID: null,
  isValidSovCurrentStudentIdNo: null,
  isValidSovCurrentStudentIdIssuedDate: null,
  isValidSovCurrentStudentIdExpiryDate: null,

  // Gold Card
  isValidSovGoldCard: null,
  isValidSovGoldCardNo: null,
  isValidSovGoldCardValidFromDate: null,

  verifiedIdentificationDetailsSecure: false,
}

const identificationSlice = createSlice({
  name: namespace,
  initialState: initialState,
  reducers: {
    setSovIdentificationRelationships: (state, action) => {
      state.sovIdentificationRelationships = action.payload
    },

    setSelectedIdentificationTypes: (state, action) => {
      state.checkedIdentificationTypes = action.payload
    },
    setSelectedJointIdentificationTypes: (state, action) => {
      state.checkedJointIdentificationTypes = action.payload
    },

    // Form Submission setters
    setOnSubmitIdentificationDetails: (state, action) => {
      state.onSubmitIdentificationDetails = action.payload
    },
    setIsValidIdentificationDetails: (state, action) => {
      state.isValidIdentificationDetails = action.payload
    },
    setIdsSelected: (state, action) => {
      state.idSelected = action.payload
    },
    setOnSubmitJointIdentificationDetails: (state, action) => {
      state.jointonSubmitIdentificationDetails = action.payload
    },
    setIsValidJointIdentificationDetails: (state, action) => {
      state.jointisValidIdentificationDetails = action.payload
    },
    setJointIdsSelected: (state, action) => {
      state.jointidSelected = action.payload
    },

    setValidIDs: (state, action) => {
      state.validIds = action.payload
    },
    setJointValidIDs: (state, action) => {
      state.jointValidIds = action.payload
    },

    setIDsRequired: (state, action) => {
      state.idsRequired = action.payload
    },
    setJointIDsRequired: (state, action) => {
      state.jointIdsRequired = action.payload
    },

    // **************************** Submissoin and Validation **************************** //

    // Drivers Licence

    //Prime
    setOnSubmitDrLicenceDetails: (state, action) => {
      state.onSubmitDrLicenceDetails = action.payload
    },
    setIsValidDrLicenceDetails: (state, action) => {
      state.isValidDrLicenceDetails = action.payload
    },
    setIsValidDrLicenceCounter: (state, action) => {
      state.validDrLicenceCounter = action.payload
    },
    //Joint
    setOnSubmitJointDrLicenceDetails: (state, action) => {
      state.jointonSubmitDrLicenceDetails = action.payload
    },
    setIsValidJointDrLicenceDetails: (state, action) => {
      state.jointisValidDrLicenceDetails = action.payload
    },
    setIsValidJointDrLicenceCounter: (state, action) => {
      state.jointvalidDrLicenceCounter = action.payload
    },

    // Passport

    // Prime
    setOnSubmitPassportDetails: (state, action) => {
      state.onSubmitPassportDetails = action.payload
    },
    setIsValidPassportDetails: (state, action) => {
      state.isValidPassportDetails = action.payload
    },
    setIsValidPassportCounter: (state, action) => {
      state.validPassportCounter = action.payload
    },
    //Joint
    setOnSubmitJointPassportDetails: (state, action) => {
      state.jointonubmitPassportDetails = action.payload
    },
    setIsValidJointPassportDetails: (state, action) => {
      state.jointisValidPassportDetails = action.payload
    },
    setIsValidJointPassportCounter: (state, action) => {
      state.jointvalidPassportCounter = action.payload
    },

    // Prime
    setOnSubmitFirearmsLicenceDetails: (state, action) => {
      state.onSubmitFirearmsLicenceDetails = action.payload
    },
    setIsValidFirearmsLicenceDetails: (state, action) => {
      state.isValidFirearmsLicenceDetails = action.payload
    },
    setIsValidFirearmsLicenceCounter: (state, action) => {
      state.validFirearmsLicenceCounter = action.payload
    },

    //Joint
    setOnSubmitJointFirearmsLicenceDetails: (state, action) => {
      state.jointonSubmitFirearmsLicenceDetails = action.payload
    },
    setIsValidJointFirearmsLicenceDetails: (state, action) => {
      state.jointisValidFirearmsLicenceDetails = action.payload
    },
    setIsValidJointFirearmsLicenceCounter: (state, action) => {
      state.jointvalidFirearmsLicenceCounter = action.payload
    },

    // Prime
    setOnSubmitKiwiAccessCardDetails: (state, action) => {
      state.onSubmitKiwiAccessCardDetails = action.payload
    },
    setIsValidKiwiAccessCardDetails: (state, action) => {
      state.isValidKiwiAccessCardDetails = action.payload
    },
    setIsValidKiwiAccessCardCounter: (state, action) => {
      state.validKiwiAccessCardCounter = action.payload
    },

    //Joint
    setOnSubmitJointKiwiAccessCardDetails: (state, action) => {
      state.jointonSubmitKiwiAccessCardDetails = action.payload
    },
    setIsValidJointKiwiAccessCardDetails: (state, action) => {
      state.jointisValidKiwiAccessCardDetails = action.payload
    },
    setIsValidJointKiwiAccessCardCounter: (state, action) => {
      state.jointvalidKiwiAccessCardCounter = action.payload
    },

    // Prime
    setOnSubmitCommunityServiceCardDetails: (state, action) => {
      state.onSubmitCommunityServiceCardDetails = action.payload
    },
    setIsValidCommunityServiceCardDetails: (state, action) => {
      state.isValidCommunityServiceCardDetails = action.payload
    },
    setIsValidCommunityServiceCardCounter: (state, action) => {
      state.validCommunityServiceCardCounter = action.payload
    },

    //Joint
    setOnSubmitJointCommunityServiceCardDetails: (state, action) => {
      state.jointonSubmitCommunityServiceCardDetails = action.payload
    },
    setIsValidJointCommunityServiceCardDetails: (state, action) => {
      state.jointisValidCommunityServiceCardDetails = action.payload
    },
    setIsValidJointCommunityServiceCardCounter: (state, action) => {
      state.jointvalidCommunityServiceCardCounter = action.payload
    },

    // Prime
    setOnSubmitBrithCertificateDetails: (state, action) => {
      state.onSubmitBrithCertificateDetails = action.payload
    },
    setIsValidBrithCertificateDetails: (state, action) => {
      state.isValidBrithCertificateDetails = action.payload
    },
    setIsValidBirthCertificateCounter: (state, action) => {
      state.validBrithCertificateCounter = action.payload
    },

    //Joint
    setOnSubmitJointBrithCertificateDetails: (state, action) => {
      state.jointonSubmitBrithCertificateDetails = action.payload
    },
    setIsValidJointBrithCertificateDetails: (state, action) => {
      state.jointisValidBrithCertificateDetails = action.payload
    },
    setIsValidJointBirthCertificateCounter: (state, action) => {
      state.jointvalidBrithCertificateCounter = action.payload
    },

    // Prime
    setOnSubmitCurrStudentIDDetails: (state, action) => {
      state.onSubmitCurrStudentIDDetails = action.payload
    },
    setIsValidCurrStudentIDDetails: (state, action) => {
      state.isValidCurrStudentIDDetails = action.payload
    },
    setIsValidCurrStudentIDCounter: (state, action) => {
      state.validCurrStudentIDCounter = action.payload
    },

    //Joint
    setOnSubmitJointCurrStudentIDDetails: (state, action) => {
      state.jointonSubmitCurrStudentIDDetails = action.payload
    },
    setIsValidJointCurrStudentIDDetails: (state, action) => {
      state.jointisValidCurrStudentIDDetails = action.payload
    },
    setIsValidJointCurrStudentIDCounter: (state, action) => {
      state.jointvalidCurrStudentIDCounter = action.payload
    },

    // Prime
    setOnSubmitGoldCardDetails: (state, action) => {
      state.onSubmitGoldCardDetails = action.payload
    },
    setIsValidGoldCardDetails: (state, action) => {
      state.isValidGoldCardDetails = action.payload
    },
    setIsValidGoldCardCounter: (state, action) => {
      state.validGoldCardCounter = action.payload
    },

    //Joint
    setOnSubmitJointGoldCardDetails: (state, action) => {
      state.jointonSubmitGoldCardDetails = action.payload
    },
    setIsValidJointGoldCardDetails: (state, action) => {
      state.jointisValidGoldCardDetails = action.payload
    },
    setIsValidJointGoldCardCounter: (state, action) => {
      state.jointvalidGoldCardCounter = action.payload
    },

    // ************************************************************** End of Submission and Validation Setters ******************************************************************************

    // ID Fields on

    // Drivers Licence
    setdriversLicenceNo: (state, action) => {
      state.identificationTypes.drivers_licence.data.driversLicenceNo = action.payload
    },
    setdriversLicenceVersion: (state, action) => {
      state.identificationTypes.drivers_licence.data.driversLicenceVersion = action.payload
    },
    setdrlicenceType: (state, action) => {
      state.identificationTypes.drivers_licence.data.licenceType = action.payload
    },
    setdrLicenceIssueDate: (state, action) => {
      state.identificationTypes.drivers_licence.data.drLicenceIssueDate = action.payload
    },
    setdrLicenceExpiryDate: (state, action) => {
      state.identificationTypes.drivers_licence.data.drLicenceExpiryDate = action.payload
    },
    setdrLicencePhotoUrl: (state, action) => {
      state.identificationTypes.drivers_licence.data.drLicencePhotoUrl = action.payload
    },

    // Sovereign update
    setsovdriversLicenceNo: (state, action) => {
      state.identificationTypes.drivers_licence.data.sovdriversLicenceNo = action.payload
    },
    setsovdriversLicenceVersion: (state, action) => {
      state.identificationTypes.drivers_licence.data.sovdriversLicenceVersion = action.payload
    },
    setsovdriversLicenceIssueDate: (state, action) => {
      state.identificationTypes.drivers_licence.data.sovdriversLicenceIssueDate = action.payload
    },
    setsovdriversLicenceExpiryDate: (state, action) => {
      state.identificationTypes.drivers_licence.data.sovdriversLicenceExpiryDate = action.payload
    },
    setsovdrLicenceIsDirty: (state, action) => {
      state.identificationTypes.drivers_licence.data.sovdrLicenceIsDirty = action.payload
    },
    setdrLicenceSovId: (state, action) => {
      state.identificationTypes.drivers_licence.data.sovid = action.payload
    },
    setdrLicenceSovIdVersion: (state, action) => {
      state.identificationTypes.drivers_licence.data.sovidversion = action.payload
    },
    setdrLicenceSovType: (state, action) => {
      state.identificationTypes.drivers_licence.data.sovType = action.payload
    },
    setdrLicenceSovTypeVersion: (state, action) => {
      state.identificationTypes.drivers_licence.data.sovTypeversion = action.payload
    },
    setdrLicenceSovAttributes: (state, action) => {
      state.identificationTypes.drivers_licence.data.sovAttributes = action.payload
    },
    setdrLicenceSovAttributesVersion: (state, action) => {
      state.identificationTypes.drivers_licence.data.sovAttributesversion = action.payload
    },
    setdrLicenceSovAttributeId: (state, action) => {
      state.identificationTypes.drivers_licence.data.sovAttributeId = action.payload
    },
    setdrLicenceSovTypeUdated: (state, action) => {
      state.identificationTypes.drivers_licence.data.sovTypeUpdated = action.payload
    },
    setdrLicencesovTypeExpire: (state, action) => {
      state.identificationTypes.drivers_licence.data.sovTypeExpire = action.payload
    },

    setdrLicenceIsSelected: (state, action) => {
      state.identificationTypes.drivers_licence.isSelected = action.payload
    },
    //Joint
    setJointdriversLicenceNo: (state, action) => {
      state.identificationTypes.drivers_licence.jointdata.driversLicenceNo = action.payload
    },
    setJointdriversLicenceVersion: (state, action) => {
      state.identificationTypes.drivers_licence.jointdata.driversLicenceVersion = action.payload
    },
    setJointdrlicenceType: (state, action) => {
      state.identificationTypes.drivers_licence.jointdata.licenceType = action.payload
    },
    setJointdrLicenceIssueDate: (state, action) => {
      state.identificationTypes.drivers_licence.jointdata.drLicenceIssueDate = action.payload
    },
    setJointdrLicenceExpiryDate: (state, action) => {
      state.identificationTypes.drivers_licence.jointdata.drLicenceExpiryDate = action.payload
    },
    setJointdrLicencePhotoUrl: (state, action) => {
      state.identificationTypes.drivers_licence.jointdata.drLicencePhotoUrl = action.payload
    },

    // Passport
    setPassportNo: (state, action) => {
      state.identificationTypes.passport.data.passportNo = action.payload
    },
    setPassportIssueDate: (state, action) => {
      state.identificationTypes.passport.data.passportIssueDate = action.payload
    },
    setPassportExpiryDate: (state, action) => {
      state.identificationTypes.passport.data.passportExpiryDate = action.payload
    },
    setPassportPhotoUrl: (state, action) => {
      state.identificationTypes.passport.data.passportPhotoUrl = action.payload
    },

    // Sovereign update
    setsovpassportNo: (state, action) => {
      state.identificationTypes.passport.data.sovpassportNo = action.payload
    },
    setsovpassportIssueDate: (state, action) => {
      state.identificationTypes.passport.data.sovpassportIssueDate = action.payload
    },
    setsovpassportExpiryDate: (state, action) => {
      state.identificationTypes.passport.data.sovpassportExpiryDate = action.payload
    },
    setsovpassportIsDirty: (state, action) => {
      state.identificationTypes.passport.data.sovpassportIsDirty = action.payload
    },
    setpassportSovId: (state, action) => {
      state.identificationTypes.passport.data.sovid = action.payload
    },
    setpassportSovType: (state, action) => {
      state.identificationTypes.passport.data.sovType = action.payload
    },
    setpassportSovAttributes: (state, action) => {
      state.identificationTypes.passport.data.sovAttributes = action.payload
    },
    setpassportSovAttributeId: (state, action) => {
      state.identificationTypes.passport.data.sovAttributeId = action.payload
    },
    setpassportSovTypeUdated: (state, action) => {
      state.identificationTypes.passport.data.sovTypeUpdated = action.payload
    },
    setpassportsovTypeExpire: (state, action) => {
      state.identificationTypes.passport.data.sovTypeExpire = action.payload
    },

    //Joint
    setJointPassportNo: (state, action) => {
      state.identificationTypes.passport.jointdata.passportNo = action.payload
    },
    setJointPassportIssueDate: (state, action) => {
      state.identificationTypes.passport.jointdata.passportIssueDate = action.payload
    },
    setJointPassportExpiryDate: (state, action) => {
      state.identificationTypes.passport.jointdata.passportExpiryDate = action.payload
    },
    setJointPassportPhotoUrl: (state, action) => {
      state.identificationTypes.passport.jointdata.passportPhotoUrl = action.payload
    },

    // Firearms Licence

    setFirearmsLicenceNo: (state, action) => {
      state.identificationTypes.firearms_licence.data.firearmsLicenceNo = action.payload
    },
    setFirearmsLicenceVersion: (state, action) => {
      state.identificationTypes.firearms_licence.data.firearmsLicenceVersion = action.payload
    },
    setFirearmsLicenceIssueDate: (state, action) => {
      state.identificationTypes.firearms_licence.data.firearmsLicenceIssueDate = action.payload
    },
    setFirearmsLicenceExpiryDate: (state, action) => {
      state.identificationTypes.firearms_licence.data.firearmsLicenceExpiryDate = action.payload
    },
    setFirearmsLicencePhotoUrl: (state, action) => {
      state.identificationTypes.firearms_licence.data.firearmsLicencePhotoUrl = action.payload
    },

    // Sovereign update
    setsovfirearmsLicenceNo: (state, action) => {
      state.identificationTypes.firearms_licence.data.sovfirearmsLicenceNo = action.payload
    },
    setsovfirearmsLicenceIssueDate: (state, action) => {
      state.identificationTypes.firearms_licence.data.sovfirearmsLicenceIssueDate = action.payload
    },
    setsovfirearmsLicenceExpiryDate: (state, action) => {
      state.identificationTypes.firearms_licence.data.sovfirearmsLicenceExpiryDate = action.payload
    },
    setsovfirearmsLicenceIsDirty: (state, action) => {
      state.identificationTypes.firearms_licence.data.sovfirearmsLicenceIsDirty = action.payload
    },
    setfirearms_licenceSovId: (state, action) => {
      state.identificationTypes.firearms_licence.data.sovid = action.payload
    },
    setfirearms_licenceSovType: (state, action) => {
      state.identificationTypes.firearms_licence.data.sovType = action.payload
    },
    setfirearms_licenceSovAttributes: (state, action) => {
      state.identificationTypes.firearms_licence.data.sovAttributes = action.payload
    },
    setfirearms_licenceSovAttributeId: (state, action) => {
      state.identificationTypes.firearms_licence.data.sovAttributeId = action.payload
    },
    setfirearms_licenceSovTypeUdated: (state, action) => {
      state.identificationTypes.firearms_licence.data.sovTypeUpdated = action.payload
    },
    setfirearms_licencesovTypeExpire: (state, action) => {
      state.identificationTypes.firearms_licence.data.sovTypeExpire = action.payload
    },

    //Joint
    setJointFirearmsLicenceNo: (state, action) => {
      state.identificationTypes.firearms_licence.jointdata.firearmsLicenceNo = action.payload
    },
    setJointFirearmsLicenceVersion: (state, action) => {
      state.identificationTypes.firearms_licence.jointdata.firearmsLicenceVersion = action.payload
    },
    setJointFirearmsLicenceIssueDate: (state, action) => {
      state.identificationTypes.firearms_licence.jointdata.firearmsLicenceIssueDate = action.payload
    },
    setJointFirearmsLicenceExpiryDate: (state, action) => {
      state.identificationTypes.firearms_licence.jointdata.firearmsLicenceExpiryDate = action.payload
    },
    setJointFirearmsLicencePhotoUrl: (state, action) => {
      state.identificationTypes.firearms_licence.jointdata.firearmsLicencePhotoUrl = action.payload
    },

    // Kiwi Access Card
    setKiwiAccessCardNo: (state, action) => {
      state.identificationTypes.kiwi_access_card.data.kiwiAccessCardNo = action.payload
    },
    setKiwiAccessCardIssueDate: (state, action) => {
      state.identificationTypes.kiwi_access_card.data.kiwiAccessCardIssueDate = action.payload
    },
    setKiwiAccessCardExpiryDate: (state, action) => {
      state.identificationTypes.kiwi_access_card.data.kiwiAccessCardExpiryDate = action.payload
    },
    setKiwiAccessCardPhotoUrl: (state, action) => {
      state.identificationTypes.kiwi_access_card.data.kiwiAccessCardPhotoUrl = action.payload
    },

    // Sovereign update
    setsovkiwiAccessCardNo: (state, action) => {
      state.identificationTypes.kiwi_access_card.data.sovkiwiAccessCardNo = action.payload
    },
    setsovkiwiAccessCardIssueDate: (state, action) => {
      state.identificationTypes.kiwi_access_card.data.sovkiwiAccessCardIssueDate = action.payload
    },
    setsovkiwiAccessCardExpiryDate: (state, action) => {
      state.identificationTypes.kiwi_access_card.data.sovkiwiAccessCardExpiryDate = action.payload
    },
    setsovfirearmsLicenceIsDirty: (state, action) => {
      state.identificationTypes.kiwi_access_card.data.sovkiwiAccessCardIsDirty = action.payload
    },
    setkiwi_access_cardSovId: (state, action) => {
      state.identificationTypes.kiwi_access_card.data.sovid = action.payload
    },
    setkiwi_access_cardSovType: (state, action) => {
      state.identificationTypes.kiwi_access_card.data.sovType = action.payload
    },
    setkiwi_access_cardSovAttributes: (state, action) => {
      state.identificationTypes.kiwi_access_card.data.sovAttributes = action.payload
    },
    setkiwi_access_cardSovAttributeId: (state, action) => {
      state.identificationTypes.kiwi_access_card.data.sovAttributeId = action.payload
    },
    setkiwi_access_cardSovTypeUdated: (state, action) => {
      state.identificationTypes.kiwi_access_card.data.sovTypeUpdated = action.payload
    },
    setkiwi_access_cardsovTypeExpire: (state, action) => {
      state.identificationTypes.kiwi_access_card.data.sovTypeExpire = action.payload
    },

    //Joint
    setJointKiwiAccessCardNo: (state, action) => {
      state.identificationTypes.kiwi_access_card.jointdata.kiwiAccessCardNo = action.payload
    },
    setJointKiwiAccessCardIssueDate: (state, action) => {
      state.identificationTypes.kiwi_access_card.jointdata.kiwiAccessCardIssueDate = action.payload
    },
    setJointKiwiAccessCardExpiryDate: (state, action) => {
      state.identificationTypes.kiwi_access_card.jointdata.kiwiAccessCardExpiryDate = action.payload
    },
    setJointKiwiAccessCardPhotoUrl: (state, action) => {
      state.identificationTypes.kiwi_access_card.jointdata.kiwiAccessCardPhotoUrl = action.payload
    },

    // Community Service Card
    setCommunityServiceCardNo: (state, action) => {
      state.identificationTypes.community_service_card.data.commServiceCardNo = action.payload
    },
    setCommunityServiceCardIssueDate: (state, action) => {
      state.identificationTypes.community_service_card.data.commServiceCardIssueDate = action.payload
    },
    setCommunityServiceCardExpiryDate: (state, action) => {
      state.identificationTypes.community_service_card.data.commServiceCardExpiryDate = action.payload
    },
    setCommunityServiceCardPhotoUrl: (state, action) => {
      state.identificationTypes.community_service_card.data.commServiceCardPhotoUrl = action.payload
    },

    // Sovereign update
    setsovcommServiceCardNo: (state, action) => {
      state.identificationTypes.community_service_card.data.sovcommServiceCardNo = action.payload
    },
    setsovcommServiceCardIssueDate: (state, action) => {
      state.identificationTypes.community_service_card.data.sovcommServiceCardIssueDate = action.payload
    },
    setsovcommServiceCardExpiryDate: (state, action) => {
      state.identificationTypes.community_service_card.data.sovcommServiceCardExpiryDate = action.payload
    },
    setsovcommServiceCardIsDirty: (state, action) => {
      state.identificationTypes.community_service_card.data.sovcommServiceCardIsDirty = action.payload
    },
    setcommunity_service_cardSovId: (state, action) => {
      state.identificationTypes.community_service_card.data.sovid = action.payload
    },
    setcommunity_service_cardSovType: (state, action) => {
      state.identificationTypes.community_service_card.data.sovType = action.payload
    },
    setcommunity_service_cardSovAttributes: (state, action) => {
      state.identificationTypes.community_service_card.data.sovAttributes = action.payload
    },
    setcommunity_service_cardSovAttributeId: (state, action) => {
      state.identificationTypes.community_service_card.data.sovAttributeId = action.payload
    },
    setcommunity_service_cardSovTypeUdated: (state, action) => {
      state.identificationTypes.community_service_card.data.sovTypeUpdated = action.payload
    },
    setcommunity_service_cardsovTypeExpire: (state, action) => {
      state.identificationTypes.community_service_card.data.sovTypeExpire = action.payload
    },

    //Joint
    setJointCommunityServiceCardNo: (state, action) => {
      state.identificationTypes.community_service_card.jointdata.commServiceCardNo = action.payload
    },
    setJointCommunityServiceCardIssueDate: (state, action) => {
      state.identificationTypes.community_service_card.jointdata.commServiceCardIssueDate = action.payload
    },
    setJointCommunityServiceCardExpiryDate: (state, action) => {
      state.identificationTypes.community_service_card.jointdata.commServiceCardExpiryDate = action.payload
    },
    setJointCommunityServiceCardPhotoUrl: (state, action) => {
      state.identificationTypes.community_service_card.jointdata.commServiceCardPhotoUrl = action.payload
    },

    // Birth Certificate
    setBirthCertificateRegNo: (state, action) => {
      state.identificationTypes.birth_certificate.data.birthCertificateRegNo = action.payload
    },
    setDateOfBirth: (state, action) => {
      state.identificationTypes.birth_certificate.data.datOfBirth = action.payload
    },
    setPlaceOfBirth: (state, action) => {
      state.identificationTypes.birth_certificate.data.placeOfBirth = action.payload
    },
    setBirthCertificatePhotoUrl: (state, action) => {
      state.identificationTypes.birth_certificate.data.birthCertificatePhotoUrl = action.payload
    },

    // Sovereign update
    setsovbirthCertificateRegNo: (state, action) => {
      state.identificationTypes.birth_certificate.data.sovbirthCertificateRegNo = action.payload
    },
    setsovbirthCertificateIssueDate: (state, action) => {
      state.identificationTypes.birth_certificate.data.sovbirthCertificateIssueDate = action.payload
    },
    setsovbirthCertificateIsDirty: (state, action) => {
      state.identificationTypes.birth_certificate.data.sovbirthCertificateIsDirty = action.payload
    },
    setbirth_certificateSovId: (state, action) => {
      state.identificationTypes.birth_certificate.data.sovid = action.payload
    },
    setbirth_certificateSovType: (state, action) => {
      state.identificationTypes.birth_certificate.data.sovType = action.payload
    },
    setbirth_certificateSovAttributes: (state, action) => {
      state.identificationTypes.birth_certificate.data.sovAttributes = action.payload
    },
    setbirth_certificateSovAttributeId: (state, action) => {
      state.identificationTypes.birth_certificate.data.sovAttributeId = action.payload
    },
    setbirth_certificateSovTypeUdated: (state, action) => {
      state.identificationTypes.birth_certificate.data.sovTypeUpdated = action.payload
    },
    setbirth_certificatesovTypeExpire: (state, action) => {
      state.identificationTypes.birth_certificate.data.sovTypeExpire = action.payload
    },

    //Joint
    setJointBirthCertificateRegNo: (state, action) => {
      state.identificationTypes.birth_certificate.jointdata.birthCertificateRegNo = action.payload
    },
    setJointDateOfBirth: (state, action) => {
      state.identificationTypes.birth_certificate.jointdata.datOfBirth = action.payload
    },
    setJointPlaceOfBirth: (state, action) => {
      state.identificationTypes.birth_certificate.jointdata.placeOfBirth = action.payload
    },
    setJointBirthCertificatePhotoUrl: (state, action) => {
      state.identificationTypes.birth_certificate.jointdata.birthCertificatePhotoUrl = action.payload
    },

    // Current Stident ID
    setCurrentStudentIdNo: (state, action) => {
      state.identificationTypes.current_Student_id.data.currStudentIdNo = action.payload
    },
    setCurrentStudentIdIssueDate: (state, action) => {
      state.identificationTypes.current_Student_id.data.currStudentIdIssueDate = action.payload
    },
    setCurrentStudentIdExpiryDate: (state, action) => {
      state.identificationTypes.current_Student_id.data.currStudentIdExpiryDate = action.payload
    },
    setCurrentStudentIdPhotoUrl: (state, action) => {
      state.identificationTypes.current_Student_id.data.currStudentIdPhotoUrl = action.payload
    },

    // Sovereign update
    setsovcurrStudentIdNo: (state, action) => {
      state.identificationTypes.current_Student_id.data.sovcurrStudentIdNo = action.payload
    },
    setsovcurrStudentIdIssueDate: (state, action) => {
      state.identificationTypes.current_Student_id.data.sovcurrStudentIdIssueDate = action.payload
    },
    setsovcurrStudentIdExpiryDate: (state, action) => {
      state.identificationTypes.current_Student_id.data.sovcurrStudentIdExpiryDate = action.payload
    },
    setsovcurrStudentIdIsDirty: (state, action) => {
      state.identificationTypes.current_Student_id.data.sovcurrStudentIdIsDirty = action.payload
    },
    setcurrent_Student_idSovId: (state, action) => {
      state.identificationTypes.current_Student_id.data.sovid = action.payload
    },
    setcurrent_Student_idSovType: (state, action) => {
      state.identificationTypes.current_Student_id.data.sovType = action.payload
    },
    setcurrent_Student_idSovAttributes: (state, action) => {
      state.identificationTypes.current_Student_id.data.sovAttributes = action.payload
    },
    setcurrent_Student_idSovAttributeId: (state, action) => {
      state.identificationTypes.current_Student_id.data.sovAttributeId = action.payload
    },
    setcurrent_Student_idSovTypeUdated: (state, action) => {
      state.identificationTypes.current_Student_id.data.sovTypeUpdated = action.payload
    },
    setcurrent_Student_idsovTypeExpire: (state, action) => {
      state.identificationTypes.current_Student_id.data.sovTypeExpire = action.payload
    },

    //Joint
    setJointCurrentStudentIdNo: (state, action) => {
      state.identificationTypes.current_Student_id.jointdata.currStudentIdNo = action.payload
    },
    setJointCurrentStudentIdIssueDate: (state, action) => {
      state.identificationTypes.current_Student_id.jointdata.currStudentIdIssueDate = action.payload
    },
    setJointCurrentStudentIdExpiryDate: (state, action) => {
      state.identificationTypes.current_Student_id.jointdata.currStudentIdExpiryDate = action.payload
    },
    setJointCurrentStudentIdPhotoUrl: (state, action) => {
      state.identificationTypes.current_Student_id.jointdata.currStudentIdPhotoUrl = action.payload
    },

    // Gold Card
    setGoldCardNo: (state, action) => {
      state.identificationTypes.gold_card.data.goldCardNo = action.payload
    },
    setGoldCardValidFromDate: (state, action) => {
      state.identificationTypes.gold_card.data.goldCardValidFromDate = action.payload
    },
    setGoldCardPhotoUrl: (state, action) => {
      state.identificationTypes.gold_card.data.goldCardPhotoUrl = action.payload
    },

    // Sovereign update
    setsovgoldCardNo: (state, action) => {
      state.identificationTypes.gold_card.data.sovgoldCardNo = action.payload
    },
    setsovgoldCardIssueDate: (state, action) => {
      state.identificationTypes.gold_card.data.sovgoldCardIssueDate = action.payload
    },
    setsovgoldCardExpiryDate: (state, action) => {
      state.identificationTypes.gold_card.data.sovgoldCardExpiryDate = action.payload
    },
    setsovgoldCardIsDirty: (state, action) => {
      state.identificationTypes.gold_card.data.sovgoldCardIsDirty = action.payload
    },
    setgold_cardSovId: (state, action) => {
      state.identificationTypes.gold_card.data.sovid = action.payload
    },
    setgold_cardSovType: (state, action) => {
      state.identificationTypes.gold_card.data.sovType = action.payload
    },
    setgold_cardSovAttributes: (state, action) => {
      state.identificationTypes.gold_card.data.sovAttributes = action.payload
    },
    setgold_cardSovAttributeId: (state, action) => {
      state.identificationTypes.gold_card.data.sovAttributeId = action.payload
    },
    setgold_cardSovTypeUdated: (state, action) => {
      state.identificationTypes.gold_card.data.sovTypeUpdated = action.payload
    },
    setgold_cardsovTypeExpire: (state, action) => {
      state.identificationTypes.currgold_cardent_Student_id.data.sovTypeExpire = action.payload
    },

    //Joint
    setJointGoldCardNo: (state, action) => {
      state.identificationTypes.gold_card.jointdata.goldCardNo = action.payload
    },
    setJointGoldCardValidFromDate: (state, action) => {
      state.identificationTypes.gold_card.jointdata.goldCardValidFromDate = action.payload
    },
    setJointGoldCardPhotoUrl: (state, action) => {
      state.identificationTypes.gold_card.jointdata.goldCardPhotoUrl = action.payload
    },

    // Proof of address
    setProofOfAddressPhotoUrl: (state, action) => {
      state.identificationTypes.proof_of_address.data.proofOfAddressPhotoUrl = action.payload
    },
    setProofOfAddressIsSelected: (state, action) => {
      state.identificationTypes.proof_of_address.isSelected = action.payload
    },
    //Joint
    setJointProofOfAddressPhotoUrl: (state, action) => {
      state.identificationTypes.proof_of_address.data.proofOfAddressPhotoUrl = action.payload
    },

    // Marriage Certificate
    setMarriageCertificateRegNo: (state, action) => {
      state.identificationTypes.marriage_certificate.data.marriageCerrificateRegNo = action.payload
    },
    setMarriageCertificateIssueDate: (state, action) => {
      state.identificationTypes.marriage_certificate.data.marriageCerrificateIssueDate = action.payload
    },
    setMarriageCertificatePhotoUrl: (state, action) => {
      state.identificationTypes.marriage_certificate.data.marriageCerrificatePhotoUrl = action.payload
    },
    //Joint
    setJointMarriageCertificateRegNo: (state, action) => {
      state.identificationTypes.marriage_certificate.jointdata.marriageCerrificateRegNo = action.payload
    },
    setJointMarriageCertificateIssueDate: (state, action) => {
      state.identificationTypes.marriage_certificate.jointdata.marriageCerrificateIssueDate = action.payload
    },
    setJointMarriageCertificatePhotoUrl: (state, action) => {
      state.identificationTypes.marriage_certificate.jointdata.marriageCerrificatePhotoUrl = action.payload
    },

    // >>>>>>>>>>>>>>>>>>>>>>>>> Sovereign ID data check setters <<<<<<<<<<<<<<<<<<<<<<<<<<<< //

    setIdsInSovereignOnMount: (state, action) => {
      state.idsInSovereignOnMount = action.payload
    },

    // Drivers Licence Checks

    setisValidSovDriversLicence: (state, action) => {
      state.isValidSovDriversLicence = action.payload
    },
    setisValidSovDriversLicenceNo: (state, action) => {
      state.isValidSovDriversLicenceNo = action.payload
    },
    setisValidSovDriversLicenceVersion: (state, action) => {
      state.isValidSovDriversLicenceVersion = action.payload
    },
    setisValidSovDriversLicenceIssuedDate: (state, action) => {
      state.isValidSovDriversLicenceIssuedDate = action.payload
    },
    setisValidSovDriversLicenceExpiryDate: (state, action) => {
      state.isValidSovDriversLicenceExpiryDate = action.payload
    },

    // Passport Checks
    setisValidSovPassport: (state, action) => {
      state.isValidSovPassport = action.payload
    },
    setisValidSovPassportNo: (state, action) => {
      state.isValidSovPassportNo = action.payload
    },
    setisValidSovPassportIssuedDate: (state, action) => {
      state.isValidSovPassportIssuedDate = action.payload
    },
    setisValidSovPassportExpiryDate: (state, action) => {
      state.isValidSovPassportExpiryDate = action.payload
    },

    // Firearms Licence Checks
    setisValidSovFirearmsLicence: (state, action) => {
      state.isValidSovDriversLicence = action.payload
    },
    setisValidSovFirearmsLicenceNo: (state, action) => {
      state.isValidSovFireArmsLicence = action.payload
    },
    setisValidSovFirearmsLicenceIssuedDate: (state, action) => {
      state.isValidSovFirearmsLicenceIssuedDate = action.payload
    },
    setisValidSovFirearmsLicenceExpiryDate: (state, action) => {
      state.isValidSovFirearmsLicenceExpiryDate = action.payload
    },

    // Kiwi Access Card Checks
    setisValidSovKiwiAccessCard: (state, action) => {
      state.isValidSovKiwiAccessCard = action.payload
    },
    setisValidSovKiwiAccessCardNo: (state, action) => {
      state.isValidSovKiwiAccessCardNo = action.payload
    },
    setisValidSovKiwiAccessCardIssuedDate: (state, action) => {
      state.isValidSovKiwiAccessCardIssuedDate = action.payload
    },
    setisValidSovKiwiAccessCardExpiryDate: (state, action) => {
      state.isValidSovKiwiAccessCardExpiryDate = action.payload
    },

    // Community Service Card Checks
    setisValidSovCommunityServiceCard: (state, action) => {
      state.isValidSovCommunityServiceCard = action.payload
    },
    setisValidSovCommunityServiceCardNo: (state, action) => {
      state.isValidSovCommunityServiceCardNo = action.payload
    },
    setisValidSovCommunityServiceCardIssuedDate: (state, action) => {
      state.isValidSovCommunityServiceCardIssuedDate = action.payload
    },
    setisValidSovCommunityServiceCardExpiryDate: (state, action) => {
      state.isValidSovCommunityServiceCardExpiryDate = action.payload
    },

    // Birth Certificate Checks
    setisValidSovBirthCertificate: (state, action) => {
      state.isValidSovBirthCertificate = action.payload
    },
    setisValidSovBirthCertificateRegNo: (state, action) => {
      state.isValidSovBirthCertificateRegNo = action.payload
    },
    setisValidSovBirthCertificateRegDate: (state, action) => {
      state.isValidSovBirthCertificateRegDate = action.payload
    },

    // Current Student ID Checks
    setisValidSovCurrentStudentID: (state, action) => {
      state.isValidSovCurrentStudentID = action.payload
    },
    setisValidSovCurrentStudentIdNo: (state, action) => {
      state.isValidSovCurrentStudentIdNo = action.payload
    },
    setisValidSovCurrentStudentIdIssuedDate: (state, action) => {
      state.isValidSovCurrentStudentIdIssuedDate = action.payload
    },
    setisValidSovCurrentStudentIdExpiryDate: (state, action) => {
      state.isValidSovCurrentStudentIdExpiryDate = action.payload
    },

    // Gold Card Checks
    setisValidSovGoldCard: (state, action) => {
      state.isValidSovGoldCard = action.payload
    },
    setisValidSovGoldCardNo: (state, action) => {
      state.isValidSovGoldCardNo = action.payload
    },
    setisValidSovGoldCardValidFromDate: (state, action) => {
      state.isValidSovGoldCardValidFromDate = action.payload
    },

    setVerifiedIdentificationDetailsSecure: (state, action) => {
      state.verifiedIdentificationDetailsSecure = action.payload
    },
  },
})

export const identificationActions = identificationSlice.actions
export default identificationSlice
