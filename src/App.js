
import React  from 'react';
import { BrowserRouter, Switch, Route , Redirect } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp  from './pages/SignUp';
import  {Footer}  from './pages/Footer';
import {CreateMemories} from './components/CreateMemories';
import {Profile} from './pages/Profile';
import LoginErrorImage from './images/login-error.png';
import ProtectedRoute from './components/ProtectedRoute';
import PostDetails from './pages/PostDetails';
import {UpdatePost} from './pages/UpdatePost';


function App() {


  return (
    <BrowserRouter>
      <div>
          <div className="row">
              <Navbar/>
          </div>
            <Switch>
              <Route path="/" exact component={() => <Redirect to="/posts" />} />
              <Route path="/posts" exact component={Home} />
              <Route path="/posts/search" exact component={Home} />
              <Route path="/login" exact component={SignIn} />
              <Route path="/registration" exact component={SignUp} />         
              <ProtectedRoute path="/create-memories" exact component={CreateMemories} image={LoginErrorImage} title={'Login required'} />
              <Route path="/my-profile/:id" exact component={Profile} />
              <Route path="/post/details/:id" exact component={PostDetails} />
              <Route path="/post/update-post/:id" exact component={UpdatePost}  />
            </Switch>
       <Footer />
      </div> 

    </BrowserRouter>
  );
}
export default App;
// APP.JS EXTRA SPACE REMOVE
