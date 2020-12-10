import React from 'react';
import {Radio} from 'antd';


export default function BooleanButton({name, value, onChange, options}) {
    const defaultChildren = [{label: '是', value: true}, {label: '否', value: false}]
    return (
        <Radio.Group {...options}
                     value={value}
                     onChange={e => onChange(name, e.target.value)}>
            {options.children ? options.children.map((c,i) =>
                <Radio.Button key={i} value={c.value}>{c.label}</Radio.Button>
            ) : defaultChildren.map((d,i) =>
                <Radio.Button key={i} value={d.value}>{d.label}</Radio.Button>)}
        </Radio.Group>
    );
}
