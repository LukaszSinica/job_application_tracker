"use client"

import { createClient } from "./supabase/client";

export async function deleteApplication(applicationId: string) {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from('applications')
        .delete()
        .eq('id', applicationId);

    if (error) throw error;

    return data;
}
