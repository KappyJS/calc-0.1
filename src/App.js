import React, { Component } from 'react';
import './App.css';
import MainComp from './comps/MainComps/MainComp'
import ResponseForm from './comps/MainComps/ResponseForm'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Navbar from './comps/NavBar/Navbar'
import calculateTotal from './calcFunctions/require_calc'

class App extends Component {
 constructor(){
   super();
   this.state = {
     value:{noi:0,amortization:0,square:0,rate:11},
     switch:false,
     checked:false,
     total:360,
     compl_total:450,
     delta:90,
     balloon:30,
     compl_balloon:50,
     first_class:false,
     bonus_rate:3.5,
     index:0,
     isHidden: true
    }
 }
 //Обработчики Input's(Switch,Input,Toggle,Range,Checkbox)
 handleSwitcherChange = e => {
  this.setState({ switch:e.target.checked});
};
 handleInputCheckBox = (e) =>{
   this.setState({checked:e.target.checked}, this.checkFirstClass)
 }

 getCalc=()=>{
 const result = calculateTotal(this.state);
this.setState({result})
 }
 handleInputChange = (e) =>{
const name = e.target.name
  this.setState({[e.target.name] : e.target.value},()=>{
   if (name==="nalog_rate"||name==="build_type")
   this.getCalc()
  })
}

 handleRangeChange = name=> (event,value) =>{
  this.setState(prevState => ({
    value: {
        ...prevState.value,
        [name]: value
    }
}))}



componentDidMount(){
 this.getAuthorize();
}

getAuthorize=()=>{
  if (JSON.parse(localStorage.getItem('isAdmin')))
  this.setState({isAdmin:true})
  else
  this.setState({isAdmin:false})
}

//Проверка на первоклассность (Для Складского доп условие - площадь обьекта(square)>50 тыс. кв. м.)
checkFirstClass = ()=>{

if (this.state.build_type==="Складской"){
  if((this.state.value.square>50)&&(this.state.checked))
  this.setState({first_class:true},this.getCalc)
  else(this.setState({first_class:false},this.getCalc))
}
else if(this.state.checked){
  this.setState({first_class:true},this.getCalc)
}
else this.setState({first_class:false},this.getCalc)



}

 render() {

let ResponseFormRequire = <div className="d-flex align-items-center"><h1 className="shadow-h">Начните заполнять форму</h1></div>;
if (   this.state.result)
if (   this.state.result[0])
if (   this.state.result[0].total)

ResponseFormRequire = <ResponseForm state={this.state}  handleSwitcherChange={this.handleSwitcherChange} />

  return <>
  <Navbar getAuthorize={this.getAuthorize} isAdmin={this.state.isAdmin}/>
  <Container>
    
    <Row>
  <Col md={5} className="bordered">
  <MainComp
   state={this.state}
   handleRangeChange={this.handleRangeChange} 
   getCalc={this.getCalc}
   handleInputChange={this.handleInputChange}
   handleInputCheckBox={this.handleInputCheckBox} 
   />
  </Col>
  <Col className="d-flex  justify-content-center">
    {ResponseFormRequire}
  </Col>
  </Row>
  </Container>
  </>
}
}

export default App;



///Стадии - действующие , строющиеся
//Сегмент недвижимости - жилая, торговая, офисная, складская, гостиничная , автосалоны 
// Доп счета еще один селектор. 

