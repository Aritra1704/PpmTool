// Next Course episode chapter 108
import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import styles from './App.css';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import store, { history } from "./store";
import Header from './components/layout/Header';
import Dashboard from './components/Dashboard';
import AddProject from './components/project/AddProject';
import UpdateProject from './components/project/UpdateProject';
import ProjectBoard from './components/projectBoard/ProjectBoard';
import AddProjectTask from './components/projectBoard/projectTasks/AddProjectTask';
import UpdateProjectTask from './components/projectBoard/projectTasks/UpdateProjectTask';
import Landing from './components/layout/Landing';
import Register from './components/userManagement/Register';
import Login from './components/userManagement/Login';
import setJwtToken from './utils/SetJwtToken';
import jwtDecode from 'jwt-decode';
import { LOGIN_USER } from './actions/types';
import { logout } from './actions/securityActions';
import PrivateOutlet from './utils/PrivateOutlet';

// if page is refreshed set the jwttoken again
const jwtToken = localStorage.jwtToken;
if(jwtToken) {
  setJwtToken(jwtToken);

  const decoded_jwtToken = jwtDecode(jwtToken);
  store.dispatch({ type: LOGIN_USER, payload: decoded_jwtToken });

  const currentTime = Date.now()/1000;
  if(decoded_jwtToken.exp < currentTime) {
    // handle logout
    store.dispatch(logout());
    // refresh page
    window.location.href = "/";
  }
}

const App = () => {
  let navigate = useNavigate();
  return (
    <Provider store={store}>
      <div style={styles}>
        <Header />
        <Routes>
          {/* Public routes */}
          <Route 
            path="/" 
            element={<Landing navigate={navigate} />} 
          />
          <Route 
            path="/register" 
            element={<Register navigate={navigate} />} 
          />
          <Route 
            path="/login" 
            element={<Login navigate={navigate} />} 
          />
          {/* Private routes Single route */}
          {/* <Route
            path="/login"
            element={
              <PrivateRoute>
                <Private />
              </PrivateRoute>
            }
          /> */}
          <Route element={<PrivateOutlet redirectTo={"/login"} />}>
            <Route 
              path="/dashboard" 
              element={<Dashboard navigate={navigate} history={history} />}  />
            <Route 
              path="/addProject" 
              element={ <AddProject navigate={navigate} history={history} />} />
            <Route 
              path="/updateProject/:id" 
              element={<UpdateProject navigate={navigate} history={history} />} />
            <Route 
              path="/projectBoard/:id" 
              element={<ProjectBoard navigate={navigate} history={history} />} />
            <Route 
              path="/addProjectTask/:id" 
              element={<AddProjectTask navigate={navigate} history={history} />} />
            <Route 
              path="/updateProjectTask/:backlog_id/:projectTaskId" 
              element={<UpdateProjectTask navigate={navigate} history={history} />} />
            </Route>
        </Routes>
      </div>
    </Provider>
  );
}

export default App;