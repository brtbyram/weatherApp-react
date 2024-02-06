import { useEffect, useState } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { Swiper, SwiperSlide } from 'swiper/react';
import { convertTurkishToEnglish } from '../../helpers/convert-turkish-to-english'
import moment from 'moment';
import { Icon } from '../../Icons';
import { Disclosure} from '@headlessui/react';
import { useMediaQuery } from 'react-responsive'
import clsx from 'clsx';

function HourlyWeather() {
  const isMobile = useMediaQuery({ query: '(max-width: 640px)' })
  const isTablet = useMediaQuery({ query: '(max-width: 1224px)' })

  const [weatherData, setWeatherData] = useState(null)
  const [selectedHour, setSelectedHour] = useState(moment().format('YYYY-MM-DD HH') + ':00')

  const [open, setOpen] = useState(false)

  const location = useSelector(state => state.location.value)

  const fetchData = async (location) => {
    try {
      const response = await axios.get(`http://api.weatherapi.com/v1/forecast.json?key=${import.meta.env.VITE_WEATHER_API}&q=${convertTurkishToEnglish(location)}&days=3&aqi=yes&alerts=yes`)
      setWeatherData(response.data)
      console.log(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (location) {
      fetchData(location);
    }
  }, [location]);

  const hourData = weatherData && weatherData.forecast.forecastday[0].hour.find(hour => moment(hour.time).format('YYYY-MM-DD HH') + ':00' === selectedHour)

  return (
    <div className='h-full'>
      {weatherData && (
        <div className='rounded md:pt-14 text-lg bg-white md:py-10 md:px-5'>
          <Swiper
            spaceBetween={0}
            slidesPerView={isMobile ? 5 : isTablet ? 12 : 24}
            parallax={true}
            initialSlide={moment().format('H') - 1}
          >
            {weatherData.forecast.forecastday[0].hour.map((hour, index) => (
              <SwiperSlide key={index}>
                <div onMouseEnter={() => setSelectedHour(hour.time)} className={clsx("flex flex-col justify-between items-center hover:text-white hover:bg-blue-900/90 h-64 py-5 border border-gray-300 transition-all", {
                  'bg-gray-200': hour.is_day === 0,
                  '!bg-blue-900/90 text-white': moment(hour.time).format('YYYY-MM-DD HH') + ':00' === selectedHour && !(moment().format('YYYY-MM-DD HH') === moment(hour.time).format('YYYY-MM-DD HH')),
                  '!bg-gray-700 text-white': moment().format('YYYY-MM-DD HH') === moment(hour.time).format('YYYY-MM-DD HH'),
                })}>
                  <p className='text-sm '>{moment(hour.time).format('HH:mm')}</p>
                  <img src={hour.condition.icon} alt={hour.condition.text} />
                  <p>{hour.temp_c}°C</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className={clsx('flex flex-col bg-blue-900/90 items-center text-white rounded-b-3xl pb-5 px-5 transition-colors', {
            '!bg-gray-700': selectedHour === moment().format('YYYY-MM-DD HH') + ':00',
          })}>
            <h1 className='border-b w-full text-center p-4'>{selectedHour}</h1>
            <div className={`grid ${open === true ? 'lg:grid-cols-2' : ''}`}>
              <div className='grid md:gap-y-6 md:grid-cols-3 py-6 place-content-center place-items-center text-center'>
                <div>
                  <h2 className='text-2xl pt-2'>{hourData.condition.text}</h2>
                </div>
                <div>
                  <h3 className='text-3xl p-3 font-semibold'>{weatherData.location.name}</h3>
                  <img className='w-48' src={hourData.condition.icon} alt={hourData.condition.text} />
                  <h3 className='text-4xl'>{hourData.temp_c}°C</h3>
                </div>
                <div className='grid gap-3'>
                  <div className='flex items-center space-x-4 space-y-4 justify-center text-2xl'>
                    <div style={{ transform: `rotate(${hourData.wind_degree + 90}deg)` }}>
                      <Icon name='arrow' size='40' />
                    </div>
                    <h2>{hourData.wind_dir}</h2>
                  </div>
                  <h3 className='text-2xl'>Wind : {hourData.wind_kph} km/h</h3>
                  <h3 className='text-2xl'>Humidity: {hourData.humidity}%</h3>
                </div>
              </div>
              <Disclosure> 
                {({ open }) => (
                  <div className={`${open && 'bg-gray-400/40 text-white'} bg-gray-400/30 border md:px-3 my-6 rounded-xl`}>
                    <Disclosure.Button onClick={() => setOpen(!open)} className="flex text-center text-xl justify-center items-center w-full p-4 outline-none ">
                      More Details
                    </Disclosure.Button>
                    <Disclosure.Panel>
                      <div className='container mx-auto grid gap-x-2 md:grid-cols-2 p-12 pt-0 rounded-xl w-full'>
                        <div className="flex items-center space-x-2 border-b md:mx-3 drop-shadow-lg p-2">
                          <Icon name="cloud" size="40" />
                          <h2 className='flex w-full'><strong className='flex-1 font-medium'>Cloudly:</strong><span> %{hourData.cloud}</span></h2>
                        </div>
                        <div className="flex items-center space-x-2 border-b md:mx-3 drop-shadow-lg p-2">
                          <Icon name="visibility" size="40" />
                          <h2 className='flex w-full'><strong className='flex-1 font-medium'>Visibility:</strong><span>{hourData.vis_km}km</span></h2>
                        </div>
                        <div className="flex items-center space-x-2 border-b md:mx-3 drop-shadow-lg p-2">
                          <Icon name="uv" size="40" />
                          <h2 className='flex w-full'><strong className='flex-1 font-medium'>UV:</strong><span>{hourData.uv}</span></h2>
                        </div>
                        <div className="flex items-center space-x-2 border-b md:mx-3 drop-shadow-lg p-2">
                          <Icon name="humidity" size="40" />
                          <h2 className='flex w-full'><strong className='flex-1 font-medium'>Humidity:</strong><span>%{hourData.humidity}</span></h2>
                        </div>
                        <div className="flex items-center space-x-2 border-b md:mx-3 drop-shadow-lg p-2">
                          <Icon name="maxTemp" size="40" />
                          <h2 className='flex w-full'><strong className='flex-1 font-medium'>Wind Chill:</strong><span>{hourData.windchill_c}°C</span></h2>
                        </div>
                        <div className="flex items-center space-x-2 border-b md:mx-3 drop-shadow-lg p-2">
                          <Icon name="minTemp" size="40" />
                          <h2 className='flex w-full'><strong className='flex-1 font-medium'>Wind Degree:</strong><span>{hourData.wind_degree}°</span></h2>
                        </div>
                        <div className="flex items-center space-x-2 border-b md:mx-3 drop-shadow-lg p-2">
                          <Icon name="sensedTemp" size="40" />
                          <h2 className='flex w-full'><strong className='flex-1 font-medium'>Sensed Temperature:</strong><span>{hourData.feelslike_c}°C</span></h2>
                        </div>
                        <div className="flex items-center space-x-2 border-b md:mx-3 drop-shadow-lg p-2">
                          <Icon name="autoTemp" size="40" />
                          <h2 className='flex w-full'><strong className='flex-1 font-medium'>Gust:</strong><span>{hourData.gust_kph}km/h</span></h2>
                        </div>
                        <div className="flex items-center space-x-2 border-b md:mx-3 drop-shadow-lg p-2">
                          <Icon name="changeRain" size="40" />
                          <h2 className='flex w-full'><strong className='flex-1 font-medium'>Chance of rain:</strong><span>%{hourData.chance_of_rain}</span></h2>
                        </div>
                        <div className="flex items-center space-x-2 border-b md:mx-3 drop-shadow-lg p-2">
                          <Icon name="changeSnow" size="40" />
                          <h2 className='flex w-full'><strong className='flex-1 font-medium'>Chance of snow:</strong><span>%{hourData.chance_of_snow}</span></h2>
                        </div>
                        <div className="flex items-center space-x-2 border-b md:mx-3 drop-shadow-lg p-2">
                          <Icon name="totalSnow" size="40" />
                          <h2 className='flex w-full'><strong className='flex-1 font-medium'>Total snow:</strong><span>{hourData.snow_cm}cm</span></h2>
                        </div>
                        <div className="flex items-center space-x-2 border-b md:mx-3 drop-shadow-lg p-2">
                          <Icon name="totalSnow" size="40" />
                          <h2 className='flex w-full'><strong className='flex-1 font-medium'>Pressure:</strong><span>{hourData.pressure_mb}hPa</span></h2>
                        </div>
                      </div>
                    </Disclosure.Panel>

                  </div>
                )}
              </Disclosure>
            </div>
          </div>

        </div>
      )}
    </div>
  );
}

export default HourlyWeather;