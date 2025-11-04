"use client"
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
    <div className="p-8 border rounded-lg shadow-sm w-1/4 bg-gray-800 border-gray-700 relative">
      <button
        onClick={handleDelete}
        className="absolute top-2 right-2 text-gray-400 hover:text-red-500 
        transition-colors duration-200 p-1 rounded-full hover:bg-gray-700"
        aria-label="Delete application"
      >
        ×
      </button>
      <h3 className="text-white font-medium">{job.company}</h3>
      <p className="text-gray-300">{job.position}</p>
      <StatusDropdown
        currentStatus={job.status}
        applicationId={job.id || ''}
        onStatusUpdate={handleStatusUpdate}
      />
    </div>
  );
}