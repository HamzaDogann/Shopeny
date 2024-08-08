import { push, ref, set } from 'firebase/database';
import { db } from "../../services/firebase/config"

export const addData = async (path, data) => {
    try {
        const dbRef = ref(db, path);
        await set(dbRef, data);
    } catch (error) {
        console.log(error.message);
        throw new Error(error.message);
    }
};

export const addDataWithAutoId = async (path, data) => {
    try {
        const dbRef = ref(db, path);
        const newRef = push(dbRef);
        const addressId = newRef.key;
        await set(newRef, { ...data, addressId });
        return addressId;
    } catch (error) {
        throw new Error(error.message);
    }
};