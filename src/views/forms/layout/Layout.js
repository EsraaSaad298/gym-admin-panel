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
const Layout = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { client } = location.state;
  const [title, setTitle] = useState(client? client.title : "");
  const [description, setDescription] = useState(client? client.description : "");
  const [coach_name, setCoachName] = useState(client? client.coach_name : "");
  const [coach_brief, setCoachBrief] = useState(client? client.coach_brief : "");
  const [timing, setTiming] = useState(client? client.timing : "");
  const [price, setPrice] = useState(client? client.price : "");

  const submitForm = () => {
    var data = {
      title: title,
      description: description,
      coach_name: coach_name,
      coach_brief: coach_brief,
      timing: timing,
      price: price,
      image: ""
    }

    fetch("https://64103182e1212d9cc92c334f.mockapi.io/api/gym/classes", {
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
        navigate("/classes")
      })
      .catch(error => {
        // Handle any errors that occurred during the request
        console.error(error);
      });
  };

  const updateForm = async (data) => {
    var data = {
      title: title,
      description: description,
      coach_name: coach_name,
      coach_brief: coach_brief,
      timing: timing,
      price: price,
      image: ""
    }
    
    fetch(`https://64103182e1212d9cc92c334f.mockapi.io/api/gym/classes/${client.id}`, {
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
        navigate("/classes")
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
                  <CFormLabel htmlFor="exampleFormControlInput1">Title</CFormLabel>
                  <CFormInput
                    id="exampleFormControlInput1"
                    placeholder="Class title"
                    value={title}
                    onChange={(data_obj) => setTitle(data_obj.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <CFormLabel htmlFor="exampleFormControlTextarea1">Description</CFormLabel>
                  <CFormTextarea id="exampleFormControlTextarea1" rows="3" value={description} onChange={(data_obj) => setDescription(data_obj.target.value)} ></CFormTextarea>
                </div>
                <div className="mb-3">
                  <CFormLabel htmlFor="exampleFormControlInput1">Coach Name</CFormLabel>
                  <CFormInput
                    id="exampleFormControlInput1"
                    placeholder="Coach name"
                    value={coach_name}
                    onChange={(data_obj) => setCoachName(data_obj.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <CFormLabel htmlFor="exampleFormControlTextarea1">Coach Brief</CFormLabel>
                  <CFormTextarea id="exampleFormControlTextarea1" rows="3" value={coach_brief} onChange={(data_obj) => setCoachBrief(data_obj.target.value)} ></CFormTextarea>
                </div>
                <div className="mb-3">
                  <CFormLabel htmlFor="exampleFormControlInput1">Timing</CFormLabel>
                  <CFormInput
                    id="exampleFormControlInput1"
                    placeholder="Timing"
                    value={timing}
                    onChange={(data_obj) => setTiming(data_obj.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <CFormLabel htmlFor="exampleFormControlInput1">Price</CFormLabel>
                  <CFormInput
                    id="exampleFormControlInput1"
                    placeholder="Price"
                    value={price}
                    onChange={(data_obj) => setPrice(data_obj.target.value)}
                  />
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
               Edit class data 
          </CButton>
        :
          <CButton color="primary" size="md"
          style={{
            alignSelf: "center",
            marginTop: "10px",
            display: "flex",
            justifyContent: "center",
          }} onClick={() => submitForm()}>
              Submit class data 
          </CButton>
        }
      </div>
    </CRow>
  )
}

export default Layout

Layout.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.shape({
      client: PropTypes.object.isRequired,
    }).isRequired,
  }).isRequired,
}
