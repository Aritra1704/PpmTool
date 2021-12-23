import { StyleSheet, Text, View } from 'react-native';
import Dashboard from './src/components/Dashboard';
import Header from './src/components/layout/Header';
import "bootstrap/dist/css/bootstrap.min.css";
import styles from './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import AddProject from './src/components/project/AddProject';


const App = () => {
  return (
    <Router>
      <div style={styles}>
        <Header />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/addProject" element={<AddProject />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
// const styles = StyleSheet.create({
//   navbar: {
//     backgroundColor: '#e3f2fd',
//   }
// });
