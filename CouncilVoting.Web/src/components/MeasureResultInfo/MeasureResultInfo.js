import React from 'react';
//import PropTypes from 'prop-types';
import styles from './MeasureResultInfo.module.css';
import ListGroup from 'react-bootstrap/ListGroup';
import Badge from 'react-bootstrap/Badge';

const MeasureResultInfo = ({ measure }) => {
    return (
        <div className={styles.MeasureResultInfo} data-testid="MeasureResultInfo">
            <h3>Measure result info :</h3>
            <ListGroup variant="flush">
                <ListGroup.Item>Status : {measure.isClosed ? <Badge variant="danger">Closed</Badge> : <Badge variant="success">Open</Badge>}</ListGroup.Item>
                <ListGroup.Item>Result : {!measure.isClosed ? <Badge variant="info">In process</Badge> : measure.passed ? <Badge variant="success">Passed</Badge> : <Badge variant="danger">Failed</Badge>}</ListGroup.Item>
            </ListGroup>
        </div>
    )
};

MeasureResultInfo.propTypes = {};

MeasureResultInfo.defaultProps = {};

export default MeasureResultInfo;
