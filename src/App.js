import logo from './logo.svg';
import './App.css';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import Home from './components/home/Index';
import Dashboard from './components/dashboard/Index';
import { BrowserRouter as Router, Route, Routes, BrowserRouter } from 'react-router-dom';




function App() {
  return (
    <BrowserRouter>
    <div className="App App-header">
      <div >
      <Header/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
      </Routes>
      </div>
      <Footer/>
    </div>

    </BrowserRouter>
  );
}

export default App;
