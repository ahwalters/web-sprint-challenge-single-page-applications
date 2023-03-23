import React, { useState, useEffect } from "react";
import * as yup from "yup"
import axios from "axios";

const initialFormValues = {
    name: "",
    size: "",
    pepperoni: false,
    bacon: false,
    onion: false,
    pineapple: false,
    special: "",
  }

  const formErrorStrings = {
    name: "",
    size: "",
    pepperoni: "",
    bacon: "",
    onion: "",
    pineapple: "",
    special: "",
  }

export default function OrderForm() {
const [formValues, setFormValues] = useState(initialFormValues)
const [disabled, setDisabled] = useState(true)
const [errors, setErrors] = useState(formErrorStrings)

const setFormErrors = (name, value) => {
    yup.reach(formSchema, name).validate(value)
    .then( () => {setErrors({...errors, [name]: ""})})
    .catch(err => setErrors({...errors, [name]: err.errors[0]}) )
}

const onChange = evt => {
    const {checked, value, name, type} = evt.target
    const valueToUse = type === 'checkbox' ? checked : value
    setFormErrors(name, valueToUse)
    setFormValues({...formValues, [name] : valueToUse})
    console.log(formValues)
}

const onSubmit = evt => {
    const formFinalData = {
        name: formValues.name,
        size: formValues.size,
        pepperoni: formValues.pepperoni,
        bacon: formValues.bacon,
        onion: formValues.onion,
        pineapple: formValues.pineapple,
        special: formValues.special
    }
    evt.preventDefault()
    axios.post('https://reqres.in/api/orders', formFinalData)
    .then(res => console.log(res))
    .catch(err => console.log(err))
    .finally(setFormValues(initialFormValues))
    
}


const formSchema = yup.object().shape({
    name: yup.string().trim().required().min(2, "name must be at least 2 characters"),
    size: yup.string().required(),
    pepperoni: yup.boolean(),
    bacon: yup.boolean(),
    onion: yup.boolean(),
    pineapple: yup.boolean(),
    special: yup.string()
})


useEffect( () => {
    formSchema.isValid(formValues)
    .then(valid => setDisabled(!valid))
    .catch(err => {})
}, [formValues])

return (
    <form id="pizza-form" onSubmit={onSubmit}>
        <div className='form-group inputs'>  
        <label>Name
            <input 
                id="name-input"
                name="name"
                type="text"
                placeholder="Type your name"
                maxLength='15'
                value={formValues.name}
                onChange={onChange}
            />
        </label> 
        <label>Size
            <select value={formValues.size} name='size' onChange={onChange} id='size-dropdown'>
                <option value=''>-Select Size-</option>
                <option value='Small'>Small</option>
                <option value='Medium'>Medium</option>
                <option value='Large'>Large</option>
            </select>
        </label>
        <div className='form-topping checkboxes'>
            <h3>Toppings</h3>
            <h4>Choose up to 2</h4>
            <label>Pepperoni
                <input
                type='checkbox'
                name='pepperoni'
                checked={formValues.pepperoni}
                onChange={onChange} />
            </label>
            <label>Bacon
                <input
                type='checkbox'
                name='bacon'
                checked={formValues.bacon}
                onChange={onChange} />
            </label>
            <label>Onion
                <input
                type='checkbox'
                name='onion'
                checked={formValues.onion}
                onChange={onChange} />
            </label>
            <label>Pineapple
                <input
                type='checkbox'
                name='pineappple'
                checked={formValues.pineapple}
                onChange={onChange} />
            </label>
        </div>
        <label>Special Instructions
        <input 
                id="special-text"
                name="special"
                type="text"
                placeholder="Type your instructions"
                value={formValues.special}
                onChange={onChange}
            />
        </label>
        <div className='errors'>
            <div>{errors.name}</div>
            <div>{errors.size}</div>
            <div>{errors.pepperoni}</div>
            <div>{errors.bacon}</div>
            <div>{errors.onion}</div>
            <div>{errors.pineapple}</div>
            <div>{errors.special}</div>
        </div>
        <button id="order-button" disabled={disabled}>Order</button>
        </div>
    </form>
)
}