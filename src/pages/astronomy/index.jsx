import axios from 'axios'
import moment from 'moment'
import { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Parallax } from 'swiper/modules';
import clsx from 'clsx';
import { useMediaQuery } from 'react-responsive'
import 'swiper/css';
import { Icon } from '../../Icons';


function Astronomy() {

  const isDesktopOrLaptop = useMediaQuery({ query: '(min-width: 1224px)' })

  const [astronomyData, setAstronomyData] = useState(null)

  const day = moment().format('D')
  const month = moment().format('M')
  const year = moment().format('YYYY')

  const fetchAstronomyData = async () => {
    try {
      const response = await axios.get(`https://moonphases.co.uk/service/getMoonDetails.php?day=${day}&month=${month}&year=${year}&lat=12.9960448&lng=29.147136&len=30&tz=0`)
      setAstronomyData(response.data)
      console.log(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchAstronomyData()
  }, [])


  return (
    <div className="relative">
      <div>
        {astronomyData && (
          <div >
            <Swiper
              modules={[Parallax]}
              spaceBetween={0}
              defaultValue={moment().format('D') === moment(astronomyData.today).format('D') ? 0 : 1}
              onActiveIndexChange={(swiper) => console.log(swiper.activeIndex)}
              slidesPerView={isDesktopOrLaptop ? 3 : 1}
              parallax={true} // add parallax effect
              initialSlide={moment().format('D') === moment(astronomyData.today).format('D') ? 0 : 1} // set the initial slide to today if it is today, otherwise set it to tomorrow
              centeredSlides={true} // center the slide

              onSlideChange={() => console.log('slide change')}
              onSwiper={(swiper) => console.log(swiper)}
              className="rounded p-10 text-lg h-full"
            >
              <div className='absolute left-0 top-0 w-[130%] h-full bg-[url(https://www.icegif.com/wp-content/uploads/2023/04/icegif-763.gif)] bg-cover bg-center bg-no-repeat drop-shadow-[0_35px_35px_rgba(0,0,0,0.25)] box-shadow-[0_35px_35px_rgba(0,0,0,0.25)]'
                data-swiper-parallax="-23%"
              ></div>
              {astronomyData.days.map((day, index) => {
                return (
                  <SwiperSlide key={index}>
                    {({ isActive }) => (
                      <div className={clsx('flex text-white flex-col items-center justify-start pt-5', {
                        'opacity-30': !isActive,
                        'h-100 text-2xl font-semibold': isActive
                      })}>
                        <p className='text-center pb-3'>{day.date}</p>
                        <img style={{ transform: `rotate(${day.moonsign_deg}deg)` }} className={`drop-shadow-[0_35px_35px_rgba(0,0,0,0.25)] ${isActive ? 'w-80' : 'w-60'}`} src={`/images/moon-phases/${day.phase_img}`} alt="" />
                        <h1 className='text-center text-2xl font-bold'>{day.phase_name}</h1>
                        <hr className='w-1/2 my-5' />
                        <p>{day.illumination}% / {day.phase}</p>
                        <p>{day.moonsign}</p>
                        <p>{day.moonsign_deg}°</p>
                        {isActive && (
                          <div className='bg-white grid bg-opacity-20 text-sm font-medium grid-cols-2 h-full text-white justify-center w-[80%] min-w-full rounded-lg m-10 p-10'>

                            <div className="flex items-center">
                              <Icon name="moonSet" size="50" />
                              <h2 className="">Moonset: {moment(day.moonset).format('LT')}</h2>
                            </div>
                            <div className="flex items-center">
                              <Icon name="moonSet" size="50" />
                              <h2 className="">Moon Rise: {day.moonrise}</h2>
                            </div>
                            <div className="flex items-center">
                              <Icon name="moonSet" size="50" />
                              <h2 className="">Moon Sign: {day.moonsign}</h2>
                            </div>
                            <div className="flex items-center">
                              <Icon name="moonSet" size="50" />
                              <h2 className="">Phase Name: {day.phase_name}</h2>
                            </div>
                            <div className="flex items-center">
                              <Icon name="moonSet" size="50" />
                              <h2 className="">Stage: {day.stage}</h2>
                            </div>
                            <div className="flex items-center">
                              <Icon name="moonSet" size="50" />
                              <h2 className="">Age: {day.age}</h2>
                            </div>
                            <div className="flex items-center">
                              <Icon name="moonSet" size="50" />
                              <h2 className="">Moon Sign Degree: {day.moonsign_deg}</h2>
                            </div>
                            <div className="flex items-center">
                              <Icon name="moonSet" size="50" />
                              <h2 className="">illumination: {day.illumination}</h2>
                            </div>
                            <div className="flex items-center">
                              <Icon name="moonSet" size="50" />
                              <h2 className="">distance: {day.distance}</h2>
                            </div>
                            <div className="flex items-center">
                              <Icon name="moonSet" size="50" />
                              <h2 className="">diameter: {day.diameter}</h2>
                            </div>
                            <div className="flex items-center">
                              <Icon name="moonSet" size="50" />
                              <h2 className="">Tilt: {day.tilt}</h2>
                            </div>
                            <div className="flex items-center">
                              <Icon name="moonSet" size="50" />
                              <h2 className="">diameter: {day.diameter}</h2>
                            </div>
                            <div className="flex items-center">
                              <Icon name="moonSet" size="50" />
                              <h2 className="">Next Full:  {moment(astronomyData.next_full).format('MMMM DD YYYY hh:mm')}</h2>
                            </div>
                            <div className="flex items-center">
                              <Icon name="moonSet" size="50" />
                              <h2 className="">Next Moon Rise: {astronomyData.next_moonrise}</h2>
                            </div>
                            <div className="flex items-center">
                              <Icon name="moonSet" size="50" />
                              <h2 className="">Next Moon Set: {astronomyData.next_moonset}</h2>
                            </div>
                            <div className="flex items-center">
                              <Icon name="moonSet" size="50" />
                              <h2 className="">Next New: {astronomyData.next_new}</h2>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </SwiperSlide>
                )

              }
              )}

            </Swiper>
          </div>
        )
        }
      </div>

    </div>
  )
}

export default Astronomy