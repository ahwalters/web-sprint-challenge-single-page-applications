import React, {useState} from "react";
import {Routes, Route, Link} from 'react-router-dom'
import Home from "./Home";
import OrderForm from "./Form";

//style linksssssssssss
const linkstyle={};
//or figure out how to name it and put it in css

const initialFormValues = {
  name: "",
      size: "",
      pepperoni: false,
      bacon: false,
      onion: false,
      pineapple: false,
      special: "",
}

const formSubmit = () => { 
}
const formUpdate= () => {

}

const App = () => {
  const [formValues, setFormValues] = useState()
  
  return (
    <div className='App'>
      <h1>Lambda Eats</h1>
      <nav>
        <div>
        <Link to ="/">
          <button>Home</button>
        </Link>
        <Link to ="/help">
          <button>Help</button>
        </Link>
        </div>
      </nav>

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='pizza' element={<OrderForm /*update={formUpdate} submit={formSubmit} values={formValues} *//>} />
      </Routes>
    </div>
  );
};
export default App;
