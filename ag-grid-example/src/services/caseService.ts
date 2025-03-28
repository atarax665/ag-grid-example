import { Case } from '../types/Case';

const dummyCases: Case[] = [
  {
    id: '1',
    caseName: 'Case 1',
    status: 'In Progress',
    created: new Date('2024-01-01'),
    due: new Date('2024-03-01'),
    totalFiles: 4,
    releasableFiles: '2 of 4'
  },
  {
    id: '2',
    caseName: 'Case 2',
    status: 'Pending Review',
    created: new Date('2024-01-15'),
    due: new Date('2024-03-15'),
    totalFiles: 6,
    releasableFiles: '3 of 6'
  },
  {
    id: '3',
    caseName: 'Case 3',
    status: 'Completed',
    created: new Date('2024-01-20'),
    due: null,
    totalFiles: 3,
    releasableFiles: '3 of 3'
  }
];

export const getCases = (): Case[] => {
  return dummyCases;
}; 