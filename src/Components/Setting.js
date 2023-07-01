import React, { useEffect } from 'react'
import { useDispatch } from "react-redux";
import { setHeaderHeading } from "../Store/slices/headerSlice";

const Setting = () => {


  useEffect(()=>{
    setHeaderHeading('Deal')
  },[])


  return (
    <div className='page_wrapper'>
      this is settings component.
    </div>
  )
}

export default Setting
