import React from 'react';
import './app.scss';
import Sidebar from './Components/sidebar/Sidebar';
import Navbar from './Components/navbar/Navbar';
import Home from './Pages/Home/Home';
import { Route, Routes } from 'react-router-dom';
import District from './Pages/District/District';
import MainCategory from './Pages/MainCategory/MainCategory';
import Brand  from './Pages/Brand/Brand';
import SubCategory from './Pages/SubCategory/SubCategory';
const App = () => {
  return (
    <div className="home">
      <Navbar />

      <div className="homeContainer">
        <Sidebar />
        <div className='mainContainer'>
          <div className="listContainer">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/District" element={<District />} />
              <Route path="/MainCategory" element={<MainCategory />} />
              <Route path="/Brand" element={<Brand />} />
              <Route path="/SubCategory" element={<SubCategory />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
