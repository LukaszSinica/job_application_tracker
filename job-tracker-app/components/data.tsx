"use client"

import { useEffect, useState } from 'react';
import { Job } from '../types/Job';
import { getApplications } from '@/utils/getApplications';
import { ApplicationStatus } from '@/utils/constants';
import { JobCard } from './ui/JobCard';

interface JobListProps {
    refreshTrigger: number;
  }

  
export default function JobList({ refreshTrigger }: JobListProps) {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [loading, setLoading] = useState<boolean>(true);


    useEffect(() => {
        const getJobs = async () => {
            const jobData = await getApplications();
            setJobs(jobData || []);
            setLoading(false);
        };

        getJobs();
    }, [refreshTrigger]);

    const handleStatusChange = async (updatedJob: Job) => {
            setJobs(jobs.map(job => 
              job.id === updatedJob.id ? { ...job, status: updatedJob.status } : job
            ));
          };

    const handleDelete = (jobId: string) => {
        setJobs(jobs.filter(job => job.id !== jobId));
    };
      
    if (loading) {
        return <div className="text-muted-foreground">Loading...</div>;
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {jobs.map((job) => (
                <JobCard 
                    key={job.id} 
                    job={job} 
                    onUpdate={handleStatusChange} 
                    onDelete={handleDelete} 
                />
            ))}
        </div>
    );
};
