import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Detailroom from './layout/Room/Detail';
import Res from './layout/Service/ServicePage';
import Fly from './layout/Service/Fly';
import { Contact } from './routes/Contact';
import { Massage } from './routes/Massage';
import { Home } from './routes/Home';
import { Room } from './routes/Room';
import DetailMass from './layout/Massage/DetailMass';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path="room" element={<Room />} />
          <Route path="roomdetail/:id" element={<Detailroom />} />
          <Route path="massage" element={<Massage />} />
          <Route path="massdetail/:id" element={<DetailMass />} />
          <Route path="/service/res" element={<Res />}/>
          <Route path="/service/fly" element={<Fly />}/>
          <Route path="contact" element={<Contact />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
