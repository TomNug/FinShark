import { Outlet } from 'react-router';
import './App.css';
import Navbar from './Components/Navbar/Navbar';


function App() {
  
  
  // Now data is generated in the app
  // Need to pass it down to the components
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

export default App;
