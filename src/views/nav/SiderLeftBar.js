import React, {useContext, useMemo} from 'react';
import {storeContext} from '@store/store';
import {TOGGLEFLEXD, TOGGLEMENU, SETCURRENTATMENU} from '@store/types';
import {chartList} from '@utils/chart-config';
import {Row, Col} from 'antd'
import {PushpinOutlined, ShrinkOutlined, ArrowsAltOutlined} from '@ant-design/icons';
import _ from 'lodash';

function SiderLeftBar() {
    const {state, dispatch} = useContext(storeContext);
    return useMemo(() =>
            <div className={`nav-sider-left ${state.toggleSider ? 'show' : 'hide'}`}>
                <div className="drag-list-box">
                    <div className="sider-left-title">
                        <div className="sider-left-title-text">图层列表</div>
                        <div className="sider-left-flexd" onClick={() => dispatch({type: TOGGLEFLEXD})}>
                            <PushpinOutlined className={`${state.siderFlexd ? 'isFlexd' : 'onFlexd'}`}/></div>
                    </div>
                </div>
                <div
                    className={`chart-list ${state.toggleSider ? 'show' : 'hide'} ${state.toggleMenu ? 'show-menu' : 'hide-menu'}`}>
                    <div className="chart-types-box">
                        <div onClick={() => dispatch({type: TOGGLEMENU})} className="toggle-icon">
                            {state.toggleMenu ? <ShrinkOutlined/> : <ArrowsAltOutlined/>}
                        </div>
                        {_.map(chartList, d =>
                            <div className={`chart-icon ${d.type === state.activeMenuType && 'active'}`}
                                 key={d.type}
                                 onClick={() => dispatch({
                                     type: SETCURRENTATMENU,
                                     value: {list: d.children, activeType: d.type}
                                 })}>
                                <img src="https://fakeimg.pl/20x20/" alt=""/>
                            </div>
                        )}
                    </div>
                    {state.toggleMenu && state.currentMenu.length > 0 && <div className="chart-item-list">
                        <Row gutter={16}>
                            {_.map(state.currentMenu, c =>
                                <Col key={c.type} className="gutter-row" span={12}>
                                    <img src="https://fakeimg.pl/50x50/" alt=""/>
                                    <div>{c.label}</div>
                                </Col>
                            )}
                        </Row>
                    </div>}
                </div>
            </div>
        , [state.toggleSider, state.siderFlexd, state.toggleMenu, state.activeMenuType, state.currentMenu]);
}

export default SiderLeftBar;
