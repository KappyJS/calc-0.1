import React from 'react'
import './ResultComp.css'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const ResultComp = props => {
const  {state} = props
const result = state.result
let total,balloon,dscr
if(state.switch){
 total = result[1].total + result[0].total
 balloon = result[1].baloon
 dscr = result[1].dscr
}
else{
     total = result[0].total
     balloon = result[0].baloon
     dscr = result[0].dscr
}
return<>
<Row>
<Col xs={{ span: 4, offset: 2 }}>
<div className="sum result-text"> {getSpaceNumber(Math.round(total))} млн.</div>
<div>Сумма </div>
</Col>
<Col xs={{ span: 4, offset: 1 }}>
<div className="result-text"> 10 лет</div>
<div>Срок кредитования </div>
</Col>
</Row>
<Row>
<Col xs={{ span: 4, offset: 2 }}>
<div className="result-text"> {balloon*100}%</div>
<div>Baloon payment </div>
</Col>
<Col xs={{ span: 4, offset: 1 }}>
<div className="result-text"> {Math.round((dscr*10))/10}</div>
<div> DSCR</div>
</Col>
</Row>
    <Button block variant="outline-success">Оформить кредит</Button>

</>

}

export default ResultComp

function getSpaceNumber(num){
const strNum = num.toString().length;
if(strNum>3){
return (Math.floor(num/1000)).toString() + " " + (num%1000).toString()
}
else 
return num

}