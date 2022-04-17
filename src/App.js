import { ThemeProvider } from '@material-ui/core';
import { BrowserRouter } from 'react-router-dom'
import theme from './theme';
import { PrivateRoute } from './routes'

const App = () =>
  <ThemeProvider theme={theme}>
    <BrowserRouter>
      <PrivateRoute />
    </BrowserRouter>
  </ThemeProvider>

export default App
