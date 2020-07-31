import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom';
import styled from 'styled-components';

import { AdminRoute, EmployeeRoute } from './routes';
import SideBar from './SideBar';
import Admin from './admin/Admin';

const Root = styled.div`
  display: flex;
`;
const Content = styled.div`
  flex-grow: 1;
  padding: 2rem;
`;

function App() {
  return (
    <Router>
      <Root>
        <SideBar />
        <Content>
          <Switch>
            <Route path={AdminRoute}>
              <Admin />
            </Route>
            <Route path={EmployeeRoute}>
              Employee
            </Route>
            <Route exact={true} path="/">
              <Redirect to={AdminRoute} />
            </Route>
          </Switch>
        </Content>
      </Root>
    </Router>
  );
}

export default App;
