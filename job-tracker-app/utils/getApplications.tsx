"use client"
import { createClient } from '@/utils/supabase/client';

export async function getApplications() {
    
    const supabase = await createClient();
    const { data } = await supabase
        .from('applications')
        .select()

    
    console.log(data)
    return data
}