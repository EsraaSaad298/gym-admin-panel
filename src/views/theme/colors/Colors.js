import React, { useState, useEffect } from 'react'

import {
  CAvatar,
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CProgress,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import { CChartLine } from '@coreui/react-chartjs'
import { getStyle, hexToRgba } from '@coreui/utils'
import CIcon from '@coreui/icons-react'
import {
  cibCcAmex,
  cibCcApplePay,
  cibCcMastercard,
  cibCcPaypal,
  cibCcStripe,
  cibCcVisa,
  cibGoogle,
  cibFacebook,
  cibLinkedin,
  cifBr,
  cifEs,
  cifFr,
  cifIn,
  cifPl,
  cifUs,
  cibTwitter,
  cilCloudDownload,
  cilPeople,
  cilUser,
  cilUserFemale,
} from '@coreui/icons'

import avatar1 from 'src/assets/images/avatars/1.jpg'
import avatar2 from 'src/assets/images/avatars/2.jpg'
import avatar3 from 'src/assets/images/avatars/3.jpg'
import avatar4 from 'src/assets/images/avatars/4.jpg'
import avatar5 from 'src/assets/images/avatars/5.jpg'
import avatar6 from 'src/assets/images/avatars/6.jpg'
import placeholder from 'src/assets/images/placeholder.png'

import { FaEye, FaEdit, FaTrash } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { Button, Modal } from 'react-bootstrap'

// prettier-ignore
const Colors = () => {
  const [data, setData] = useState([]);
  const avatarSources = [avatar1, avatar2, avatar3, avatar4, avatar5, avatar6];

  const [showModal, setShowModal] = useState(false);
  const [delete_record, setDeleteRecord] = useState("");
  const handleClose = () => {
    setShowModal(!showModal);
  };

  const handleDelete = () => {
    fetch(`https://64103182e1212d9cc92c334f.mockapi.io/api/gym/classes/${delete_record}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (response.ok) {
          // Delete operation successful
          // Perform any necessary actions (e.g., update state)
          console.log('Record deleted successfully');
          fetchData();
          setShowModal(!showModal);
        } else {
          // Delete operation failed
          throw new Error('Failed to delete record');
        }
      })
      .catch((error) => {
        // Handle any error that occurred during the delete request
        console.error('Error deleting record:', error);
      });
  };

  const fetchData = async () => {
    try {
      const response = await fetch('https://64103182e1212d9cc92c334f.mockapi.io/api/gym/classes');
      const jsonData = await response.json();
      jsonData.forEach((data_entry, index) => {
        if (
          typeof data_entry.image !== 'string' ||
          data_entry.image === '' ||
          Object.keys(data_entry.avatar).length === 0
        ) {
          data_entry.image = { src: placeholder, status: 'placeholder' };
        } else {
          data_entry.image = { src: avatarSources[index], status: 'success' };
        }

        for (let key in data_entry) {
          if (data_entry.hasOwnProperty(key) && !data_entry[key]) {
            data_entry[key] = "-";
          }
        }
      });        
      setData(jsonData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const navigate = useNavigate();

  const handleViewButton = (client) => {
    navigate('/class', { state: { client } });
  };

  const handleEditButton = (client) => {
    navigate('/class-form', { state: { client } });
  };

  return (
    <>
      <CTable align="middle" className="mb-0 border" hover responsive>
        <CTableHead color="light">
          <CTableRow>
            <CTableHeaderCell>Class name</CTableHeaderCell>
            <CTableHeaderCell className="text-center">Coach name</CTableHeaderCell>
            <CTableHeaderCell>Timing</CTableHeaderCell>
            <CTableHeaderCell className="text-center">Price</CTableHeaderCell>
            <CTableHeaderCell>Actions</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {data.map((item, index) => (
            <CTableRow v-for="item in tableItems" key={index}>
              <CTableDataCell>
                <div>{item.title}</div>
              </CTableDataCell>
              <CTableDataCell className="text-center">
                <div>{item.coach_name}</div>
              </CTableDataCell>
              <CTableDataCell>
                <div>{item.timing}</div>
              </CTableDataCell>
              <CTableDataCell className="text-center">
                <div>{item.price}</div>
              </CTableDataCell>
              <CTableDataCell>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <FaEye style={{ color: 'black' }} onClick={() => handleViewButton(item)} /> {/* View Icon */}
                  <FaEdit style={{ color: 'black' }} onClick={() => handleEditButton(item)} /> {/* Edit Icon */}
                  <FaTrash style={{ color: '#e6005c' }} onClick={() => [
                      setDeleteRecord(item.id), 
                      setShowModal(true)
                  ]} /> {/* Delete Icon */}
                </div>
              </CTableDataCell>
            </CTableRow>
          ))}
        </CTableBody>
      </CTable>
      <CButton color="primary" size="md"
      style={{
        alignSelf: "center",
        marginTop: "30px",
        display: "flex",
        justifyContent: "center",
      }} onClick={() => navigate('/class-form', { state: {} })}>
          Add Class
      </CButton>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this class record?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default Colors
