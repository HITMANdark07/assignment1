import axios from 'axios';
import React, { useState } from 'react';
import "../App.css";
import Header from '../components/Header';

function Assignment2() {

    const [values, setValues] = useState({
        name:"",
        email:"",
        password:"",
        confirm:"",
        message:'SUCCESS',
        loading:false,
        status:"",
        button:'SIGN UP'
    });
    const {message, name, email, password, confirm, status,loading,button} = values;
    const signup = (event) => {
        event.preventDefault();
        setValues((state) => ({
            ...state,
            loading:true,
            button:'SIGNING UP...',
        }))
        if(password!==confirm){
            setValues((state) => ({
                ...state,
                loading:false,
                button:'SIGN UP',
                status:'error',
                message:"Please Confirm Password"
            }));
            return;
        }
        const data = {
            name,
            email,
            password
        }
        axios.post(`${process.env.REACT_APP_API}/user/signup`,{
            ...data
        }).then((res) => {
            if(res?.data?.token){
                setValues((state) => ({
                    ...state,
                    name:"",
                    email:"",
                    button:'SIGN UP',
                    password:"",
                    confirm:"",
                    loading:false,
                    message:`${res.data?.user?.name} is Successfully Registered`,
                    status:'success'
                }));
            }
        }).catch((err) => {
            setValues((state) => ({
                ...state,
                loading:false,
                button:'SIGN UP',
                status:"warning",
                message:err.response.data.error
            }))
        })
    }
    const hide = () => {
        setValues((state) => ({
            ...state,
            status:""
        }))
    }
    const showMessage = () =>{
        if(status!==""){
            if(status==="success"){
                return (
                    <div className='success'>
                        <div>
                        {message}
                        </div>
                        <div onClick={hide} className='cross'>❌</div>
                    </div>
                )
            }
            if(status==="warning"){
                return(
                    <div className='warning'>
                        <div>
                        {message}
                        </div>
                        <div onClick={hide} className='cross'>❌</div>
                    </div>
                )
            }
            if(status==="error"){
                return (
                    <div className='error'>
                    <div>
                        {message}
                        </div>
                        <div onClick={hide} className='cross'>❌</div>
                    </div>
                )
            }else{
                return null;
            }
        }
        return null;
    }
    const onchangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setValues((state) => ({
            ...state,
            [name]:value
        }))
    }
  return <div className='App'>
      <Header active="two" />
      <div className='form-container'>
          <form className='form' onSubmit={signup}>
              <h2 style={{textAlign:'left', marginLeft:'5%', fontWeight:'350', letterSpacing:'5px'}}>SIGNUP FORM</h2>
              <label >Name <span style={{color:'red'}}>*</span></label>
              <input onChange={onchangeHandler} name="name" value={name} className='form-input' type="text" placeholder='Name' />
              <label>Email <span style={{color:'red'}}>*</span></label>
              <input onChange={onchangeHandler} name="email" value={email} className='form-input' type="email" placeholder='Enter your Email' />
              <label>Password <span style={{color:'red'}}>*</span></label>
              <input onChange={onchangeHandler} name="password" value={password} className='form-input' type="password" placeholder='Type Password' />
              <label>Confirm-Password <span style={{color:'red'}}>*</span></label>
              <input onChange={onchangeHandler} name="confirm" value={confirm} className='form-input' type="password" placeholder='Confirm Password' />
              {showMessage()}
              <button className='submit' type='submit' disabled={loading}>{button}</button>
          </form>
      </div>
  </div>;
}

export default Assignment2;
