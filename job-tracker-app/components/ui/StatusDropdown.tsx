"use client"
import { APPLICATION_STATUS, ApplicationStatus } from '@/utils/constants';
import { createClient } from '@/utils/supabase/client';

interface StatusDropdownProps {
  currentStatus: ApplicationStatus;
  applicationId: string;
  onStatusUpdate: (newStatus: ApplicationStatus) => void;
}

export default function StatusDropdown({ 
  currentStatus, 
  applicationId, 
  onStatusUpdate 
}: StatusDropdownProps) {
    const supabase = createClient();
  const handleStatusChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = event.target.value as ApplicationStatus;
    
    try {
      const { error } = await supabase
        .from('applications')
        .update({ 
          status: newStatus,
          last_update: new Date().toISOString()
        })
        .eq('id', applicationId);

      if (error) throw error;
      onStatusUpdate(newStatus);
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  return (
    <select
      value={currentStatus}
      onChange={handleStatusChange}
      className="block w-full px-3 py-2 bg-gray-700 text-white border border-gray-600 
      rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 
      hover:border-gray-500 cursor-pointer"
    >
      {Object.entries(APPLICATION_STATUS).map(([value, label]) => (
        <option 
          key={value} 
          value={value}
          className="bg-gray-700 text-white hover:bg-gray-600"
        >
          {label}
        </option>
      ))}
    </select>
  );
}