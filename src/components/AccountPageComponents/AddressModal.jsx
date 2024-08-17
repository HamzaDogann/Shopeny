import React, { useState, useEffect } from "react";

const AddressModal = ({ isVisible, isEditMode, onClose, initialAddress, onSubmit }) => {

    const [form, setForm] = useState({
        addressTitle: "",
        city: "",
        district: "",
        neighborhood: "",
        street: "",
        postalCode: "",
        recipientName: "",
    });

    useEffect(() => {
        if (isEditMode && initialAddress) {
            setForm(initialAddress);
        } else {
            setForm({
                addressTitle: "",
                city: "",
                district: "",
                neighborhood: "",
                street: "",
                postalCode: "",
                recipientName: "",
            });
        }
    }, [isEditMode, initialAddress]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(form);
        onClose();
    };

    if (!isVisible) return null;

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Adres Başlığı
                <input
                    type="text"
                    name="addressTitle"
                    value={form.addressTitle}
                    onChange={handleChange}
                    required
                />
            </label>
            <label>
                İl
                <input
                    type="text"
                    name="city"
                    value={form.city}
                    onChange={handleChange}
                    required
                />
            </label>
            <label>
                Semt/İlçe
                <input
                    type="text"
                    name="district"
                    value={form.district}
                    onChange={handleChange}
                    required
                />
            </label>
            <label>
                Mahalle/Köy
                <input
                    type="text"
                    name="neighborhood"
                    value={form.neighborhood}
                    onChange={handleChange}
                    required
                />
            </label>
            <label>
                Cadde/Sokak/Bulvar
                <input
                    type="text"
                    name="street"
                    value={form.street}
                    onChange={handleChange}
                    required
                />
            </label>
            <div className="row">
                <label>
                    Posta Kodu
                    <input
                        type="text"
                        name="postalCode"
                        value={form.postalCode}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Alıcı Adı ve Soyadı
                    <input
                        type="text"
                        name="recipientName"
                        value={form.recipientName}
                        onChange={handleChange}
                        required
                    />
                </label>
            </div>
            <div className="button-box">
                <button type="submit" className="submit-button">
                    {isEditMode ? "Adresi Güncelle" : "Adresi Ekle"}
                </button>
            </div>
        </form>
    );
};

export default AddressModal;