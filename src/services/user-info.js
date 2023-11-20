import { decodedToken } from "@/utils/jwt";
import { getFromLocalStorage, setToLocalStorage } from "@/utils/local-storage";

export const storeUserInfo = ({ accessToken }) => {
    if (accessToken) {
        return setToLocalStorage("accessToken", accessToken)

    }

}
export const getUserInfo = () => {
    const authToken = getFromLocalStorage("accessToken");
    if (authToken) {
        const decodedData = decodedToken(authToken);
        return decodedData;
        console.log(decodedData)
    } else {
        return "";
    }
}
export const isLoggedIn = () => {
    const authToken = getFromLocalStorage("accessToken");
    return !!authToken;
}
export const removeUserInfo = (key) => {

    return localStorage.removeItem(key);
}
// export default storeUserInfo;
