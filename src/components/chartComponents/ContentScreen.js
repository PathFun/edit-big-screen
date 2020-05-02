import React, {useContext, useMemo} from 'react';
import {storeContext} from '../../store/store';
import {RisizeAndDrag} from '../../components'
import _ from 'lodash';
import SingleChart from './SingleChart'
import * as types from '../../store/types'
import gwm from 'gwm'

function ContentScreen() {
    const {state, dispatch} = useContext(storeContext);
    const dispathResize = () => {
        const envn = new Event('resize');
        window.dispatchEvent(envn);
    }
    gwm.creation({
        mode: 'svg',
        watch: false,
        fontSize: 12,
        color: '#8a2be2',
        font: 'sans-serif',
        alpha: 0.2,
        angle: -15,
        css: {
            'pointer-events': 'none',
            'z-index': 999
        }
    })
    return useMemo(() => {
        const {items, contentSizeStyle, scale, activeIndex, dragingOrrResizeing} = state;
        const size = 100 / scale, gird = parseInt(20 / (scale / 20)) * 5
        const moveIngridStyle = dragingOrrResizeing ?
            {background: `linear-gradient(-90deg, rgba(123, 123, 123, 0.2) ${size}px, transparent 1px) 0% 0% / ${gird}px ${gird}px, linear-gradient( rgba(123, 123, 123,0.2) ${size}px, transparent 1px) 0% 0% / ${gird}px ${gird}px`}
            : {},
            scaleStyle = {transform: `scale(${scale / 100},${scale / 100})`},
            lineTop = {borderLeft: `${1.5 / scale * 100}px dashed rgba(00,153,255,.2)`},
            lineLeft = {borderTop: `${1.5 / scale * 100}px dashed rgba(00,153,255,.2)`},
            lineLabel = {fontSize: `${14 / scale * 100}px`}
        return (<div className="content-style"
                     style={{...contentSizeStyle, ...scaleStyle}}>
            <div className="content-move" style={moveIngridStyle}>
                <div className="content-background-style" style={{background: '#c6cad1'}}></div>
                {_.map(items, (item, index) => (
                    <RisizeAndDrag
                        position={item.baseConfg.position}
                        size={item.baseConfg.size}
                        style={{zIndex: item.baseConfg.zIndex}}
                        resizeHandleClasses={{
                            bottom: 'handle-b',
                            bottomLeft: 'handle-bl',
                            bottomRight: 'handle-br',
                            left: 'handle-l',
                            right: 'handle-r',
                            top: 'handle-t',
                            topLeft: 'handle-tl',
                            topRight: 'handle-tr'
                        }}
                        dragHandleClassName="drag-box"
                        onResizeStart={() => dispatch({type: types.ONDRAGORRRESIZE})}
                        onDragStart={() => {dispatch({type: types.CHANRGEACTIVE, value: index});dispatch({type: types.ONDRAGORRRESIZE})}}
                        onDragStop={(e, d) => {
                            const {x,y} = item.baseConfg.position;
                            if (d && (x !== d.x || y !== d.y)) {
                                dispatch({type: types.CHANGEPOSITION, index: index, value: {x: d.x, y: d.y}})
                            }
                            dispatch({type: types.DRAPEDGEDETECTION})
                        }}
                        onResizeStop={(e, direction, ref, delta, position) => {
                            dispatch({
                                type: types.CHANGEPOSITIONWIDTHSIEZ,
                                index,
                                value: {position, size: {width: ref.style.width, height: ref.style.height}}
                            })
                            dispathResize()
                        }}
                        onDrag={(e,d)=> dispatch({type: types.EDGEDETECTION,value: {index,d}})}
                        key={index}
                        scale={scale / 100}
                        resizeGrid={[5, 5]}
                        dragGrid={[5, 5]}
                        className={activeIndex === index || item.baseConfg.sameSrceen ? `dra_res active-rnd` : `dra_res`}
                    >
                        <span title="删除" className="chart-item-button"
                              onClick={() => {
                                  dispatch({type: types.DELETEITEMS, value: item})
                                  if (index = activeIndex) {
                                      dispatch({type: types.CHANRGEACTIVE, value: -1})
                                  } else if (index < activeIndex) {
                                      dispatch({type: types.CHANRGEACTIVE, value: activeIndex - 1})
                                  }
                              }}>
                            <div></div>
                        </span>
                        <span title="复制" className="chart-item-button copy"
                              onClick={() => dispatch({type: types.COPYITEMS, value: item})}>
                            <div></div>
                        </span>
                        <div
                            className={activeIndex === index && dragingOrrResizeing ? 'active-chart' : 'hide-chart'}>
                            <div className="grid-line-hide grid-line-top" style={lineTop}></div>
                            <div className="grid-line-hide grid-line-left" style={lineLeft}></div>
                            <div className="grid-line-hide grid-line-label"
                                 style={lineLabel}>{parseInt(item.baseConfg.position.x)},{parseInt(item.baseConfg.position.y)}</div>
                        </div>
                        <div className="drag-box">
                            <SingleChart/>
                        </div>
                    </RisizeAndDrag>
                ))}
            </div>
        </div>)
    }, [state.scale, state.activeIndex, state.contentSizeStyle, state.dragingOrrResizeing, [...state.items], dispatch]);
}

export default ContentScreen;
