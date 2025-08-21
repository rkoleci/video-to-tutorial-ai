export enum StatusEnum {
  PENDING = 'pending',
  PROCESSING = 'processing',
  COMPLETED = 'completed',
  FAILED = 'failed',
}

export interface Tutorial {
  id: number;
  title: string;
  vid: string;
  createdAt: Date;
  tutorial: string;
  status: StatusEnum;
}

