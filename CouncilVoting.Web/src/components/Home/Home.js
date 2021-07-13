import React from 'react';
//import PropTypes from 'prop-types';
import styles from './Home.module.css';
import {
    Switch,
    Route,
    Redirect
} from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import MeasureList from '../MeasureList/MeasureList';
import MeasureVote from '../MeasureVote/MeasureVote';
import MeasureResult from '../MeasureResult/MeasureResult';
import NewMeasure from '../NewMeasure/NewMeasure';
import AppNavbar from '../AppNavbar/AppNavbar';


const Home = () => (
    <div className={styles.Home} data-testid="Home">
        <Container>
            <Row>
                <Col><AppNavbar /></Col>
            </Row>
            <Row>
                <Col>
                    <Switch>
                        <Redirect exact={true} from="/" to="/measures" />
                        <Route path="/measures">
                            <MeasureList />
                        </Route>
                        <Route path="/new-measure">
                            <NewMeasure />
                        </Route>;
                        <Route path="/measure/vote/:measureId">
                            <MeasureVote />
                        </Route>
                        <Route path="/measure/result/:measureId">
                            <MeasureResult />
                        </Route>
                    </Switch>
                </Col>
            </Row>
        </Container>
    </div>
);

Home.propTypes = {};

Home.defaultProps = {};

export default Home;
