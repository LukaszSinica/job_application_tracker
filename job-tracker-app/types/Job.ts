import { ApplicationStatus } from '@/utils/constants';

export interface Job {
  id?: string;
  company: string;
  position: string;
  status: ApplicationStatus;
  date_applied: string;
  last_update: string;
  notes: string;
  user_id: string;
}