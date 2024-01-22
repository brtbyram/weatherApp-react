import { useEffect, useState } from "react";

const Settings = () => {
  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    // Kullanıcının konumunu al
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });

          // Konumu adres bilgisine dönüştür
          try {
            const response = await fetch(
              `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=YOUR_GOOGLE_MAPS_API_KEY`
            );
            const data = await response.json();

            if (data.results && data.results.length > 0) {
              setAddress(data.results[0].formatted_address);
            } else {
              setError('Adres bilgisi bulunamadı.');
            }
          } catch (error) {
            setError('Adres bilgisi alınamıyor.');
          }
        },
        (error) => {
          setError(error.message);
        }
      );
    } else {
      setError('Tarayıcınız konum hizmetlerini desteklemiyor.');
    }
  }, []);

  console.log(address);

  return (
    <div>
      {location ? (
        <div>
          <p>Konumunuz:</p>
          <p>Latitude: {location.latitude}</p>
          <p>Longitude: {location.longitude}</p>
          {address && <p>Adres: {address}</p>}
        </div>
      ) : (
        <p>{error || 'Konum bilgisi alınamıyor...'}</p>
      )}
    </div>
  );
};

export default Settings;