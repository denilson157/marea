import { ThemeProvider } from '@material-ui/core';
import { BrowserRouter } from 'react-router-dom'
import theme from './theme';
import { PrivateRoute } from './routes'
import AuthProvider from './contexts/auth'
import './App.scss';

const App = () =>
  <BrowserRouter>
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <PrivateRoute />
      </AuthProvider>
    </ThemeProvider>
  </BrowserRouter>

export default App
