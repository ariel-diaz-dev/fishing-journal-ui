import React, { useMemo } from 'react';
import ReactApexChart from 'react-apexcharts';
import moment from 'moment';

const TidesWidget = ({ tides: { first, second }, arrivalTime }) => {
  const chartData = useMemo(() => {
    const tidePoints = [
      { time: first.high.time, height: first.high.height, type: 'High' },
      { time: first.low.time, height: first.low.height, type: 'Low' },
      { time: second.high.time, height: second.high.height, type: 'High' },
      { time: second.low.time, height: second.low.height, type: 'Low' }
    ].filter(point => point.time && point.height !== undefined);

    const sortedTides = tidePoints
      .map(point => ({
        ...point,
        hour: moment(point.time, ['h:mm A', 'HH:mm']).hour() +
          moment(point.time, ['h:mm A', 'HH:mm']).minute() / 60
      }))
      .sort((a, b) => a.hour - b.hour);

    const lineData = [];
    const highTideMarkers = [];
    const lowTideMarkers = [];
    
    sortedTides.forEach(tide => {
      lineData.push([tide.hour, tide.height]);
      
      if (tide.type === 'High') {
        highTideMarkers.push([tide.hour, tide.height]);
      } else {
        lowTideMarkers.push([tide.hour, tide.height]);
      }
    });

    const arrivalHour = arrivalTime ? 
      moment(arrivalTime, ['HH:mm', 'hh:mm']).hour() + 
      moment(arrivalTime, ['HH:mm', 'hh:mm']).minute() / 60 : null;

    const series = [
      {
        name: 'Tide Height',
        type: 'line',
        data: lineData
      },
      {
        name: 'High Tides',
        type: 'scatter',
        data: highTideMarkers
      },
      {
        name: 'Low Tides',
        type: 'scatter',
        data: lowTideMarkers
      }
    ];

    return { series, tidePoints: sortedTides, arrivalHour };
  }, [first, second, arrivalTime]);

  const options = {
    chart: {
      height: 300,
      type: 'line',
      toolbar: {
        show: false
      },
      zoom: {
        enabled: false
      }
    },
    annotations: chartData.arrivalHour ? {
      xaxis: [{
        x: chartData.arrivalHour,
        strokeDashArray: 5,
        borderColor: '#FF6B35',
        borderWidth: 2,
        label: {
          text: 'Arrival',
          style: {
            color: '#FF6B35',
            background: '#fff',
            fontSize: '15px',
            fontWeight: 'bold'
          },
          position: 'top'
        }
      }]
    } : {},
    title: {
      text: 'Tides',
      align: 'center',
      style: {
        fontSize: '18px',
        fontWeight: 'bold',
        color: '#34495e'
      }
    },
    stroke: {
      curve: 'smooth',
      width: [4, 0, 0]
    },
    colors: ['#1e40af', '#ef4444', '#22c55e'],
    fill: {
      type: ['gradient', 'solid', 'solid'],
      gradient: {
        shade: 'light',
        type: 'vertical',
        shadeIntensity: 0.5,
        gradientToColors: ['#3b82f680'],
        inverseColors: false,
        opacityFrom: 0.3,
        opacityTo: 0.1
      }
    },
    markers: {
      size: [0, 8, 8],
      colors: ['#3b82f6', '#ef4444', '#22c55e'],
      strokeColors: '#fff',
      strokeWidth: 2,
      hover: {
        size: 10
      }
    },
    xaxis: {
      type: 'numeric',
      min: 0,
      max: 23,
      tickAmount: 6,
      labels: {
        formatter: function(val) {
          return `${Math.floor(val)}:00`;
        }
      },
      title: {
        text: 'Time (24-hour)'
      }
    },
    yaxis: {
      title: {
        text: 'Height (ft)'
      },
      min: -1,
      max: 4,
      labels: {
        formatter: function(val) {
          return val.toFixed(1);
        }
      }
    },
    legend: {
      show: false
    },
    tooltip: {
      shared: false,
      intersect: true,
      custom: function({ series, seriesIndex, dataPointIndex, w }) {
        const value = series[seriesIndex][dataPointIndex];
        const hour = w.globals.seriesX[seriesIndex][dataPointIndex];
        
        if (seriesIndex === 0) {
          return `<div class="apexcharts-tooltip-custom" style="padding: 10px;">
            <strong>Tide Height: ${value.toFixed(1)}ft</strong><br/>
            <span>Time: ${Math.floor(hour)}:00</span>
          </div>`;
        } else {
          const tideType = seriesIndex === 1 ? 'High' : 'Low';
          const tidePoint = chartData.tidePoints.find(point => 
            Math.abs(point.hour - hour) < 0.1 && point.type === tideType
          );
          return `<div class="apexcharts-tooltip-custom" style="padding: 10px;">
            <strong>${tideType} Tide: ${value.toFixed(1)}ft</strong><br/>
            <span>Time: ${tidePoint ? tidePoint.time : `${Math.floor(hour)}:00`}</span>
          </div>`;
        }
      }
    },
    grid: {
      borderColor: '#f1f5f9'
    }
  };

  return (
    <div style={{ height: '300px', width: '100%', marginTop: '0px' }}>
      <ReactApexChart 
        options={options} 
        series={chartData.series} 
        type="line" 
        height={300} 
      />
    </div>
  );
};

export default TidesWidget;