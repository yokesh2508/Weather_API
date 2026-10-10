import React, { useState } from 'react'
import axios from 'axios'
import './App.css'
import toast, { Toaster } from 'react-hot-toast'


const App = () => {
  
  let [state,setState]=useState({
    city:'',
    details:'',
    status:''
  })

  // console.log(state);

  function handleChange(e){
    let {name,value}=e.target
    setState({...state,[name]:value})
  }

  let myKey='8d9837c0a7e45c377a93dcec82c2f524';

  async function handleSubmit(){

    if (!state.city.trim()) { 
      toast.error('Please enter a city name!'); return; 
    }

    try{
      let resp=await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${state.city}&appid=${myKey}`)
      // console.log(resp);
      setState({city:'',details:resp.data,status:resp.status})
    }
    catch(e){
      console.log(e);
      setState({city:'',details:'City Not Found',status:404})
    }  
  }

  return (
    
    <div className='main'>
      <Toaster position='top-center'></Toaster>
    <h1 id='head'>Weather API</h1>
      <section id='input'>
        <input type="text" name='city' value={state.city} onChange={handleChange} placeholder='enter the city'/>
        <section id='btn'><button onClick={handleSubmit}>SEARCH</button></section>
      </section>

        {state.status===404? (<div id='details'><h1>{state.details}.</h1> </div>):
        state.details && typeof state.details === 'object'?(
          <div id='details'>
        <h1>{state.details.name} weather right now is {parseInt(state.details.main.temp -273.15)} °C</h1>
        <h1>Wind Speed: {state.details.wind.speed} m/s</h1>
        <h1>Climate is {state.details.weather[0].main}</h1>
        </div>
        ):null}
    
    </div>
  )
}
export default App