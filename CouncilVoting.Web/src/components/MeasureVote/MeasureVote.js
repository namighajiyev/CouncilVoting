import React, { useEffect, useCallback } from 'react';
//import PropTypes from 'prop-types';
import styles from './MeasureVote.module.css';

import { useParams } from "react-router-dom";
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { fetchMeasure, createMeasureVote, resetMeasureVoteSave } from '../../helpers/state/measureVoteSlice';
import { fetchVoteTypes } from '../../helpers/state/voteTypeSlice';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Alert from 'react-bootstrap/Alert';

import { Formik } from 'formik';
import { schema, initialValue } from './schema';
import { unwrapResult } from '@reduxjs/toolkit';


const MeasureVote = () => {
    const { measureId } = useParams();
    const dispatch = useDispatch();
    const isFetching = useSelector((state) => state.measureVote.measure.isFetching, shallowEqual);
    const measure = useSelector((state) => state.measureVote.measure.data, shallowEqual);
    const error = useSelector((state) => state.measureVote.measure.error, shallowEqual);
    const voteTypes = useSelector((state) => state.voteType.list.data, shallowEqual);

    const measureVote = useSelector((state) => state.measureVote.measureVote.data, shallowEqual);
    const saveError = useSelector((state) => state.measureVote.measureVote.error, shallowEqual);
    const isSaving = useSelector((state) => state.measureVote.measureVote.isSaving, shallowEqual);

    useEffect(() => {
        if (!isFetching && !error && measure?.id !== Number(measureId)) {
            dispatch(fetchMeasure(measureId));
        }
    }, [dispatch, measure, error, isFetching, measureId]);

    useEffect(() => {
        if (!voteTypes) {
            dispatch(fetchVoteTypes());
        }
    });
    useEffect(() => {
        return () => {
            dispatch(resetMeasureVoteSave());
        };
    }, [dispatch]);
    const onSubmit = useCallback((data, { resetForm }) => {
        const voteData = { measureId, ...data };
        console.log(voteData);
        dispatch(createMeasureVote({ measureVote: voteData }))
            .then(unwrapResult)
            .then(result => {
                console.log(result);
                resetForm({ values: initialValue });
            })
            .catch(error => {
                console.log("save error", error)
            })
    }, [dispatch, measureId]);

    return (
        <div className={styles.MeasureVote} data-testid="MeasureVote">
            <h1>Vote for this measure</h1>
            {isFetching && <div>Fetching measure data...</div>}
            {!!error && <div>Error in fetching measure data...</div>}
            {isSaving && <div>Saving vote...</div>}
            {!!measure && !isSaving && (
                <div>
                    <Card>
                        <Card.Header>Measure Id : {measure.id}</Card.Header>
                        <Card.Text>Subject :</Card.Text>
                        <Card.Text>
                            {measure.subject}
                        </Card.Text>
                        <Card.Text>Description :</Card.Text>
                        <Card.Text>
                            {measure.description}
                        </Card.Text>
                        <div>
                            <Formik
                                validationSchema={schema}
                                onSubmit={onSubmit}
                                initialValues={initialValue}
                                enableReinitialize={true}
                            >
                                {({
                                    handleSubmit,
                                    handleChange,
                                    handleBlur,
                                    values,
                                    touched,
                                    errors,
                                }) => (

                                    <Form noValidate onSubmit={handleSubmit}>
                                        <Form.Group controlId="userName">
                                            <Form.Label>User name :</Form.Label>
                                            <Form.Control type="text" placeholder="Enter user name"
                                                name="userName"
                                                value={values.userName}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                isValid={touched.userName && !errors.userName}
                                                isInvalid={!!errors.userName}
                                            />
                                            <Form.Control.Feedback type="invalid">{errors.userName}</Form.Control.Feedback>
                                        </Form.Group>
                                        <Form.Group controlId="voteTypeName">
                                            <Form.Label>Vote options : </Form.Label>
                                            {!!voteTypes && voteTypes.map((voteType) =>
                                                <Form.Check
                                                    key={voteType.name}
                                                    custom
                                                    inline
                                                    label={voteType.name}
                                                    type="radio"
                                                    id={`vote-type-${voteType.name}`}
                                                    name="voteTypeName"
                                                    value={voteType.name}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    checked={values.voteTypeName === voteType.name}
                                                />
                                            )}
                                            <Form.Control.Feedback style={{ display: !!errors.voteTypeName ? 'block' : 'none' }} type="invalid">{errors.voteTypeName}</Form.Control.Feedback>
                                        </Form.Group>
                                        <Button variant="primary" type="submit">
                                            Vote
                                        </Button>
                                    </Form>

                                )}
                            </Formik>
                        </div>
                    </Card>
                </div>
            )
            }
            {!!saveError && !isSaving && <Alert variant="danger">Error in saving vote...</Alert>}
            {!!measureVote && !isSaving && <Alert variant="success">Saved vote succesfully...</Alert>}
        </div>
    );
}

MeasureVote.propTypes = {};

MeasureVote.defaultProps = {};

export default MeasureVote;
