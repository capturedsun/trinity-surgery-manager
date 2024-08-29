"use server"

import { createClient } from "@/utils/supabase/server";
import { StatusTag } from "@/data/schema";

export const getOrganizationStatusTags = async (orgCode: string) => {
    const supabase = createClient();
    const { data, error } = await supabase
        .from('statuses')
        .select('*')
        .eq('org_code', orgCode);

    if (error) {
        console.error('Error fetching organization status tags:', error);
        return [];
    }

    // First loop: Create categories
    const categorizedTags = Array.from(
        new Set(data.map(tag => tag.category))
    ).map(category => ({
        category,
        tags: data.filter(tag => tag.category === category)
    }))

    console.log(categorizedTags)
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