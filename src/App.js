
import './App.css';
import { Route, Link, Switch} from 'react-router-dom'
import { Layout, Typography } from 'antd'
import Navbar from './components/Navbar';
import Homepage from './components/Homepage';
import Exchanges from './components/Exchanges';
import CryptoDetails from './components/CryptoDetails';

import News from './components/News';
import CryptoCurrencies from './components/CryptoCurrencies';


function App() {
  return (
    <div className="app">
     
      <div className="navbar">
        <Navbar/>
      </div>

      <div className="main">
        <Layout>

           <div className="routes">
              <Switch>
                  <Route exact path='/'>
                    <Homepage/>
                  </Route>

                  <Route exact path='/exchanges'>
                    <Exchanges/>
                  </Route>

                  <Route exact path='/cryptocurrencies'>
                   <CryptoCurrencies/>
                  </Route>

                  <Route exact path='/crypto/:coinId'>
                   <CryptoDetails/>
                  </Route>

                  <Route exact path='/news'>
                    <News/>
                  </Route>

              </Switch>
          </div>
          
        </Layout>
      <div className="footer">
        <Typography.Title level={2} style={{color:'white', textAlign:'center'}}>
          CryptoVerse 0616 <br /><span style={{fontSize:'16px'}}> - By Mudassir Shaikh</span> 
        </Typography.Title>
      </div>
      
      </div>
    </div>
  );
}

export default App;
