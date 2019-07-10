import createMuiTheme from "@material-ui/core/styles/createMuiTheme";

const theme = createMuiTheme({
	overrides:{
		MuiIconButton:{
			root:{
				margin:4,
				padding:4,
			}
		},
		MuiList:{
			root:{
				paddingBottom:4,
				paddingTop:4,
			}
		},
		MuiListItem:{
			dense:{
				paddingBottom:4,
				paddingTop:4,
			}
		},
		MuiInputBase:{
			formControl:{
				height:30
			}
		},
		MuiInputLabel:{
			formControl:{
				marginTop:-12
			},
			shrink:{
				marginTop:2
			}
		},
		MuiSwitch:{
			switchBase:{
				margin:0
			}
		},
		MuiTableCell:{
			root:{
				padding:"0px 40px 0px 16px"
			}
		}
	},
	palette: {
		primary: {
			dark: "#332448",
			light: "#936ace",
			main: "#542f88"
		},
		text: {
			primary: "#0f0f0f",
			secondary: "#000000"
		}
	},
	spacing:4,
	typography: {
		fontSize:10
	},
});

export default theme;