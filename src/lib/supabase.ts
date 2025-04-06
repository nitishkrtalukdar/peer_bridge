import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://hcsmmdgxnqzqyrunpzdv.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhjc21tZGd4bnF6cXlydW5wemR2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM4NjY1MzMsImV4cCI6MjA1OTQ0MjUzM30.cyGzcIWSNq7nJAQErwIbFkOw9agAI0T9yp-om7YTST0";

export const supabase = createClient(supabaseUrl, supabaseKey);
