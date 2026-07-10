import React from 'react'

const Navbar = () => {
  return (
    <nav>

    <div className='passop'>
        <span className='firstSpan'>{"<"}</span>
   <span className='secondSpan'>Pass</span>
   <span className='thirdSpan'>{"OP/>"}</span>
    </div>
    <div className='github' onClick={()=>{window.open("https://github.com/")}}>
    <img src="/github.svg" alt="" />
    <div>Github</div>
    
   
    </div>
    </nav>
  )
}

export default Navbar
