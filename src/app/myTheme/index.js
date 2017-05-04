import getMuiTheme from 'material-ui/styles/getMuiTheme'
import { 
	lightBlue500, 
	lightBlue900, 
	blueA400, 
	orangeA700, 
	redA700, 
	greenA700,
	green500,
	pink500,
	white,
	darkBlack,
	fullBlack,
} from 'material-ui/styles/colors'

export const muiStyle = {
  palette: {
    primary1Color: lightBlue900,
    primary2Color: lightBlue500,    
    accent1Color: pink500,
    accent2Color: redA700,
    textColor: darkBlack,    
  },
}

export const muiTheme = getMuiTheme({
  tabs: {
      backgroundColor: 'white',
      selectedTextColor: muiStyle.palette.primary1Color,
      textColor: '#757575',
  },
  inkBar: {
      backgroundColor: muiStyle.palette.primary1Color,
  },
  datePicker: { 
    selectColor: muiStyle.palette.primary1Color,
    selectTextColor: white,
  },
  stepper: {
      backgroundColor: 'transparent',
      iconColor: muiStyle.palette.primary1Color,      
  },
})