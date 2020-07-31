import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Drawer from '@material-ui/core/Drawer';
import { AdminRoute, EmployeeRoute } from './routes';

const SideBarTitle = styled.h3`
  text-align: center;
`;
const drawerWidth = '400px';
const useStyles = makeStyles((theme) => ({
    drawer: {
        width: drawerWidth
    },
    drawerPaper: {
        width: drawerWidth,
    }
}));

export default function SideBar() {
    const classes = useStyles();
    return (
        <Drawer
            className={classes.drawer}
            classes={{
                paper: classes.drawerPaper,
            }}
            variant="permanent"
            anchor="left"
        >
            <SideBarTitle>Full Stack Developer Challenge</SideBarTitle>
            <Button variant="outlined" color="secondary" component={Link} to={AdminRoute}>
                Admin
            </Button>
            <Button variant="outlined" color="primary" component={Link} to={EmployeeRoute}>
                Employee
            </Button>
        </Drawer>
    );
}