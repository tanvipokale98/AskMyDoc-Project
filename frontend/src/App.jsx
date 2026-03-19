import { BrowserRouter, Route, Routes,Navigate } from 'react-router-dom';
import './App.css'
import { LoginPage } from './pages/Login/LoginPage';
import RegisterPage from './pages/Register/RegisterPage';
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import DashboardPage from './pages/Dashboard/DashboardPage';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
 return(
    <>
    <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
      />
   
   <BrowserRouter>
    <Routes>
    <Route path='/login' element={<LoginPage />}></Route>
    <Route path='/register' element={<RegisterPage />}></Route>
    <Route element={<ProtectedRoute />}>
         <Route path='/dashboard' element={<DashboardPage />}></Route>
    </Route>
    <Route path="*"  element={<Navigate to="/login" replace />} />
</Routes>

    </BrowserRouter>
    </>

 );
}

export default App
