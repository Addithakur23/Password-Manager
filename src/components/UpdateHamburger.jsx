import React from 'react'
import { useEffect,useState } from 'react'
const UpdateHamburger = ({show}) => {
  const [visible, setVisible] = useState(false)
 
   useEffect(() => {
 
     setVisible(true)
     const t = setTimeout(() => setVisible(false), 1000)
     return () => clearTimeout(t)
   }, [show])
   return (
      <div className="updateAlert">
       <div className="updateALerttext">Password Updated Successfully</div>
       <div className='line'></div>
     </div>
  )
}

export default UpdateHamburger
