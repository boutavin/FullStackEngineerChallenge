import React from 'react';
import {
    Link,
    Route,
    Switch
} from 'react-router-dom';
import Button from '@material-ui/core/Button';
// import styled from 'styled-components';

import { AdminRoute, AdminEmployeesRoute, AdminReviewsRoute } from '../routes';
import AdminEmployees from './employees/AdminEmployees';
import AdminReviews from './reviews/AdminReviews';

export default function Admin() {
    return (
        <Switch>
            <Route path={AdminEmployeesRoute}>
                <AdminEmployees />
            </Route>
            <Route path={AdminReviewsRoute}>
                <AdminReviews />
            </Route>
            <Route exact={true} path={AdminRoute}>
                <Button variant="outlined" color="secondary" component={Link} to={AdminEmployeesRoute}>
                    Employees List
                </Button>
                <Button variant="outlined" color="primary" component={Link} to={AdminReviewsRoute}>
                    Reviews List
                </Button>
            </Route>
        </Switch>
    );
}
