import React,{useState} from 'react'
import {Link,useNavigate} from'react-router-dom'

const Login=()=>{
  let navigate=useNavigate()
  const [credentials,setcredentials]=useState({email:'',password:''})
    const handleSubmit = async (event) => {
        event.preventDefault()
        const response =await  fetch("https://mernback-em0b.onrender.com/api/login", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({email:credentials.email,password:credentials.password})
        })
        const json=await response.json()
        console.log(json)
        if(json.usermsg===false){
            alert("Invalid mail!")
        }
        else if(json.userpass===false){
            alert("Invalid Password")
        }
        else if(!json.usersucess){
            alert("Enter valid credentials")
        }
        else{
            localStorage.setItem("userEmail",credentials.email)
          localStorage.setItem("authToken",json.authToken)
          
          navigate("/")
        }

    }

    const onChange=(event)=>{
        setcredentials({...credentials,[event.target.name]:event.target.value})
    }

    return (
      <>
      <div className='signup'>
          <h1>Login</h1>
          <form className="mt-4" onSubmit={handleSubmit}>
              <div className="form-group mb-3">
                  <label htmlFor="exampleInputEmail1">Email address</label>
                  <input type="email" className="form-control mt-2" id="exampleInputEmail1" name="email" value={credentials.email} aria-describedby="emailHelp" placeholder="Enter email" onChange={onChange}/>
              </div>
              <div className="form-group mb-3">
                  <label htmlFor="exampleInputPassword1">Password</label>
                  <input type="password" className="form-control mt-2" id="exampleInputPassword1" name="password" value={credentials.password} placeholder="Password" onChange={onChange}/>
                 
              </div>
           
              <button type="submit" className="m-2 btn btn-success">Submit</button>
              <Link to='/signup' className='m-2 btn btn-danger'>New User</Link>
          </form>
      </div>
  </>
      )
}
export default Login
