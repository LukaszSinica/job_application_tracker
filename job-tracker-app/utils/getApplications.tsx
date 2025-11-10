"use client"
import { createClient } from '@/utils/supabase/client';

export async function getApplications() {
    
    const supabase = await createClient();
    const { data } = await supabase
        .from('applications')
        .select()
        .order('date_applied', { ascending: false })
        

    
    console.log(data)
    return data
}