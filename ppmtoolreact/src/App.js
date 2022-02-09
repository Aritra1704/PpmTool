// Next Course episode chapter 96
import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import styles from './App.css';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from "./store";
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

const App = () => {
  let navigate = useNavigate();
  return (
    <Provider store={store}>
    <div style={styles}>
          <Header />
          <Routes>
            {
              // Public routes
            }
            <Route 
              path="/" 
              element={<Landing />} 
            />
            <Route 
              path="/register" 
              element={<Register navigate={navigate} />} 
            />
            <Route 
              path="/login" 
              element={<Login navigate={navigate} />} 
            />
            {
              // Private routes
            }
            {/* Use navigate to connect and replace to new link */}
            <Route 
              path="/dashboard" 
              element={<Dashboard navigate={navigate} />} 
            />
            <Route 
              path="/addProject" 
              element={<AddProject navigate={navigate} />} 
            />
            <Route 
              path="/updateProject/:id" 
              element={<UpdateProject navigate={navigate} />} 
            />
            <Route 
              path="/projectBoard/:id" 
              element={<ProjectBoard navigate={navigate} />} 
            />
            <Route 
              path="/addProjectTask/:id" 
              element={<AddProjectTask navigate={navigate} />} 
            />
            <Route 
              path="/updateProjectTask/:backlog_id/:projectTaskId" 
              element={<UpdateProjectTask navigate={navigate} />} 
            />
          </Routes>
        </div>
    </Provider>
  );
}

export default App;