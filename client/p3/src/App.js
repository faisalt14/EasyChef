import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RecipeDetailView from './pages/RecipeDetailPage/RecipeDetailView';
import ParentComponent from './pages/ParentRecipe/ParentComponent';
import MyRecipes from './pages/MyRecipes/MyRecipes';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/recipes/:recipe_id/details" element={<RecipeDetailView />} />
          <Route path="/recipes/create-recipe" element={<ParentComponent mode="create" />} />
          <Route path="/recipes/:recipe_id/remix-recipe" element={<ParentComponent mode="remix" />} />
          <Route path="/recipes/:recipe_id/edit-recipe" element={<ParentComponent mode="edit" />} />
          <Route path="/recipes/my-recipes" element={<MyRecipes />} />

          {/* Add other routes here as needed */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
