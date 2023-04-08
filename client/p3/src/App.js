import logo from './logo.svg';
import './App.css';
import Layout from './components/Layout';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/LogIn';
import LoggedInContext, { useLoggedInContext } from './contexts/LoggedInContext';



function App() {
  // return (
  //   <div className="App">
  //     <header className="App-header">
  //       <img src={logo} className="App-logo" alt="logo" />
  //       <p>
  //         Edit <code>src/App.js</code> and save to reload.
  //       </p>
  //       <a
  //         className="App-link"
  //         href="https://reactjs.org"
  //         target="_blank"
  //         rel="noopener noreferrer"
  //       >
  //         Learn React
  //       </a>
  //     </header>
  //   </div>Your UI must give a good first impression to users. Exploring your website should be delightful for users. A basic UI that everyone can tell it is the default of a framework (e.g., bootstrap) is not delightful to explore.
  // );

  const home = (
    <h1> Welcome to our app!</h1>
  )

    const navbar = (
        <LoggedInContext.Provider value={useLoggedInContext()}>
          <Layout />
        </LoggedInContext.Provider>
      
    )

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={navbar}> 
          <Route index element = {home} />
          <Route path="register" element={ <Register/>} />
          <Route path="login" element={ <Login/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
