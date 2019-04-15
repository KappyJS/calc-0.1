import  React from 'react'
import PictureSVG from '../../svg/office'
import Switcher from '../SwitchComp/Switch'
import ResultComp from '../ResultComp/ResultComp'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const  ResponseForm=props=>{
  const {handleSwitcherChange,state} = props;
  const {result,delta} = state
 
    return <>
  <Row>
    <Col xs={12}>
      <PictureSVG checked={state.switch} result={result} delta={delta}/>
      <Switcher checked={state.switch} handleSwitcherChange={handleSwitcherChange} label={"Включить мезонинную часть"} caption={"Дополнительный кредит под повышенную ставку"}/>
      <hr/>
      </Col>
      
      <Col>
     <ResultComp state={state}/>
     </Col>
     </Row>
    </>
  }


export default ResponseForm