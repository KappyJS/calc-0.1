import  React, {Component}  from 'react'
import Inputs from '../InputsComp/Inputs'
import RangeInputs from '../RangeComp/RangeInputs'
import CheckBoxes from '../CheckBoxComp/CheckBoxes'




export default class MainComp extends Component {
constructor(props){
  super();
}

  render() {
    const {handleRangeChange,handleInputChange,handleInputCheckBox,state,getCalc} = this.props;
    return (
      <div className="padding-2">
       {state.isAdmin&& <h4>Кредитный калькулятор(Администратор)</h4>}
        <Inputs state={state} handleInputChange={handleInputChange}/>
       
        <RangeInputs    state={state} getCalc={getCalc} handleRangeChange={handleRangeChange}/>
        <CheckBoxes state={state} handleInputCheckBox={handleInputCheckBox}/>
      </div>
    )
  }
}
