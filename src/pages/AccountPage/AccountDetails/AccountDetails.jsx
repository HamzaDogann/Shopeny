import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { authActions } from '../../../store/features/auth/authActions';

function AccountDetails() {
    const user = useSelector(state => state.auth.user);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(authActions.logout())
            .then(() => {
                navigate('/');
            });
    };

    return (
        <div>
            <h1>Hesap Bilgilerim</h1>
            <hr />
            <img src={user.profilePhotoURL} style={{ with: "140px", borderRadius: "50%" }} alt="" />
            <p>{user.nameAndSurname}</p>
            <p>Telefon Numarası: {user.phoneNumber}</p>
            <hr />
            <button onClick={handleLogout} style={{ borderRadius: "5px", backgroundColor: "tomato", padding: "6px", color: "white" }}>Çıkış yap</button>
        </div>
    )
}

export default AccountDetails