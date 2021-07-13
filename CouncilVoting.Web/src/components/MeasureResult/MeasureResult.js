import React, { useEffect } from 'react';
//import PropTypes from 'prop-types';
import styles from './MeasureResult.module.css';
import { useParams } from "react-router-dom";
import { useSelector, shallowEqual, useDispatch } from 'react-redux';

import MeasureVoters from '../MeasureVoters/MeasureVoters';
import MeasureResultResults from '../MeasureResultResults/MeasureResultResults';
import MeasureResultInfo from '../MeasureResultInfo/MeasureResultInfo';

import { fetchMeasure, resetMeasure } from '../../helpers/state/measureSlice';
import { fetchMeasureResults, resetMeasureResult } from '../../helpers/state/measureResultSlice';

const MeasureResult = () => {
    const { measureId } = useParams();
    const dispatch = useDispatch();
    //measure
    const isFetchingMesure = useSelector((state) => state.measure.details.isFetching, shallowEqual);
    const measure = useSelector((state) => state.measure.details.data, shallowEqual);
    const measureFetchError = useSelector((state) => state.measure.details.error, shallowEqual);

    //measure results
    const isFetchingMesureResult = useSelector((state) => state.measureResult.measureResult.isFetching, shallowEqual);
    const measureResult = useSelector((state) => state.measureResult.measureResult.data, shallowEqual);
    const measureResultFetchError = useSelector((state) => state.measureResult.measureResult.error, shallowEqual);

    useEffect(() => {
        if (!isFetchingMesure && !measureFetchError && measure?.id !== Number(measureId)) {
            dispatch(fetchMeasure(measureId));
        }
    }, [dispatch, measure, measureFetchError, isFetchingMesure, measureId]);

    useEffect(() => {
        return () => {
            dispatch(resetMeasure());
            dispatch(resetMeasureResult());
        };
    }, [dispatch]);

    useEffect(() => {
        if (!isFetchingMesureResult && !measureResultFetchError && measureResult?.measureId !== Number(measureId)) {
            dispatch(fetchMeasureResults(measureId));
        }
    }, [dispatch, measureResult, measureResultFetchError, isFetchingMesureResult, measureId]);


    return (
        <div className={styles.MeasureResult} data-testid="MeasureResult">
            {!!measure && <MeasureResultInfo measure={measure} />}
            {!!measureResult && measureResult.results && <MeasureResultResults results={measureResult.results} />}
            {!!measure && <MeasureVoters votes={measure.votes} />}
        </div>
    )
};

MeasureResult.propTypes = {};

MeasureResult.defaultProps = {};

export default MeasureResult;
