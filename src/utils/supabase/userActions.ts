"use server";

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export const getUser = async () => {
  const supabase = createClient();

  const { data: user, error } = await supabase.auth.getUser();

  if (error || !user) {
    console.error('Error fetching user data:', error);
    return redirect("/login?message=Could not fetch user data");
  }

  const { data: profile, error: profileError } = await supabase
    .from('users')
    .select('*')
    .single();


  if (profileError) {
    console.error('Error fetching user profile:', profileError);
    return redirect("/login?message=Could not fetch user profile");
  }

  return { ...user, profile };
};

// Added return type for clarity
export const mutateUser = async (user: any): Promise<void> => {
  const supabase = createClient();

  await supabase.from('users').update(user).select();
}
