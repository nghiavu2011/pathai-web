
import React from 'react';

interface RadarChartProps {
  data: {
    axis: string;
    value: number;
  }[];
  color?: 'teal' | 'rose' | 'blue' | 'violet';
}

const RadarChart: React.FC<RadarChartProps> = ({ data, color = 'teal' }) => {
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
    const { x, y } = getCoordinatesForValue(maxValue + 25, angle); // Position labels outside the chart
    
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

  let strokeColorClass = 'stroke-teal-500';
  let fillColorClass = 'fill-teal-500/30';
  let dotColorClass = 'fill-teal-500';

  if (color === 'rose') {
    strokeColorClass = 'stroke-rose-500';
    fillColorClass = 'fill-rose-500/30';
    dotColorClass = 'fill-rose-500';
  } else if (color === 'blue') {
    strokeColorClass = 'stroke-blue-500';
    fillColorClass = 'fill-blue-500/30';
    dotColorClass = 'fill-blue-500';
  } else if (color === 'violet') {
    strokeColorClass = 'stroke-violet-500';
    fillColorClass = 'fill-violet-500/30';
    dotColorClass = 'fill-violet-500';
  }

  return (
    <div className="flex justify-center items-center">
      <svg width="100%" height="100%" viewBox={`-${size / 2} -${size / 2} ${size} ${size}`} style={{ maxWidth: `${size + 100}px` }}>
        <g transform={`translate(0, 0)`}>
          {gridLevels}
          {axes}
          {labels}
          <polygon
            points={dataPoints}
            className={`${strokeColorClass} ${fillColorClass}`}
            strokeWidth={2}
          />
           {data.map((item, i) => {
              const angle = i * angleSlice;
              const { x, y } = getCoordinatesForValue(item.value, angle);
              return <circle key={i} cx={x} cy={y} r={3} className={dotColorClass} />;
           })}
        </g>
      </svg>
    </div>
  );
};

export default RadarChart;