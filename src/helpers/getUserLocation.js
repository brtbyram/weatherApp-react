import axios from "axios";
import { setLocation } from "../redux/reducers/locationSlice";

export const getUserLocation = async (dispatch) => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude } = position.coords;
                try {
                    const { data } = await axios.get(
                        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=tr`
                    );
                    dispatch(setLocation(data.city));
                    localStorage.setItem("location", data.city);
                    console.log("Tarayıcı üzerinden loaction bilgisi alındı.", data.city);
                } catch (error) {
                    console.log("Adres bilgisi alınamadı.", error);
                }
            },
            (error) => {
                console.log("Konum bilgisi alınamadı.", error);
            }
        );
    } else {
        console.log("Geolocation desteği yok.");
    }
};
