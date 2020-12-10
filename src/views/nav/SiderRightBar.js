import React, { useMemo, useContext} from 'react';
import {Tabs} from 'antd'
import FormRender from 'form-render/lib/antd';
import DRAGITEMBASE from '@public/charts-config/dragItemBase';
import CHARTCONFIG from '@public/charts-config/chartConfig';
import SCREEN from '@public/charts-config/screen';
import {BooleanButton, ArrayNumber, SliderNumber} from '@components/formWidgets'
import {storeContext} from "@store/store";
import {CHANGESCREEN, CHANGITEMBASE, CHANGECURRENTEDIT} from '@store/types'
import {mapping} from '@utils/form-render-mapping'
import dispatchResize from '@utils/dispath-resize'

const { TabPane } = Tabs;

function SiderRightBar() {
    const {state, dispatch} = useContext(storeContext);
    const onChange = formData => {
        if (state.activeIndex === -1) {
            dispatch({type: CHANGESCREEN, value: formData})
        }else {
            console.log(formData)
            dispatch({type: CHANGITEMBASE, value: formData})
            dispatchResize()
        }
    };

    const onValidate = valid => {

    };
    return useMemo(()=>{
        const {activeItem, screen} = state;
        return (
            <div className="nav-sider-right">
                {
                    !activeItem ?
                        <FormRender
                        propsSchema={SCREEN.propsSchema}
                        uiSchema={SCREEN.uiSchema}
                        formData={screen}
                        onChange={onChange}
                        onValidate={onValidate}
                        widgets={{ BooleanButton: BooleanButton}}
                        mapping={mapping}
                    />:
                        <Tabs activeKey={activeItem.currentEdit} type="card" onChange={(e)=>dispatch({type: CHANGECURRENTEDIT, value: e})}>
                            <TabPane tab="基本" key="baseConfig">
                                <FormRender
                                    propsSchema={DRAGITEMBASE.propsSchema}
                                    uiSchema={DRAGITEMBASE.uiSchema}
                                    formData={activeItem.baseConfig}
                                    onChange={onChange}
                                    onValidate={onValidate}
                                    widgets={{ BooleanButton: BooleanButton}}
                                    mapping={mapping}
                                />
                            </TabPane>
                            <TabPane tab="图表" key="chartConfig">
                                <FormRender
                                    showDescIcon
                                    {...CHARTCONFIG}
                                    formData={activeItem.chartConfig}
                                    onChange={onChange}
                                    onValidate={onValidate}
                                    widgets={{ BooleanButton, ArrayNumber, SliderNumber}}
                                />
                            </TabPane>
                            <TabPane tab="数据" key="data">
                                Content of card tab 3
                            </TabPane>
                            <TabPane tab="交互" key="interactive">
                                Content of card tab 3
                            </TabPane>
                        </Tabs>
                }

            </div>
        )
    },[state.screen, {...state.activeItem}]);
}

export default SiderRightBar;
