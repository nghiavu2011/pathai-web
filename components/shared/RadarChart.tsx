
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

  // Animation State
  const [animatedValues, setAnimatedValues] = React.useState(data.map(() => 0));

  React.useEffect(() => {
    // Simple "grow" animation
    const timeout = setTimeout(() => {
      setAnimatedValues(data.map(d => d.value));
    }, 100);
    return () => clearTimeout(timeout);
  }, [data]);

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
    // Alternate grid fill for better look
    return (
      <React.Fragment key={i}>
        <polygon points={points} className={`stroke-slate-200 dark:stroke-slate-700 fill-none ${i === numLevels - 1 ? '' : ''}`} strokeWidth="1" />
        {/* Dashed lines for clarity */}
      </React.Fragment>
    );
  });

  // Balanced Reference Polygon (Average ~60%)
  const referenceDataPoints = data.map((_, i) => {
    const angle = i * angleSlice;
    const { x, y } = getCoordinatesForValue(60, angle);
    return `${x},${y}`;
  }).join(' ');

  // Axes
  const axes = data.map((item, i) => {
    const angle = i * angleSlice;
    const endPoint = getCoordinatesForValue(maxValue, angle);
    return <line key={i} x1={0} y1={0} x2={endPoint.x} y2={endPoint.y} className="stroke-slate-200 dark:stroke-slate-700" strokeDasharray="4 4" />;
  });

  // Labels
  const labels = data.map((item, i) => {
    const angle = i * angleSlice;
    const { x, y } = getCoordinatesForValue(maxValue + 30, angle); // Position labels outside the chart

    let textAnchor: "middle" | "end" | "start" = "middle";
    if (x < -5) textAnchor = "end";
    if (x > 5) textAnchor = "start";

    return (
      <React.Fragment key={i}>
        <text
          x={x}
          y={y}
          dy="0.35em"
          textAnchor={textAnchor}
          className="text-[11px] sm:text-xs font-bold fill-slate-700 dark:fill-slate-300 tracking-wide uppercase"
        >
          {item.axis}
        </text>
        {/* Value Label */}
        <text
          x={x}
          y={y + 14}
          textAnchor={textAnchor}
          className={`text-[10px] font-mono ${color === 'teal' ? 'fill-teal-600' : 'fill-blue-600'}`}
        >
          {Math.round(item.value)}/100
        </text>
      </React.Fragment>
    );
  });

  // Data polygon (Animated)
  const dataPoints = animatedValues
    .map((val, i) => {
      const angle = i * angleSlice;
      const { x, y } = getCoordinatesForValue(val, angle);
      return `${x},${y}`;
    })
    .join(' ');

  let strokeColorClass = 'stroke-teal-500';
  let fillColorClass = 'fill-teal-500/40';
  let dotColorClass = 'fill-teal-500';

  if (color === 'rose') {
    strokeColorClass = 'stroke-rose-500';
    fillColorClass = 'fill-rose-500/40';
    dotColorClass = 'fill-rose-500';
  } else if (color === 'blue') {
    strokeColorClass = 'stroke-blue-500';
    fillColorClass = 'fill-blue-500/40';
    dotColorClass = 'fill-blue-500';
  } else if (color === 'violet') {
    strokeColorClass = 'stroke-violet-500';
    fillColorClass = 'fill-violet-500/40';
    dotColorClass = 'fill-violet-500';
  }

  // Custom styles for transition
  const polygonStyle = {
    transition: 'all 1s ease-out',
  };

  return (
    <div className="flex flex-col items-center">
      <div className="relative flex justify-center items-center p-4">
        {/* Background Glow */}
        <div className={`absolute inset-0 bg-${color}-500/5 blur-3xl rounded-full`}></div>

        <svg width="100%" height="100%" viewBox={`-${size / 2} -${size / 2} ${size} ${size}`} style={{ maxWidth: `${size + 120}px`, minWidth: '300px', overflow: 'visible' }}>
          <g transform={`translate(0, 0)`}>
            {/* Reference Polygon */}
            {/* <polygon points={referenceDataPoints} className="fill-slate-200/30 dark:fill-slate-700/30 stroke-slate-300 dark:stroke-slate-600 stroke-dasharray-2" /> */}

            {gridLevels}
            {axes}

            {/* Main Data Polygon */}
            <polygon
              points={dataPoints}
              className={`${strokeColorClass} ${fillColorClass}`}
              strokeWidth={3}
              style={polygonStyle}
            />

            {/* Data Points */}
            {animatedValues.map((val, i) => {
              const angle = i * angleSlice;
              const { x, y } = getCoordinatesForValue(val, angle);
              return (
                <circle
                  key={i}
                  cx={x} cy={y}
                  r={4}
                  className={`${dotColorClass} stroke-white dark:stroke-slate-900 stroke-2`}
                  style={{ transition: 'all 1s ease-out' }}
                />
              );
            })}

            {labels}
          </g>
        </svg>
      </div>
      <p className="text-xs text-slate-400 mt-2 italic">Biểu đồ thể hiện mức độ phát triển hiện tại của bạn so với thang điểm tối đa (100)</p>
    </div>
  );
};

export default RadarChart;