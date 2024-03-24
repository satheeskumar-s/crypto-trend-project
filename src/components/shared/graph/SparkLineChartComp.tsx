import React from 'react';
import { SparkLineChart } from '@mui/x-charts';

const SparkLineChartComp = ({ data, width, height, plotType, border }: any) => {
  return (
    <SparkLineChart
      data={data}
      width={width}
      height={height}
      plotType={plotType}
      sx={{
        border,
      }}
    />
  );
};

export default SparkLineChartComp;
