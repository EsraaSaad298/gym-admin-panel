import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useLocation } from 'react-router-dom'
import avatar1 from 'src/assets/images/avatars/1.jpg'
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardGroup,
  CCardHeader,
  CCardImage,
  CCardLink,
  CCardSubtitle,
  CCardText,
  CCardTitle,
  CListGroup,
  CListGroupItem,
  CNav,
  CNavItem,
  CNavLink,
  CCol,
  CRow,
} from '@coreui/react'

//prettier-ignore
const Carousels = (props) => {
  const location = useLocation();
  const { client } = location.state;

  const containerStyle = {
    display: 'flex',
    alignItems: 'center',
    padding: '16px',
    background: '#f8f8f8',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  };

  const imageStyle = {
    width: '200px',
    height: '200px',
    borderRadius: '8px',
    marginRight: '20px',
  };

  const infoContainerStyle = {
    flex: '1',
  };

  const headingStyle = {
    fontSize: '24px',
    marginBottom: '8px',
    fontWeight: 'bold',
  };

  const textStyle = {
    marginBottom: '8px',
  };

  const markerTextStyle = {
    marginBottom: '8px',
    fontWeight: 'bold',
  };

  return (
    <div style={containerStyle}>
      <img src={client.image.src} alt="Class" style={imageStyle} />
      <div style={infoContainerStyle}>
        <h2 style={headingStyle}>{client.title}</h2>
        <p style={textStyle}>
          <strong>Coach:</strong> {client.coach_name}
        </p>
        <p style={textStyle}>{client.description}</p>
        <p style={textStyle}>
          <strong>Coach Brief:</strong> {client.coach_brief}
        </p>
        <p style={textStyle}>
          <strong>Timing:</strong> {client.timing}
        </p>
        <p style={textStyle}>
          <strong>Price:</strong> {client.price}
        </p>
      </div>
    </div>
  );

}

export default Carousels

Carousels.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.shape({
      client: PropTypes.object.isRequired,
    }).isRequired,
  }).isRequired,
}
