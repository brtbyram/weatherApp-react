import { useSelector, useDispatch } from 'react-redux'
import { setLocation } from "../../../../features/location/locationSlice"
import { Icon } from "../../../../Icons"

function Search() {

  const location = useSelector(state => state.location.value)
  const dispatch = useDispatch()

  return (
    <div className='flex'>
      <span className='cursor-pointer'><Icon name='search' size='24'/></span>
      <input type="text" className="pl-2 bg-transparent outline-none border-b text-gray-300 placeholder:text-gray-400" value={location} placeholder="Weather in your city" onChange={(e) => dispatch(setLocation(e.target.value))} />
    </div>
  )
}

export default Search