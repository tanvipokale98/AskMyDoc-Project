import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css'
import { Sidebar } from './components/SideBar'
import { LoginPage } from './pages/Login/LoginPage';
import RegisterPage from './pages/Register/RegisterPage';

function App() {
 return(
   <BrowserRouter>
    <Routes>
    <Route path='/login' element={<LoginPage />}></Route>
    <Route path='/register' element={<RegisterPage />}></Route>
</Routes>
    </BrowserRouter>
   

 );
}

export default App
