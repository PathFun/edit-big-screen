// MyCheckbox.js
import React from 'react';
import {Radio} from 'antd';

export default function RadioButton({name, value, onChange, options}) {
    return (
        <Radio.Group {...options}
                     value={value}
                     onChange={e => onChange(name, e.target.value)}>
            {options.children.map(item =>
                <Radio.Button key={item.value} disabled={item.disabled}
                              value={item.value}>{item.label}</Radio.Button>
            )}
        </Radio.Group>
    );
}
