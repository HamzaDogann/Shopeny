import { ref, get } from 'firebase/database';
import { db } from "../../services/firebase/config";

// Generic fetch function
export const fetchData = async (path) => {
    try {
        const dbRef = ref(db, path);
        const snapshot = await get(dbRef);
        if (snapshot.exists()) {
            return snapshot.val();
        } else {
            throw new Error("Veri alınamadı");
        }
    } catch (error) {
        console.error(error.message);
        throw new Error(error.message);
    }
};
