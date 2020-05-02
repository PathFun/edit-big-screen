import React, {useContext, useMemo} from 'react';
import {storeContext} from '../../store/store';
import {PushpinOutlined} from '@ant-design/icons'

function SiderLeftBar(props) {
    const {state, dispatch} = useContext(storeContext);
    return useMemo(() =>
            <div className={`nav-sider-left ${state.toggleSider ? 'show' : 'hide'}`}>
                <div className="sider-left-title">
                    <div className="sider-left-title-text">图层列表</div>
                    <div className="sider-left-flexd" onClick={() => dispatch({type: 'TOGGLEFLEXD'})}>
                        <PushpinOutlined className={`${state.siderFlexd ? 'isFlexd' : 'onFlexd'}`}/></div>
                </div>
                {props.children}
            </div>
        , [state.toggleSider, state.siderFlexd, dispatch]);
}

export default SiderLeftBar;
