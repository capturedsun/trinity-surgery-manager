import { createClient } from "@/utils/supabase/client";

export const getOrganization = async () => {
  const supabase = createClient();

  const { data: organization, error: organizationError } = await supabase
    .from('organizations')
    .select('*')
    .single();

  if (organizationError) {
    console.error('Error fetching organization:', organizationError);
    return null;
  }
  return { organization };
}