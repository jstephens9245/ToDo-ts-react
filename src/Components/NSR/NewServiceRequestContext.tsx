// import React, { useContext }  from "react";
// import ProjectInformation from "./ProjectInformation/ProjectInformation";
import moment from "moment";

export const initialState = {
    projectInformation: {
        jobType: "",
        developmentType: "",
        jobSiteReady: ""
    },
    developmentDetails: {
        homeType: "",
        developmentName: "",
        city: "",
        zipCode: "",
        crossStreets: ""
    },
    siteDetails: {
        streetNumber: "",
        streetName: "",
        unitNumber: "",
        lotNumber: "",
        numberOfUnits: 0,
        additionalSites: [
            {
                streetNumber: "",
                streetName: "",
                unitNumber: "",
                lotNumber: ""
            }
        ]
    },
    serviceInformation: {
        serviceNeeded: "",
        denialOfService: false
    },
    serviceDetails: {
        electricServiceDetails: {
            serviceOptions: "",
            requestType: "",
            constructionMeterType: "",
            ampsRequired: "",
            serviceLength: "",
            voltageClass: "",
            additionalNotes: "",
            serviceStartDate: "",
        },
        gasServiceDetails: {
            squareFootage: "",
            undergroundFacilities: {
                'City Water / Sewer / Geothermal': false,
                'Sprinkler System': false,
                'Septic Field / Well': false,
                'Private Underground Wiring': false,
                'Underground Fence': false,
                other: false,
                otherDetails: ""
            },
            applianceLoad: {
                furnaceSpaceHeaterLoad: "",
                waterHeaterLoad: "",
                clothesDryerLoad: "",
                stoveOvenLoad: "",
                otherAppliance: "",
                otherApplianceLoad: ""
            },
            meterSize: "",
            additionalNotes: "",
            serviceStartDate: ""
        }
    },
    outdoorProtectiveLighting: false,
    electricVehicleCharging: false,
    workOrderInitiator: {
        firstName: "John",
        lastName: "Smith",
        emailAddress: "john.smith@gmail.com",
        phoneNumber: "(313) 123-1234",
        company: "Acme Builders",
        position: "Construction Manager"
    },
    owner: {
        firstName: "",
        lastName: "",
        emailAddress: "",
        phoneNumber: ""
    },
    primary: {
        firstName: "",
        lastName: "",
        emailAddress: "",
        phoneNumber: ""
    },
    billingContact: {
        firstName: "",
        lastName: "",
        emailAddress: "",
        phoneNumber: ""
    },
    billingAddress: {
        streetName: "",
        aptUnitNumber: "",
        city: "",
        state: "MI",
        zipCode: ""
    },
    hashLink: "",

    tools: {
        canSubmit: false
    }

    // contactInformation: {
    //     firstName: ""
    // },
  };
  export const canSubmit = false

  export type State = typeof initialState;

  export type Action =
    | { type: 'setJobType', jobType: string }
    | { type: 'setDevelopmentType', developmentType: string }
    | { type: 'setJobSiteReady', jobSiteReady: string }

    | { type: 'setHomeType', homeType: string }
    | { type: 'setDevelopmentName', developmentName: string }
    | { type: 'setCity', city: string }
    | { type: 'setZip', zipCode: string }
    | { type: 'setCrossStreets', crossStreets: string }

    | { type: 'setStreetNumber', streetNumber: string }
    | { type: 'setStreetName', streetName: string }
    | { type: 'setUnitNumber', unitNumber: string }
    | { type: 'setLotNumber', lotNumber: string }
    | { type: 'setNumberOfUnits', numberOfUnits: number }

    // service information page
    | { type: 'setServiceNeeded', serviceNeeded: string }
    | { type: 'setDenialOfService', denialOfService: boolean }

    | { type: 'setServiceOptions', serviceOptions: string }
    | { type: 'setRequestType', requestType: string }
    | { type: 'setConstructionMeterType', constructionMeterType: string, }
    | { type: 'setAmpsRequired', ampsRequired: string,}
    | { type: 'setServiceLength', serviceLength: string,}
    | { type: 'setVoltageClass', voltageClass: string, }
    | { type: 'setElectricAdditionalNotes', additionalNotes: string, }
    | { type: 'setElectricServiceStartDate', serviceStartDate: string }

    | { type: 'setSquareFootage', squareFootage: string }
    | { type: 'setUndergroundFacilities', facilityType: string, value: string}

    | { type: 'setFurnaceSpaceHeaterLoad', furnaceSpaceHeaterLoad: string }
    | { type: 'setWaterHeaterLoad', waterHeaterLoad: string }
    | { type: 'setClothesDryerLoad', clothesDryerLoad: string }
    | { type: 'setStoveOvenLoad', stoveOvenLoad: string }
    | { type: 'setOtherAppliance', otherAppliance: string }
    | { type: 'setOtherApplianceLoad', otherApplianceLoad: string }

    | { type: 'setMeterSize', meterSize: string }
    | { type: 'setGasAdditionalNotes', additionalNotes: string }
    | { type: 'setGasServiceStartDate', serviceStartDate: string }

    | { type: 'setOutdoorProtectiveLighting', outdoorProtectiveLighting: boolean }
    | { type: 'setElectricVehicleCharging', electricVehicleCharging: boolean }

    // V1 - contact information page
    | { type: 'setOwnerFirstName', firstName: string }
    | { type: 'setOwnerLastName', lastName: string }
    | { type: 'setOwnerEmailAddress', emailAddress: string }
    | { type: 'setOwnerPhoneNumber', phoneNumber: string }

    | { type: 'setPrimaryFirstName', firstName: string }
    | { type: 'setPrimaryLastName', lastName: string }
    | { type: 'setPrimaryEmailAddress', emailAddress: string }
    | { type: 'setPrimaryPhoneNumber', phoneNumber: string }

    | { type: 'setBillingContactFirstName', firstName: string }
    | { type: 'setBillingContactLastName', lastName: string }
    | { type: 'setBillingContactEmailAddress', emailAddress: string }
    | { type: 'setBillingContactPhoneNumber', phoneNumber: string }

    | { type: 'setBillingAddressStreetName', streetName: string }
    | { type: 'setBillingAddressAptUnitNumber', aptUnitNumber: string }
    | { type: 'setBillingAddressCity', city: string }
    | { type: 'setBillingAddressState', state: string }
    | { type: 'setBillingAddressZip', zipCode: string }
    // V1 ^
    | { type: 'setCanSubmit', canSubmit: boolean }
    | { type : 'resetPastProjectInformation' }
    | { type : 'resetPastServiceInformation' };

  export const reducer = (state: State, action: Action) => {
    console.log("Hitting the reducer!!!! state ->", state, "action ->", action )
    switch (action.type) {
        // ---------------------------------------------------- Profile Information page
        case 'setJobType':
        return {
            ...state,
            projectInformation: {
                ...state.projectInformation,
                jobType: action.jobType,
            },
        };
        case 'setDevelopmentType':
        return {
            ...state,
            projectInformation: {
                ...state.projectInformation,
                developmentType: action.developmentType,
            },
        };
        case 'setJobSiteReady':
        // debugger;
        return {
            ...state,
            projectInformation: {
                ...state.projectInformation,
                jobSiteReady:  moment(action.jobSiteReady).format('ddd. MMM Do, YYYY'),
            }
        }
        // ------------------------------------------------------- development details
        case 'setHomeType':
        return {
            ...state,
            developmentDetails: {
                ...state.developmentDetails,
                homeType: action.homeType,
            }
        }
        case 'setDevelopmentName':
        return {
            ...state,
            developmentDetails: {
                ...state.developmentDetails,
                developmentName: action.developmentName,
            }
        }
        case 'setCity':
        return {
            ...state,
            developmentDetails: {
                ...state.developmentDetails,
                city: action.city,
            }
        }
        case 'setZip':
        return {
            ...state,
            developmentDetails: {
                ...state.developmentDetails,
                zipCode: action.zipCode,
            }
        }
        case 'setCrossStreets':
        return {
            ...state,
            developmentDetails: {
                ...state.developmentDetails,
                crossStreets: action.crossStreets,
            }
        }
        // --------------------------------------------------------- site details
        case 'setStreetNumber':
        return {
            ...state,
            siteDetails: {
                ...state.siteDetails,
                streetNumber: action.streetNumber,
            }
        }
        case 'setStreetName':
        return {
            ...state,
            siteDetails: {
                ...state.siteDetails,
                streetName: action.streetName,
            }
        }
        case 'setUnitNumber':
        return {
            ...state,
            siteDetails: {
                ...state.siteDetails,
                unitNumber: action.unitNumber,
            }
        }
        case 'setLotNumber':
        return {
            ...state,
            siteDetails: {
                ...state.siteDetails,
                lotNumber: action.lotNumber,
            }
        }
        case 'setNumberOfUnits':
        return {
            ...state,
            siteDetails: {
                ...state.siteDetails,
                numberOfUnits: action.numberOfUnits,
            }
        }


        // ---------------------------------------------- service information page
        case 'setServiceNeeded': return {
            ...state,
            serviceInformation: {
                ...state.serviceInformation,
                serviceNeeded: action.serviceNeeded,
            },
        };
        case 'setDenialOfService':
        return {
            ...state,
            serviceInformation: {
                ...state.serviceInformation,
                denialOfService: action.denialOfService
            }
        };

        case 'setServiceOptions':
        return {
            ...state,
            serviceDetails: {
                ...state.serviceDetails,
                electricServiceDetails: {
                    ...state.serviceDetails.electricServiceDetails,
                    serviceOptions: action.serviceOptions
                }
            }
        }
        case 'setRequestType':
        return {
            ...state,
            serviceDetails: {
                ...state.serviceDetails,
                electricServiceDetails: {
                    ...state.serviceDetails.electricServiceDetails,
                    requestType: action.requestType
                }
            }
        }
        case 'setConstructionMeterType':
        return {
            ...state,
            serviceDetails: {
                ...state.serviceDetails,
                electricServiceDetails: {
                    ...state.serviceDetails.electricServiceDetails,
                    constructionMeterType: action.constructionMeterType
                }
            }
        }
        case 'setAmpsRequired':
        return {
            ...state,
            serviceDetails: {
                ...state.serviceDetails,
                electricServiceDetails: {
                    ...state.serviceDetails.electricServiceDetails,
                    ampsRequired: action.ampsRequired
                }
            }
        }
        case 'setServiceLength':
        return {
            ...state,
            serviceDetails: {
                ...state.serviceDetails,
                electricServiceDetails: {
                    ...state.serviceDetails.electricServiceDetails,
                    serviceLength: action.serviceLength
                }
            }
        }
        case 'setVoltageClass':
        return {
            ...state,
            serviceDetails: {
                ...state.serviceDetails,
                electricServiceDetails: {
                    ...state.serviceDetails.electricServiceDetails,
                    voltageClass: action.voltageClass
                }
            }
        }
        case 'setElectricAdditionalNotes':
        return {
            ...state,
            serviceDetails: {
                ...state.serviceDetails,
                electricServiceDetails: {
                    ...state.serviceDetails.electricServiceDetails,
                    additionalNotes: action.additionalNotes
                }
            }
        }
        case 'setElectricServiceStartDate':
        return {
            ...state,
            serviceDetails: {
                ...state.serviceDetails,
                electricServiceDetails: {
                    ...state.serviceDetails.electricServiceDetails,
                    serviceStartDate: moment(action.serviceStartDate).format('ddd. MMM Do, YYYY')
                }
            }
        }
        case 'setSquareFootage':
        return {
            ...state,
            serviceDetails: {
                ...state.serviceDetails,
                gasServiceDetails: {
                    ...state.serviceDetails.gasServiceDetails,
                    squareFootage: action.squareFootage
                }
            }
        }
        case 'setUndergroundFacilities':
        return {
            ...state,
            serviceDetails: {
                ...state.serviceDetails,
                gasServiceDetails: {
                    ...state.serviceDetails.gasServiceDetails,
                    undergroundFacilities: {
                        ...state.serviceDetails.gasServiceDetails.undergroundFacilities,
                        [action.facilityType]: action.value
                    }
                }
            }
        }
        case 'setFurnaceSpaceHeaterLoad':
        return {
            ...state,
            serviceDetails: {
                ...state.serviceDetails,
                gasServiceDetails: {
                    ...state.serviceDetails.gasServiceDetails,
                    applianceLoad: {
                        ...state.serviceDetails.gasServiceDetails.applianceLoad,
                        furnaceSpaceHeaterLoad: action.furnaceSpaceHeaterLoad
                    }
                }
            }
        }
        case 'setWaterHeaterLoad':
        return {
            ...state,
            serviceDetails: {
                ...state.serviceDetails,
                gasServiceDetails: {
                    ...state.serviceDetails.gasServiceDetails,
                    applianceLoad: {
                        ...state.serviceDetails.gasServiceDetails.applianceLoad,
                        waterHeaterLoad: action.waterHeaterLoad
                    }
                }
            }
        }
        case 'setClothesDryerLoad':
        return {
            ...state,
            serviceDetails: {
                ...state.serviceDetails,
                gasServiceDetails: {
                    ...state.serviceDetails.gasServiceDetails,
                    applianceLoad: {
                        ...state.serviceDetails.gasServiceDetails.applianceLoad,
                        clothesDryerLoad: action.clothesDryerLoad
                    }
                }
            }
        }
        case 'setStoveOvenLoad':
        return {
            ...state,
            serviceDetails: {
                ...state.serviceDetails,
                gasServiceDetails: {
                    ...state.serviceDetails.gasServiceDetails,
                    applianceLoad: {
                        ...state.serviceDetails.gasServiceDetails.applianceLoad,
                        stoveOvenLoad: action.stoveOvenLoad
                    }
                }
            }
        }
        case 'setOtherAppliance':
        return {
            ...state,
            serviceDetails: {
                ...state.serviceDetails,
                gasServiceDetails: {
                    ...state.serviceDetails.gasServiceDetails,
                    applianceLoad: {
                        ...state.serviceDetails.gasServiceDetails.applianceLoad,
                        otherAppliance: action.otherAppliance
                    }
                }
            }
        }
        case 'setOtherApplianceLoad':
        return {
            ...state,
            serviceDetails: {
                ...state.serviceDetails,
                gasServiceDetails: {
                    ...state.serviceDetails.gasServiceDetails,
                    applianceLoad: {
                        ...state.serviceDetails.gasServiceDetails.applianceLoad,
                        otherApplianceLoad: action.otherApplianceLoad
                    }
                }
            }
        }
        case 'setMeterSize': // not set/used yet
        return {
            ...state,
            serviceDetails: {
                ...state.serviceDetails,
                gasServiceDetails: {
                    ...state.serviceDetails.gasServiceDetails,
                    meterSize: action.meterSize
                }
            }
        }
        case 'setGasAdditionalNotes':
        return {
            ...state,
            serviceDetails: {
                ...state.serviceDetails,
                gasServiceDetails: {
                    ...state.serviceDetails.gasServiceDetails,
                    additionalNotes: action.additionalNotes
                }
            }
        }
        case 'setGasServiceStartDate':
        return {
            ...state,
            serviceDetails: {
                ...state.serviceDetails,
                gasServiceDetails: {
                    ...state.serviceDetails.gasServiceDetails,
                    serviceStartDate: moment(action.serviceStartDate).format('ddd. MMM Do, YYYY')
                }
            }
        }
        case 'setOutdoorProtectiveLighting':
        return {
            ...state,
            outdoorProtectiveLighting: action.outdoorProtectiveLighting
        }
        case 'setElectricVehicleCharging':
        return {
            ...state,
            electricVehicleCharging: action.electricVehicleCharging
        }

        // ---------------------------------------------- Contact Information Page
        case 'setOwnerFirstName':
        return {
            ...state,
            owner: {
                ...state.owner,
                firstName: action.firstName
            }
        }
        case 'setOwnerLastName':
        return {
            ...state,
            owner: {
                ...state.owner,
                lastName: action.lastName
            }
        }
        case 'setOwnerEmailAddress':
        return {
            ...state,
            owner: {
                ...state.owner,
                emailAddress: action.emailAddress
            }
        }
        case 'setOwnerPhoneNumber':
        return {
            ...state,
            owner: {
                ...state.owner,
                phoneNumber: action.phoneNumber
            }
        }

        case 'setPrimaryFirstName':
        return {
            ...state,
            primary: {
                ...state.primary,
                firstName: action.firstName
            }
        }
        case 'setPrimaryLastName':
        return {
            ...state,
            primary: {
                ...state.primary,
                lastName: action.lastName
            }
        }
        case 'setPrimaryEmailAddress':
        return {
            ...state,
            primary: {
                ...state.primary,
                emailAddress: action.emailAddress
            }
        }
        case 'setPrimaryPhoneNumber':
        return {
            ...state,
            primary: {
                ...state.primary,
                phoneNumber: action.phoneNumber
            }
        }

        case 'setBillingContactFirstName':
        return {
            ...state,
            billingContact: {
                ...state.billingContact,
                firstName: action.firstName
            }
        }
        case 'setBillingContactLastName':
        return {
            ...state,
            billingContact: {
                ...state.billingContact,
                lastName: action.lastName
            }
        }
        case 'setBillingContactEmailAddress':
        return {
            ...state,
            billingContact: {
                ...state.billingContact,
                emailAddress: action.emailAddress
            }
        }
        case 'setBillingContactPhoneNumber':
        return {
            ...state,
            billingContact: {
                ...state.billingContact,
                phoneNumber: action.phoneNumber
            }
        }

        case 'setBillingAddressStreetName':
        return {
            ...state,
            billingAddress: {
                ...state.billingAddress,
                streetName: action.streetName
            }
        }
        case 'setBillingAddressAptUnitNumber':
        return {
            ...state,
            billingAddress: {
                ...state.billingAddress,
                aptUnitNumber: action.aptUnitNumber
            }
        }
        case 'setBillingAddressCity':
        return {
            ...state,
            billingAddress: {
                ...state.billingAddress,
                city: action.city
            }
        }
        case 'setBillingAddressState':
        return {
            ...state,
            billingAddress: {
                ...state.billingAddress,
                state: action.state
            }
        }
        case 'setBillingAddressZip':
        return {
            ...state,
            billingAddress: {
                ...state.billingAddress,
                zipCode: action.zipCode
            }
        }
        // ------- progress point
        case 'setCanSubmit':
        return {
            ...state,
            tools: {
                ...state.tools,
                canSubmit: action.canSubmit
            }
        }

        case 'resetPastProjectInformation': return {
        ...state,
        serviceInformation: {
            ...initialState.serviceInformation,
        },
        };
        case 'resetPastServiceInformation': return {
        ...state,
        serviceInformation: {
            ...initialState.serviceInformation,
        },
        };
        default: return state;
    }
  };