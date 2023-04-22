import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import QueriesPage from './pages/QueriesListPage';
import NavBar from './NavBar';
import SanityCheck from './pages/SanityCheck';
import NotFoundPage from './pages/NotFound';
import CreatAccountPage from './pages/CreateAccountPage';
import Query1 from './pages/query1';
import Query2 from './pages/query2';
import Query3 from './pages/query3';
import Query4 from './pages/query4';
import Query5 from './pages/query5';
import Query6 from './pages/query6';
function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <NavBar />
      <div id="page-body">
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/queries-page' element={<QueriesPage />} />
          <Route path='/queries-page/sanity-check' element={<SanityCheck />} />
          <Route path='/queries-page/query1' element={<Query1 />} />
          <Route path='/queries-page/query2' element={<Query2 />} />
          <Route path='/queries-page/query3' element={<Query3 />} />
          <Route path='/queries-page/query4' element={<Query4 />} />
          <Route path='/queries-page/query5' element={<Query5 />} />
          <Route path='/queries-page/query6' element={<Query6 />} />
          <Route path='/create-account' element={<CreatAccountPage />} />
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </div>
    </div>
    </BrowserRouter>
  );
}

export default App;
