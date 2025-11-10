"use client"

import { useEffect, useState } from 'react';
import { Job } from '../types/Job';
import { getApplications } from '@/utils/getApplications';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { MoreVertical, Trash2 } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import StatusDropdown from "@/components/ui/StatusDropdown";
import { deleteApplication } from '@/utils/deleteApplication';

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
        deleteApplication(jobId);

    };

    if (loading) {
        return <div className="text-muted-foreground">Loading...</div>;
    }

    return (
        <div className="w-full overflow-auto">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[200px]">Company</TableHead>
                        <TableHead className="w-[200px]">Position</TableHead>
                        <TableHead className="w-[180px]">Status</TableHead>
                        <TableHead className="w-[120px]">Date Applied</TableHead>
                        <TableHead className="w-[80px]">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {jobs.map((job) => (
                        <TableRow key={job.id}>
                            <TableCell className="font-medium truncate">{job.company}</TableCell>
                            <TableCell className="truncate">{job.position}</TableCell>
                            <TableCell className="w-[180px]">
                                <StatusDropdown
                                    currentStatus={job.status}
                                    applicationId={job.id || ''}
                                    onStatusUpdate={(newStatus) => 
                                        handleStatusChange({ ...job, status: newStatus })
                                    }
                                />
                            </TableCell>
                            <TableCell className="whitespace-nowrap">
                                {new Date(job.date_applied).toLocaleDateString()}
                            </TableCell>
                            <TableCell>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="icon" className="h-8 w-8">
                                            <MoreVertical className="h-4 w-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuItem
                                            className="text-destructive"
                                            onClick={() => handleDelete(job.id || '')}
                                        >
                                            <Trash2 className="mr-2 h-4 w-4" />
                                            Delete
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
