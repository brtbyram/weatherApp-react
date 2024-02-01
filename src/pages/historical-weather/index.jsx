import axios from "axios"
import { ErrorMessage, Field, Form, Formik } from "formik"
import moment from "moment"
import { useState } from "react"
import { Icon } from "../../Icons"
import { Disclosure, Transition } from "@headlessui/react"
import clsx from "clsx"

function HistoricalWeather() {

  const [weatherData, setWeatherData] = useState([])



  const fetchData = async (location, date) => {
    try {
      const response = await axios.get(`http://api.weatherapi.com/v1/history.json?key=${import.meta.env.VITE_WEATHER_API}&q=${location}&dt=${date}`)
      setWeatherData(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  console.log(weatherData)



  return (
    <div className="mx-auto w-full bg-white h-screen container">
      <div className="flex flex-col space-y-4 justify-center items-center w-full border bg-blue-500 h-96 ">
        <p className="font-bold text-2xl text-white shadow-2xl">THE ABILITY TO SEARCH FOR WEATHER RESULTS FOR THE LAST 1 YEAR</p>
        <Formik
          initialValues={{ location: "", date: "" }}
          validate={values => {
            const errors = {};
            if (!values.location) {
              errors.location = 'Required';
            }
            return errors;
          }}
          onSubmit={(values) => {

            fetchData(values.location, values.date)
          }}
        >
          {() => (
            <Form className="grid grid-flow-col gap-2 mx-auto justify-center py-5">
              <label htmlFor="location">
                <Field id="location" type="text" name="location" className="h-10 rounded px-3" placeholder="Şehir giriniz" />
                <ErrorMessage name="location" component="div" />
              </label>
              <label htmlFor="date">
                <Field type="date" name="date" min={moment().subtract(7, 'days').format('YYYY-MM-DD')} max={moment().format('YYYY-MM-DD')} className="h-10 rounded px-3" />
                <ErrorMessage name="date" component="div" />
              </label>

              <button type="submit" className="bg-[#194569] text-white p-2 rounded-lg">
                Search
              </button>
            </Form>
          )}
        </Formik>
      </div>
      {weatherData.forecast && (
                        <div className={clsx(" rounded-lg p-10 w-full h-full bg-cover shadow-2xl")}>
                          <div className="grid md:grid-cols-2 place-content-center place-items-center">
                              <div className="flex justify-center items-center drop-shadow-2xl">
                                  {weatherData.forecast.forecastday[0].hour.map((hour, index) => (
                                      <div key={index}>
                                          {moment(hour.time).format('H') === moment().format('H') && (
                                              <div className="">
                                                  <img width={200} className="z-10" src={hour.condition.icon} alt="" />
                                              </div>
                                          )}
                                      </div>
                                  ))}
                                  <div className="font-extrabold text-3xl text-black z-10">
                                      <h2 className="">{weatherData.forecast.forecastday[0].day.avgtemp_c} °C</h2>
                                      <h2>{weatherData.location.name}</h2>
                                  </div>
                              </div>
                              <div className="text-black text-xl py-10 space-y-2">
                                  <div className="flex items-center space-x-2">
                                      <Icon name="maxTemp" size="50" />
                                      <div className="">Max Temp: {weatherData.forecast.forecastday[0].day.maxtemp_c}°C</div>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                      <Icon name="minTemp" size="50" />
                                      <h2 className="">Min Temp: {weatherData.forecast.forecastday[0].day.mintemp_c}°C</h2>
                                  </div>

                                  <div className="flex items-center space-x-2">
                                      <Icon name="humidity" size="50" />
                                      <h2>Average Humidity: %{weatherData.forecast.forecastday[0].day.avghumidity}</h2>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                      <Icon name="sunRise" size="50" />
                                      <h2 className="">Sunrise: {weatherData.forecast.forecastday[0].astro.sunrise}</h2>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                      <Icon name="sunSet" size="50" />
                                      <h2 className="">Sunset: {weatherData.forecast.forecastday[0].astro.sunset}</h2>
                                  </div>
                              </div>
                          </div>
                          <Disclosure>
                              <Disclosure.Button className="py-2 text-black duration-700 transition-all font-semibold">
                                  More Details
                              </Disclosure.Button>
                              <Transition
                                  enter="transition duration-500 ease-out"
                                  enterFrom="transform scale-95 opacity-0"
                                  enterTo="transform scale-100 opacity-100"
                                  leave="transition duration-300 ease-out"
                                  leaveFrom="transform scale-100 opacity-100"
                                  leaveTo="transform scale-95 opacity-0"
                              >
                                  <Disclosure.Panel className="text-black duration-700 transition-all">
                                      <div className="grid md:grid-cols-2 gap-2 mt-8  text-lg">
                                          <div className="flex items-center space-x-2 border-b md:mx-4 drop-shadow-lg">
                                              <Icon name="uv" size="50" />
                                              <h2 className="">UV: {weatherData.forecast.forecastday[0].day.uv}</h2>
                                          </div>


                                          <div className="flex items-center space-x-2 border-b md:mx-4 drop-shadow-lg">
                                              <Icon name="windy" size="50" />
                                              <h2 className="">Max Wind: {weatherData.forecast.forecastday[0].day.maxwind_kph} km/h</h2>
                                          </div>
                                          <div className="flex items-center space-x-2 border-b md:mx-4 drop-shadow-lg">
                                              <Icon name="autoTemp" size="50" />
                                              <h2 className="">Avg Temp: {weatherData.forecast.forecastday[0].day.avgtemp_c}°C</h2>
                                          </div>
                                          <div className="flex items-center space-x-2 border-b md:mx-4 drop-shadow-lg">
                                              <span className="material-symbols-outlined">compress</span>
                                              <h2 className="">Average Pressure: {weatherData.forecast.forecastday[0].day.avgtemp_c} mb</h2>
                                          </div>
                                          <div className="flex items-center space-x-2 border-b md:mx-4 drop-shadow-lg">
                                              <span className="material-symbols-outlined">rainy</span>
                                              <h2 className="">Chance of Rain: %{weatherData.forecast.forecastday[0].day.daily_chance_of_rain}</h2>
                                          </div>
                                          <div className="flex items-center space-x-2 border-b md:mx-4 drop-shadow-lg">
                                              <Icon name="moonSet" size="50" />
                                              <h2 className="">Moonset: {weatherData.forecast.forecastday[0].astro.moonset}</h2>
                                          </div>
                                          <div className="flex items-center space-x-2 border-b md:mx-4 drop-shadow-lg">
                                              <Icon name="moonSet" size="50" />
                                              <h2 className="">Moon Phase: {weatherData.forecast.forecastday[0].astro.moon_phase}</h2>
                                          </div>
                                          <div className="flex items-center space-x-2 border-b md:mx-4 drop-shadow-lg">
                                              <Icon name="moonSet" size="50" />
                                              <h2 className="">Condition: {weatherData.forecast.forecastday[0].day.condition.text}</h2>
                                          </div>
                                          <div className="flex items-center space-x-2 border-b md:mx-4 drop-shadow-lg">
                                              <Icon name="moonSet" size="50" />
                                              <h2 className="">Moon Illumination: {weatherData.forecast.forecastday[0].astro.moon_illumination}</h2>
                                          </div>
                                          <div className="flex items-center space-x-2 border-b md:mx-4 drop-shadow-lg">
                                              <Icon name="moonSet" size="50" />
                                              <h2 className="">Moonrise: {weatherData.forecast.forecastday[0].astro.moonrise}</h2>
                                          </div>
                                      </div>
                                  </Disclosure.Panel>
                              </Transition>
                          </Disclosure>
                      </div>

      )
      }

    </div>
  )
}

export default HistoricalWeather