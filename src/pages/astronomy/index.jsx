import axios from 'axios'
import moment from 'moment'
import { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Parallax } from 'swiper/modules';

import 'swiper/css';


import clsx from 'clsx';


function Astronomy() {

  const [astronomyData, setAstronomyData] = useState(null)

  const day = moment().format('D')
  const month = moment().format('M')
  const year = moment().format('YYYY')

  const fetchAstronomyData = async () => {
    try {
      const response = await axios.get(`https://moonphases.co.uk/service/getMoonDetails.php?day=${day}&month=${month}&year=${year}&lat=40.9960448&lng=29.147136&len=30&tz=0`)
      setAstronomyData(response.data)
      console.log(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchAstronomyData()
    console.log(astronomyData)
  }, [])

  return (
    <div className="relative h-screen ">
      <div>
        {astronomyData && (
          <div >
            <Swiper
              modules={[Parallax]}
              spaceBetween={0}
              defaultValue={moment().format('D') === moment(astronomyData.today).format('D') ? 0 : 1}
              onActiveIndexChange={(swiper) => console.log(swiper.activeIndex)}
              slidesPerView={window.innerWidth > 768 ? 3 : 1}
              parallax={true} // add parallax effect
              initialSlide={moment().format('D') === moment(astronomyData.today).format('D') ? 0 : 1} // set the initial slide to today if it is today, otherwise set it to tomorrow
              centeredSlides={true} // center the slide

              onSlideChange={() => console.log('slide change')}
              onSwiper={(swiper) => console.log(swiper)}
              className="rounded p-10 text-lg h-screen"
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
                        <img style={{transform: `rotate(${day.moonsign_deg}deg)`}} className={`drop-shadow-[0_35px_35px_rgba(0,0,0,0.25)] ${isActive ? 'w-80' : 'w-60' }`} src={`/images/moon-phases/${day.phase_img}`} alt="" />
                        <h1 className='text-center text-2xl font-bold'>{day.phase_name}</h1>
                        <hr className='w-1/2 my-5'/>
                        <p>{day.illumination}% / {day.phase}</p>
                        <p>{day.moonsign}</p>
                        <p>{day.moonsign_deg}°</p>
                        {isActive && (
                          <div className='bg-white grid grid-cols-2 bg-opacity-20 text-white font-bold text-3xl justify-center w-[80%] md:w-[130%] h-60 rounded-lg m-10'>
                            <div className='flex flex-col items-center justify-center'>
                              <p className='text-2xl'>Moonrise</p>
                              <p>{moment(day.moonrise).format('HH:MM')}</p>
                            </div>
                            <div className='flex flex-col items-center justify-center'>
                              <p className='text-2xl'>Moonset</p>
                              <p>{moment(day.moonset).format('HH:MM')}</p>
                            </div>
                            <div>
                              <p className='text-2xl'>Sunrise</p>
                              <p>{moment(day.sunrise).format('HH:MM')}</p>
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