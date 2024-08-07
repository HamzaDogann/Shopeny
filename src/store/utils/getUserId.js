//This method gets active user's id.

import { auth } from "../../services/firebase/config"; 

export const getUserId = () => {
    const user = auth.currentUser;
    if (user) {
        return user.uid;
    } else {
        return null;
    }
};