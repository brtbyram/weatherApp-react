import axios from "axios"
import { useEffect, useState } from "react"
import { convertTurkishToEnglish } from "../../helpers/convert-turkish-to-english";
import moment from "moment";
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import clsx from "clsx";

export default function Home() {
    const [location, setLocation] = useState()

    const [weatherData, setWeatherData] = useState(null)
    const [formData, setFormData] = useState({
        location: "new york"
    })

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

    const fetchData = async (location) => {
        try {
            const response = await axios.get(`http://api.weatherapi.com/v1/forecast.json?key=${import.meta.env.VITE_WEATHER_API}&q=${convertTurkishToEnglish(location)}&days=14&aqi=yes&alerts=yes`)
            setWeatherData(response.data)
            console.log(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setFormData({
            location
        })
    }


    useEffect(() => {
        if (formData.location) {
            fetchData(formData.location)
        }
    }, [formData])


    return (

        <main className="flex flex-col">
            <div className=" h-min-h py-5 flex items-center justify-center">
                <form className="grid sm:grid-flow-col gap-2 max-md:w-[95%]" onSubmit={handleSubmit}>
                    <input type="text" className="h-10 rounded px-3" value={location} name="location" placeholder="Şehir giriniz" onChange={(e) => setLocation(e.target.value)} />
                    <button type="submit" className="bg-[#3F72AF]  text-white p-2 rounded-lg">Gönder</button>
                </form>
            </div>
            {weatherData && (
                <div className="w-[80%] mx-auto">
                    <div className=" bg-[#F9F7F7] rounded-lg p-10 text-lg">
                        <h1 className="flex item-start font-semibold text-xl p-5">{weatherData.location.name} için Bugünün Hava Durumu Tahmini</h1>
                        <div className="flex">
                            <img width={100} src={weatherData.forecast.forecastday[0].day.condition.icon} alt="" />
                            <div className="font-semibold text-xl">
                                <h2 className="">{weatherData.current.temp_c} °C</h2>
                                <h2>{weatherData.location.name}</h2>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-2 mt-8">
                            <div className="flex items-center space-x-2">
                                <span className="material-symbols-outlined">thermometer_add</span>
                                <div className="">Max Temp: {weatherData.forecast.forecastday[0].day.maxtemp_c}°C</div>
                            </div>
                            <h2 className="">Total Precip: {weatherData.forecast.forecastday[0].day.totalprecip_mm} mm</h2>
                            <div className="flex items-center space-x-2">
                                <span className="material-symbols-outlined">thermometer_minus</span>
                                <h2 className="">Min Temp: {weatherData.forecast.forecastday[0].day.mintemp_c}°C</h2>
                            </div>

                            <h2 className="">UV: {weatherData.forecast.forecastday[0].day.uv}</h2>

                            <div className="flex items-center space-x-2">
                                <span className="material-symbols-outlined">thermostat_auto</span>
                                <h2 className="">Avg Temp: {weatherData.forecast.forecastday[0].day.avgtemp_c}°C</h2>
                            </div>
                            <div className="flex items-center space-x-2">
                                <span className="material-symbols-outlined">water_lux</span>
                                <h2 className="">Sunrise: {weatherData.forecast.forecastday[0].astro.sunrise}</h2>
                            </div>
                            <div className="flex items-center space-x-2">
                                <span className="material-symbols-outlined">wb_twilight</span>
                                <h2 className="">Sunset: {weatherData.forecast.forecastday[0].astro.sunset}</h2>
                            </div>
                            <div className="flex items-center space-x-2">
                                <span className="material-symbols-outlined">air</span>
                                <h2 className="">Max Wind: {weatherData.forecast.forecastday[0].day.maxwind_kph} km/h</h2>
                            </div>
                            <div className="flex items-center space-x-2">
                                <span className="material-symbols-outlined">humidity_mid</span>
                                <h2>Avg Humidity: %{weatherData.forecast.forecastday[0].day.avghumidity}</h2>
                            </div>
                            <div className="flex items-center space-x-2">
                                <span className="material-symbols-outlined">compress</span>
                                <h2 className="">Avg Pressure: {weatherData.forecast.forecastday[0].day.avgtemp_c} mb</h2>
                            </div>
                            <div className="flex items-center space-x-2">
                                <span className="material-symbols-outlined">rainy</span>
                                <h2 className="">Chance of Rain: %{weatherData.forecast.forecastday[0].day.daily_chance_of_rain}</h2>
                            </div>

                            <h2 className="">Moonrise: {weatherData.forecast.forecastday[0].astro.moonrise}</h2>
                            <h2 className="">Moonset: {weatherData.forecast.forecastday[0].astro.moonset}</h2>
                            <h2 className="">Moon Phase: {weatherData.forecast.forecastday[0].astro.moon_phase}</h2>
                            <h2 className="">Moon Illumination: {weatherData.forecast.forecastday[0].astro.moon_illumination}</h2>
                            <h2 className="">Condition: {weatherData.forecast.forecastday[0].day.condition.text}</h2>


                        </div>
                    </div>
                    <div className="bg-[#F9F7F7] rounded-lg mt-10 text-lg">
                        <h1 className="flex item-start font-semibold text-xl p-10">Saatlik Tahmin</h1>
                        <Swiper
                            spaceBetween={0}
                            slidesPerView={7}
                            onSlideChange={() => console.log('slide change')}
                            onSwiper={(swiper) => console.log(swiper)}
                            className=" rounded p-10 text-lg"
                        >
                            {weatherData.forecast.forecastday[0].hour.map((hour, index) => (
                                <SwiperSlide key={index} className="flex flex-col items-center justify-center mx-auto w-24">
                                    <div className={clsx("rounded", {
                                        "bg-[#3F72AF] text-white p-5": moment(hour.time).format('H') === moment().format('H'),
                                    })}>
                                        <img width={60} height={60} src={hour.condition.icon} alt={hour.condition.text} />
                                        <h6>{hour.temp_c} °C</h6>
                                        <h6>{moment(hour.time).format('LT')}</h6>
                                    </div>
                                </SwiperSlide>
                            ))
                            }
                        </Swiper>
                    </div>
                    <div className="bg-[#F9F7F7] rounded-lg mt-10 text-lg">
                        <h1>14 Günlük hava durumu tahmini</h1>
                        <Swiper
                            spaceBetween={-20}
                            slidesPerView={window.innerWidth < 768 ? 2 : 5}
                            navigation
                            pagination={{ clickable: true }}
                            parallax={true}
                            onSlideChange={() => console.log('slide change')}
                            onSwiper={(swiper) => console.log(swiper)}
                            className="w-full bg-[#3F72AF]"
                        >
                            {weatherData.forecast.forecastday.map((day) => (
                                <SwiperSlide key={day.date} className="flex justify-center items-center text-center">
                                    {({ isActive }) => (
                                        <div className={clsx("flex flex-col items-center justify-center w-60 h-60 bg-[#F9F7F7]", {
                                            "bg-[#3F72AF] w-[140%] h-80": isActive
                                        })}>
                                            <h6>{day.date}</h6>
                                            <img src={day.day.condition.icon} alt={day.day.condition.text} />
                                            <h6>{day.day.avgtemp_c} °C - {day.day.mintemp_c} °C</h6>
                                            <h6>{day.day.condition.text}</h6>
                                            <h6>{day.day.daily_chance_of_rain} %</h6>
                                            <Swiper
                                                spaceBetween={0}
                                                slidesPerView={7}
                                                onSlideChange={() => console.log('slide change')}
                                                onSwiper={(swiper) => console.log(swiper)}
                                                className="w-full"
                                            >
                                                {isActive && (day.hour.map((hour, index) => (
                                                    <SwiperSlide key={index} className="flex flex-col items-center justify-center mx-auto w-24">
                                                        <div className={clsx("rounded", {
                                                            "bg-[#B7D0E1]": moment(hour.time).format('H') === moment().format('H'),
                                                        })}>
                                                            <img width={60} height={60} src={hour.condition.icon} alt={hour.condition.text} />
                                                            <h6>{hour.temp_c} °C</h6>
                                                            <h6>{moment(hour.time).format('LT')}</h6>
                                                        </div>
                                                    </SwiperSlide>
                                                ))
                                                )}
                                            </Swiper>
                                        </div>
                                    )}
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                    <div>
                        {weatherData.alerts && (
                            weatherData.alerts.alert.map((alert, index) => (
                                <div key={index} className="bg-[#F9F7F7] rounded-lg mt-10 text-lg p-10">
                                    <h1 className="font-semibold">{alert.headline}</h1>
                                    <h2>Areas: {alert.areas}</h2>
                                    <h2>Description: {alert.desc}</h2>
                                    <h2>Category: {alert.category}</h2>
                                    <h2>Severity: {alert.severity}</h2>
                                    <h2>Note: {alert.note}</h2>
                                    <h2>Effective: {moment(alert.effective).format("YYYY-MM-GG HH:MM")}</h2>
                                    <h2>Expires: {moment(alert.expires).format("YYYY-MM-GG HH:MM")}</h2>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            )}
            <div className="container">
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
        </main>
    )
}
