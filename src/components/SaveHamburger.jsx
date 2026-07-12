 import React, { useEffect, useState } from 'react'

const SaveHamburger = ({ show }) => {
  const [visible, setVisible] = useState(false)

  useEffect(() => {

    setVisible(true)
    const t = setTimeout(() => setVisible(false), 1000)
    return () => clearTimeout(t)
  }, [show])

  if (!visible) return null

  return (
    <div className="saveAlert">
      <div className="saveALerttext">Password Saved Successfully</div>
      <div className='line'></div>
    </div>
  )
}

export default SaveHamburger
