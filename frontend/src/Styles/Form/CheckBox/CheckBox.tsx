import styled from 'styled-components';
import { useState } from 'react';

const Checkbox = ({ label, onChange }: any) => {
    const [checked, setChecked] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const isChecked = e.target.checked;
        setChecked(isChecked);

        if (onChange) {
            onChange(isChecked);
        }
    };

    return (
        <Button className='checkbox-wrapper'>
            <input type='checkbox' id={label} checked={checked} onChange={handleChange} />
            <label htmlFor={label}>{label}</label>
        </Button>
    );
};

export default Checkbox;

const Button = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;

    input {
        padding: 0;
        height: initial;
        width: initial;
        margin-bottom: 0;
        display: none;
        cursor: pointer;
    }

    label {
        position: relative;
        cursor: pointer;
        font-family: 'Work Sans', sans-serif;
        font-weight: 500;
        margin: 0.5em 0 0.5em 0;
    }

    label:before {
        content: '';
        background-color: transparent;
        border: 2px solid #ebebeb;
        border-radius: 10px;
        background-color: #ffffff;
        padding: 10px;
        display: inline-block;
        position: relative;
        vertical-align: middle;
        cursor: pointer;
        margin-right: 5px;
    }

    input:checked + label:after {
        content: '';
        display: block;
        position: absolute;
        top: 0px;
        left: 9px;
        width: 6px;
        height: 14px;
        border: solid #000000;
        border-width: 0 3px 3px 0;
        transform: rotate(45deg);
    }
`;
