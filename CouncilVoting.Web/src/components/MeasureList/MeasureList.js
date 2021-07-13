import React, { useEffect } from 'react';
//import PropTypes from 'prop-types';
import styles from './MeasureList.module.css';

import { fetchMeasures } from '../../helpers/state/measureSlice';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';

import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

import {
    Link
} from "react-router-dom";

import { LinkContainer } from "react-router-bootstrap";


const MeasureList = () => {
    const isFetching = useSelector((state) => state.measure.list.isFetching, shallowEqual);
    const data = useSelector((state) => state.measure.list.data, shallowEqual);
    const error = useSelector((state) => state.measure.list.error, shallowEqual);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!isFetching && !error && !data) {
            dispatch(fetchMeasures());
        }
    }, [dispatch, data, error, isFetching]);

    return (
        <div className={styles.MeasureList} data-testid="MeasureList">
            <h1>List of all measures</h1>
            <ButtonToolbar className="mb-3" aria-label="Toolbar with Button groups">
                <ButtonGroup className="mr-2" aria-label="First group">
                    <LinkContainer to="/new-measure"><Button variant="outline-primary">New measure</Button></LinkContainer>
                </ButtonGroup>
            </ButtonToolbar>
            {isFetching && <div>Fetching data...</div>}
            {!!error && <div>Error...</div>}
            {!!data && (
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Id</th>
                            <th>Subject</th>
                            <th>Description</th>
                            <th>Vote</th>
                            <th>Result</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((measure, index) => {
                            return <tr key={measure.id}>
                                <td>{index + 1}</td>
                                <td>{measure.id}</td>
                                <td>{measure.subject}</td>
                                <td>{measure.description}</td>
                                <td><Link to={`measure/vote/${measure.id}`}>Vote measure</Link></td>
                                <td><Link to={`measure/result/${measure.id}`}>See result</Link></td>
                            </tr>
                        })}

                    </tbody>
                </Table>
            )}
        </div>
    );
}

MeasureList.propTypes = {};

MeasureList.defaultProps = {};

export default MeasureList;
