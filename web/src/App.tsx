import './App.css';
import './themes';

import { AuthProvider } from './contexts/authContext';
import { CopyProvider } from './contexts/copyContext';
import { ErrorProvider } from './contexts/errorContext';
import { ThemeProvider } from './contexts/themeContext';
import RoutesContainer from './routes';

function App() {
  return (
    <ErrorProvider>
      <CopyProvider>
        <ThemeProvider>
          <AuthProvider>
            <RoutesContainer />
          </AuthProvider>
        </ThemeProvider>
      </CopyProvider>
    </ErrorProvider>
  );
}

export default App;
