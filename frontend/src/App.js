import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Layout from './components/Layout';
import PetDetail from './pages/PetDetail';
import PetListings from './pages/PetListings';
import ApplicationCreate from './pages/Applications/Create';
import MyListings from './pages/MyListings'
import Login from './pages/Login';
import SignupSeeker from './pages/Signup/Seeker';
import './App.css';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="petdetail/:petID" element={<PetDetail />} />
          <Route path="petlistings/" element={<PetListings />} />
          <Route path="mylistings/" element={<MyListings />} />
          <Route path="signup/seeker/" element={<SignupSeeker />} />
          <Route path="login/" element={<Login />} />
          <Route path="applications/create/:petlistingID" element={<ApplicationCreate />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
