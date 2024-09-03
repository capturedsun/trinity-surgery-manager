"use server"

import { StatusTag } from "@/app/data/schema";
import { createClient } from "@/app/utils/supabase/server";

export const getOrganizationStatusTags = async (orgCode: string) => {
    const supabase = createClient();
    const { data, error } = await supabase
        .from('statuses')
        .select('*')
        .eq('org_code', orgCode);

    console.log(data)

    if (error) {
        console.error('Error fetching organization status tags:', error);
        return [];
    }

    const categorizedTags = Array.from(
        new Set(data.map(tag => tag.category))
    ).map(category => ({
        category,
        tags: data.filter(tag => tag.category === category)
    }))

    return categorizedTags
};

export const updateStatusTag = async (statusTag: StatusTag) => {
    const supabase = createClient();
    const { data, error } = await supabase
        .from('statuses')
        .update(statusTag)
        .eq('id', statusTag.id);

    if (error) {
        console.error('Error updating status tag:', error);

        return { error: error.message };
    }

    return { data: data };
};