'use client';

import { useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { APPLICATION_STATUS, ApplicationStatus } from '@/utils/constants';
import Drawer from './ui/Drawer';

interface AddJobFormProps {
  refreshJobs: () => void;
}

export default function AddJobForm({ refreshJobs }: AddJobFormProps) {
    const supabase = createClient();
    const [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState<{
        company: string;
        position: string;
        status: ApplicationStatus;
        notes: string;
    }>({
        company: '',
        position: '',
        status: APPLICATION_STATUS.SENT,
        notes: '',
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        try {
        const {
            data: { user },
        } = await supabase.auth.getUser();

        if (!user) throw new Error('No user found');

        const { error } = await supabase.from('applications').insert({
            ...formData,
            user_id: user.id,
            date_applied: new Date().toISOString(),
            last_update: new Date().toISOString(),
        });

        if (error) throw error;

        setFormData({
            company: '',
            position: '',
            status: APPLICATION_STATUS.SENT,
            notes: '',
        });
        
        refreshJobs(); // Call refresh after successful insert
        } catch (error) {
        console.error('Error:', error);
        }
    };

    return (
        <>
        <button
            onClick={() => setIsOpen(true)}
            className="fixed bottom-8 right-8 bg-primary text-primary-foreground p-4 rounded-full shadow-lg hover:bg-primary/90"
        >
            + Add Job
        </button>

        <Drawer
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            title="Add New Job Application"
        >
        <form onSubmit={handleSubmit} className="space-y-6">
        <div>
        <label htmlFor="company" className="block text-sm font-medium">
            Company
            </label>
            <input
            type="text"
            id="company"
            value={formData.company}
            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
            required
            className="mt-1 p-2 block w-full rounded-md border border-input bg-background text-foreground"
            />
        </div>

        <div>
        <label htmlFor="position" className="block text-sm font-medium">
            Position
            </label>
            <input
            type="text"
            id="position"
            value={formData.position}
            onChange={(e) => setFormData({ ...formData, position: e.target.value })}
            required
            className="mt-1 p-2 block w-full rounded-md border border-input bg-background text-foreground"
            />
        </div>

        <div>
        <label htmlFor="status" className="block text-sm font-medium">
                Status
                </label>
                <select
                id="status"
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as ApplicationStatus })}
                className="mt-1 p-2 block w-full rounded-md border border-input bg-background text-foreground focus:border-blue-500 focus:ring-blue-500"
                >
                {Object.values(APPLICATION_STATUS).map((status) => (
                    <option key={status} value={status}>
                    {status}
                    </option>
                ))}
                </select>
      </div>

        <div>
        <label htmlFor="notes" className="block text-sm font-medium ">
            Notes
            </label>
            <textarea
            id="notes"
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            rows={3}
            className="mt-1 block w-full rounded-md border border-input bg-background text-foreground text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
            />
        </div>

        <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
            Add Application
        </button>
        </form>
        </Drawer>
        </>
    );
}