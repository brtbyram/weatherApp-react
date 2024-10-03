import { useState } from "react"
import { fetchWeatherData } from "../../redux/reducers/dataSlice";
import { useDispatch, useSelector } from "react-redux";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y } from 'swiper/modules';
import clsx from "clsx";
import moment from "moment";
import { useMediaQuery } from 'react-responsive'
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Icon } from "../../Icons";
import { ErrorMessage, Field, Form, Formik } from "formik";


export default function DailyWeather() {

    const { weatherData } = useSelector(state => state.data)
    const dispatch = useDispatch()

    const isMobile = useMediaQuery({ query: '(max-width: 640px)' })
    const isTablet = useMediaQuery({ query: '(max-width: 1224px)' })


    const [dayNumbers, setDayNumbers] = useState("3")

    const [forecastIndex, setForecastIndex] = useState(0)



    const handleSubmit = (values) => {
        dispatch(fetchWeatherData(values.location , {...values.numberOfDays} ))
        setDayNumbers(values.numberOfDays)
    }



    const forecastData = weatherData && weatherData.forecast.forecastday[forecastIndex]
    const forecastDayData = forecastData && forecastData.day
    const forecastNightData = forecastData && forecastData.hour[23]

    console.log(forecastIndex)


    return (

        <main className="h-full bg-gray-100">
            <div className="py-5 flex items-center justify-center">


                <Formik
                    initialValues={{ location: "" , numberOfDays : "" }}
                    validate={values => {
                        const errors = {};
                        if (!values.location) {
                            errors.location = 'Required';
                        }
                        if (!values.numberOfDays) {
                            errors.numberOfDays = 'Required';
                        }
                        return errors;
                    }}
                    onSubmit={handleSubmit}
                >
                    {() => (
                        <Form className="gap-3 justify-center py-5 items-center flex flex-col">
                            <label htmlFor="location">
                                <Field id="location" type="text" name="location" className="h-10 w-96 rounded px-3" placeholder="Şehir giriniz" />
                                <ErrorMessage name="location" component="div" />
                            </label>
                            <label htmlFor="numberOfDays">
                                <Field type="number" name="numberOfDays" min={0} max={3} placeholder="Gün sayısı giriniz" className="h-10 w-96 rounded px-3" />
                                <ErrorMessage name="numberOfDays" component="div" />
                            </label>

                            <button type="submit" className=" text-white flex items-center justify-center w-64 mx-auto px-6 py-4 duration-700 transition-all font-semibold border rounded-xl bg-gray-100/10">
                                Search
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>
            {weatherData && (
                <div>
                    <div className="py-5">
                        <div className="flex items-center justify-center">
                            <h2>{weatherData.location.name}</h2>
                            <h3>{weatherData.current.temp_c} °C</h3>
                            <img src={weatherData.current.condition.icon} alt={weatherData.current.condition.text} />
                            <h4>{weatherData.current.condition.text}</h4>
                        </div>
                        <div className="flex flex-col justify-center items-center">
                            <h2 className="text-xl font-bold p-5">{dayNumbers} Day Forecast</h2>
                            <Swiper
                                modules={[Navigation, Pagination, A11y]}
                                spaceBetween={0}
                                slidesPerView={isMobile ? 2 : 3}
                                loop={true}
                                pagination={{ clickable: true }}
                                parallax={true}
                                onSlideChange={() => console.log('slide change')}
                                onSwiper={(swiper) => console.log(swiper)}
                                className="w-full bg-white"
                            >
                                {weatherData.forecast.forecastday.map((day, index) => (
                                    <SwiperSlide key={index} onClick={() => setForecastIndex(index)} className="flex justify-center items-center text-center border-x border-gray-600">
                                        <div className={clsx("flex flex-col items-center justify-center w-full cursor-pointer h-96 bg-gray-700 text-white", {
                                            "!bg-blue-900/90 text-white w-full h-80": index === forecastIndex
                                        })}>
                                            <h6>{day.date}</h6>
                                            <img src={day.day.condition.icon} alt={day.day.condition.text} />
                                            <h6>{day.day.avgtemp_c} °C - {day.day.mintemp_c} °C</h6>
                                            <h6>{day.day.condition.text}</h6>
                                            <h6>{day.day.daily_chance_of_rain} %</h6>
                                            <Swiper
                                                spaceBetween={0}
                                                slidesPerView={isMobile ? 2 : isTablet ? 3 : 6}
                                                onSlideChange={() => console.log('slide change')}
                                                onSwiper={(swiper) => console.log(swiper)}
                                                initialSlide={moment().format('H') - 1}
                                                loop={true}
                                                className="w-full"

                                            >
                                                {index === forecastIndex && (day.hour.map((hour, index) => (
                                                    <SwiperSlide key={index} className="flex flex-col items-center justify-center mx-auto w-24">
                                                        <div className={clsx("rounded p-3", {
                                                            "bg-blue-900/90": moment(hour.time).format('H') === moment().format('H'),
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
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                    </div>
                    <div className="container mx-auto bg-white p-5 md:p-10 my-5">
                        <h2 className="border-b p-3 pt-0 font-semibold text-xl">Day <span className="font-medium text-md pl-5">{forecastData.date}</span></h2>
                        <div className="grid lg:grid-cols-2">
                            <div className="flex flex-col p-10 items-center justify-center">
                                <div className="flex">
                                    <img className="w-48" src={forecastDayData.condition.icon} alt={forecastDayData.condition.text} />
                                    <h3 className="font-medium text-4xl"> {forecastDayData.avgtemp_c} °C</h3>
                                </div>
                                <h4 className="font-medium text-xl">{forecastDayData.condition.text}</h4>
                            </div>
                            <div className='container mx-auto grid gap-x-2 md:grid-cols-2 lg:p-12 pt-0 rounded-xl w-full'>
                                <div className="flex items-center space-x-2 border-b md:mx-3 drop-shadow-lg p-2">
                                    <Icon name="cloud" size="40" />
                                    <h2 className='flex w-full'><strong className='flex-1 font-medium'>Cloudly:</strong><span> %{forecastDayData.cloud}</span></h2>
                                </div>
                                <div className="flex items-center space-x-2 border-b md:mx-3 drop-shadow-lg p-2">
                                    <Icon name="visibility" size="40" />
                                    <h2 className='flex w-full'><strong className='flex-1 font-medium'>Visibility:</strong><span>{forecastDayData.avgvis_km}km</span></h2>
                                </div>
                                <div className="flex items-center space-x-2 border-b md:mx-3 drop-shadow-lg p-2">
                                    <Icon name="uv" size="40" />
                                    <h2 className='flex w-full'><strong className='flex-1 font-medium'>UV:</strong><span>{forecastDayData.uv}</span></h2>
                                </div>
                                <div className="flex items-center space-x-2 border-b md:mx-3 drop-shadow-lg p-2">
                                    <Icon name="humidity" size="40" />
                                    <h2 className='flex w-full'><strong className='flex-1 font-medium'>Humidity:</strong><span>%{forecastDayData.avghumidity}</span></h2>
                                </div>
                                <div className="flex items-center space-x-2 border-b md:mx-3 drop-shadow-lg p-2">
                                    <Icon name="maxTemp" size="40" />
                                    <h2 className='flex w-full'><strong className='flex-1 font-medium'>Maximum Temperature:</strong><span>{forecastDayData.maxtemp_c}°C</span></h2>
                                </div>
                                <div className="flex items-center space-x-2 border-b md:mx-3 drop-shadow-lg p-2">
                                    <Icon name="minTemp" size="40" />
                                    <h2 className='flex w-full'><strong className='flex-1 font-medium'>Minimum Temperature:</strong><span>{forecastDayData.mintemp_c}°C</span></h2>
                                </div>
                                <div className="flex items-center space-x-2 border-b md:mx-3 drop-shadow-lg p-2">
                                    <Icon name="sensedTemp" size="40" />
                                    <h2 className='flex w-full'><strong className='flex-1 font-medium'>Sensed Temperature:</strong><span>{forecastDayData.feelslike_c}°C</span></h2>
                                </div>
                                <div className="flex items-center space-x-2 border-b md:mx-3 drop-shadow-lg p-2">
                                    <Icon name="autoTemp" size="40" />
                                    <h2 className='flex w-full'><strong className='flex-1 font-medium'>Average Temperature:</strong><span>{forecastDayData.avgtemp_c}°C</span></h2>
                                </div>
                                <div className="flex items-center space-x-2 border-b md:mx-3 drop-shadow-lg p-2">
                                    <Icon name="changeRain" size="40" />
                                    <h2 className='flex w-full'><strong className='flex-1 font-medium'>Chance of rain:</strong><span>%{forecastDayData.daily_chance_of_rain}</span></h2>
                                </div>
                                <div className="flex items-center space-x-2 border-b md:mx-3 drop-shadow-lg p-2">
                                    <Icon name="changeSnow" size="40" />
                                    <h2 className='flex w-full'><strong className='flex-1 font-medium'>Chance of snow:</strong><span>%{forecastDayData.daily_chance_of_snow}</span></h2>
                                </div>
                                <div className="flex items-center space-x-2 border-b md:mx-3 drop-shadow-lg p-2">
                                    <Icon name="totalSnow" size="40" />
                                    <h2 className='flex w-full'><strong className='flex-1 font-medium'>Total snow:</strong><span>{forecastDayData.totalsnow_cm}cm</span></h2>
                                </div>
                                <div className="flex items-center space-x-2 border-b md:mx-3 drop-shadow-lg p-2">
                                    <Icon name="totalSnow" size="40" />
                                    <h2 className='flex w-full'><strong className='flex-1 font-medium'>Max Wind:</strong><span>{forecastDayData.maxwind_kph}km/h</span></h2>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className="container mx-auto bg-white p-5 md:p-10 my-5">
                        <h2 className="border-b p-3 pt-0 font-semibold text-xl">Night</h2>
                        <div className="grid md:grid-cols-2">
                            <div className="flex flex-col p-10 items-center justify-center">
                                <div className="flex">
                                    <img className="w-48" src={forecastNightData.condition.icon} alt={forecastNightData.condition.text} />
                                    <h3 className="font-medium text-4xl"> {forecastNightData.temp_c} °C</h3>
                                </div>
                                <h4 className="font-medium text-xl">{forecastDayData.condition.text}</h4>
                            </div>
                            <div className='container mx-auto grid gap-x-2 md:grid-cols-2 lg:p-12 pt-0 rounded-xl w-full'>
                                <div className="flex items-center space-x-2 border-b md:mx-3 drop-shadow-lg p-2">
                                    <Icon name="cloud" size="40" />
                                    <h2 className='flex w-full'><strong className='flex-1 font-medium'>Cloudly:</strong><span> %{forecastNightData.cloud}</span></h2>
                                </div>
                                <div className="flex items-center space-x-2 border-b md:mx-3 drop-shadow-lg p-2">
                                    <Icon name="visibility" size="40" />
                                    <h2 className='flex w-full'><strong className='flex-1 font-medium'>Visibility:</strong><span>{forecastNightData.vis_km}km</span></h2>
                                </div>
                                <div className="flex items-center space-x-2 border-b md:mx-3 drop-shadow-lg p-2">
                                    <Icon name="uv" size="40" />
                                    <h2 className='flex w-full'><strong className='flex-1 font-medium'>UV:</strong><span>{forecastNightData.uv}</span></h2>
                                </div>
                                <div className="flex items-center space-x-2 border-b md:mx-3 drop-shadow-lg p-2">
                                    <Icon name="humidity" size="40" />
                                    <h2 className='flex w-full'><strong className='flex-1 font-medium'>Humidity:</strong><span>%{forecastNightData.humidity}</span></h2>
                                </div>
                                <div className="flex items-center space-x-2 border-b md:mx-3 drop-shadow-lg p-2">
                                    <Icon name="maxTemp" size="40" />
                                    <h2 className='flex w-full'><strong className='flex-1 font-medium'>Wind Chill:</strong><span>{forecastNightData.windchill_c}°C</span></h2>
                                </div>
                                <div className="flex items-center space-x-2 border-b md:mx-3 drop-shadow-lg p-2">
                                    <Icon name="minTemp" size="40" />
                                    <h2 className='flex w-full'><strong className='flex-1 font-medium'>Wind Degree:</strong><span>{forecastNightData.wind_degree}°</span></h2>
                                </div>
                                <div className="flex items-center space-x-2 border-b md:mx-3 drop-shadow-lg p-2">
                                    <Icon name="sensedTemp" size="40" />
                                    <h2 className='flex w-full'><strong className='flex-1 font-medium'>Sensed Temperature:</strong><span>{forecastNightData.feelslike_c}°C</span></h2>
                                </div>
                                <div className="flex items-center space-x-2 border-b md:mx-3 drop-shadow-lg p-2">
                                    <Icon name="autoTemp" size="40" />
                                    <h2 className='flex w-full'><strong className='flex-1 font-medium'>Gust:</strong><span>{forecastNightData.gust_kph}km/h</span></h2>
                                </div>
                                <div className="flex items-center space-x-2 border-b md:mx-3 drop-shadow-lg p-2">
                                    <Icon name="changeRain" size="40" />
                                    <h2 className='flex w-full'><strong className='flex-1 font-medium'>Chance of rain:</strong><span>%{forecastNightData.chance_of_rain}</span></h2>
                                </div>
                                <div className="flex items-center space-x-2 border-b md:mx-3 drop-shadow-lg p-2">
                                    <Icon name="changeSnow" size="40" />
                                    <h2 className='flex w-full'><strong className='flex-1 font-medium'>Chance of snow:</strong><span>%{forecastNightData.chance_of_snow}</span></h2>
                                </div>
                                <div className="flex items-center space-x-2 border-b md:mx-3 drop-shadow-lg p-2">
                                    <Icon name="totalSnow" size="40" />
                                    <h2 className='flex w-full'><strong className='flex-1 font-medium'>Total snow:</strong><span>{forecastNightData.snow_cm}cm</span></h2>
                                </div>
                                <div className="flex items-center space-x-2 border-b md:mx-3 drop-shadow-lg p-2">
                                    <Icon name="totalSnow" size="40" />
                                    <h2 className='flex w-full'><strong className='flex-1 font-medium'>Pressure:</strong><span>{forecastNightData.pressure_mb}hPa</span></h2>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="container mx-auto bg-white p-5 md:p-10 my-5">
                        <h2 className="border-b p-3 pt-0 font-semibold text-xl">Rise/Set</h2>
                        <div className="grid md:grid-cols-2 md:py-6">
                            <div className="flex items-center justify-center max-md:py-5 space-x-4 max-md:border-b md:border-r">
                                <div className="flex flex-col items-center">
                                    <Icon name="moonSet" size="110" />
                                    <div>MoonRise: {forecastData.astro.moonrise}</div>
                                </div>
                                <div className="flex flex-col items-center">
                                    <Icon name="moonSet" size="110" />
                                    <div>MoonSet: {forecastData.astro.moonset}</div>
                                </div>
                            </div>
                            <div className="flex items-center justify-center max-md:py-5 space-x-4">
                                <div className="flex flex-col items-center">
                                    <Icon name="sunRise" size="110" />
                                    <div>SunRise: {forecastData.astro.sunrise}</div>
                                </div>
                                <div className="flex flex-col items-center">
                                    <Icon name="sunSet" size="110" />
                                    <div>Sun Set: {forecastData.astro.sunset}</div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            )
            }
        </main>
    )
}
