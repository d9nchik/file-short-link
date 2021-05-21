import React, { FunctionComponent } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AdminPage from './components/AdminPage';
import DownloadPage from './components/DownloadPage';
import './App.css';

const App: FunctionComponent = () => {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={AdminPage} />
          <Route path="/:id" component={DownloadPage} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
