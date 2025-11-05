export const APPLICATION_STATUS = {
    SENT: 'Application Sent',
    REVIEWED: 'Application Reviewed',
    ACCEPTED: 'Accepted',
    REFUSED: 'Refused',
    GHOSTED: 'Ghosted'
  } as const;
  
export type ApplicationStatus = typeof APPLICATION_STATUS[keyof typeof APPLICATION_STATUS];

export const STATUS_COLORS = {

  'Application Sent': 'bg-primary/10 text-primary',

  'Application Reviewed': 'bg-yellow-500/10 text-yellow-500 dark:text-yellow-400',

  'Accepted': 'bg-green-500/10 text-green-500 dark:text-green-400',

  'Refused': 'bg-destructive/10 text-destructive',

  'Ghosted': 'bg-muted/50 text-muted-foreground',

} as const;

