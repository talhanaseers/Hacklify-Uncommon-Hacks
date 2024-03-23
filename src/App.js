import { Link } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import SiteHomeNav from './Components/Common/SiteHomeNav';



function App() {
  return (
    <div>
      <SiteHomeNav />
      <div className='app-container'>
        
        <h1 className='h1p1'>Welcome to your Hackathon community</h1>
        <h2 className='h2p1'>Hacklify</h2>
        <h2 className='h2p2'> — Where Hackers Meet</h2>
        
        <h3 className='h3p1'><Link to='/homepage'>Create an account or login to get started</Link></h3>
      </div>
    </div>
  );
}

export default App;
