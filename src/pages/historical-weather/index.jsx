import axios from "axios"
import { ErrorMessage, Field, Form, Formik } from "formik"
import moment from "moment"
import { useState } from "react"

function HistoricalWeather() {

  const [pastWeatherData, setPastWeatherData] = useState([])

  const fetchData = async (location , date) => {
    try {
      const response = await axios.get(`http://api.weatherapi.com/v1/history.json?key=${import.meta.env.VITE_WEATHER_API}&q=${location}&dt=${date}`)
      setPastWeatherData(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  console.log(pastWeatherData)


  return (
    <div className="mx-auto w-full bg-white h-screen container">
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
          console.log(values)
          fetchData(values.location, values.date)
        }}
      >
        {() => (
          <Form className="grid grid-flow-col gap-2 mx-auto justify-center py-5">
            <label htmlFor="location">
              <Field id="location" type="text" name="location" className="h-10 rounded px-3" placeholder="Şehir giriniz"/>
              <ErrorMessage name="location" component="div" />
            </label>
            <label htmlFor="date">
              <Field type="date" name="date" max={moment().format('YYYY-MM-DD')} className="h-10 rounded px-3"/>
              <ErrorMessage name="date" component="div" />
            </label>

            <button type="submit" className="bg-[#194569] text-white p-2 rounded-lg">
              Search
            </button>
          </Form>
        )}
      </Formik>
      {pastWeatherData.forecast && (
        <div className="flex flex-col w-[80%] mx-auto">
          <h2 className="text-2xl font-bold">Location: {pastWeatherData.location.name}</h2>
          <h2 className="text-2xl font-bold">Date: {pastWeatherData.forecast.forecastday[0].date}</h2>
          <h2 className="text-2xl font-bold">Max Temp: {pastWeatherData.forecast.forecastday[0].day.maxtemp_c}°C</h2>
          <h2 className="text-2xl font-bold">Min Temp: {pastWeatherData.forecast.forecastday[0].day.mintemp_c}°C</h2>
          <h2 className="text-2xl font-bold">Average Temp: {pastWeatherData.forecast.forecastday[0].day.avgtemp_c}°C</h2>
          <h2 className="text-2xl font-bold">Max Wind Speed: {pastWeatherData.forecast.forecastday[0].day.maxwind_kph}kph</h2>
          <h2 className="text-2xl font-bold">Total Precipitation: {pastWeatherData.forecast.forecastday[0].day.totalprecip_mm}mm</h2>
          <h2 className="text-2xl font-bold">Average Humidity: {pastWeatherData.forecast.forecastday[0].day.avghumidity}%</h2>
          <h2 className="text-2xl font-bold">Average Visibility: {pastWeatherData.forecast.forecastday[0].day.avgvis_km}km</h2>
          <h2 className="text-2xl font-bold">Average Pressure: {pastWeatherData.forecast.forecastday[0].day.avgtemp_c}°C</h2>
          <img width={64} src={pastWeatherData.forecast.forecastday[0].day.condition.icon} alt="weather icon" />

        </div>
      )
      }
    </div>
  )
}

export default HistoricalWeather