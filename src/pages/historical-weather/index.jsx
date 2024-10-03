import { ErrorMessage, Field, Form, Formik } from "formik"
import moment from "moment"
import { Icon } from "../../Icons"
import { useSelector, useDispatch } from 'react-redux'
import { Disclosure, Transition } from "@headlessui/react"
import { useMediaQuery } from 'react-responsive'
import Button from "../../components/button"
import { fetchHistoricalWeatherData } from "../../redux/reducers/dataSlice"

function HistoricalWeather() {

  const { location } = useSelector(state => state.location)
  const dispatch = useDispatch()
  const { historicalWeatherData } = useSelector(state => state.data)

  const isMobile = useMediaQuery({ query: '(max-width: 640px)' })
  //  const isTablet = useMediaQuery({ query: '(max-width: 1224px)' })


  const handleSubmit = (values) => {
    dispatch(fetchHistoricalWeatherData(values))
  }

  return (
    <div className="bg-white h-full scroll-auto">
      <div className="flex min-h-screen flex-col space-y-4 justify-center items-center bg-gradient-to-b from-blue-900/90 to-gray-700 py-24">
        <p className="font-semibold text-3xl text-white text-center p-4">THE ABILITY TO SEARCH FOR WEATHER RESULTS FOR THE LAST 7 DAY</p>
        <Formik
          initialValues={{ location: "" || location, date: moment().format('YYYY-MM-DD') }}
          validate={values => {
            const errors = {};
            if (!values.location) {
              errors.location = 'Required';
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
              <label htmlFor="date">
                <Field type="date" name="date" min={moment().subtract(7, 'days').format('YYYY-MM-DD')} max={moment().format('YYYY-MM-DD')} className="h-10 w-96 rounded px-3" />
                <ErrorMessage name="date" component="div" />
              </label>

              <button type="submit" className=" text-white flex items-center justify-center w-64 mx-auto px-6 py-4 duration-700 transition-all font-semibold border rounded-xl bg-gray-100/10">
                Search
              </button>
            </Form>
          )}
        </Formik>
      </div>
      {historicalWeatherData.forecast && (
        <div className="container mx-auto grid gap-y-10 rounded-full my-6">
          <div className="bg-gray-700 text-white py-10 rounded-3xl">
            <div>
              <div className="grid md:grid-cols-2 place-content-center place-items-center">
                <div className="flex justify-center items-center drop-shadow-2xl">
                  {historicalWeatherData.forecast.forecastday[0].hour.map((hour, index) => (
                    <div key={index}>
                      {moment(hour.time).format('H') === moment().format('H') && (
                        <div className="">
                          <img width={200} className="z-10" src={hour.condition.icon} alt="" />
                        </div>
                      )}
                    </div>
                  ))}
                  <div className="font-extrabold text-3xl  z-10">
                    <h2 className="">{historicalWeatherData.forecast.forecastday[0].day.avgtemp_c} °C</h2>
                    <h2>{historicalWeatherData.location.name}</h2>
                  </div>
                </div>
                <div className="text-xl py-10 space-y-2">
                  <div className="flex items-center space-x-2">
                    <Icon name="maxTemp" size="50" />
                    <div className="">Max Temp: {historicalWeatherData.forecast.forecastday[0].day.maxtemp_c}°C</div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Icon name="autoTemp" size="50" />
                    <h2 className="">Average Temp: {historicalWeatherData.forecast.forecastday[0].day.avgtemp_c}°C</h2>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Icon name="minTemp" size="50" />
                    <h2 className="">Min Temp: {historicalWeatherData.forecast.forecastday[0].day.mintemp_c}°C</h2>
                  </div>
                </div>

              </div>
              <Disclosure>
                {({ open }) => (
                  <>
                    <Disclosure.Button className="w-full flex justify-center items-center">
                      <Button variant="primary" size="normal" as="button">{open ? "X": "More Info"}</Button>
                    </Disclosure.Button>
                    <Transition
                      enter="transition duration-500 ease-out"
                      enterFrom="transform scale-95 opacity-0"
                      enterTo="transform scale-100 opacity-100"
                      leave="transition duration-300 ease-out"
                      leaveFrom="transform scale-100 opacity-100"
                      leaveTo="transform scale-95 opacity-0"
                    >
                      <Disclosure.Panel className="duration-700 transition-all p-14">
                        <div className="grid md:grid-cols-2 gap-x-10 text-lg">
                          <div className="flex items-center space-x-2 border-b drop-shadow-lg">
                            <Icon name="uv" size="50" />
                            <h2 className="">UV: {historicalWeatherData.forecast.forecastday[0].day.uv}</h2>
                          </div>
                          <div className="flex items-center space-x-2 border-b drop-shadow-lg">
                            <Icon name="windy" size="50" />
                            <h2 className="">Max Wind: {historicalWeatherData.forecast.forecastday[0].day.maxwind_kph} km/h</h2>
                          </div>
                          <div className="flex items-center space-x-2 border-b drop-shadow-lg">
                            <Icon name="windy" size="50" />
                            <h2 className="">Average Visibility: {historicalWeatherData.forecast.forecastday[0].day.avgvis_km} km</h2>
                          </div>
                          <div className="flex items-center space-x-2 border-b drop-shadow-lg">
                            <Icon name="humidity" size="50" />
                            <h2>Average Humidity: %{historicalWeatherData.forecast.forecastday[0].day.avghumidity}</h2>
                          </div>
                          <div className="flex items-center space-x-2 border-b drop-shadow-lg">
                            <Icon name="totalSnow" size="50" />
                            <h2 className="">Total Snow: {historicalWeatherData.forecast.forecastday[0].day.totalsnow_cm} cm</h2>
                          </div>
                          <div className="flex items-center space-x-2 border-b drop-shadow-lg">
                            <Icon name="changeRain" size="50" />
                            <h2 className="">Chance of Rain: %{historicalWeatherData.forecast.forecastday[0].day.daily_chance_of_rain}</h2>
                          </div>
                          <div className="flex items-center space-x-2 border-b drop-shadow-lg">
                            <Icon name="changeSnow" size="50" />
                            <h2 className="">Chance of Snow: %{historicalWeatherData.forecast.forecastday[0].day.daily_chance_of_snow}</h2>
                          </div>

                          <div className="flex items-center space-x-2 border-b drop-shadow-lg">
                            <Icon name="moonSet" size="50" />
                            <h2 className="">Moon Phase: {historicalWeatherData.forecast.forecastday[0].astro.moon_phase}</h2>
                          </div>
                          <div className="flex items-center max-md:border-b space-x-2 drop-shadow-lg">
                            <Icon name="moonSet" size="50" />
                            <h2 className="">Total Precip: {historicalWeatherData.forecast.forecastday[0].day.totalprecip_mm}mm</h2>
                          </div>
                          <div className="flex items-center space-x-2 drop-shadow-lg">
                            <Icon name="moonSet" size="50" />
                            <h2 className="">Moon Illumination: %{historicalWeatherData.forecast.forecastday[0].astro.moon_illumination}</h2>
                          </div>

                        </div>
                        <div className="grid md:grid-cols-2 pt-5 border-t">
                          <div className="flex items-center justify-center max-md:py-5 space-x-4 max-md:border-b md:border-r">
                            <div className="flex flex-col items-center">
                              <Icon name="moonSet" size="110" />
                              <h2 className="mt-3">Moon Rise</h2>
                              <div>{historicalWeatherData.forecast.forecastday[0].astro.moonrise}</div>
                            </div>
                            <div className="flex flex-col items-center">
                              <Icon name="moonSet" size="110" />
                              <h2 className="mt-3">Moon Set</h2>
                              <div> {historicalWeatherData.forecast.forecastday[0].astro.moonset}</div>
                            </div>
                          </div>
                          <div className="flex items-center justify-center max-md:py-5 space-x-4">
                            <div className="flex flex-col items-center">
                              <Icon name="sunRise" size="110" />
                              <h2 className="mt-3">Sun Rise</h2>
                              <div>{historicalWeatherData.forecast.forecastday[0].astro.sunrise}</div>
                            </div>
                            <div className="flex flex-col items-center">
                              <Icon name="sunSet" size="110" />
                              <h2 className="mt-3">Sun Set</h2>
                              <div>{historicalWeatherData.forecast.forecastday[0].astro.sunset}</div>
                            </div>
                          </div>
                        </div>
                      </Disclosure.Panel>
                    </Transition>
                  </>
                )}
              </Disclosure>
            </div>
          </div>
          <div className='bg-gray-100 py-10 rounded-3xl'>
            <h1 className='font-semibold text-2xl text-center'>Hourly weather on {historicalWeatherData.forecast.forecastday[0].date}</h1>
            {historicalWeatherData.forecast.forecastday[0].hour.map((hour, index) => (
              <div key={index}>
                <Disclosure>
                  {({ open }) => (
                    <div className={`${open && 'bg-gray-400/30'} border md:px-3 m-2 rounded-2xl`}>
                      <Disclosure.Button className=" flex items-center w-full px-4 outline-none text-lg font-medium">
                        <div className={`py-2 flex flex-1 items-center space-x-5 ${open && 'border-b border-gray-400/30'}`}>
                          <h2>{moment(hour.time).format('HH:mm ')}</h2>
                          <img src={hour.condition.icon} />
                          <h2>{hour.temp_c}°C</h2>
                          {!isMobile && <h2>{hour.condition.text}</h2>}
                        </div>
                        <div className={open ? 'rotate-180 transform transition-all duration-300' : 'transition-all duration-300'}>
                          <Icon name="arrowButton" size="32" />
                        </div>
                      </Disclosure.Button>
                      <Transition
                        enter="transition duration-500 ease-out"
                        enterFrom="transform scale-95 opacity-0"
                        enterTo="transform scale-100 opacity-100"
                        leave="transition duration-300 ease-out"
                        leaveFrom="transform scale-100 opacity-100"
                        leaveTo="transform scale-95 opacity-0"
                      >
                        <Disclosure.Panel className={`duration-700 transition-all`}>
                          <div className="grid md:grid-cols-2 gap-y-2 my-6 text-lg">
                            <div className="flex items-center space-x-2 border-b border-gray-400/30 md:mx-4 drop-shadow-lg">
                              <Icon name="uv" size="50" />
                              <h2 className="">UV: {hour.uv}</h2>
                            </div>
                            <div className="flex items-center space-x-2 border-b border-gray-400/30 md:mx-4 drop-shadow-lg">
                              <Icon name="windy" size="50" />
                              <h2 className="">Wind: {hour.wind_kph} km/h</h2>
                            </div>
                            <div className="flex items-center space-x-2 border-b border-gray-400/30 md:mx-4 drop-shadow-lg">
                              <Icon name="autoTemp" size="50" />
                              <h2 className="">sensed Temp: {hour.feelslike_c}°C</h2>
                            </div>
                            <div className="flex items-center space-x-2 border-b border-gray-400/30 md:mx-4 drop-shadow-lg">
                              <span className="material-symbols-outlined">compress</span>
                              <h2 className="">Pressure: {hour.pressure_mb} mb</h2>
                            </div>
                            <div className="flex items-center space-x-2 border-b border-gray-400/30 md:mx-4 drop-shadow-lg">
                              <Icon name="changeRain" size="50" />
                              <h2 className="">Chance of Rain: %{hour.chance_of_rain}</h2>
                            </div>
                            <div className="flex items-center space-x-2 border-b border-gray-400/30 md:mx-4 drop-shadow-lg">
                              <Icon name="moonSet" size="50" />
                              <h2 className="">Visibility: {hour.vis_km}</h2>
                            </div>
                            <div className="flex items-center space-x-2 border-b border-gray-400/30 md:mx-4 drop-shadow-lg">
                              <Icon name="moonSet" size="50" />
                              <h2 className="">Humidity: {hour.humidity}</h2>
                            </div>
                            <div className="flex items-center space-x-2 border-b border-gray-400/30 md:mx-4 drop-shadow-lg">
                              <Icon name="moonSet" size="50" />
                              <h2 className="">Gust: {hour.gust_kph}</h2>
                            </div>
                            <div className="flex items-center space-x-2 border-b border-gray-400/30 md:mx-4 drop-shadow-lg">
                              <Icon name="moonSet" size="50" />
                              <h2 className="">Cloud: {hour.cloud}</h2>
                            </div>
                            <div className="flex items-center space-x-2 border-b border-gray-400/30 md:mx-4 drop-shadow-lg">
                              <Icon name="moonSet" size="50" />
                              <h2 className="">Chance of Snow: {hour.chnce_of_snow}</h2>
                            </div>
                            <div className="flex items-center space-x-2 md:mx-4 drop-shadow-lg">
                              <Icon name="moonSet" size="50" />
                              <h2>Dew Point: {hour.dewpoint_c}km</h2>
                            </div>
                          </div>
                        </Disclosure.Panel>
                      </Transition>
                    </div>
                  )}
                </Disclosure>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  )
}

export default HistoricalWeather