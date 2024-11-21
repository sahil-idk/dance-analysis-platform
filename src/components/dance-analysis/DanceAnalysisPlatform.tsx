/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Music2,
  Globe,
  Clock,
  PlayCircle,
  PauseCircle,
  ChevronRight,
} from 'lucide-react';

import DanceDetails from './DanceDetails';
import MovementVisualization from './MovementVisualization';
import { genres } from './dance-data';
import { useAudio } from '@/hooks/use-audio';

const DanceAnalysisPlatform = () => {
  const [tempo, setTempo] = useState(120);
  const [selectedGenre, setSelectedGenre] = useState('classical');
  const [activeTab, setActiveTab] = useState('analysis');
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentBeat, setCurrentBeat] = useState(1);
  const [intensity, setIntensity] = useState(70);

  const { playBeat } = useAudio();

  useEffect(() => {
    let interval: string | number | NodeJS.Timeout | undefined;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentBeat((prev) => {
          const newBeat = (prev % 4) + 1;
          playBeat();
          return newBeat;
        });
      }, (60 / tempo) * 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, tempo, playBeat]);

  const getIntensityColor = (level: number) => {
    if (level > 80) return 'bg-red-500';
    if (level > 60) return 'bg-orange-500';
    if (level > 40) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const selectedDanceStyle = genres.find(g => g.id === selectedGenre);

  return (
    <div className="w-full max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold flex items-center gap-3">
          <Music2 className="w-8 h-8 text-purple-600" />
          Dance Analysis Platform
        </h1>
        <Button
          onClick={() => setIsPlaying(!isPlaying)}
          className="flex items-center gap-2"
        >
          {isPlaying ? (
            <><PauseCircle className="w-5 h-5" /> Stop Beat</> 
          ) : (
            <><PlayCircle className="w-5 h-5" /> Start Beat</>
          )}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Rhythm Controls
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium">Tempo (BPM)</label>
                <span className="text-sm font-bold">{tempo}</span>
              </div>
              <Slider
                value={[tempo]}
                onValueChange={(value) => setTempo(value[0])}
                min={60}
                max={180}
                step={1}
                className="w-full"
              />
              <div className="text-xs text-gray-500">
                Recommended: {selectedDanceStyle?.tempoRange.optimal} BPM
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium">Movement Intensity</label>
                <span className="text-sm font-bold">{intensity}%</span>
              </div>
              <Slider
                value={[intensity]}
                onValueChange={(value) => setIntensity(value[0])}
                min={0}
                max={100}
                step={1}
                className="w-full"
              />
              <div className={`h-2 rounded-full mt-1 ${getIntensityColor(intensity)}`} />
            </div>

            <div className="grid grid-cols-4 gap-2 mt-4">
              {[1, 2, 3, 4].map((beat) => (
                <div
                  key={beat}
                  className={`h-12 rounded-lg flex items-center justify-center text-white font-bold transition-all duration-200 ${
                    currentBeat === beat && isPlaying
                      ? 'bg-purple-600 scale-110'
                      : 'bg-gray-300'
                  }`}
                >
                  {beat}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Movement Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="analysis" className="w-full">
                <TabsList className="grid grid-cols-2 mb-4">
                  <TabsTrigger value="analysis">Analysis</TabsTrigger>
                  <TabsTrigger value="cultural">Cultural Context</TabsTrigger>
                </TabsList>

                <TabsContent value="analysis">
                  <Alert>
                    <AlertDescription>
                      <p className="mb-2">
                        Current tempo ({tempo} BPM) suggests {tempo < 100 ? 'controlled, precise movements' : 
                        tempo < 140 ? 'balanced, flowing movements' : 'quick, energetic movements'}.
                      </p>
                      <p>
                        Intensity level ({intensity}%) indicates {intensity < 50 ? 'subtle' : 'powerful'} expression.
                      </p>
                    </AlertDescription>
                  </Alert>

                  <div className="grid grid-cols-2 gap-4 mt-4">
                    {genres.map((genre) => (
                      <Button
                        key={genre.id}
                        variant={selectedGenre === genre.id ? "default" : "outline"}
                        onClick={() => setSelectedGenre(genre.id)}
                        className="w-full justify-start"
                      >
                        <span className="flex items-center gap-2">
                          <ChevronRight className="w-4 h-4" />
                          {genre.name}
                        </span>
                      </Button>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="cultural">
                  <div className="p-4 rounded-lg bg-purple-50">
                    <h3 className="font-bold mb-2 flex items-center gap-2">
                      <Globe className="w-4 h-4" />
                      Cultural Background
                    </h3>
                    <p className="text-sm leading-relaxed">{selectedDanceStyle?.culturalContext}</p>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <MovementVisualization
            selectedGenre={selectedGenre}
            tempo={tempo}
            isPlaying={isPlaying}
            currentBeat={currentBeat}
          />

          <DanceDetails 
            selectedGenre={selectedGenre}
            tempo={tempo}
            intensity={intensity}
          />
        </div>
      </div>
    </div>
  );
};

export default DanceAnalysisPlatform;