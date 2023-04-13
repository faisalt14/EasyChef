import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PublishedRecipe from './PublishedRecipe'
import FavouriteRecipes from './FavouriteRecipes';
import RecentRecipes from './RecentRecipes';
import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';



function MyRecipes() {
  const [recipes, setRecipes] = useState([]);
  const [recipes2, setRecipes2] = useState([]);
  const [recipes3, setRecipes3] = useState([]);
  const [nextPage, setNextPage] = useState(false)
  const [cards, setCards] = useState([])
  let callingCards = false

  const [activeTab, setActiveTab] = useState('1');

  const toggle = tab => {
    if(activeTab !== tab) setActiveTab(tab);
  }

  const infiniteScrollPublished = async (event) => {
    if (!callingCards && nextPage && event.target.scrollHeight - event.target.scrollTop < (event.target.clientHeight + 10)) {
      callingCards = true;
      try {
        const response = await axios.get(nextPage, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCards([...cards, ...response.data.results]);
        setNextPage(response.data.next);
      } catch (error) {
        console.error(error);
      }
      callingCards = false;
    }
  };
  
  const infiniteScrollFavourited = async (event) => {
    if (!callingCards && nextPage && event.target.scrollHeight - event.target.scrollTop < (event.target.clientHeight + 10)) {
      callingCards = true;
      try {
        const response = await axios.get(nextPage, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setRecipes2([...recipes2, ...response.data.results]);
        setNextPage(response.data.next);
      } catch (error) {
        console.error(error);
      }
      callingCards = false;
    }
  };
  
  const infiniteScrollRecent = async (event) => {
    if (!callingCards && nextPage && event.target.scrollHeight - event.target.scrollTop < (event.target.clientHeight + 10)) {
      callingCards = true;
      try {
        const response = await axios.get(nextPage, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setRecipes3([...recipes3, ...response.data.results]);
        setNextPage(response.data.next);
      } catch (error) {
        console.error(error);
      }
      callingCards = false;
    }
  };
    
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjgxMzQ4NjEyLCJpYXQiOjE2ODEzNDUwMTIsImp0aSI6IjNkNzE4NDk3NGI5OTRmZjc5ZjE5NDk1NTgxZDc5YjQxIiwidXNlcl9pZCI6Mn0.NwNa-NYcOxLMbQBsMYZ9Iaq5p9ZpjWkGepVT-xRW-mE";  

  useEffect(() => {
    async function fetchData() {
      try {
        // const token = localStorage.getItem('token');
        const response = await axios.get('http://127.0.0.1:8000/accounts/myrecipes/published-recipes/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setRecipes(response.data.results);
      } catch (error) {
        console.error(error);
      }
    }
  
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData2() {
      try {
        // const token = localStorage.getItem('token');
        const response = await axios.get('http://127.0.0.1:8000/accounts/myrecipes/favourite-recipes/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setRecipes2(response.data.results);
      } catch (error) {
        console.error(error);
      }
    }
  
    fetchData2();
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        // const token = localStorage.getItem('token');
        const response = await axios.get('http://127.0.0.1:8000/accounts/myrecipes/recent-recipes/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setRecipes3(response.data.results);
      } catch (error) {
        console.error(error);
      }
    }
  
    fetchData();
  }, []);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-sm-12" style={{ height: '5em', backgroundColor: '#E47E20', color: '#FFFFFF', paddingTop: '0.5rem', textAlign: 'center', boxShadow: 'rgba(0, 0, 0, 0.06) 0px 2px 4px 0px inset' }}>
          <h2 className='mt-2' style={{fontWeight:"550"}}>Create a Recipe</h2>
        </div>
        </div>
      <div className="row">
        <div className="col-sm-12 navbar-wrapper">
          <Nav tabs className="ms-4 navbar-tabs">
            <NavItem>
              <NavLink
                className={activeTab === '1' ? 'active' : ''}
                onClick={() => { toggle('1'); }}
              >
                Published Recipes
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={activeTab === '2' ? 'active' : ''}
                onClick={() => { toggle('2'); }}
              >
                Favourite Recipes
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={activeTab === '3' ? 'active' : ''}
                onClick={() => { toggle('3'); }}
              >
                My Recent
              </NavLink>
            </NavItem>
          </Nav>
        </div>
      </div>
      <TabContent activeTab={activeTab}>
        <TabPane tabId="1">
        <div className="scrollable-content" onScroll={infiniteScrollPublished}>
          <div className="ms-3 row">
            {recipes.map((recipe) => (
              <div key={recipe.id} className="col-lg-3 col-md-6 mb-4">
                <PublishedRecipe info={recipe} />
              </div>
            ))}
          </div>
        </div>
      </TabPane>
        <TabPane tabId="2">
        <div className="scrollable-content" onScroll={infiniteScrollFavourited}>
          <div className="ms-3 row">
            {recipes2.map((recipe) => (
              <div key={recipe.id} className="col-lg-3 col-md-6 mb-4">
                <FavouriteRecipes info={recipe}/>
              </div>
            ))}
          </div>
          </div>
        </TabPane>
        <TabPane tabId="3">
        <div className="scrollable-content" onScroll={infiniteScrollRecent}>
          <div className="ms-3 row">
            {recipes3.map((recipe) => (
              <div key={recipe.id} className="col-lg-3 col-md-6 mb-4">
                <RecentRecipes info={recipe}/>
              </div>
            ))}
          </div>
          </div>
        </TabPane>
      </TabContent>
    </div>
  );
  
}

export default MyRecipes
