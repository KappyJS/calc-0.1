import RangeInput from './RangeInput'
import  React  from 'react'
import options_range from './options_range'


const RangeInputs = (props)=>{

    const {handleRangeChange,state,getCalc} = props
    const isAdmin = props.state.isAdmin
    const {noi,amortization,square,rate} = state.value 
    const flag = (state.build_type === "Складской") ? false : true

return(<>
   <RangeInput
    max={options_range.noi.max}
     step={options_range.noi.step}
      label={options_range.noi.label}
      unit = {options_range.noi.unit}
       value={noi} 
       getCalc={getCalc}
        value_name={options_range.noi.name} 
        handleRangeChange={handleRangeChange} />
        <RangeInput
        max={options_range.amortization.max}
         step={options_range.amortization.step}
          label={options_range.amortization.label}
          unit = {options_range.amortization.unit}
           value={amortization} 
           getCalc={getCalc}
            value_name={options_range.amortization.name} 
            handleRangeChange={handleRangeChange} />
             <RangeInput
        max={options_range.square.max}
         step={options_range.square.step}
          label={options_range.square.label}
          unit = {options_range.square.unit}
           value={square} 
           getCalc={getCalc}
            value_name={options_range.square.name} 
            handleRangeChange={handleRangeChange} disabled={flag} />
             <RangeInput
        max={options_range.rate.max}
         step={options_range.rate.step}
          label={options_range.rate.label}
          min={options_range.rate.min}
          unit = {options_range.rate.unit}
           value={rate} 
           getCalc={getCalc}
            value_name={options_range.rate.name} 
            handleRangeChange={handleRangeChange} 
            disabled={!isAdmin}/>
   
</>)
}

export default RangeInputs
