import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Layout from './components/Layout';
import PetDetail from './pages/PetDetail'
import PetListings from './pages/PetListings'
import MyListings from './pages/MyListings'
import Login from './pages/Login';
import './App.css';
import { UserContext, useUserContext } from './contexts/UserContext';

function App() {
  return (
    <UserContext.Provider value={useUserContext()}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="petdetail/:petID" element={<PetDetail />} />
            <Route path="petlistings/" element={<PetListings />} />
            <Route path="mylistings/" element={<MyListings />} />
            <Route path="login/" element={<Login />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
