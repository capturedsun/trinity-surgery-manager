"use server";

import { headers } from "next/headers";
import { createClient } from "@/app/utils/supabase/server";
import { redirect } from "next/navigation";

export const signIn = async (formData: FormData) => {
  "use server";
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const supabase = createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return redirect("/sign-in?message=Could not authenticate user");
  }

  return redirect("/overview");
};

export const signUp = async (formData: FormData) => {
  "use server";
  const origin = headers().get("origin");
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const supabase = createClient();

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
    },
  });

  if (error) {
    return redirect("/sign-in?message=Could not authenticate user");
  }

  return redirect("/sign-in?message=Check email to continue sign in process");
};

export async function logout() {
  "use server"
  const supabase = createClient()
  
  const { error } = await supabase.auth.signOut()
  
  if (error) {
    console.error('Error logging out:', error)
  }

  redirect('/sign-in')
}

export const checkAuth = async () => {
  const supabase = createClient();
  const { data: authData, error: authError } = await supabase.auth.getUser();
  if (authError || !authData?.user) {
    redirect("/sign-in");
  }
};