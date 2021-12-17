import { v4 as uuid } from 'uuid';

export const questionsData = [
  { 
    id: uuid(),
    type: 'trueOrFalse',
    content: 'content question bool 1?',
    corrects: ['false'],
    answers: ['true', 'false']
  },
  { 
    id: uuid(),
    type: 'trueOrFalse',
    content: 'content question bool 2?',
    corrects: ['true'],
    answers: ['true', 'false']
  },
  { 
    id: uuid(),
    type: 'chooseOne',
    content: 'Who wasn`t a member of the Beatles?',
    corrects: ['Justin Timberlake'],
    answers: [
      'John Lennon',
      'Paul McCartney',
      'Ringo Star',
      'Justin Timberlake'
    ]
  },
  {
    id: uuid(),
    type: 'chooseOne',
    content: 'Who was the first man to travel into space twice?',
    corrects: ['Gus Grissom'],
    answers: [
      'Vladimir Titov',
      'Michael Collins',
      'Yuri Gagarin',
      'Gus Grissom'
    ],
  },
];
