import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Search from './components/search';

import './App.css';

export const App = (props) => {
    return(
        <React.Fragment>
            <Router>
                <Switch>
                    <Route path="/search" component={Search} />
                </Switch>
            </Router>
        </React.Fragment>
      );
}

export default App;