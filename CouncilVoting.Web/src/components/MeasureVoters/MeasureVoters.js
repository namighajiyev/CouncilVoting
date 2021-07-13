import React from 'react';
//import PropTypes from 'prop-types';
import styles from './MeasureVoters.module.css';

import Table from 'react-bootstrap/Table';

const MeasureVoters = ({ votes }) => {

    return (
        <div className={styles.MeasureVoters} data-testid="MeasureVoters">
            <h3>List of voters:</h3>
            {(!votes || votes.length === 0) && <div>No votes yet</div>}
            {!!votes && (
                <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>User name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            votes.map((voter, index) =>
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{voter.userName}</td>
                                </tr>
                            )
                        }

                    </tbody>
                </Table>
            )}
        </div>
    )
};

MeasureVoters.propTypes = {};

MeasureVoters.defaultProps = {};

export default MeasureVoters;
