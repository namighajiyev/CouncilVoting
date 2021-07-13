import React from 'react';
//import PropTypes from 'prop-types';
import styles from './AppNavbar.module.css';

import Navbar from 'react-bootstrap/Navbar';
import { LinkContainer } from "react-router-bootstrap";

const AppNavbar = () => (
    <div className={styles.AppNavbar} data-testid="AppNavbar">
        <Navbar bg="light" expand="lg">
            <LinkContainer exact={true} to="/measures">
                <Navbar.Brand>Measures</Navbar.Brand>
            </LinkContainer>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            </Navbar.Collapse>
        </Navbar>
    </div>
);

AppNavbar.propTypes = {};

AppNavbar.defaultProps = {};

export default AppNavbar;
