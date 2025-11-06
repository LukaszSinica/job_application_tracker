"use client"
import { createClient } from '@/utils/supabase/client';
import { ApplicationStatus, APPLICATION_STATUS } from '@/utils/constants';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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

  const handleStatusChange = async (newStatus: ApplicationStatus) => {
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
    <Select
      value={currentStatus}
      onValueChange={handleStatusChange}
    >
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder="Select status" />
      </SelectTrigger>
      <SelectContent>
        {Object.entries(APPLICATION_STATUS).map(([key, value]) => (
          <SelectItem key={key} value={key}>
            {value}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}