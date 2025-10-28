import { createClient } from '@/utils/supabase/server';

export async function getApplications() {
    const supabase = await createClient();
    const { data } = await supabase
        .from('applications')
        .select()

    
    console.log(data)
    return data
}