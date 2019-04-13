import React from 'react'
import CheckBox from './CheckBox'
import options_checkbox from './options_checkbox'

const CheckBoxes = props =>{

    const {handleInputCheckBox,state} = props
  
    return<>
   
{state.build_type==="Офисный"?<CheckBox handleInputCheckBox={handleInputCheckBox} label={options_checkbox.office.label} />:<></>}
{state.build_type==="Складской"?<CheckBox handleInputCheckBox={handleInputCheckBox} label={options_checkbox.sklad.label}  />:<></>}
{state.build_type==="Гостиничный"?<CheckBox handleInputCheckBox={handleInputCheckBox} label={options_checkbox.hotel.label}  /> : <></>}

</>
}
export default CheckBoxes