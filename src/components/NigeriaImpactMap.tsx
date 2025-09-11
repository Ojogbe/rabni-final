import React from 'react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';

interface NigeriaImpactMapProps {
  geoUrl: string | any; // local topojson/geojson path or object
  selectedState: string;
  onSelect: (stateName: string) => void;
}

export default function NigeriaImpactMap({ geoUrl, selectedState, onSelect }: NigeriaImpactMapProps) {
  return (
    <ComposableMap
      projection="geoMercator"
      projectionConfig={{ center: [8.6753, 9.082], scale: 7000 }}
      width={800}
      height={600}
      style={{ width: '100%', height: '100%' }}
    >
      {/* Background */}
      <rect x={0} y={0} width={800} height={600} fill="#ffffff" />
      <Geographies geography={geoUrl}>
        {({ geographies }) => {
          const useFallback = !geographies || geographies.length < 15;
          if (useFallback) {
            return (
              <g>
                <rect x={40} y={60} width={720} height={480} fill="#eef2f7" stroke="#cbd5e1" />
                {[
                  { name: 'FCT Abuja', x: 160, y: 140, w: 120, h: 60 },
                  { name: 'Kano', x: 340, y: 110, w: 140, h: 60 },
                  { name: 'Kaduna', x: 520, y: 140, w: 140, h: 60 },
                  { name: 'Borno', x: 560, y: 60, w: 140, h: 50 },
                  { name: 'Lagos', x: 140, y: 270, w: 120, h: 50 },
                  { name: 'Bayelsa', x: 300, y: 300, w: 140, h: 50 },
                  { name: 'Rivers', x: 480, y: 300, w: 140, h: 50 },
                ].map((s) => (
                  <g key={s.name} onClick={() => onSelect(s.name)}>
                    <rect
                      x={s.x}
                      y={s.y}
                      width={s.w}
                      height={s.h}
                      rx={10}
                      fill={selectedState === s.name ? '#7f1d1d' : '#e5e7eb'}
                      stroke="#4b5563"
                    />
                    <text x={s.x + s.w / 2} y={s.y + s.h / 2 + 4} textAnchor="middle" fill="#111827" fontSize={14}>
                      {s.name}
                    </text>
                  </g>
                ))}
                <text x={60} y={50} fill="#64748b" fontSize={12}>Fallback map active</text>
              </g>
            );
          }
          return (
            <g>
              {geographies.map((geo) => {
                const name = (geo.properties as any)?.NAME_1 || (geo.properties as any)?.state_name || (geo.properties as any)?.name || '';
                const isSelected = name === selectedState;
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    onClick={() => onSelect(name)}
                    style={{
                      default: {
                        fill: isSelected ? '#7f1d1d' : '#9ca3af',
                        outline: 'none',
                        stroke: '#4b5563',
                        strokeWidth: 0.8,
                      },
                      hover: {
                        fill: isSelected ? '#7f1d1d' : '#6b7280',
                        outline: 'none',
                      },
                      pressed: {
                        fill: '#7f1d1d',
                        outline: 'none',
                      },
                    }}
                  />
                );
              })}
            </g>
          );
        }}
      </Geographies>
    </ComposableMap>
  );
}


