import React, { useEffect, useCallback } from 'react';
//import PropTypes from 'prop-types';
import styles from './NewMeasure.module.css';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { Formik } from 'formik';
import { schema, initialValue } from './schema';
import { unwrapResult } from '@reduxjs/toolkit';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import CustomList from '../CustomList/CustomList';

import { resetMeasureSave, createMeasure, fetchMeasures } from '../../helpers/state/measureSlice'

const NewMeasure = () => {
    const dispatch = useDispatch();
    const measure = useSelector((state) => state.measure.add.data, shallowEqual);
    const saveError = useSelector((state) => state.measure.add.error, shallowEqual);
    const isSaving = useSelector((state) => state.measure.add.isSaving, shallowEqual);

    useEffect(() => {
        return () => {
            dispatch(resetMeasureSave());
        };
    }, [dispatch]);

    const onSubmit = useCallback((data, { resetForm }) => {
        console.log(data);
        dispatch(createMeasure({ measure: data }))
            .then(unwrapResult)
            .then(result => {
                console.log(result);
                resetForm({ values: initialValue });
                dispatch(fetchMeasures());
            })
            .catch(error => {
                console.log("save error", error)
            })
    }, [dispatch]);

    return (
        <div className={styles.NewMeasure} data-testid="NewMeasure">
            <h1>New measure</h1>
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
                    setFieldValue
                }) => (
                    <Form noValidate onSubmit={handleSubmit}>
                        <Form.Group controlId="subject">
                            <Form.Label>Subject :</Form.Label>
                            <Form.Control type="text" placeholder="Enter subject"
                                name="subject"
                                value={values.subject}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                isValid={touched.subject && !errors.subject}
                                isInvalid={!!errors.subject}
                            />
                            <Form.Control.Feedback type="invalid">{errors.subject}</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="description">
                            <Form.Label>Description :</Form.Label>
                            <Form.Control type="text" placeholder="Enter description"
                                name="description"
                                value={values.description}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                isValid={touched.description && !errors.description}
                                isInvalid={!!errors.description}
                            />
                            <Form.Control.Feedback type="invalid">{errors.description}</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="minNumOfVotes">
                            <Form.Label>Minimum number of votes :</Form.Label>
                            <Form.Control type="number" placeholder="Enter minimum number of votes"
                                name="minNumOfVotes"
                                value={values.minNumOfVotes}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                isValid={touched.minNumOfVotes && !errors.minNumOfVotes}
                                isInvalid={!!errors.minNumOfVotes}
                            />
                            <Form.Control.Feedback type="invalid">{errors.minNumOfVotes}</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="minPercentOfYesVotes">
                            <Form.Label>Minimum number of votes :</Form.Label>
                            <Form.Control type="number" placeholder="Enter percentage of yes votes"
                                name="minPercentOfYesVotes"
                                value={values.minPercentOfYesVotes}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                isValid={touched.minPercentOfYesVotes && !errors.minPercentOfYesVotes}
                                isInvalid={!!errors.minPercentOfYesVotes}
                            />
                            <Form.Control.Feedback type="invalid">{errors.minPercentOfYesVotes}</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="allowDuplicteVotes">
                            <Form.Label>Allow same user to vote multiple times :</Form.Label>
                            <Form.Check
                                name="allowDuplicteVotes"
                                type="switch"
                                id="allowDuplicteVotes"
                                label={values.allowDuplicteVotes === true ? "Users with the same name can vote multiple times" : "Users with the same name can only vote once"}
                                value={values.allowDuplicteVotes}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                checked={values.allowDuplicteVotes}
                            />
                            <Form.Control.Feedback type="invalid">{errors.allowDuplicteVotes}</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="vetoUserName">
                            <Form.Label>User name that can veto the measure :</Form.Label>
                            <Form.Control type="text" placeholder="Enter user name"
                                name="vetoUserName"
                                value={values.vetoUserName}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                isValid={touched.vetoUserName && !errors.vetoUserName}
                                isInvalid={!!errors.vetoUserName}
                            />
                            <Form.Control.Feedback type="invalid">{errors.vetoUserName}</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="minCloseDateTime">
                            <Form.Label>Minimum close date :</Form.Label>
                            <Form.Control type="datetime-local" placeholder="Enter subject"
                                name="minCloseDateTime"
                                value={values.minCloseDateTime}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                isValid={touched.minCloseDateTime && !errors.minCloseDateTime}
                                isInvalid={!!errors.minCloseDateTime}
                            />
                            <Form.Control.Feedback type="invalid">{errors.minCloseDateTime}</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="closeDateTime">
                            <Form.Label>Close date :</Form.Label>
                            <Form.Control type="datetime-local" placeholder="Enter subject"
                                name="closeDateTime"
                                value={values.closeDateTime}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                isValid={touched.closeDateTime && !errors.closeDateTime}
                                isInvalid={!!errors.closeDateTime}
                            />
                            <Form.Control.Feedback type="invalid">{errors.closeDateTime}</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="requiredUserNames">
                            <Form.Label>Users required (Users with specific name(s) must vote for it to pass) :</Form.Label>
                            <CustomList onChange={(newItems) => setFieldValue('requiredUserNames', newItems)} />
                            <Form.Control.Feedback type="invalid">{errors.subject}</Form.Control.Feedback>
                        </Form.Group>
                        <Button disabled={isSaving} variant="primary" type="submit">
                            Save
                        </Button>

                    </Form>
                )}
            </Formik>
            {!!saveError && !isSaving && <Alert variant="danger">Error in saving measure...</Alert>}
            {!!measure && !isSaving && <Alert variant="success">Saved measure succesfully...</Alert>}
        </div>
    );
}

NewMeasure.propTypes = {};

NewMeasure.defaultProps = {};

export default NewMeasure;
