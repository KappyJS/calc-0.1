import Form from 'react-bootstrap/Form'
import  React  from 'react'
import Slider from '@material-ui/lab/Slider';

import { withStyles } from '@material-ui/core/styles';

const Slidern = withStyles({
  track:{background:"#28a745"},
  thumb:{background:"#28a745"}
})(Slider);

const RangeInput =(props)=>{

    const {label,handleRangeChange,value,value_name,max,step,unit,min,getCalc} = props
   
    return<>
         
        {!props.disabled&&<Form.Group>
        <Form.Label className="text-center">{label+" : "+(Math.round(value*10)/10) +" "+ unit}</Form.Label>
      
        <Slidern onDragEnd={getCalc} max={max} step={step} value={value} min={min} onChange={handleRangeChange(value_name)}/>
      
      </Form.Group>}
      <></>

    </>
}

export default RangeInput