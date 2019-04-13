 import React from 'react'
 import Form from 'react-bootstrap/Form'

const CheckBox = props =>{
    const {label,handleInputCheckBox} = props
    
    return(

 <Form.Group controlId="formBasicChecbox">
    <Form.Check onChange={handleInputCheckBox} type="checkbox" label={label} />
  </Form.Group>
    )
}
  export default CheckBox