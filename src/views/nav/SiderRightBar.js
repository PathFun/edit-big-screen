import React, { useMemo, useContext} from 'react';
import {Tabs} from 'antd'
import FormRender from 'form-render/lib/antd';
import DRAGITEMBASE from '@public/charts-config/drag-item-base';
import SCREEN from '@public/charts-config/screen';
import {BooleanButton} from '@components'
import {storeContext} from "@store/store";
import {CHANGESCREEN, CHANGITEMBASE, CHANGECURRENTEDIT} from '@store/types'
import {mapping} from '@utils/form-render-mapping'
import dispathResize from '@utils/dispath-resize'

const { TabPane } = Tabs;

function SiderRightBar() {
    const {state, dispatch} = useContext(storeContext);
    const onChange = formData => {
        if (state.activeIndex === -1) {
            dispatch({type:CHANGESCREEN, value:formData})
        }else {
            dispatch({type:CHANGITEMBASE, value:formData})
            dispathResize()
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
                        widgets={{ booleanButton: BooleanButton}}
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
                                    widgets={{ booleanButton: BooleanButton}}
                                    mapping={mapping}
                                />
                            </TabPane>
                            <TabPane tab="图表" key="chart">
                                Content of card tab 2
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
