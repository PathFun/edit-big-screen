import React from 'react';
import _ from 'lodash';
import * as types from './types'
import {chartList} from '@utils/chart-config';

export const storeContext = React.createContext(null);
export const initialState = {
    toggleSider: true,
    siderFlexd: true,
    toggleMenu: false,
    activeMenuType: 'baseChart',
    currentMenu: chartList[0].children,
    items: [],
    screen: {
        baseStyle: {
            name: '大屏名称',
            remarks: '大屏描述',
            width: '1920',
            height: '1080'
        },
        bgStyle: {
            isColor: true,
            backgroundImg: '',
            backgroundColor: '#ecfff4',
            opacity: 0.8
        },
        workerMark: {
            creation: false,
            width: 160,
            height: 100,
            x: 10,
            y: 40,
            txt: 'Fun',
            mode: 'svg',
            fontSize: 12,
            alpha: 0.4,
            color: '#8a2be2',
            angle: -15
        }
    },
    scale: 70,
    activeIndex: -1,
    activeItem: null,
    dragingOrrResizeing: false,
    maxZIndex: 1
}
export const reducer = (state, action) => {
    const {type, value, index} = action;
    const {items, maxZIndex, scale, activeIndex} = state;
    switch (type) {
        // sider
        case types.TOGGLESIDER:
            return Object.assign({}, state, {toggleSider: !state.toggleSider});
        // flexd
        case types.TOGGLEFLEXD:
            return Object.assign({}, state, {siderFlexd: !state.siderFlexd});
        // menu
        case types.TOGGLEMENU:
            return  Object.assign({}, state, {toggleMenu: !state.toggleMenu})
        case types.SETCURRENTATMENU:
            return Object.assign({}, state, {currentMenu: value.list,toggleMenu: true, activeMenuType: value.activeType})
        // 新增组件
        case types.PUSHITEMS:
            const t = {
                baseConfig: {
                    name: '图表',
                    remarks: '图表备注',
                    position: {
                        x: 0,
                        y: 0,
                    },
                    size: {
                        width: 400,
                        height: 260
                    }
                },
                sameSrceen: false,
                zIndex: maxZIndex,
                currentEdit: 'baseConfig'
            };
            return Object.assign({}, state, {
                items: items.concat(t), maxZIndex: maxZIndex + 1, activeIndex: items.length, activeItem: t});
        // 删除组件
        case types.DELETEITEMS:
            return Object.assign({}, state, {items: _.pull(items, value)});
        // 复制组件
        case types.COPYITEMS:
            console.log(value)
            return Object.assign({}, state, {
            items: items.concat(value), maxZIndex: maxZIndex + 1, activeIndex: items.length, activeItem: value});
        // 修改位置
        case types.CHANGEPOSITION:
            const item = {...items[index], baseConfig: {...items[index].baseConfig, position: value}};
            items[index] = item;
            return Object.assign({}, state, {items, activeItem: items[index]});
        // 修改位置和大小
        case types.CHANGEPOSITIONWIDTHSIEZ:
            items[index] = {...items[index], baseConfig: {...items[index].baseConfig, ...value}};
            return Object.assign({}, state, {items, dragingOrrResizeing: false, activeItem: items[index]});
        // 开始移动或者改变大小
        case types.ONDRAGORRRESIZE:
            return Object.assign({}, state, {dragingOrrResizeing: true})
        // 修改当前active组件
        case types.CHANRGEACTIVE:
            return Object.assign({}, state, {activeIndex: value, activeItem: value !== -1?items[value]: null});
        // 修改放大倍数
        case types.CHANGESCALE:
            return Object.assign({}, state, {scale: value})
        // 放大倍数PRE
        case types.CHANGESCALEDELET:
            const scale1 = state.scale - 1 > 10 ? state.scale - 1 : 10;
            return Object.assign({}, state, {scale1})
        // 放大倍数ADD
        case types.CHANGESCALEADD:
            const newScale = state.scale + 1 < 180 ? state.scale + 1 : 180;
            return Object.assign({}, state, {scale: newScale})
        // 边缘检测
        case types.EDGEDETECTION:
            items.forEach((item, index) => {
                if (parseInt(item.baseConfig.position.x * scale / 100) === parseInt(value.d.x * scale / 100) ||
                    parseInt(item.baseConfig.position.y * scale / 100) === parseInt(value.d.y * scale / 100) &&
                    index !== value.index) {
                    item.sameSrceen = true
                } else if (item.sameSrceen) {
                    item.sameSrceen = false
                }
            })
            return Object.assign({}, state, {items})
            break
        // 取消检测
        case types.DRAPEDGEDETECTION:
            items.forEach(item => item.sameSrceen = item.sameSrceen ? item.sameSrceen = false : item.sameSrceen);
            return Object.assign({}, state, {items, dragingOrrResizeing: false})
        // 改变屏幕配置
        case types.CHANGESCREEN:
            return Object.assign({}, state, {screen: value})
        // 修改当前item配置项的tab
        case types.CHANGECURRENTEDIT:
            items[activeIndex].currentEdit = value;
            return Object.assign({}, state, {items})
        // 修改当前item的tab配置项
        case types.CHANGITEMBASE:
            let cr = items[activeIndex]
            cr[cr.currentEdit] = value;
            items[activeIndex] = cr;
            return Object.assign({}, state, {items: items,activeItem: cr})
        default:
            return state;
    }
}
