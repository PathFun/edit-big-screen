import React, {useContext, useMemo, useState} from 'react';
import {storeContext} from '@store/store';
import { CaretLeftOutlined,CaretRightOutlined } from '@ant-design/icons';
function TopBar(props) {
    const {state,dispatch}= useContext(storeContext);
    const [visible,setVisible] = useState(false);
    const handleVisibleChange = visible => {
        setVisible(visible)
    };
    return useMemo(()=>
            <div className="nav-top">
                <div className="toggle-sider-bar">
                    <span onClick={()=>dispatch({ type: 'TOGGLESIDER' })}>{state.toggleSider?<CaretLeftOutlined />: <CaretRightOutlined />}</span>
                </div>
                <div onClick={()=>dispatch({type: 'PUSHITEMS'})}>点击添加</div>
                {props.children}
            </div>
        ,[state.toggleSider, visible]);
}

export default TopBar;
