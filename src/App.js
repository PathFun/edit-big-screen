import React from 'react';
import {Chart, Interval} from 'bizcharts';
import {TopBar, SiderLeftBar, SiderRightBar, MainContent, BottomBar} from './views/nav'

function App() {
// 数据源
    const data = [
        {genre: 'Sports', sold: 275},
        {genre: 'Strategy', sold: 115},
        {genre: 'Action', sold: 120},
        {genre: 'Shooter', sold: 350},
        {genre: 'Other', sold: 150}
    ];

    return (
        <div className="App">
            <TopBar>
                TopBar
            </TopBar>
            <SiderLeftBar>
                SiderLeftBar
            </SiderLeftBar>
            <SiderRightBar>
                SiderRightBar
            </SiderRightBar>
            <MainContent>
                <Chart height={320} autoFit data={data}>
                    <Interval position="genre*sold"/>
                </Chart>
            </MainContent>
            <BottomBar>
                BottomBar
            </BottomBar>
        </div>
    );
}

export default App;
