import React, { useEffect } from 'react'
import { useDispatch } from "react-redux";
import { setHeaderHeading } from "../Store/slices/headerSlice";

const Deal = () => {

  useEffect(()=>{
    setHeaderHeading('Deal')
  },[])

  return (
    <div className='page_wrapper'>
      this is deals component.
    </div>
  )
}

export default Deal
