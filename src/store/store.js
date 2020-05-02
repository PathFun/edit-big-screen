import React from 'react';
import _ from 'lodash';
import * as types from './types'

export const storeContext = React.createContext(null);
export const initialState = {
    toggleSider: true,
    siderFlexd: true,
    items: [],
    contentSizeStyle: {width: '1920px', height: '1080px'},
    scale: 70,
    activeIndex: -1,
    dragingOrrResizeing: false,
    maxZIndex:1
}
export const reducer = (state, action) => {
    const {type, value, index} = action;
    const {items, maxZIndex, scale} = state;
    switch (type) {
        case types.TOGGLESIDER:
            return Object.assign({}, state, {toggleSider: !state.toggleSider});
            break
        case types.TOGGLEFLEXD:
            return Object.assign({}, state, {siderFlexd: !state.siderFlexd});
            break
        case types.PUSHITEMS:
            return Object.assign({}, state, { items: items.concat({
                        baseConfg: {
                            position: {
                                x: 0,
                                y: 0,
                            },
                            size: {
                                width: 400,
                                height: 260
                            },
                            sameSrceen: false,
                            zIndex: maxZIndex,
                            name: '图表',
                            remarks: '图表备注'
                        }
                    }),maxZIndex: maxZIndex + 1,activeIndex: items.length});
            break
        case types.DELETEITEMS:
            return Object.assign({}, state, { items:_.pull(items,value)});
            break
        case types.CHANGEPOSITION:
            const item = {... items[index],baseConfg:{...items[index].baseConfg,position:value}};
            items[index] =item;
            return Object.assign({}, state, { items,dragingOrrResizeing: false});
            break
        case types.CHANGEPOSITIONWIDTHSIEZ:
            items[index] ={... items[index],baseConfg:{...items[index].baseConfg,...value}};
            return Object.assign({}, state, { items,dragingOrrResizeing: false});
            break
        case types.ONDRAGORRRESIZE:
            return Object.assign({},state, {dragingOrrResizeing: true})
            break
        case types.CHANRGEACTIVE:
            return Object.assign({}, state, {activeIndex: value});
            break
        case types.CHANGESCALE:
            return Object.assign({}, state, {scale: value})
            break
        case types.CHANGESCALEDELET:
            const scale1 = state.scale - 1 > 10 ? state.scale - 1 : 10;
            return Object.assign({}, state, {scale1})
            break
        case types.CHANGESCALEADD:
            const newScale = state.scale + 1 < 180 ? state.scale + 1 : 180;
            return Object.assign({}, state, {scale: newScale})
            break
        case types.EDGEDETECTION:
            items.forEach((item,index)=>{
                if (parseInt(item.baseConfg.position.x*scale/100) === parseInt(value.d.x*scale/100) ||
                    parseInt(item.baseConfg.position.y*scale/100) === parseInt(value.d.y*scale/100) &&
                    index !== value.index) {
                    item.baseConfg.sameSrceen = true
                }else if (item.baseConfg.sameSrceen) {
                    item.baseConfg.sameSrceen = false
                }
            })
            return Object.assign({}, state, {items})
            break
        case types.DRAPEDGEDETECTION:
            items.forEach(item=>item.baseConfg.sameSrceen = item.baseConfg.sameSrceen?item.baseConfg.sameSrceen = false: item.baseConfg.sameSrceen);
            return Object.assign({}, state, {items})
            break
        default:
            return initialState;
            break
    }
}
