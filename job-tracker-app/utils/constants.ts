export const APPLICATION_STATUS = {
    SENT: 'Application Sent',
    REVIEWED: 'Application Reviewed',
    ACCEPTED: 'Accepted',
    REFUSED: 'Refused',
    GHOSTED: 'Ghosted'
  } as const;
  
export type ApplicationStatus = typeof APPLICATION_STATUS[keyof typeof APPLICATION_STATUS];