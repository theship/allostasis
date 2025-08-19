import siteCopy from "@/content/copy";

export default function DiagramLoop() {
  return (
    <div className="rounded-2xl border border-dark-700 bg-dark-900/50 backdrop-blur-sm p-12">
      <div className="text-sm font-bold text-winterberry mb-8 uppercase tracking-widest">
        {siteCopy.diagram.title}
      </div>
      <svg viewBox="0 0 600 120" className="w-full" aria-label="Data pipeline flow diagram">
        <rect 
          x="1" 
          y="1" 
          width="598" 
          height="118" 
          rx="12" 
          fill="none" 
          stroke="currentColor" 
          className="text-dark-600" 
          strokeWidth="1.5"
        />
        {siteCopy.diagram.steps.map((t, i) => (
          <g key={t} transform={`translate(${40 + i * 140}, 30)`}>
            <rect 
              width="120" 
              height="60" 
              rx="8" 
              className="fill-dark-800 stroke-dark-600 hover:stroke-winterberry hover:fill-dark-700 transition-all duration-300 cursor-pointer" 
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <text 
              x="60" 
              y="36" 
              textAnchor="middle" 
              className="fill-dark-100 text-sm font-medium pointer-events-none"
            >
              {t}
            </text>
          </g>
        ))}
        {[0, 1, 2].map((i) => (
          <line 
            key={i} 
            x1={160 + i * 140} 
            y1={60} 
            x2={180 + i * 140} 
            y2={60} 
            stroke="currentColor" 
            className="text-winterberry" 
            strokeWidth="2"
            markerEnd="url(#arrow)"
          />
        ))}
        <defs>
          <marker 
            id="arrow" 
            viewBox="0 0 10 10" 
            refX="8" 
            refY="5" 
            markerWidth="5" 
            markerHeight="5" 
            orient="auto"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" className="fill-winterberry" />
          </marker>
        </defs>
      </svg>
    </div>
  );
}