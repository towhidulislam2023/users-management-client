/* eslint-disable no-undef */

import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [user, setUser] = useState([])
  useEffect(() => {
    fetch("http://localhost:5000/users")
      .then(res => res.json())
      .then(data => setUser(data))
      .catch(error => {
        console.log(error);
      })
  }, [])
  const handelFormData =(event)=>{
    event.preventDefault()
    const form = event.target
    const name = form.name.value
    const email = form.email.value
    const Nuser={
      id: user.length+1,
      name,
      email
    }
    const newUser = [...user, Nuser]
    setUser(newUser);
    fetch("http://localhost:5000/users",{
      method:"POST",
      headers:{
        "content-type":"application/json"
      },
      body:JSON.stringify(Nuser)
    })
    form.reset()
  }
  console.log(user);
  return (
    <>
      <h1>LIVE FROM APP </h1>
      <div className='appStyle'>
        <div className='addUserinfo'>
          <h1>Add User</h1>
          <form onSubmit={handelFormData} className='formStyle'>
            <input className='inputStyle' type="text" name="name" id=""  placeholder='Client Name'/>
            <input className='inputStyle' type="email" name="email" id="" placeholder='Client Email' />
            <button type="submit">Submit</button>
          </form>

        </div>
        <div>
          <h1>Display User info</h1>
          <div className='styleFetchData'>
            {
              user && user.map(use => <div className='styleNow' key={use.id}>
                <p>{use.id}:</p>
                <p>{use.name},</p>
                <p>{use.email}</p>
              </div>)
            }
          </div>
         
        </div>

      </div>
    </>
  )
}

export default App
