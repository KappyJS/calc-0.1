import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Authorization from './Authorization'

const Navar = (props) =>{
const {isAdmin,getAuthorize} = props

return<>
<Navbar bg="success" variant="dark">
  <Navbar.Brand href="#home"><img width="40px" src="sber.svg " alt="logo"/> Калькулятор кредитования недвижимости</Navbar.Brand>
  <Navbar.Toggle />
  <Navbar.Collapse className="justify-content-end">
    <Navbar.Text>
      <Authorization getAuthorize={getAuthorize} isAdmin={isAdmin}/>
    </Navbar.Text>
  </Navbar.Collapse>
</Navbar>
</>

}
export default Navar