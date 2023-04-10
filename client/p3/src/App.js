import logo from './logo.svg';
import './App.css';
import CreateForm from './pages/CreateRecipePage/CreateForm';
import Layout from './components/Layout';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/LogIn';
import LoggedInContext, { useLoggedInContext } from './contexts/LoggedInContext';
import Logout from './components/Logout';
import Home from './components/Home';


function App() {
  
  const navbar = (
        <LoggedInContext.Provider value={useLoggedInContext()}>
          <Layout />
        </LoggedInContext.Provider>
      
    )

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={navbar}> 
          <Route index element = {<Home/>} />
          <Route path="register" element={ <Register/>} />
          <Route path="login" element={ <Login/>} />
          <Route path="logout" element={ < Logout />} />
          <Route path="create" element={ < CreateForm />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
