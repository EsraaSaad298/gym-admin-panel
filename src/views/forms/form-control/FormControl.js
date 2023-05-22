import React, { useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CFormTextarea,
  CRow,
  CDropdownMenu,
  CDropdownItem,
  CDropdown,
  CDropdownToggle,
} from '@coreui/react'
import { DocsExample } from 'src/components'
import { useNavigate, useLocation } from 'react-router-dom'
import PropTypes from 'prop-types'

//prettier-ignore
const FormControl = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { client } = location.state;
  const [full_name, setFullName] = useState(client? client.full_name : "");
  const [address, setAddress] = useState(client? client.address : "");
  const [mobile_number, setMobileNumber] = useState(client? client.mobile_number : "");
  const [subscription_type, setSubscriptionType] = useState(client? client.subscription_plan : "");

  const submitForm = () => {
    var data = {
      full_name: full_name,
      address: address,
      mobile_number: mobile_number,
      subscription_plan: subscription_type,
      avatar: ""
    }

    fetch("https://64103182e1212d9cc92c334f.mockapi.io/api/gym/clients", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data), // Replace 'data' with the actual data object you want to send
    })
      .then(response => response.json())
      .then(data => {
        // Handle the response data
        console.log(data);
        navigate("/dashboard")
      })
      .catch(error => {
        // Handle any errors that occurred during the request
        console.error(error);
      });
  };

  const updateForm = async (data) => {
    var data = {
      full_name: full_name,
      address: address,
      mobile_number: mobile_number,
      subscription_plan: subscription_type,
      avatar: ""
    }
    
    fetch(`https://64103182e1212d9cc92c334f.mockapi.io/api/gym/clients/${client.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data), // Replace 'data' with the actual data object you want to send
    })
      .then(response => response.json())
      .then(data => {
        // Handle the response data
        console.log(data);
        navigate("/dashboard")
      })
      .catch(error => {
        // Handle any errors that occurred during the request
        console.error(error);
      });
  };

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardBody>
              <CForm>
                <div className="mb-3">
                  <CFormLabel htmlFor="exampleFormControlInput1">Full Name</CFormLabel>
                  <CFormInput
                    id="exampleFormControlInput1"
                    placeholder="Example Name"
                    value={full_name}
                    onChange={(data_obj) => setFullName(data_obj.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <CFormLabel htmlFor="exampleFormControlInput1">Mobile Number</CFormLabel>
                  <CFormInput
                    type='phone-number'
                    id="exampleFormControlInput1"
                    placeholder="Mobile number"
                    value={mobile_number}
                    onChange={(data_obj) => setMobileNumber(data_obj.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <CFormLabel htmlFor="exampleFormControlTextarea1">Address</CFormLabel>
                  <CFormTextarea id="exampleFormControlTextarea1" rows="3" value={address} onChange={(data_obj) => setAddress(data_obj.target.value)} ></CFormTextarea>
                </div>
                <div className="mb-3" style={{ display: "flex", alignItems: "flex-start", flexDirection: "column"}}>
                  <CFormLabel htmlFor="exampleFormControlTextarea1">Subscription Plan</CFormLabel>
                  <CDropdown>
                    <CDropdownToggle color="primary">{subscription_type == "" ? "Choose Plan" : subscription_type}</CDropdownToggle>
                    <CDropdownMenu>
                      <CDropdownItem onClick={() => setSubscriptionType("Basic Plan")} >Basic Plan</CDropdownItem>
                      <CDropdownItem onClick={() => setSubscriptionType("Subscription plan 110")}>Subscription plan 110</CDropdownItem>
                      <CDropdownItem onClick={() => setSubscriptionType("Subscription plan 111")}>Subscription plan 111</CDropdownItem>
                    </CDropdownMenu>
                  </CDropdown>
                </div>
              </CForm>
          </CCardBody>
        </CCard>
      </CCol>
      <div className="mb-3" style={{ display: "flex", alignItems: "center", justifyContent: "center"}}>
        {client ? 
          <CButton color="primary" size="md"
           style={{
             alignSelf: "center",
             marginTop: "10px",
             display: "flex",
             justifyContent: "center",
           }} onClick={() => updateForm()}>
               Edit client data 
          </CButton>
        :
          <CButton color="primary" size="md"
          style={{
            alignSelf: "center",
            marginTop: "10px",
            display: "flex",
            justifyContent: "center",
          }} onClick={() => submitForm()}>
              Submit client data 
          </CButton>
        }
      </div>
    </CRow>
  )
}

export default FormControl

FormControl.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.shape({
      client: PropTypes.object.isRequired,
    }).isRequired,
  }).isRequired,
}
