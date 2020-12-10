import React from 'react';
import {Input} from 'antd';

export default function ArrayNumber({name, value, onChange, disabled}) {
    return (
        <div style={{display: 'flex',  justifyContent: 'space-around', width: '100%'}}>
            <Input value={value[0]} type="number" disabled={disabled} onChange={e => onChange(name, [e.target.value, value[1]])} addonAfter="px" style={{width: '45%'}}/>
            <Input value={value[1]} type="number" disabled={disabled} onChange={e => onChange(name, [value[0], e.target.value])} addonAfter="px" style={{width: '45%'}}/>
        </div>
    );
}
