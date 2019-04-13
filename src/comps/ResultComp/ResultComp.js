import React from 'react'
import './ResultComp.css'
import Button from 'react-bootstrap/Button'

const ResultComp = props => {
const  {state} = props
const result = state.result
let total,balloon,dscr
console.log(result[1].total)
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
<div className="text-center margined">
    <ul >
      
        <li>Сумма : {Math.round(total)} млн. рублей. </li>
        <li>Balloon payment : {balloon*100}% </li>
        <li>DSCR : {Math.round((dscr*10))/10} </li>
        <li>Срок : 10 лет </li>
    </ul>
    <Button variant="outline-success">Оформить кредит</Button>
    </div>
</>

}

export default ResultComp

