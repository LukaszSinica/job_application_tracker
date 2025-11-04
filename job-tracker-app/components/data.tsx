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

    const handleStatusChange = async (jobId: string, newStatus: string) => {
            setJobs(jobs.map(job => 
              job.id === jobId ? { ...job, status: newStatus as ApplicationStatus } : job
            ));
          };

    const handleDelete = (jobId: string) => {
        setJobs(jobs.filter(job => job.id !== jobId));
    };
      
    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>Job Applications</h2>
            <ul className="flex gap-4">
                {jobs.map(job => (
                    <JobCard 
                        key={job.id} 
                        job={job} 
                        onUpdate={(updatedJob) => handleStatusChange(job?.id || '', updatedJob.status)} 
                        onDelete={(jobId) => handleDelete(jobId)} 
                    />
                ))}
            </ul>
        </div>
    );
};

