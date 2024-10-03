import { useDispatch } from 'react-redux'
import { setLocation } from "../../../../redux/reducers/locationSlice"
import { Icon } from "../../../../Icons"
import { useState } from 'react'

function Search() {

  
  const dispatch = useDispatch()

  const [ search, setSearch ] = useState('')

  const handleChange = (e) => {
    setSearch(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault(); //  Formun sayfayı yenilemesini engelle 
    if (search.trim()) {
      // Sadece boş değilse sorguyu yap
      console.log("Searching for weather in:", search);
      dispatch(setLocation(search))
    } else {
      console.log("Please enter a valid location.");
    }
  };


  return (
    <form onSubmit={handleSubmit} className='flex'>
      <button type='submit'>
        <span className='cursor-pointer'><Icon name='search' size='24' /></span>
      </button>
      <input type="text" className="pl-2 bg-transparent outline-none border-b text-gray-300 placeholder:text-gray-400" value={search} placeholder="Weather in your city" onChange={handleChange} />
    </form>
  )
}

export default Search