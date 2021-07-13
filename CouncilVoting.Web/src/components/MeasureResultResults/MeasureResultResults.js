import React from 'react';
//import PropTypes from 'prop-types';
import styles from './MeasureResultResults.module.css';

import ListGroup from 'react-bootstrap/ListGroup';
import Badge from 'react-bootstrap/Badge';

const MeasureResultResults = ({ results }) => {
    return (
        <div className={styles.MeasureResultResults} data-testid="MeasureResultResults">
            <h3>Result:</h3>
            {!!results && (
                <ListGroup variant="flush">
                    {results.map((result) => <ListGroup.Item key={result.voteTypeName}><Badge variant="info">{result.voteTypeName} </Badge> : <Badge variant="dark">{result.count} </Badge></ListGroup.Item>)}
                </ListGroup>
            )}
        </div>
    )
};

MeasureResultResults.propTypes = {};

MeasureResultResults.defaultProps = {};

export default MeasureResultResults;
