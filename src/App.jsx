import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import theme from './theme';
import Login from './pages/Login';
import Task from './pages/Task';
import PrivateRoute from './PrivateRoute';

const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />

          <Route path="/task" element={ <PrivateRoute> <Task /> </PrivateRoute> }/>
        </Routes>
      </Router>
    </ChakraProvider>
  );
};

export default App;