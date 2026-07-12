import React from 'react'
import { useState,useEffect } from 'react'
const DeleteHamburger = ({show}) => {
      const [visible, setVisible] = useState(false)

  useEffect(() => {

    setVisible(true)
    const t = setTimeout(() => setVisible(false), 1000)
    return () => clearTimeout(t)
  }, [show])
  return (
     <div className="deleteAlert">
      <div className="deleteALerttext">Password Deleted Successfully</div>
      <div className='line'></div>
    </div>
  )
}

export default DeleteHamburger
