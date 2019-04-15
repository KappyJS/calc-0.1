

import Input from './Input'
import options from './options'
import  React  from 'react'


const Inputs = (props) =>{
  const {handleInputChange} = props
  

    return (
      <>
      
      <Input handleInputChange={handleInputChange} name={"build_stage"} label={"Стадия строительства"} options={options.stage_build} />
      <Input handleInputChange={handleInputChange} name={"build_class"} label={"Класс здания"} options={options.class_build}/>
      <Input handleInputChange={handleInputChange} name={"build_type"} label={"Тип здания*"} options={options.type_buid}/>
      <Input handleInputChange={handleInputChange} name={"nalog_rate"} label={"Ставка налога*"} options={options.nalog_rate} />
      <Input handleInputChange={handleInputChange} name={"dscr"} label={"Введите dscr"} options={options.dscr} disabled={true}/>
      
      
      
      
      
   
      </>
      );
}
export default Inputs;