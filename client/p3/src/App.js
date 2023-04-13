import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RecipeDetailView from './pages/RecipeDetailPage/RecipeDetailView';
import ParentComponent from './pages/ParentRecipe/ParentComponent';
import MyRecipes from './pages/MyRecipes/MyRecipes';
import React, { useState } from 'react';
import './App.css';
import ProfileModal from './components/AccountComponents/ProfileModal'
import ShoppingCart from './components/ShoppingCart';
import CreateForm from './pages/CreateRecipePage/CreateForm';
import Layout from './components/Layout';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/LogIn';
import LoggedInContext, { useLoggedInContext } from './contexts/LoggedInContext';
import Logout from './components/Logout';
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage'

function App() {
  const [searchParams, setSearchParams] = useState({})
  
  
  const navbar = (
        <LoggedInContext.Provider value={useLoggedInContext()}>
          <Layout />
        </LoggedInContext.Provider>
      
    )

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={navbar}> 
        <Route index element = {<HomePage searchParams={searchParams} setSearchParams={setSearchParams}/>} />
        <Route path="register" element={ <Register/>} />
        <Route path="login" element={ <Login/>} />
        <Route path="logout" element={ < Logout />} />
        <Route path="create" element={ < CreateForm />} />
        <Route path="search" element={ <SearchPage searchParams={searchParams} setSearchParams={setSearchParams}/>} />
        <Route path="shoppingCart" element={ < ShoppingCart />} />
        <Route path="/recipes/:recipe_id/details" element={<RecipeDetailView />} />
        <Route path="/recipes/create-recipe" element={<ParentComponent mode="create" />} />
        <Route path="/recipes/:recipe_id/remix-recipe" element={<ParentComponent mode="remix" />} />
        <Route path="/recipes/:recipe_id/edit-recipe" element={<ParentComponent mode="edit" />} />
        <Route path="/recipes/my-recipes" element={<MyRecipes />} />
      </Route>
    </Routes>
  </BrowserRouter>  );
}

export default App;
