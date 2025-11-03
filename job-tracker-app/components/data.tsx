"use client"

import React, { useEffect, useState } from 'react';
import { Job } from '../types/Job';
import { getApplications } from '@/utils/getApplications';



const JobList: React.FC = () => {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const getJobs = async () => {
            const jobData = await getApplications();
            setJobs(jobData || []);
            setLoading(false);
        };

        getJobs();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>Job Applications</h2>
            <ul>
                {jobs.map(job => (
                    <li key={job.id}>
                        <h3>{job.position} at {job.company}</h3>
                        <p>Status: {job.status}</p>
                        <p>Applied on: {job.date_applied}</p>
                        <p>Last Update: {job.last_update}</p>
                        <p>Notes: {job.notes}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default JobList;