import React, {useReducer} from 'react';
import Provider from './store/Provider'
import {initialState as store, reducer} from './store/store';
import {TopBar, SiderLeftBar, SiderRightBar, MainContent, BottomBar} from './views/nav'

function App() {
    const [state, dispatch] = useReducer(reducer, store);
    return (
        <Provider store={{state, dispatch}}>
            <div className="App">
                <TopBar/>
                <SiderLeftBar>
                    11111111111111
                </SiderLeftBar>
                <SiderRightBar/>
                <BottomBar>
                    BottomBar
                </BottomBar>
                <MainContent/>
                    </div>
        </Provider>
    );
}

export default App;
