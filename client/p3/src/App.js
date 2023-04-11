import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RecipeDetailView from './pages/RecipeDetailPage/RecipeDetailView';
import ParentComponent from './pages/ParentRecipe/ParentComponent';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/recipes/:recipe_id/details" element={<RecipeDetailView />} />
          <Route path="/recipes/create-recipe" element={<ParentComponent mode="create" />} />
          <Route path="/recipes/remix-recipe/:recipe_id" element={<ParentComponent mode="remix" />} />
          {/* Add other routes here as needed */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
