
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import EstimerApp from './EstimerApp'
import LoginPage from './components/jwt/LoginPage'
import RegisterPage from './components/jwt/RegisterPage'
import ForgotPasswordPage from './components/jwt/ForgotPasswordPage'
import EmailVerificationPage from './components/jwt/EmailVerificationPage'
import SetNewPasswordPage from './components/jwt/SetNewPasswordPage'

function App() {
  

  return (
    <>
     <BrowserRouter>
     <Routes>
      <Route path='/' element={<LoginPage></LoginPage>} />
      <Route path='/dashboard' element={<EstimerApp></EstimerApp>}></Route>
      <Route path='/signup' element={<RegisterPage></RegisterPage>}></Route>
      <Route path='/forgot' element={<ForgotPasswordPage></ForgotPasswordPage>}></Route>
      <Route path='/verification' element={<EmailVerificationPage></EmailVerificationPage>}></Route>
      <Route path='/setnewpassword' element={<SetNewPasswordPage></SetNewPasswordPage>}></Route>
     </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
