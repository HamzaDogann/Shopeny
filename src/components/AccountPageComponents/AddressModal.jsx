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
                    minLength={3}
                    maxLength={30}
                    autoComplete="off"
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
                    minLength={3}
                    maxLength={14}
                    autoComplete="off"
                    onKeyPress={(e) => {
                        if (!/^[a-zA-ZığüşöçİĞÜŞÖÇ]+$/.test(e.key)) {
                            e.preventDefault();
                        }
                    }}
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
                    minLength={5}
                    maxLength={25}
                    autoComplete="off"
                    onKeyPress={(e) => {
                        if (!/^[a-zA-ZığüşöçİĞÜŞÖÇ]+$/.test(e.key)) {
                            e.preventDefault();
                        }
                    }}
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
                    minLength={5}
                    maxLength={50}
                    autoComplete="off"
                    onKeyPress={(e) => {
                        if (!/^[a-zA-ZığüşöçİĞÜŞÖÇ\s]+$/.test(e.key)) {
                            e.preventDefault();
                        }
                    }}
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
                    minLength={5}
                    maxLength={30}
                    autoComplete="off"
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
                        minLength={5}
                        maxLength={5}
                        autoComplete="off"
                        onKeyPress={(e) => {
                            if (!/[0-9]/.test(e.key)) {
                                e.preventDefault();
                            }
                        }}
                    />
                </label>
                <label>
                    Alıcı Adı ve Soyadı
                    <input
                        type="text"
                        name="recipientName"
                        value={form.recipientName}
                        onChange={handleChange}
                        maxLength={30}
                        onKeyPress={(e) => {
                            if (!/^[a-zA-ZığüşöçİĞÜŞÖÇ\s]+$/.test(e.key)) {
                                e.preventDefault();
                            }
                        }}
                        autoComplete="off"
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