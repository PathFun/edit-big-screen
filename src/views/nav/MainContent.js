import React, {useContext, useMemo} from 'react';
import {storeContext} from '../../store/store';
import {ContentScreen} from '../../components'

function MainContent() {
    const {state, dispatch} = useContext(storeContext);
    return useMemo(() => {
            const {toggleSider, siderFlexd} = state;
            return (<div className={`nav-main-content ${toggleSider && siderFlexd ? 'show' : 'hide'}`}>
                <ContentScreen/>
            </div>)
        }, [state.toggleSider, state.siderFlexd, dispatch]
    )
        ;
}

export default MainContent;
