import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import QueriesPage from './pages/QueriesListPage';
import NavBar from './NavBar';
import QueryPage from './pages/QueryPage';
import NotFoundPage from './pages/NotFound';
import MyProfile from './pages/MyProfile';
import CreatAccountPage from './pages/CreateAccountPage';
function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <NavBar />
      <div id="page-body">
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/my-profile' element={<MyProfile />} />
          <Route path='/queries-page' element={<QueriesPage />} />
          <Route path='/queries-page/:queryId' element={<QueryPage />} />
          <Route path='/create-account' element={<CreatAccountPage />} />
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </div>
    </div>
    </BrowserRouter>
  );
}

export default App;
