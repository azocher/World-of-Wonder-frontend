import React, { useState, useEffect } from 'react';
import './App.css';
import './components/Footer.css';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import Office from './components/Office'
import Navbar from './components/Navbar'
import About from './components/About';
import Profile from './components/Profile'
import Footer from './components/Footer'
import Pacific from './components/Pacific'
import NativeAmerican from './components/NativeAmerican'
import AncientEgypt from './components/AncientEgypt'
import Signup from './components/Signup';
import Login from './components/Login';
import TeamPage from './components/teamPage'
import axios from 'axios'
import teamPage from './components/teamPage';

const PrivateRoute = ({ component: Component, ...rest }) => {
  //get user via jwt token to confirm user authenticated
  const user = localStorage.getItem(`jwtToken`);
  //setup return based on user status
  return <Route {...rest} render={(props) => (
      user
          ? <Component {...rest} {...props} />
          : <Redirect to='/login' />
      )} 
  />
}
function App() {
  // set state values
  let [currentUser, setCurrentUser] = useState("")
  let [isAuthenticated, setIsAuthenticated] = useState(true)
  useEffect(() => {
    let token;
    if(localStorage.getItem('jwtToken') === null) {
      setIsAuthenticated(false)
      console.log('AHHHHH')
    } else {
      token = jwt_decode(localStorage.getItem('jwtToken'));
      setAuthToken(localStorage.jwtToken);
      setCurrentUser(token);
      setIsAuthenticated(true);
    }
  }, [])
  let nowCurrentUser = (userData) => {
    console.log("oh hey this is even running")
    setCurrentUser(userData);
    setIsAuthenticated(true)
  }
  let handleLogout = () => {
    if(localStorage.getItem('jwtToken') !== null) {
      localStorage.removeItem('jwtToken');
      setCurrentUser(null);
      setIsAuthenticated(false);
    }
  }

  console.log('Current User = ', currentUser);
  console.log('Authenticated = ', isAuthenticated);
//   const [show, setShow] = useState(false);
//   const [artifacts, setArtifacts] = useState({
//    name: "",
//    description: "", 
//    imageurl: ""
//  })
 
//   const handleShow = (e) => {
//     console.log(e.target.id)
//     setShow(true);
//     axios.get(`${process.env.REACT_APP_SERVER_URL}/artifact/${e.target.id}`, artifacts)
//         .then(response => {
//             let articleTitle = response.data['dc:title'][0].value
//             let articleDescription = response.data['dc:description'][0].value
//             let articleImage = response.data['ecrm:P138_has_representation'][0].value
//             setArtifacts({ name: articleTitle, description: articleDescription, imageurl: articleImage })
//         })
//     }

//     const handleClose = () => setShow(false);

//     const saveToProfile = (e) => {
//         e.preventDefault()
//         axios.post(`${process.env.REACT_APP_SERVER_URL}/profile/artifact/`, artifacts)
            
//     }

  return (
    <div>
      <BrowserRouter>
        <Navbar handleLogout={handleLogout} isAuthenticated={isAuthenticated} />
          <div className="react-router-logic">
            <Switch>
              <Route path='/signup' component={ Signup } />
              <Route path='/login' render={ (props) => <Login {...props} nowCurrentUser={nowCurrentUser} setIsAuthenticated={setIsAuthenticated} user={currentUser} /> } />
              <Route path='/pacific' component={Pacific} />
              <Route path='/nativeAmerican' component={NativeAmerican} />
              <Route path='/ancientEgypt' exact component={AncientEgypt}  />
              <Route path="/" exact component={Office} />
              <Route path ="/teampage" exact component = {teamPage} />
              <PrivateRoute path="/profile" exact component={Profile} user={currentUser} />
            </Switch>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}
export default App;