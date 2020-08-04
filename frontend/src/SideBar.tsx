import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Drawer } from '@material-ui/core';
import { AdminRoute, EmployeesRoute } from './routes';

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
        backgroundColor: '#ff9800',
        boxSizing: 'border-box',
        padding: '1rem'
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
            <Button
                variant="contained"
                color="secondary"
                component={Link}
                to={AdminRoute}
                style={{ marginBottom: '1rem' }}
            >
                Admin
            </Button>
            <Button
                variant="contained"
                color="primary"
                component={Link}
                to={EmployeesRoute}
            >
                Employee
            </Button>
        </Drawer>
    );
}