import { useState,useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { FaEdit,FaCopy,FaTrash } from 'react-icons/fa'
import { FiEye,FiEyeOff } from 'react-icons/fi'
import { LuGrid2X2Plus } from "react-icons/lu";
import Navbar from './components/Navbar.jsx'
import Foooter from './components/Foooter.jsx'

function App() {
  const [Website, setWebsite] = useState("")
  const [Password, setPassword] = useState("")
  const [Username, setUsername] = useState("")
  const [Show, setShow] = useState(false)
  const [showPassword, setshowPassword] = useState(null)
  const [Editing, setEditing] = useState(false)
  const [Visible, setVisible] = useState("Show")
  const [AlertVisible, setAlertVisible] = useState(false)
  const [EditId, setEditId] = useState(null)
  const [Add, setAdd] = useState(false)
  const [Count, setCount] = useState(0)
  const [Passwords, setPasswords]=useState([])

  async function fetchPassword() {
     let data=await fetch("http://localhost:3000/api/password")
  let res=await data.json()
  setPasswords(res)
  }
   useEffect(() => {
     fetchPassword()
    }, [])
  async function SavePassword(){
    if(!Website || !Username || !Password){
      alert("Please fill all fields")
      return }

      setWebsite(Website)
      setUsername(Username)
      setPassword(Password)
      
      if(Editing && EditId!==null){

        const updatedPasswords= await fetch(`http://localhost:3000/api/password/${EditId}`,{method:"PUT",headers:{
          "Content-Type":"application/json"
        },body:JSON.stringify({Website,Username,Password})})
        const data=await updatedPasswords.json()
        setWebsite("")
        setUsername("")
        setPassword("")
        setEditId(null)
        setEditing(false)
        fetchPassword()
      }
      else{
        await fetch("http://localhost:3000/api/password",{method:"POST",headers:{
          "Content-Type":"application/json"
        },body:JSON.stringify({Website,Username,Password})})
         fetchPassword() 
      }
     
    }
    
   
 async function editPassword(id){
  let data1=await fetch("http://localhost:3000/api/password")
  let res=await data1.json()
  let password=res.filter(p=>p._id===id)

  setEditing(true)
  setEditId(id)
  setWebsite(password[0].Website)
  setPassword(password[0].Password)
  setUsername(password[0].Username)
 }

async function deletePassword(id){
    let data=await fetch(`http://localhost:3000/api/password/${id}`,{method:"DELETE"})
    let res=await data.json()
  fetchPassword()
 }

  async function copyPassword(pass){
    let textarea=document.createElement("textarea")
    textarea.value=pass;
    document.body.appendChild(textarea)
    textarea.select()
    navigator.clipboard.writeText(textarea.value)
    document.body.removeChild(textarea)
    setAlertVisible(true)
    setTimeout(() => {
      setAlertVisible(false)
    }, 2000);
  }
  
  return (
    <>
      <Navbar/>
    <div className="container">
      <div className='heading'>

   <span className='firstSpan'>{"<"}</span>
   <span className='secondSpan'>Pass</span>
   <span className='thirdSpan'>{"OP/>"}</span>
      </div>
    <div className='subHeading'>Your Own Password Manager</div>
    
    
   { Passwords.length==0 &&  (<div className="noPasswords">No Data To Show</div>)} 

    {/* <div className="AddPassword">Add a Password</div> */}
    
    <div className='inputs'>
   <div className='website_input'><input type="text" placeholder='Website' value={Website} onChange={(e)=>{
    setWebsite(e.target.value)
   }}/></div> 
   <div className='split'>

    <div className='username_input'><input type="text" placeholder='Username' value={Username} onChange={(e)=>{
      setUsername(e.target.value)
    }}/></div>
    <div className='password_input'>
      
      <input id='passwordInput' type={Show?"text":"password"} placeholder='Password' value={Password} onChange={(e)=>{
      setPassword(e.target.value)
    }}/>

  <button type="button" id='eye' title={!(Show)?"Show Password":"Hide Password"} onClick={()=>{setShow(!Show) }}>{  Show?<FiEye/>:<FiEyeOff/>}</button>
        
   </div>
    </div>

 </div>
    <div className='saveBtn'><button id='Add' title='Save Password' onClick={()=>{SavePassword(),setAdd(true),setCount(Count+1)}}> <span className='grid_icon'><LuGrid2X2Plus/></span>Save</button></div>
    
    <div className="passwords">Your Passwords  {AlertVisible && (<span>(Copied!)</span>)}</div> 
<div className="table-container">

    <table>
       <thead>
    <tr>
      <th colSpan={2}>Website</th>
      <th>Username</th>
      <th>Password</th>
      <th>Actions</th>
    </tr>
    </thead>
   
  <tbody>
     
    { Passwords.length >0  && Passwords.map((item,index)=>(
    
      <tr key={index}>
        <td colSpan={2}>{item.Website}</td>
        <td>{item.Username}</td>
        <td>
          
          <div className="password">
            <div className='codedPassword'>
            {showPassword ===item._id ?item.Password  : item.Password.replace(/./g,"*") } 

            </div>
            <button title={showPassword===item._id? 'Hide password':'Show password'} onClick={()=>{setshowPassword(showPassword===item._id ? null:item._id)}}>{showPassword===item._id ? <FiEye />:<FiEyeOff />
}</button> </div>

</td>
        <td>
         
          
          <div className="actions">
          <div className='edit' onClick={()=>{editPassword(item._id)}} title="Edit">
            <FaEdit />
          </div>
      <div className='copy' onClick={()=>{copyPassword(item.Password)}} title="Copy"><FaCopy/>
      </div>
      <div className='trash' onClick={()=>{deletePassword(item._id)}} title="Delete"><FaTrash/>
      </div>
          </div>
      </td>
      </tr>
        
    )
    )}
    </tbody>
     </table>
</div>
    </div>
   
    <Foooter/>
    </>
  )
}

export default App
