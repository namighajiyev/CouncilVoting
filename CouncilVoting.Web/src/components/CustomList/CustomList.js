import React, { useState, useCallback, useRef } from 'react';
//import PropTypes from 'prop-types';
import styles from './CustomList.module.css';
import ListGroup from 'react-bootstrap/ListGroup';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';

const CustomList = ({ onChange }) => {
    const [items, setItems] = useState(new Set([]));
    const userNameTextRef = useRef(null);
    const addCb = useCallback(() => {
        const value = userNameTextRef.current.value;
        userNameTextRef.current.value = null;
        const newItems = new Set(items);
        newItems.add(value);
        setItems(newItems);
        onChange([...newItems]);
    }, [items, onChange]);

    const removeCb = useCallback((item) => {
        const newItems = new Set(items);
        newItems.delete(item);
        setItems(newItems);
        onChange([...newItems]);
    }, [items, onChange]);

    const keyUpCb = useCallback((e) => {
        if (e.key === "Enter") {
            addCb();
        }
    }, [addCb])

    return (
        <div className={styles.CustomList} data-testid="CustomList">
            <InputGroup className="mb-3">
                <FormControl ref={userNameTextRef}
                    placeholder="User name"
                    aria-label="User name"
                    aria-describedby="basic-addon2"
                    onKeyUp={keyUpCb}
                />
                <InputGroup.Append>
                    <Button variant="outline-secondary" onClick={addCb}>Add</Button>
                </InputGroup.Append>
            </InputGroup>
            <ListGroup horizontal>
                {[...items].map(item => <ListGroup.Item key={item}>{item}  <Button onClick={() => removeCb(item)} size="sm" style={{ color: 'red' }} variant="link">x</Button></ListGroup.Item>)}
            </ListGroup>
        </div>
    );
}

CustomList.propTypes = {};

CustomList.defaultProps = {};

export default CustomList;
