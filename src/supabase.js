import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://pqvkmuqsbnvihodlrkiw.supabase.co";
const supabaseKey =
   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBxdmttdXFzYm52aWhvZGxya2l3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODY2NjA0NzEsImV4cCI6MjAwMjIzNjQ3MX0.PyEeg0lySChGPDALlWVGxl4qCSqGTAf81-dhTUTVvgU";

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
