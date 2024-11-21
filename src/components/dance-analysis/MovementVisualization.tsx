
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Activity } from 'lucide-react';

interface MovementVisualizationProps {
  selectedGenre: string;
  tempo: number;
  isPlaying: boolean;
  currentBeat: number;
}

const MovementVisualization: React.FC<MovementVisualizationProps> = ({
  selectedGenre,
  tempo,
  isPlaying,
  currentBeat,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="w-5 h-5" />
          Movement Patterns
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-48 bg-purple-50 rounded-lg p-4 relative overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <svg width="100%" height="100%" viewBox="0 0 800 200">
              {/* Background Grid */}
              {Array.from({ length: 20 }).map((_, i) => (
                <line
                  key={`grid-${i}`}
                  x1={i * 40}
                  y1="0"
                  x2={i * 40}
                  y2="200"
                  stroke="#e2e8f0"
                  strokeWidth="1"
                />
              ))}

              {/* Movement Pattern based on Genre */}
              {selectedGenre === 'classical' && (
                <>
                  <path
                    d={`M 0,100 
                        Q 200,${100 - (tempo / 2)} 400,100 
                        T 800,100`}
                    fill="none"
                    stroke="#8b5cf6"
                    strokeWidth="3"
                    className={`${isPlaying ? 'animate-pulse' : ''}`}
                  />
                  {[0, 200, 400, 600].map((x, i) => (
                    <circle
                      key={`classical-${i}`}
                      cx={x}
                      cy={100}
                      r={8}
                      fill="#8b5cf6"
                      opacity="0.5"
                      className={`${isPlaying ? 'animate-ping' : ''}`}
                    />
                  ))}
                </>
              )}

              {selectedGenre === 'hiphop' && (
                <>
                  <path
                    d={`M 0,100 
                        L 100,${100 - tempo / 3} 
                        L 200,${100 + tempo / 3} 
                        L 300,${100 - tempo / 3} 
                        L 400,${100 + tempo / 3}
                        L 500,${100 - tempo / 3}
                        L 600,${100 + tempo / 3}
                        L 700,${100 - tempo / 3}
                        L 800,100`}
                    fill="none"
                    stroke="#ef4444"
                    strokeWidth="3"
                    className={`${isPlaying ? 'animate-bounce' : ''}`}
                  />
                  {[100, 300, 500, 700].map((x, i) => (
                    <rect
                      key={`hiphop-${i}`}
                      x={x - 10}
                      y={90}
                      width={20}
                      height={20}
                      fill="#ef4444"
                      opacity="0.5"
                      className={`${isPlaying ? 'animate-bounce' : ''}`}
                    />
                  ))}
                </>
              )}

              {selectedGenre === 'contemporary' && (
                <>
                  <path
                    d={`M 0,100 
                        C 200,${100 - tempo / 4} 
                        400,${100 + tempo / 4} 
                        800,100`}
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="3"
                    className={`${isPlaying ? 'animate-pulse' : ''}`}
                  />
                  {[200, 400, 600].map((x, i) => (
                    <polygon
                      key={`contemporary-${i}`}
                      points={`${x},85 ${x-10},115 ${x+10},115`}
                      fill="#10b981"
                      opacity="0.5"
                      className={`${isPlaying ? 'animate-spin' : ''}`}
                    />
                  ))}
                </>
              )}

              {selectedGenre === 'latin' && (
                <>
                  <path
                    d={`M 0,100 
                        S 200,${100 - tempo / 3} 
                        400,${100 + tempo / 3} 
                        600,${100 - tempo / 3}
                        800,100`}
                    fill="none"
                    stroke="#f59e0b"
                    strokeWidth="3"
                    className={`${isPlaying ? 'animate-pulse' : ''}`}
                  />
                  {[200, 400, 600].map((x, i) => (
                    <circle
                      key={`latin-${i}`}
                      cx={x}
                      cy={100}
                      r={10}
                      fill="#f59e0b"
                      opacity="0.5"
                      className={`${isPlaying ? 'animate-bounce' : ''}`}
                    />
                  ))}
                </>
              )}

              {/* Beat Markers */}
              {[1, 2, 3, 4].map((beat) => (
                <g key={`beat-${beat}`} 
                   className={currentBeat === beat && isPlaying ? 'animate-ping' : ''}>
                  <line
                    x1={beat * 200 - 200}
                    y1="0"
                    x2={beat * 200 - 200}
                    y2="200"
                    stroke={currentBeat === beat ? '#6366f1' : '#cbd5e1'}
                    strokeWidth={currentBeat === beat ? '2' : '1'}
                    strokeDasharray="4 4"
                  />
                </g>
              ))}
            </svg>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MovementVisualization;