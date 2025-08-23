export enum StatusEnum {
  PENDING = 'pending',
  PROCESSING = 'processing',
  COMPLETED = 'completed',
  FAILED = 'failed',
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  loginToken: string;
  picture: string;
}

export interface Tutorial {
  id: number;
  title: string;
  vid: string;
  createdAt: Date;
  tutorial: string;
  status: StatusEnum;
  userId: string;
  user?: User;

}

