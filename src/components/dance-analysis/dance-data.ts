// src/components/dance-analysis/dance-data.ts

export interface DanceGenre {
    id: string;
    name: string;
    suggestedMoves: string[];
    culturalContext: string;
    emotionalExpression: string;
    technicalElements: string[];
    musicStyle: string;
    tempoRange: {
      min: number;
      max: number;
      optimal: number;
    };
  }
  
  export const genres: DanceGenre[] = [
    {
      id: 'classical',
      name: 'Classical Ballet',
      suggestedMoves: [
        'Pirouette (controlled turns)',
        'Grand Jeté (leaps)',
        'Port de Bras (arm movements)',
        'Plié (knee bends)',
        'Arabesque (balanced poses)'
      ],
      culturalContext: 'Developed in the Italian Renaissance courts and refined in France and Russia, classical ballet represents the epitome of formal dance structure.',
      emotionalExpression: 'Combines technical precision with artistic grace, expressing emotions through refined and controlled movements',
      technicalElements: [
        'Five basic positions',
        'Turnout of the legs',
        'Extended lines',
        'Balance and control',
        'Pointed feet'
      ],
      musicStyle: 'Classical orchestral compositions with structured rhythms and clear musical phrases',
      tempoRange: {
        min: 60,
        max: 120,
        optimal: 90
      }
    },
    {
      id: 'hiphop',
      name: 'Hip-Hop Dance',
      suggestedMoves: [
        'Top Rock (foundational moves)',
        'Breaking (floor work)',
        'Popping (muscle contractions)',
        'Locking (quick movements)',
        'House steps (footwork)'
      ],
      culturalContext: 'Emerged from African-American and Latino communities in the Bronx during the 1970s as part of hip-hop culture',
      emotionalExpression: 'Raw energy and individual expression, often telling stories of urban life and personal struggle',
      technicalElements: [
        'Groove and bounce',
        'Isolations',
        'Floor work',
        'Freestyle ability',
        'Body control'
      ],
      musicStyle: 'Hip-hop music with strong beats, breaks, and rhythmic patterns',
      tempoRange: {
        min: 85,
        max: 115,
        optimal: 95
      }
    },
    {
      id: 'contemporary',
      name: 'Contemporary',
      suggestedMoves: [
        'Contract and release',
        'Floor work sequences',
        'Improvisation',
        'Fall and recovery',
        'Movement combinations'
      ],
      culturalContext: 'Evolved from modern dance in the mid-20th century, breaking traditional dance conventions',
      emotionalExpression: 'Deep emotional storytelling through abstract and natural movements',
      technicalElements: [
        'Core strength',
        'Floor work',
        'Partner work',
        'Improvisation',
        'Spatial awareness'
      ],
      musicStyle: 'Varies from classical to electronic, often using unconventional rhythms and silence',
      tempoRange: {
        min: 60,
        max: 140,
        optimal: 100
      }
    },
    {
      id: 'latin',
      name: 'Latin Dance',
      suggestedMoves: [
        'Basic step patterns',
        'Hip movements',
        'Partner work',
        'Turns and spins',
        'Body isolation'
      ],
      culturalContext: 'Originated from various Latin American countries, each with unique styles and traditions',
      emotionalExpression: 'Passionate and energetic expression of joy, romance, and celebration',
      technicalElements: [
        'Hip movement',
        'Partner connection',
        'Rhythm timing',
        'Body isolation',
        'Footwork patterns'
      ],
      musicStyle: 'Latin music styles including salsa, bachata, merengue, and cha-cha',
      tempoRange: {
        min: 150,
        max: 220,
        optimal: 180
      }
    }
  ];