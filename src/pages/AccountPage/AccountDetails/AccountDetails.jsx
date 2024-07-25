import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import GeneralUserDetailsCard from '../../../features/AccountPageComponents/GeneralUserDetailsCard';

//Styles
import "./AccountDetails.scss";

function AccountDetails() {
    const user = useSelector(state => state.auth.user);

    return (
        <div className='account-details-box'>
            <h2>Hesap Bilgilerim</h2>
            <GeneralUserDetailsCard />
            <div className='change-user-infos-box'>
               
            </div>
        </div>
    );
}

export default AccountDetails;