import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom';
import styled from 'styled-components';

import { AdminRoute, EmployeesRoute, EmployeeRoutePath, EmployeeFeedbackRoutePath } from './routes';
import SideBar from './SideBar';
import AdminView from './admin/AdminView';
import EmployeesView from './employee/EmployeesView';
import EmployeeView from './employee/EmployeeView';
import EmployeeFeedbackView from './employee/EmployeeFeedbackView';

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
              <AdminView />
            </Route>
            <Route exact={true} path={EmployeesRoute}>
              <EmployeesView />
            </Route>
            <Route exact={true} path={EmployeeRoutePath} component={EmployeeView} />
            <Route exact={true} path={EmployeeFeedbackRoutePath} component={EmployeeFeedbackView} />
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
