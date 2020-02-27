import React, { useState, useCallback, useRef, useLayoutEffect }  from "react";
import { useDispatch, useGlobalState, someValidatorFunction } from "../NewServiceRequest"
import "../NewServiceRequest.scss"
import { formatToPhone, states } from "../../utilities/utilities"


const ContactInformation: React.FunctionComponent = (): React.ReactElement => {
    // const [state, setState] = useState("Michigan")
    const [additionalContact, setAdditionalContact] = useState([]);
    const [additionalContactName, setAdditionalContactName] = useState([])
    const [additionalContactAccess, setAdditionalContactAccess] = useState([])

    const [checkToRender, setCheckToRender] = useState(false)

    const dispatch = useDispatch();

    const workOrderInitiator = useGlobalState('workOrderInitiator');
    const owner = useGlobalState('owner');
    const primary = useGlobalState('primary');
    const billingContact = useGlobalState('billingContact');
    const billingAddress = useGlobalState('billingAddress');

    const setContactInfo = useCallback((selectType, identifier, data) => dispatch({ type: selectType, [identifier]: data }), [dispatch]);
    const setCanSubmit = useCallback((data) => dispatch({ type: 'setCanSubmit', canSubmit: data }), [dispatch]);

    const { jobType } = useGlobalState('projectInformation');
    const setJobtype = useCallback((data) => dispatch({ type: 'setJobType', jobType: data }), [dispatch]);

    const statesHTML = (
        <div className="select-wrapper states">
            <select onClick={
                (e: any) => {
                    e.currentTarget.classList.add("activated");
                    setContactInfo("setBillingAddressState", "state", e.target.value) }
                }
            className="states"
            >
            {
            Object.keys(states).map(function(key: string) {
                const keyValue: string = (states as any)[key];
                if(billingAddress.state === key) {
                    return ( <option id={"CI" + keyValue} value={billingAddress.state} selected disabled>{billingAddress.state}</option> )
                }
            })}
            {Object.keys(states).map(function(key: string) {
                const keyValue: string = (states as any)[key];
                if(billingAddress.state.length) {
                    if(key !== billingAddress.state) {
                        return (
                            <option id={"CI" + keyValue} value={key}>{key}</option>
                        )
                    }
                } else {
                    if(key !== "MI") {
                        return (
                            <option id={"CI" + keyValue} value={key}>{key}</option>
                        )
                    }
                }
            })}
            </select>
        </div>
    )

    const addedContact = (
        <>
        <p>Select From Contacts</p>
        <div className="select-wrapper">

            <select className="commercial-extended-input"
                onMouseEnter={(e) => { e.currentTarget.classList.add("activated")}}
                onMouseLeave={(e) => { if(e.currentTarget.value === ""){ e.currentTarget.classList.remove("activated")}}}
                onClick={(e: any) => {
                let array: any = additionalContactName.length ? [ ...additionalContactName , e.target.value] : [e.target.value]
                setAdditionalContactName(array)
                if(checkToRender) {
                setCheckToRender(false);
                let el = document.getElementById("checkToRender") as HTMLInputElement
                el.checked = false;
                }
            }}>
            <option value="" disabled selected>Select</option>
            <option value="electricGasService">New Electric & Gas Service</option>
            <option value="electricService">New Electric</option>
            <option value="gasService">New Gas</option>
            </select>
        </div>
        <p>Access</p>
        <select
            onMouseEnter={(e) => { e.currentTarget.classList.add("activated")}}
            onMouseLeave={(e) => { if(e.currentTarget.value === ""){ e.currentTarget.classList.remove("activated")}}}
            onClick={(e: any) => {
            let array: any = additionalContactAccess.length ? [ ...additionalContactAccess , e.target.value] : [e.target.value]
            setAdditionalContactAccess(array)
            if(checkToRender) {
            setCheckToRender(false);
            let el = document.getElementById("checkToRender") as HTMLInputElement
            el.checked = false;
            }
        }}>
        <option value="" disabled selected>Select</option>
        <option value="electricGasService">New Electric & Gas Service</option>
        <option value="electricService">New Electric</option>
        <option value="gasService">New Gas</option>
        </select>
        </>
    )

    // error handler trigger
    const emailInputRef = useRef<HTMLInputElement>(null);
    const blurHandler = (event: React.FocusEvent<HTMLInputElement>) => {
        if(event.type === "blur") {
          event.target.setAttribute("required", "true");
        }
    };

    // validation process
    const validateOwnerContactInfo:   Array<any> = [ owner.firstName, owner.lastName, owner.emailAddress ];
    const validatePrimaryContactInfo: Array<any> = [ primary.firstName, primary.lastName, primary.emailAddress ];
    const validateBillingContactInfo: Array<any> = [ billingContact.firstName, billingContact.lastName, billingContact.emailAddress ];
    const validateBillingAddressInfo: Array<any> = [ billingAddress.streetName, billingAddress.city, billingAddress.state, billingAddress.zipCode ];
    const validate: Array<any> = [ ...validateOwnerContactInfo, ...validatePrimaryContactInfo, ...validateBillingContactInfo, ...validateBillingAddressInfo]

    useLayoutEffect(() => {
        if((!validate.some(someValidatorFunction) && !document.querySelectorAll(':invalid').length)) {
            setCanSubmit(true);
        } else {
            setCanSubmit(false);
        }
    }, validate)
    // end of validation process

    return (
        <form id="contact-form">
        <h2 className="sectional-information-title">Contact Information</h2>
        <p className="margin-bot-20">
        Tell us who we can contact about your project and invite additional team members to view or edit your
        project. You can also add and remove project contacts after we receive your request.
        </p>
        <h5>Work Order Initiator</h5>
        <div>
            <div className="row-flex-inline" >
                <div className="title">Name:</div>
                <div className="text">{workOrderInitiator.firstName} {workOrderInitiator.lastName}</div>
            </div>

            <div className="row-flex-inline" >
                <div className="title" >Company:</div>
                <div className="text" >{workOrderInitiator.company}</div>
            </div>

            <div className="row-flex-inline" >
                <div className="title" >Phone:</div>
                <div className="text" >{workOrderInitiator.phoneNumber}</div>
            </div>
            <div className="row-flex-inline" >
                <div className="title">Email:</div>
                <div className="text">{workOrderInitiator.emailAddress}</div>
            </div>
            <div className="row-flex-inline" >
                <div className="title" >Position:</div>
                <div className="text" >{workOrderInitiator.position}</div>
            </div>
        </div>
        <hr />

        <h5>Property Owner</h5>
        <p className="margin-bot-20">
        The property owner or an authorized representative of the property owner who
        can accept and approve service.
        </p>
        <div>
            <div className="input-inline-block">
                <p>First Name*</p>
                <input placeholder="John"
                type="text"
                value={owner.firstName}
                onChange={(e) => { setContactInfo("setOwnerFirstName", "firstName", e.target.value) }}
                onBlur={(e) => {blurHandler(e)}}
                />
                <div className="error email-error" data-testid="email-error">
                    Please enter a first name.
                </div>
            </div>
            <div className="input-inline-block">
                <p>Last Name*</p>
                <input placeholder="Smith"
                type="text"
                value={owner.lastName}
                onChange={(e) => { setContactInfo("setOwnerLastName", "lastName", e.target.value) }}
                onBlur={(e) => {blurHandler(e)}}
                />
            <div className="error email-error" data-testid="email-error">
                Please enter a last name.
            </div>
            </div>
        </div>
        <div>
            <div className="input-inline-block">
                <p>Email Address*</p>
                <input placeholder="john.smith@gmail.com"
                type="email"
                value={owner.emailAddress}
                onChange={(e) => { setContactInfo("setOwnerEmailAddress", "emailAddress", e.target.value) }}
                ref={emailInputRef}
                onBlur={(e) => {blurHandler(e)}}
                />
                <div className="error email-error" data-testid="email-error">
                    Please enter a valid email address. (ex: name@email.com)
                </div>
            </div>
            <div className="input-inline-block">
                <p>Phone</p>
                <input placeholder="(313) 123–1234"
                value={owner.phoneNumber}
                pattern={".{14}"}
                type="tel"
                onChange={(e) => { formatToPhone(e); setContactInfo("setOwnerPhoneNumber", "phoneNumber", e.target.value) }}
                onBlur={(e) => {blurHandler(e)}}
                />
                <div className="error email-error" data-testid="email-error">
                    Phone number is incomplete.
                </div>
            </div>
        </div>
        <hr />

        <h5>Primary Contact</h5>
        <p className="margin-bot-20">
        The main contact person responsible for the day-to-day management of the project.
        </p>
        <div>
            <div className="input-inline-block">
                <p>First Name*</p>
                <input placeholder="John"
                type="text"
                value={primary.firstName}
                onChange={(e) => { setContactInfo("setPrimaryFirstName", "firstName", e.target.value) }}
                onBlur={(e) => {blurHandler(e)}}
                />
                <div className="error email-error" data-testid="email-error">
                    Please enter a first name.
                </div>
            </div>
            <div className="input-inline-block">
                <p>Last Name*</p>
                <input placeholder="Smith"
                type="text"
                value={primary.lastName}
                onChange={(e) => { setContactInfo("setPrimaryLastName", "lastName", e.target.value) }}
                onBlur={(e) => {blurHandler(e)}}
                />
                <div className="error email-error" data-testid="email-error">
                    Please enter a last name.
                </div>
            </div>
        </div>
        <div>
            <div className="input-inline-block">
                <p>Email Address*</p>
                <input placeholder="john.smith@gmail.com"
                type="email"
                value={primary.emailAddress}
                onChange={(e) => { setContactInfo("setPrimaryEmailAddress", "emailAddress", e.target.value) }}
                ref={emailInputRef}
                onBlur={(e) => {blurHandler(e)}}
                />
                <div className="error email-error" data-testid="email-error">
                    Please enter a valid email address. (ex: name@email.com)
                </div>
            </div>
            <div className="input-inline-block">
                <p>Phone</p>
                <input placeholder="(313) 123–1234"
                value={primary.phoneNumber}
                pattern={".{14}"}
                type="tel"
                onChange={(e) => { formatToPhone(e); setContactInfo("setPrimaryPhoneNumber", "phoneNumber", e.target.value) }}
                onBlur={(e) => {blurHandler(e)}}
                />
                <div className="error email-error" data-testid="email-error">
                    Phone number is incomplete.
                </div>
            </div>
        </div>
        <hr />

        <h5>Billing Contact</h5>
        <p className="margin-bot-20">
        Project contact responsibile for payment.
        </p>
        <div>
            <div className="input-inline-block">
                <p>First Name*</p>
                <input placeholder="John"
                type="text"
                value={billingContact.firstName}
                onChange={(e) => { setContactInfo("setBillingContactFirstName", "firstName", e.target.value) }}
                onBlur={(e) => {blurHandler(e)}}
                />
                <div className="error email-error" data-testid="email-error">
                    Please enter a first name.
                </div>
            </div>
            <div className="input-inline-block">
                <p>Last Name*</p>
                <input placeholder="Smith"
                type="text"
                value={billingContact.lastName}
                onChange={(e) => { setContactInfo("setBillingContactLastName", "lastName", e.target.value) }}
                onBlur={(e) => {blurHandler(e)}}
                />
                <div className="error email-error" data-testid="email-error">
                    Please enter a last name.
                </div>
            </div>
        </div>
        <div className="margin-bot-20">
            <div className="input-inline-block">
                <p>Email Address*</p>
                <input placeholder="john.smith@gmail.com"
                type="email"
                value={billingContact.emailAddress}
                onChange={(e) => { setContactInfo("setBillingContactEmailAddress", "emailAddress", e.target.value) }}
                ref={emailInputRef}
                onBlur={(e) => {blurHandler(e)}}
                />
                <div className="error email-error" data-testid="email-error">
                    Please enter a valid email address. (ex: name@email.com)
                </div>
            </div>
            <div className="input-inline-block">
                <p>Phone</p>
                <input placeholder="(313) 123–1234"
                value={billingContact.phoneNumber}
                pattern={".{14}"}
                type="tel"
                onChange={(e) => { formatToPhone(e); setContactInfo("setBillingContactPhoneNumber", "phoneNumber", e.target.value) }}
                onBlur={(e) => {blurHandler(e)}}
                />
                <div className="error email-error" data-testid="email-error">
                    Phone number is incomplete.
                </div>
            </div>
        </div>

        <h5>Billing Address</h5>
        <div>
            <div className="input-inline-block">
                <p>Street Address*</p>
                <input placeholder="123 Example Street"
                value={billingAddress.streetName}
                onChange={(e) => { setContactInfo("setBillingAddressStreetName", "streetName", e.target.value) }}
                />
            </div>
            <div className="input-inline-block">
                <p>Apartment/Unit Number</p>
                <input placeholder="Unit"
                value={billingAddress.aptUnitNumber}
                onChange={(e) => { setContactInfo("setBillingAddressAptUnitNumber", "aptUnitNumber", e.target.value) }}
                />
            </div>
        </div>
        <div>
            <div className="input-inline-block">
                <p>City*</p>
                <input placeholder="City, Township, or Village"
                value={billingAddress.city}
                onChange={(e) => { setContactInfo("setBillingAddressCity", "city", e.target.value) }}
                />
            </div>
            <div className="input-inline-block">
                <p>State*</p>
                {statesHTML}
            </div>
        </div>
        <div>
            <p>Zip Code*</p>
            <input placeholder="12345"
            value={billingAddress.zipCode}
            onChange={(e) => { setContactInfo("setBillingAddressZip", "zipCode", e.target.value) }} />
        </div>
        <hr />

        {jobType === "Existing Building" ? (
          additionalContact.length >= 1 ?
          <>
            <div className="development-details form-field">
                <h5 className="additional-site">Additional Contact</h5>
                {additionalContact.map((elem, i) =>
                <><a
                className="remove-btn"
                onClick={(e) => {
                  e.preventDefault();
                  let array: any = [...additionalContact];
                  if(array.length > 1) {
                    array.splice(i, 1)
                    setAdditionalContact(array);
                        } else {
                          setAdditionalContact(array.pop());
                        }
                      }}>Remove</a>{elem}</> || null)}
            </div>
            <div className="development-details form-field">
              <a onClick={() => {
                let array: any = additionalContact.length ? [...additionalContact, addedContact] : [addedContact]
                setAdditionalContact(array)
              }}>+ Additional Contact</a>
            </div>
            <hr className="last" />
          </>
          :
          <>
            <div className="development-details form-field">
              <a onClick={() => {
                let array: any = additionalContact.length ? [...additionalContact, addedContact] : [addedContact]
                setAdditionalContact(array)
              }}>+ Additional Contact</a>
            </div>
            <hr className="last" />
          </>
        ): null}
        </form>
  );
};
export default ContactInformation;
