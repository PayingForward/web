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
				paddingTop:4
			}
		},
		MuiListItemIcon:{
			root:{
				minWidth:32
			}
		},
		MuiListItem:{
			dense:{
				paddingBottom:4,
				paddingTop:4,
			},
			root:{
				paddingBottom:0,
				paddingTop:0,
			}
		},
		MuiInputBase:{
			formControl:{
				height:30
			},
			input:{
				color:"#000"
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
			dark: "#404040",
			light: "#f0f0f0",
			main: "#222"
		},
		text: {
			primary: "#fff",
			secondary: "#000000"
		}
	},
	spacing:4,
	typography: {
		fontSize:10
	},
});

export default theme;