import React from 'react'
import { useEffect,useState } from 'react'
const CopyHamburger = ({show}) => {
          const [visible, setVisible] = useState(false)
    
      useEffect(() => {
    
        setVisible(true)
        const t = setTimeout(() => setVisible(false), 1000)
        
        return () => clearTimeout(t)
      }, [show])
  return (
    <div>
       <div className="copyAlert">
      <div className="copyALerttext">Password Copied Successfully</div>
      <div className='line'></div>
    </div>
    </div>
  )
}

export default CopyHamburger
