import './App.css';
import Home from './components/home/Index';
import Dashboard from './components/dashboard/Index';
import { Route, Routes, BrowserRouter } from 'react-router-dom';




function App() {
  return (
    <BrowserRouter>
    <div className="App App-header">
      <div >
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
      </Routes>
      </div>
    </div>

    </BrowserRouter>
  );
}

export default App;
