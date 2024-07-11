import React from 'react'
import { LuSearch } from "react-icons/lu";

function SearchBar() {
  return (
    <div>
      <input className='header-search-bar' placeholder="Bir ürün arayın..." type="text" />
      <LuSearch className='header-search-button'/>
    </div>
  )
}

export default SearchBar