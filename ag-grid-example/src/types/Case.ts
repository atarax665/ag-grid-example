export interface Case {
  id: string;
  caseName: string;
  status: string;
  created: Date;
  due: Date | null;
  totalFiles: number;
  releasableFiles: string;
} 