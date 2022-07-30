import React from 'react';

import './DashboardInformation.css';

const DashboardInformation = ({ username }) => {
  return (
    <div className='dashboard_info_text_container'>
      <span className='dashboard_info_text_title'>
        Hello {username},
        <p>Welcome to Meetings.</p>
      </span>

    </div>
  );
};

export default DashboardInformation;
