import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Layout from './components/Layout';
import PetDetail from './pages/PetDetail';
import PetListings from './pages/PetListings';
import ApplicationCreate from './pages/Applications/Create';
import MyListings from './pages/MyListings'
import Login from './pages/Login';
import ShelterList from './pages/ShelterList';
import SignupSeeker from './pages/Signup/Seeker';
import SignupShelter from './pages/Signup/Shelter';
import ApplicationUpdateSeeker from './pages/Applications/Update/Seeker';
import ApplicationUpdateShelter from './pages/Applications/Update/Shelter'
import ShelterDetail from './pages/ShelterDetail';
import ApplicationListSeeker from './pages/Applications/List/Seeker';
import ApplicationListShelter from './pages/Applications/List/Shelter';
import CreatePetListing from './pages/CreatePetListing';
import UpdatePetListing from './pages/UpdatePetListing';

import './App.css';
import { UserContext, useUserContext } from './contexts/UserContext';

function App() {
  return (
    <UserContext.Provider value={useUserContext()}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="petdetail/:petListingID" element={<PetDetail />} />
            <Route path="petlistings/" element={<PetListings />} />
            <Route path="mylistings/" element={<MyListings />} />
            <Route path="signup/seeker/" element={<SignupSeeker />} />
            <Route path="signup/shelter/" element={<SignupShelter />} />
            <Route path="login/" element={<Login />} />
            <Route path="applications/create/:petlistingID" element={<ApplicationCreate />} />
            <Route path="applications/update/seeker/:applicationID" element={<ApplicationUpdateSeeker />} />
            <Route path="applications/update/shelter/:applicationID" element={<ApplicationUpdateShelter />} />
            <Route path="shelter/all/" element={<ShelterList />} />
            <Route path="shelterDetail/:shelterID" element={<ShelterDetail />} />
            <Route path="applications/list/seeker/" element={<ApplicationListSeeker />} />
            <Route path="applications/list/shelter/" element={<ApplicationListShelter />} />
            <Route path="petlisting/create/" element={<CreatePetListing />} />
            <Route path="petlisting/update/:petlistingID" element={<UpdatePetListing />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
