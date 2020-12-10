import React from 'react';
import {InputNumber} from 'antd';


export default function BooleanButton({name, value, onChange}) {

    return (
        <div style={{display: 'flex'}}>
            <InputNumber value={value[0]} onChange={value => onChange(name, [value, value[1]])}/>
            <InputNumber value={value[1]} onChange={value => onChange(name, [value[0], value])}/>
        </div>
    );
}
