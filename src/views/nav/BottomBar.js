import React, {useContext, useMemo} from 'react';
import {storeContext} from '../../store/store';
import {Slider} from 'antd';
import {MinusSquareOutlined, PlusSquareOutlined} from '@ant-design/icons';

function BottomBar() {
    const {state, dispatch} = useContext(storeContext);
    return useMemo(() => {
        const {scale} = state;
            const max = 180,min = 10;
            const mid = ((max - min) / 2).toFixed(5);
            const preColorCls = scale >= mid ? '' : 'icon-wrapper-active';
            const nextColorCls = scale >= mid ? 'icon-wrapper-active' : '';
            return (<div className="nav-bottom-bar">
                <div className="icon-wrapper">
                    <MinusSquareOutlined className={preColorCls} onClick={()=>dispatch({type: 'CHANGESCALEDELET'})}/>
                    <Slider max={max} min={min} value={scale} tipFormatter={val => `${val}%`} onChange={(value)=>dispatch({type: 'CHANGESCALE',value: value})}/>
                    <PlusSquareOutlined className={nextColorCls} onClick={()=>dispatch({type: 'CHANGESCALEADD'})}/>
                </div>
            </div>)
        }
        , [state.scale, dispatch]);
}

export default BottomBar;
