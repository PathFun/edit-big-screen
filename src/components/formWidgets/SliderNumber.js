import React from 'react';
import {Slider} from 'antd';

export default function SliderNumber(p) {
    const style = p.invalid
        ? { borderColor: '#ff4d4f', boxShadow: '0 0 0 2px rgba(255,77,79,.2)' }
        : {};
    const { max, min, step } = p.schema;
    let setting = {};
    if (max || max === 0) {
        setting = { max };
    }
    if (min || min === 0) {
        setting = { ...setting, min };
    }

    if (step) {
        setting = { ...setting, step };
    }

    const onChange = value => {
        p.onChange(p.name, value);
    };
    return (
        <Slider
            {...p.options}
            {...setting}
            style={{ width:'100%', ...style }}
            value={p.value}
            disabled={p.disabled||p.readOnly}
            onChange={onChange}
        />
    );
}
