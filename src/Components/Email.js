import React, { useEffect } from 'react'
import { setHeaderHeading } from "../Store/slices/headerSlice";
const Email = () => {


  useEffect(()=>{
    setHeaderHeading('Deal')
  },[])

  
  return (
    <div className='page_wrapper'>
      this is email component.
    </div>
  )
}

export default Email
