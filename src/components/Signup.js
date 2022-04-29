import React,{useState} from 'react'
import { useNavigate } from "react-router-dom";

const Signup = (props) => {
  const [credential, setcredential] = useState({name:"",email:"",password:"",cpassword:""});
  const navigate = useNavigate();
  const handelSubmit = async (e) => {
    e.preventDefault();
    const {name,email,password} = credential;
    const response = await fetch(`http://localhost:5000/api/auth/Createuser`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({name,email,password})
    });
    const json = await response.json();
    if(json.success){
        //Redirect
        localStorage.setItem('token',json.token);
        navigate("/");
        props.showAlert("Signup Successful","success");
    }
    else{
        props.showAlert("Invalid Credentials","danger");
    }
}
  const onChange = (e) =>{
    setcredential({...credential,[e.target.name]:e.target.value})
}
  return (
    <div>
      <h2>SIGNUP</h2>
      <form onSubmit={handelSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" required className="form-control" onChange={onChange} name='name' id="name" aria-describedby="emailHelp"/>
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" required className="form-control" onChange={onChange} name = 'email' id="email" aria-describedby="emailHelp"/>
          <div id="emailHelp" className="form-text">Use dummy email with extention @anyemailproviders(ex:gmail).com.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password"  minLength={5} required className="form-control" name='password' onChange={onChange} id="password"/>
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">Conform Password</label>
          <input type="cpassword" minLength={5} required className="form-control" name='cpassword' onChange={onChange} id="cpassword"/>
        </div>

        <button  type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default Signup