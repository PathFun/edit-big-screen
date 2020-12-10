import React, {useReducer,useMemo} from 'react';
import { Column } from '@ant-design/charts';
import {initialState as store, reducer} from "@store/store";
function SingleChart() {
    const [state] = useReducer(reducer, store);
    const data = [
        {
            year: "1991",
            value: 3
        },
        {
            year: "1992",
            value: 4
        },
        {
            year: "1993",
            value: 3.5
        },
        {
            year: "1994",
            value: 5
        },
        {
            year: "1995",
            value: 4.9
        },
        {
            year: "1996",
            value: 6
        },
        {
            year: "1997",
            value: 7
        },
        {
            year: "1998",
            value: 9
        },
        {
            year: "1999",
            value: 13
        }
    ];
    const config = {
        supportCSSTransform: true,
        data,
        xField: 'year',
        yField: 'value',
    }

    return useMemo(()=>{
        return <Column {...config} />;
    },[state.items]);
}

export default SingleChart;
