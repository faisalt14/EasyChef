import logo from './logo.svg';
import './App.css';
import Layout from './components/Layout';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

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

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element = {home} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
