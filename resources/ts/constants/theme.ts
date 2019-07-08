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
				marginTop:-8
			},
			shrink:{
				marginTop:2
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
			primary: "#f0f0f0",
			secondary: "#000000"
		}
	},
	spacing:4,
	typography: {
		fontSize:10
	},
});

export default theme;