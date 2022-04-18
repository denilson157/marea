import { ThemeProvider } from '@material-ui/core';
import { BrowserRouter } from 'react-router-dom'
import theme from './theme';
import { PrivateRoute } from './routes'
import AuthGoogleProvider from './contexts/authGoogle'

const App = () =>
  <BrowserRouter>
    <ThemeProvider theme={theme}>
      <AuthGoogleProvider>
        <PrivateRoute />
      </AuthGoogleProvider>
    </ThemeProvider>
  </BrowserRouter>

export default App
