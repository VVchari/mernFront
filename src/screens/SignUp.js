import React,{useState} from 'react'
import { Link,useNavigate } from 'react-router-dom'
import './signup.css'

export default function SignUp() {
    let navigate=useNavigate()
    const [credentials,setcredentials]=useState({name:'',email:'',password:'',geolocation:''})
    const handleSubmit = async (event) => {
        event.preventDefault()
        const response =await  fetch("https://mernback-c7hd.onrender.com/api/signup", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({name:credentials.name,email:credentials.email,location:credentials.geolocation,password:credentials.password})
        })
        const json=await response.json()
        console.log(json)
        if(json.msg===false){
            alert("Mail already used Choose different mail!")
        }
        else if(!json.success){
            alert("Enter valid credentials")
        }
        else{
            navigate('/login')
        }

    }

    const onChange=(event)=>{
        setcredentials({...credentials,[event.target.name]:event.target.value})
    }

    return (
        <>
            <div className='signup'>
                <h1>SignUp</h1>
                <form className="mt-4" onSubmit={handleSubmit}>
                    <div className="form-group mb-3">
                        <label htmlFor="name">Name</label>
                        <input type="text" className="form-control mt-2" id="name" name="name" value={credentials.name} onChange={onChange} placeholder="Enter name" />
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="exampleInputEmail1">Email address</label>
                        <input type="email" className="form-control mt-2" id="exampleInputEmail1" name="email" value={credentials.email} aria-describedby="emailHelp" placeholder="Enter email" onChange={onChange}/>
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="exampleInputPassword1">Password</label>
                        <input type="password" className="form-control mt-2" id="exampleInputPassword1" name="password" value={credentials.password} placeholder="Password" onChange={onChange}/>
                        <small className="form-text text-white">Password must be length 5.</small>
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="address">Address</label>
                        <input type="text" className="form-control mt-2" id="text" placeholder="Address" name="geolocation" value={credentials.geolocation} onChange={onChange}/>
                    </div>
                    <button type="submit" className="m-2 btn btn-success">Submit</button>
                    <Link to='/login' className='m-2 btn btn-danger'>Already a User</Link>
                </form>
            </div>
        </>
    )
}
