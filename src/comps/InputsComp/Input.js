import Form from 'react-bootstrap/Form'
import  React  from 'react'


const Input = (props) =>{
    const {name,handleInputChange,label,disabled} = props
    const options = props.options.map((value,i)=>{

        return(<option value={value.value} key={i}>{value.label}</option>)
    })
    return(
    <Form.Group hidden={disabled}>
    <Form.Label>{label}</Form.Label>
    <Form.Control  name={name} onChange={handleInputChange} as="select">
     {options}   
    </Form.Control>
  </Form.Group>
    )
}

export default Input