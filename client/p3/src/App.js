import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RecipeDetailView from './pages/RecipeDetailPage/RecipeDetailView';
import CreateForm from './pages/CreateRecipePage/CreateForm';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/recipes/:recipe_id/details" element={<RecipeDetailView />} />
          <Route path="/recipes/create-recipe" element={<CreateForm />} />
          {/* Add other routes here as needed */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
