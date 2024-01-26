import { useEffect, useState } from "react";

function HourlyWeather() {
  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    // Kullanıcının konumunu al
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
          try {
            const response = await fetch(
              `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=tr`
            );
            const data = await response.json();
            setAddress(data.locality);
          } catch (error) {
            setError("Adres bilgisi alınamadı.");
          }
        }
      );
    }
  }, []);



  const fetchData = async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=trabzon&appid=${import.meta.env.VITE_OPENWEATHER_API}`
      );
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Weather API isteği başarısız oldu:", error);
    }
  };

  useEffect(() => {
    if (location) {
      fetchData();
    }
  }, [location]);

  return (
    <div>
      <h1>HourlyWeather</h1>
      <div>
        <button onClick={fetchData}>Hava Durumu Verilerini Al</button>

      </div>
      <div className="container">
        {location ? (
          <div>
            <p>Konumunuz:</p>
            <p>Latitude: {location.latitude}</p>
            <p>Longitude: {location.longitude}</p>
            {address && <p>Adres: {address}</p>}
          </div>
        ) : (
          <p>{error || "Konum bilgisi alınamıyor..."}</p>
        )}
      </div>
    </div>
  );
}

export default HourlyWeather;