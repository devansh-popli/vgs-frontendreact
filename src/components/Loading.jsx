import React from 'react'
import { Spinner } from 'react-bootstrap'

export const Loading = ({show}) => {
  return show && (
    <div  className='text-center py-5 position-absolute'  style={{left:"50%",zIndex:"10"}}><Spinner className="themeColor" size='lg'/>
    {/* <p className='themeColor'>Loading...</p></div> */}
    </div>
  )
}
