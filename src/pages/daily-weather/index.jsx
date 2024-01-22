import axios from "axios"
import { useEffect, useRef, useState } from "react"
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y } from 'swiper/modules';
import clsx from "clsx";
import moment from "moment";
import CanvasJSReact from '@canvasjs/react-charts';


import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { convertTurkishToEnglish } from "../../helpers/convert-turkish-to-english";


const { CanvasJSChart } = CanvasJSReact;

export default function DailyWeather() {
    const [location, setLocation] = useState()
    const [dayNumbers, setDayNumbers] = useState()

    const [weatherData, setWeatherData] = useState(null)
    const [formData, setFormData] = useState({
        location: "trabzon",
        dayNumbers: 14
    })

    const fetchData = async (location, dayNumbers) => {
        try {
            const response = await axios.get(`http://api.weatherapi.com/v1/forecast.json?key=${import.meta.env.VITE_WEATHER_API}&q=${convertTurkishToEnglish(location)}&days=${dayNumbers}&aqi=yes&alerts=yes`)
            setWeatherData(response.data)
            console.log(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setFormData({
            location,
            dayNumbers
        })
    }


    useEffect(() => {
        if (formData.location && formData.dayNumbers) {
            fetchData(formData.location, formData.dayNumbers)
        }
    }, [formData])

    let dataPoints = [];

    useEffect(() => {
        if (weatherData) {
            for (let i = 0; i < weatherData.forecast.forecastday.length; i++) {
                for (let j = 0; j < weatherData.forecast.forecastday[i].hour.length; j++) {
                    dataPoints.push({
                        x: new Date(weatherData.forecast.forecastday[i].hour[j].time),
                        y: weatherData.forecast.forecastday[i].hour[j].temp_c
                    });
                }

            }
            chartRef.current.render();
        }
    }, [weatherData])

    const chartRef = useRef(null);

    const options = {
        theme: "dark2",
    
        animationEnabled: true,
        zoomEnabled: true,
        exportEnabled: true,
        
        title: {
            text: 'Saatlik Hava Durumu',
        },
        data: [
            {
                type: 'splineArea',
                xValueFormatString: 'DD MM YYYY HH:MM',
                yValueFormatString: '#,##0.00°C',
                dataPoints: dataPoints,
            },
        ],
    };

    return (

        <main className="flex flex-col">
            <div className=" h-min-h py-5 flex items-center justify-center">
                <form className="grid sm:grid-flow-col gap-2 max-md:w-[95%]" onSubmit={handleSubmit}>
                    <input type="text" className="h-10 rounded px-3" value={location} name="location" placeholder="Şehir giriniz" onChange={(e) => setLocation(e.target.value)} />
                    <input type="number" min={0} max={14} className="h-10 rounded px-3" value={dayNumbers} name="dayNumbers" placeholder="Gün sayısı giriniz" onChange={(e) => setDayNumbers(e.target.value)} />
                    <button type="submit" className="bg-[#3F72AF]  text-white p-2 rounded-lg">Gönder</button>
                </form>
            </div>
            {weatherData && (
                <div className="text-white py-5">
                    <div className="flex items-center justify-center">
                        <h2>{weatherData.location.name}</h2>
                        <h3>{weatherData.current.temp_c} °C</h3>
                        <img src={weatherData.current.condition.icon} alt={weatherData.current.condition.text} />
                        <h4>{weatherData.current.condition.text}</h4>
                    </div>
                    <div className="flex flex-col justify-center items-center">
                        <h2 className="text-xl font-bold text-black p-5">{formData.dayNumbers} Günlük Hava Durumu</h2>
                        <Swiper
                            modules={[Navigation, Pagination, A11y]}
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
                                        <div className={clsx("flex flex-col items-center justify-center w-60 h-60 bg-[#B7D0E1", {
                                            "bg-[#112D4E] w-full h-80": isActive
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
                </div>
            )
            }
            <div className="w-[80%] mx-auto my-10">
            <CanvasJSChart options={options} onRef={(ref) => (chartRef.current = ref)}  />
            </div>
        </main>
    )
}
