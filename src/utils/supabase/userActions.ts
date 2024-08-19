"use server";

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export const getUserData = async () => {
  const supabase = createClient();

  const { data: user, error } = await supabase.auth.getUser();

  if (error) {
    console.error('Error fetching user data:', error);
    return redirect("/login?message=Could not fetch user data");
  }

  if (!user) {
    return redirect("/login");
  }

  const { data: profile, error: profileError } = await supabase
    .from('users')
    .select('*')
    .single();

    console.log(profile);

  if (profileError) {
    console.error('Error fetching user profile:', profileError);
    return redirect("/login?message=Could not fetch user profile");
  }

  return { ...user, profile };
};
