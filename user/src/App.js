// import './App.css';
// import Home from './components/Home';
// import Nav from './components/Nav';
// import BookPage from './pages/BookPage';
// import Main from './pages/Main';

// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import Registerscreen from './pages/Registerscreen';
// import Loginscreen from './pages/Loginscreen';
// import Gallery from './components/Gallery';
// import Bookings from './components/Bookings';
// import HouseOwnerPage from './pages/HouseOwnerPage';
// import HouseownerRegisterscreen from './pages/HouseownerRegisterscreen';
// import HouseownerLoginscreen from './pages/HouseownerLoginscreen';



// function App() {
//   return (
//     <BrowserRouter>
//       <div className="App">
//       <Nav /> 
     
//         <Routes>
          
//           <Route path='/' element={<Home/>}/>
//           <Route path="/Main" element={<Main />} />
//           <Route path='/book/:roomid/:fromdate/:todate' element={<BookPage/>}/>
//           <Route path="/register" element={<Registerscreen/>} />
//           <Route path="/login" element={<Loginscreen />} />
//           <Route path="/gallery" element={<Gallery/>} />
//           <Route path='/bookings'element={<Bookings/>}/>
//           <Route path='/HouseownerRegister' element={<HouseownerRegisterscreen/>}/>
//           <Route path='/HouseownerLogin' element={<HouseownerLoginscreen/>}/>
//           <Route path='/Houseowner' element={<HouseOwnerPage/>}/>
         
         


//         </Routes>
//       </div>
//     </BrowserRouter>
//   );
// }

// export default App;
import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

import './App.css';
import Home from './components/Home';
import BookPage from './pages/BookPage';
import Main from './pages/Main';
import Registerscreen from './pages/Registerscreen';
import Loginscreen from './pages/Loginscreen';
import Gallery from './components/Gallery';
import Bookings from './components/Bookings';
import HouseOwnerPage from './pages/HouseOwnerPage';
import HouseownerRegisterscreen from './pages/HouseownerRegisterscreen';
import HouseownerLoginscreen from './pages/HouseownerLoginscreen';
import Nav from './components/Nav';
import RoomForm from './pages/RoomForm';
import Houseownerroom from './pages/Houseownerroom';


const App = () => {
  const location = useLocation();
  const isHouseownerRoute = location.pathname.startsWith('/houseowner');

  return (
    <div className="App">
      {!isHouseownerRoute && <Nav />}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/Main" element={<Main />} />
        <Route path='/book/:roomid/:fromdate/:todate' element={<BookPage />} />
        <Route path="/register" element={<Registerscreen />} />
        <Route path="/login" element={<Loginscreen />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path='/bookings' element={<Bookings />} />
        <Route path='/houseowner/*' element={<HouseownerRoutes />} />
      </Routes>
    </div>
  );
};

const HouseownerRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<HouseOwnerPage />} />
      <Route path='/addroom' element={<RoomForm/>} />
      <Route path='/register' element={<HouseownerRegisterscreen />} />
      <Route path='/login' element={<HouseownerLoginscreen />} />
      <Route path='view'element={<Houseownerroom/>}/>
      
     
    </Routes>
  );
};

const AppWrapper = () => {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
};

export default AppWrapper;
