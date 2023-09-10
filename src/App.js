import { BrowserRouter } from 'react-router-dom'
import RoutesApp from './Routes/routes';

import AuthProvider from './Contexts/auth';
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ToastContainer autoClose={3000} />
        <RoutesApp/>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;

