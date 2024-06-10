import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import { Room } from './routes/Room';
import { Home } from './routes/Home';
import Layout from './components/Layout';
import { Massage } from './routes/Massage';
import { Service } from './routes/Service';
import { Contact } from './routes/Contact';
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path="room" element={<Room />} />
          <Route path='massage' element={<Massage />} />
          <Route path="service" element={<Service />} />
          <Route path="contact" element={<Contact />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
