import * as React from 'react';
import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from '../constants/theme';

class App extends React.Component {
	public render() {

		return (
            <MuiThemeProvider theme={theme}>
                <div className="App">
                    
                </div>
            </MuiThemeProvider>
		);
	}
}

export default App;