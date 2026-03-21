import { BrowserRouter, Route, Routes,Navigate } from 'react-router-dom';
import './App.css'
import { LoginPage } from './pages/Login/LoginPage';
import RegisterPage from './pages/Register/RegisterPage';
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import DashboardPage from './pages/Dashboard/DashboardPage';
import ProtectedRoute from './components/ProtectedRoute';
import DocumnetListPage from './pages/Document/DocumentListPage';
import { DocumentPage } from './pages/Document/DocumentPage';
import ProfilePage from './pages/Profile/ProfilePage';

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
    <Route path="/" element={<Navigate to="/dashboard" replace />} />
    <Route element={<ProtectedRoute />}>
         <Route path='/dashboard' element={<DashboardPage />}></Route>
         <Route path='/documents' element={<DocumnetListPage />}></Route>
          <Route path='/document/:id' element={<DocumentPage />}></Route>
          <Route path='/profile' element={<ProfilePage />}></Route>
    </Route>
    <Route path="*"  element={<Navigate to="/login" replace />} />
</Routes>

    </BrowserRouter>
    </>

 );
}

export default App
