import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useLocation } from 'react-router-dom'
import avatar3 from 'src/assets/images/avatars/3.jpg'
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
const Cards = (props) => {
  const location = useLocation();
  const { client } = location.state;

  const cardStyle = {
    display: 'flex',
    alignItems: 'center',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    background: '#fff',
  };

  const imageStyle = {
    width: '150px',
    height: '150px',
    borderRadius: '50%',
    marginRight: '16px',
    objectFit: 'cover',
  };

  const detailsContainerStyle = {
    flex: '1',
  };

  const fullNameStyle = {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '10px',
  };

  const infoStyle = {
    fontSize: '16px',
    marginBottom: '5px',
  };

  return (
    <div style={cardStyle}>
      <img style={imageStyle} src={client.avatar.src} alt="Client Profile" />
      <div style={detailsContainerStyle}>
        <h2 style={fullNameStyle}>{client.full_name}</h2>
        <p style={infoStyle}>Mobile Number: {client.mobile_number}</p>
        <p style={infoStyle}>Address: {client.address}</p>
        <p style={infoStyle}>Subscription Type: {client.subscription_plan}</p>
      </div>
    </div>
  );
}

export default Cards

Cards.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.shape({
      client: PropTypes.object.isRequired,
    }).isRequired,
  }).isRequired,
}
