/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Timer,
  Music2,
  Lightbulb,
  ListChecks,
  AlertTriangle
} from 'lucide-react';
import { genres } from './dance-data';

interface DanceDetailsProps {
  selectedGenre: string;
  tempo: number;
  intensity: number;
}

const getPracticeGuide = (tempo: number, intensity: number, genre: any) => {
  const tempoGuide = {
    slow: tempo < genre.tempoRange.min,
    fast: tempo > genre.tempoRange.max,
    recommendations: tempo < 100 
      ? [
          'Focus on precision and form',
          'Practice slow, controlled movements',
          'Work on balance and posture'
        ]
      : tempo > 140
      ? [
          'Maintain form at higher speeds',
          'Practice quick transitions',
          'Focus on stamina and control'
        ]
      : [
          'Balance speed and control',
          'Work on fluid movements',
          'Practice dynamic expressions'
        ]
  };

  const intensityGuide = intensity < 50 
    ? {
        level: 'Beginner',
        focus: [
          'Master basic steps and positions',
          'Build foundational strength',
          'Focus on proper technique'
        ]
      }
    : intensity < 80
    ? {
        level: 'Intermediate',
        focus: [
          'Combine multiple movements',
          'Add style variations',
          'Improve movement quality'
        ]
      }
    : {
        level: 'Advanced',
        focus: [
          'Complex movement combinations',
          'Advanced technical elements',
          'Performance-level expression'
        ]
      };

  return {
    tempoGuide,
    intensityGuide,
    styleFocus: genre.suggestedMoves.slice(0, 3)
  };
};

const DanceDetails: React.FC<DanceDetailsProps> = ({ selectedGenre, tempo, intensity }) => {
  const selectedDance = genres.find(g => g.id === selectedGenre);
  if (!selectedDance) return null;

  const { tempoGuide, intensityGuide, styleFocus } = getPracticeGuide(tempo, intensity, selectedDance);

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Timer className="w-5 h-5" />
          Practice Guide: {selectedDance.name}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] pr-4">
          <div className="mb-6">
            <div className="flex flex-wrap gap-2 mb-3">
              <Badge variant={intensityGuide.level === 'Advanced' ? 'destructive' : 'default'}>
                {intensityGuide.level} Level
              </Badge>
              <Badge variant={tempoGuide.slow || tempoGuide.fast ? 'outline' : 'secondary'}>
                {tempo} BPM
              </Badge>
            </div>
            
            {(tempoGuide.slow || tempoGuide.fast) && (
              <Alert>
                <AlertTriangle className="w-4 h-4" />
                <AlertDescription>
                  {tempoGuide.slow 
                    ? `Recommended minimum tempo: ${selectedDance.tempoRange.min} BPM` 
                    : `Recommended maximum tempo: ${selectedDance.tempoRange.max} BPM`}
                </AlertDescription>
              </Alert>
            )}
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="tempo">
              <AccordionTrigger>
                <span className="flex items-center gap-2">
                  <Timer className="w-4 h-4" />
                  Tempo-Specific Practice
                </span>
              </AccordionTrigger>
              <AccordionContent>
                <ul className="space-y-2 pl-4">
                  {tempoGuide.recommendations.map((rec, i) => (
                    <li key={i} className="text-sm list-disc">{rec}</li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="intensity">
              <AccordionTrigger>
                <span className="flex items-center gap-2">
                  <Lightbulb className="w-4 h-4" />
                  Level-Based Training
                </span>
              </AccordionTrigger>
              <AccordionContent>
                <ul className="space-y-2 pl-4">
                  {intensityGuide.focus.map((focus, i) => (
                    <li key={i} className="text-sm list-disc">{focus}</li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="style">
              <AccordionTrigger>
                <span className="flex items-center gap-2">
                  <Music2 className="w-4 h-4" />
                  Style-Specific Elements
                </span>
              </AccordionTrigger>
              <AccordionContent>
                <ul className="space-y-2 pl-4">
                  {styleFocus.map((move: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined, i: React.Key | null | undefined) => (
                    <li key={i} className="text-sm list-disc">Practice {move}</li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="technical">
              <AccordionTrigger>
                <span className="flex items-center gap-2">
                  <ListChecks className="w-4 h-4" />
                  Technical Elements
                </span>
              </AccordionTrigger>
              <AccordionContent>
                <ul className="space-y-2 pl-4">
                  {selectedDance.technicalElements.map((element, i) => (
                    <li key={i} className="text-sm list-disc">{element}</li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default DanceDetails;