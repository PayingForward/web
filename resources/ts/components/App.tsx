import * as React from 'react';
import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from '../constants/theme';
import { Provider } from 'react-redux';
import store from '../store';
import AuthController from './App/AuthController';

class App extends React.Component {
	public render() {

		return (
            <MuiThemeProvider theme={theme}>
                <Provider store={store}>
                    <div className="App">
                        <AuthController/>
                    </div>
                </Provider>
            </MuiThemeProvider>
		);
	}
}

export default App;