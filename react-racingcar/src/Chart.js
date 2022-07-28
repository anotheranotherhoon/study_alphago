import React from "react";
import shortid from "shortid";

import ChartBar from "./ChartBar";
import "./Chart.css";

const Chart = ({newArr,winnerGrade}) => {
    return (
    <div className="chart">
        {newArr.map((dataPoint) => (
        <ChartBar
            key={shortid.generate()}
            value={dataPoint.data}
            maxValue={winnerGrade}
            label={dataPoint.label}
        />
        ))}
    </div>
    );
};

export default Chart;
