import React from 'react'
import Switch from '@material-ui/core/Switch';
import './Switcher.css'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
const theme = createMuiTheme({
    palette: {
      primary: {
          main: '#018000'
        }
      }
    },
  )



const Switcher = props =>{
    const {label,caption,handleSwitcherChange,checked} = props
return(

    <div className="text-center margined">
     <MuiThemeProvider theme={theme}>
    <Switch
             onChange={handleSwitcherChange}
             checked={checked}
              value="checkedB"
              color="primary"
            />
           
           </MuiThemeProvider>
           
                  <p>{label}</p>
                  <p><small><small>({caption})</small></small></p>

                  </div>
              



)

}

export default Switcher
