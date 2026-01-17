
import React from 'react';

interface RadarChartProps {
  data: {
    axis: string;
    value: number;
  }[];
}

const RadarChart: React.FC<RadarChartProps> = ({ data }) => {
  const size = 320;
  const numLevels = 4;
  const maxValue = 100;
  const radius = size / 2;
  const angleSlice = (Math.PI * 2) / data.length;

  const getCoordinatesForValue = (value: number, angle: number) => {
    const r = (value / maxValue) * radius;
    return {
      x: r * Math.cos(angle - Math.PI / 2),
      y: r * Math.sin(angle - Math.PI / 2),
    };
  };

  // Grid levels
  const gridLevels = Array.from({ length: numLevels }).map((_, i) => {
    const levelFactor = radius * ((i + 1) / numLevels);
    const points = data
      .map((_, j) => {
        const angle = j * angleSlice;
        const x = levelFactor * Math.cos(angle - Math.PI / 2);
        const y = levelFactor * Math.sin(angle - Math.PI / 2);
        return `${x},${y}`;
      })
      .join(' ');
    return <polygon key={i} points={points} className="stroke-slate-300 dark:stroke-slate-600 fill-none" />;
  });

  // Axes
  const axes = data.map((item, i) => {
    const angle = i * angleSlice;
    const endPoint = getCoordinatesForValue(maxValue, angle);
    return <line key={i} x1={0} y1={0} x2={endPoint.x} y2={endPoint.y} className="stroke-slate-300 dark:stroke-slate-600" />;
  });

  // Labels
  const labels = data.map((item, i) => {
    const angle = i * angleSlice;
    const { x, y } = getCoordinatesForValue(maxValue + 20, angle); // Position labels outside the chart
    
    // FIX: Explicitly type `textAnchor` to satisfy the SVGTextElement's `textAnchor` property type.
    let textAnchor: "middle" | "end" | "start" = "middle";
    if (x < -5) textAnchor = "end";
    if (x > 5) textAnchor = "start";

    return (
      <text
        key={i}
        x={x}
        y={y}
        dy="0.35em"
        textAnchor={textAnchor}
        className="text-[10px] sm:text-xs font-semibold fill-slate-600 dark:fill-slate-400"
      >
        {item.axis}
      </text>
    );
  });

  // Data polygon
  const dataPoints = data
    .map((item, i) => {
      const angle = i * angleSlice;
      const { x, y } = getCoordinatesForValue(item.value, angle);
      return `${x},${y}`;
    })
    .join(' ');

  return (
    <div className="flex justify-center items-center">
      <svg width="100%" height="100%" viewBox={`-${size / 2} -${size / 2} ${size} ${size}`} style={{ maxWidth: `${size + 100}px` }}>
        <g transform={`translate(0, 0)`}>
          {gridLevels}
          {axes}
          {labels}
          <polygon
            points={dataPoints}
            className="stroke-teal-500 fill-teal-500/30"
            strokeWidth={2}
          />
           {data.map((item, i) => {
              const angle = i * angleSlice;
              const { x, y } = getCoordinatesForValue(item.value, angle);
              return <circle key={i} cx={x} cy={y} r={3} className="fill-teal-500" />;
           })}
        </g>
      </svg>
    </div>
  );
};

export default RadarChart;
