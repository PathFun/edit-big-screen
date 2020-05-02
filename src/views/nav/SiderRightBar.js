import React, {useReducer, useMemo, useState} from 'react';
// import {initialState as store, reducer} from "../../store/store";
import FormRender from 'form-render/lib/antd';
import SCHEMA from '../../../public/charts-config/chart';
import {RadioButton} from '../../components'

function SiderRightBar() {
    // const [state, dispatch] = useReducer(reducer, store);
    const [formData, setFormData] = useState(SCHEMA.formData || {})

    const onChange = formData => {
        setFormData(formData);
    };

    const onValidate = valid => {
        console.log('没有通过的校验:', valid);
    };
    return useMemo(()=>{
        const { propsSchema, uiSchema } = SCHEMA;
        return (
            <div className="nav-sider-right">
                <FormRender
                    propsSchema={propsSchema}
                    uiSchema={uiSchema}
                    formData={formData}
                    onChange={onChange}
                    onValidate={onValidate}
                    widgets={{ myRadioButton: RadioButton}}
                />
            </div>
        )
    },[formData]);
}

export default SiderRightBar;
