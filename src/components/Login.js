import React,{useState} from 'react'
import { useNavigate } from "react-router-dom";
const Login = (props) => {
    const [credential, setcredential] = useState({email:"",password:""});
    const navigate = useNavigate();
    const handelSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`http://localhost:5000/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({email:credential.email,password:credential.password})
        });
        const json = await response.json();
        if(json.success){
            //Redirect
            localStorage.setItem('token',json.token);
            props.showAlert("Logged IN  Successfully","success");
            navigate("/");
        }
        else{
            props.showAlert("Invalid Credentials","danger");
        }
    }
    const onChange = (e) =>{
        setcredential({...credential,[e.target.name]:e.target.value})
    }
    return (
        <div className='container my-5'>
            <h2>Login to Account</h2>
            <form onSubmit={handelSubmit}>
                <div className="form-group mb-3">
                    <label htmlFor="email">Email address</label>
                    <input type="email" name='email' className="form-control" value={credential.email} onChange={onChange} id="email" aria-describedby="emailHelp" placeholder="Enter email" />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" value={credential.password} onChange={onChange} id="password" name='password' placeholder="Password" />
                </div>
                <button type="submit" className="btn btn-primary" >Submit</button>
            </form>
        </div>
    )
}

export default Login