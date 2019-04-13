import  React from 'react'
import PictureSVG from '../../svg/office'
import Switcher from '../SwitchComp/Switch'
import ResultComp from '../ResultComp/ResultComp'

const  ResponseForm=props=>{
  const {handleSwitcherChange,state} = props;
  const {result,delta} = state
 
    return <>
    <div >
      <PictureSVG checked={state.switch} result={result} delta={delta}/>
      <Switcher checked={state.switch} handleSwitcherChange={handleSwitcherChange} label={"Включить мезонинную часть"} caption={"Дополнительный кредит под повышенную ставку"}/>
      <hr/>
     <ResultComp state={state}/>
     </div>
    </>
  }


export default ResponseForm