import React, { useState } from 'react';
import './App.css';
import HomePage from './components/HomePage';
import ProfileModal from './components/AccountComponents/ProfileModal'

function App() {


  return (
    <>
      <ProfileModal />
      <HomePage />
    </>
  );
}

export default App;
