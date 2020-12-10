import React, {useContext, useMemo, useState} from 'react';
import {storeContext} from '@store/store';
import {RisizeAndDrag} from '@components'
import _ from 'lodash';
import dispathResize from '@utils/dispath-resize'
import SingleChart from './SingleChart'
import * as types from '@store/types'
import gwm from 'gwm'

function ContentScreen() {
    const {state, dispatch} = useContext(storeContext);
    const [workerMark, setWorkerMark] = useState({});
    useMemo(() => {
        if (state.screen.workerMark !== workerMark) {
            setWorkerMark(state.screen.workerMark)
            if (state.screen.workerMark.creation) {
                gwm.creation({
                    ...state.screen.workerMark,
                    container: '#content-style', css: {
                        'pointer-events': 'none',
                        'z-index': 999
                    }
                })
            } else {
                gwm.creation({
                    css: {
                        'display': 'none'
                    }
                })
            }
        }
    }, [state.screen])
    const scaleChange = useMemo(() => {
        const {scale} = state
        return {
            scaleStyle: {transform: `scale(${scale / 100},${scale / 100})`},
            lineTop: {borderLeft: `${1.5 / scale * 100}px dashed rgba(00,153,255,.2)`},
            lineLeft: {borderTop: `${1.5 / scale * 100}px dashed rgba(00,153,255,.2)`},
            lineLabel: {fontSize: `${14 / scale * 100}px`},
            scale: scale / 100
        }
    }, [state.scale]);

    const moveIngridStyle = useMemo(() => {
        const {scale, dragingOrrResizeing} = state, size = 100 / scale, gird = parseInt(20 / (scale / 20)) * 5
        return dragingOrrResizeing ?
            {background: `linear-gradient(-90deg, rgba(123, 123, 123, 0.2) ${size}px, transparent 1px) 0% 0% / ${gird}px ${gird}px, linear-gradient( rgba(123, 123, 123,0.2) ${size}px, transparent 1px) 0% 0% / ${gird}px ${gird}px`}
            : null
    }, [state.scale, state.dragingOrrResizeing]);

    return useMemo(() => {
        const {items, screen, activeIndex} = state;
        return (<div id="content-style"
                     style={{
                         ...scaleChange.scaleStyle,
                         width: `${screen.baseStyle.width}px`,
                         height: `${screen.baseStyle.height}px`
                     }}>
            <div className="content-move" style={moveIngridStyle}>
                <div className="content-background-style"
                     style={{
                         ...screen.bgStyle,
                         background: screen.bgStyle.isColor ? screen.bgStyle.backgroundColor : screen.bgStyle.backgroundImg
                     }}></div>
                {_.map(items, (item, index) => (
                    <RisizeAndDrag
                        position={item.baseConfig.position}
                        size={item.baseConfig.size}
                        style={{zIndex: item.zIndex}}
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
                        onDragStart={() => {
                            dispatch({type: types.CHANRGEACTIVE, value: index});
                            dispatch({type: types.ONDRAGORRRESIZE})
                        }}
                        onDragStop={() => {
                            dispatch({type: types.DRAPEDGEDETECTION})
                        }}
                        onResizeStop={(e, direction, ref, delta, position) => {
                            dispatch({
                                type: types.CHANGEPOSITIONWIDTHSIEZ,
                                index,
                                value: {position, size: {width: parseInt(ref.style.width), height: parseInt(ref.style.height)}}
                            })
                            dispathResize()
                        }}
                        onDrag={(e, d) => {
                            const {x, y} = item.baseConfig.position;
                            if (d && (x !== d.x || y !== d.y)) {
                                dispatch({type: types.CHANGEPOSITION, index: index, value: {x: Math.round(d.x), y: Math.round(d.y)}})
                            }
                            ;
                            dispatch({type: types.EDGEDETECTION, value: {index, d}})
                        }}
                        key={index}
                        scale={scaleChange.scale}
                        resizeGrid={[5, 5]}
                        dragGrid={[5, 5]}
                        className={activeIndex === index || item.sameSrceen ? `dra_res active-rnd` : `dra_res`}
                    >
                        <span title="删除" className="chart-item-button"
                              onClick={() => {
                                  dispatch({type: types.DELETEITEMS, value: item})
                                  if (index === activeIndex) {
                                      dispatch({type: types.CHANRGEACTIVE, value: -1})
                                  } else if (index < activeIndex) {
                                      dispatch({type: types.CHANRGEACTIVE, value: activeIndex - 1})
                                  }
                              }}>
                            <div></div>
                        </span>
                        <span title="复制" className="chart-item-button copy"
                              onClick={() => dispatch({type: types.COPYITEMS, value: {...item,baseConfig: {...item.baseConfig,position: {x: 0, y: 0}}}})}>
                            <div></div>
                        </span>
                        <div
                            className={activeIndex === index && moveIngridStyle ? 'active-chart' : 'hide-chart'}>
                            <div className="grid-line-hide grid-line-top" style={scaleChange.lineTop}></div>
                            <div className="grid-line-hide grid-line-left" style={scaleChange.lineLeft}></div>
                            <div className="grid-line-hide grid-line-label"
                                 style={scaleChange.lineLabel}>{Math.round(item.baseConfig.position.x)},{Math.round(item.baseConfig.position.y)}</div>
                        </div>
                        <div className="drag-box" style={{padding: `${item.baseConfig.padding.top}px ${item.baseConfig.padding.left}px`}}>
                            <SingleChart/>
                        </div>
                    </RisizeAndDrag>
                ))}
            </div>
        </div>)
    }, [scaleChange, moveIngridStyle, state.activeIndex, state.screen, [...state.items]]);
}

export default ContentScreen;
