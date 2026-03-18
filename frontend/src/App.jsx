import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css'
import { LoginPage } from './pages/Login/LoginPage';
import RegisterPage from './pages/Register/RegisterPage';
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


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
</Routes>
    </BrowserRouter>
    </>

 );
}

export default App
