"use client"
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MoreVertical, Trash2 } from "lucide-react";
import { STATUS_COLORS } from "@/utils/constants";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import StatusDropdown from '@/components/ui/StatusDropdown';
import { Job } from '@/types/Job';
import { ApplicationStatus } from '@/utils/constants';
import { createClient } from '@/utils/supabase/client';

interface JobCardProps {
  job: Job;
  onUpdate: (updatedJob: Job) => void;
  onDelete: (jobId: string) => void;
}

export function JobCard({ job, onUpdate, onDelete }: JobCardProps) {
  const supabase = createClient();

  const handleStatusUpdate = (newStatus: ApplicationStatus) => {
    onUpdate({ ...job, status: newStatus });
  };

  const handleDelete = async () => {
    try {
      const { error } = await supabase
        .from('applications')
        .delete()
        .eq('id', job.id);

      if (error) throw error;
      if (job.id) onDelete(job.id);
    } catch (error) {
      console.error('Error deleting job:', error);
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="space-y-1">
          <h3 className="text-lg font-semibold leading-none">
            {job.company}
          </h3>
          <p className="text-sm text-muted-foreground">
            {job.position}
          </p>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem 
              className="text-destructive focus:text-destructive"
              onClick={handleDelete}
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-4">
          <Badge 
            variant="secondary"
            className={`w-fit ${STATUS_COLORS[job.status]}`}
          >
            {job.status}
          </Badge>
          <StatusDropdown
            currentStatus={job.status}
            applicationId={job.id || ''}
            onStatusUpdate={handleStatusUpdate}
          />
        </div>
      </CardContent>
    </Card>
  );
}