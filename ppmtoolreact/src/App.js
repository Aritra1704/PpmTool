// Next Course episode chapter 41
import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import styles from './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import store, { history } from "./store";
import Header from './components/layout/Header';
import Dashboard from './components/Dashboard';
import AddProject from './components/project/AddProject';
import UpdateProject from './components/project/UpdateProject';

class App extends Component {
  render () {
    return (
      <Provider store={store}>
        <Router>
          <div style={styles}>
            <Header />
            <Routes>
              {/* Use navigate to connect and replace to new link */}
              <Route path="/" element={<Navigate replace to="/dashboard" />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/addProject" element={<AddProject history={history} />} />
              <Route path="/updateProject/:id" element={<UpdateProject history={history} />} />
            </Routes>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;