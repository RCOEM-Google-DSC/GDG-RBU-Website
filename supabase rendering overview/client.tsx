//  CLIENT SIDE :
"use client";

import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";

export default function Page() {
  const [blogs, setBlogs] = useState<any[] | null>(null);
  const supabase = createClient();

  useEffect(() => {
    const getData = async () => {
      const { data } = await supabase.from("blogs").select();
      setBlogs(data);
    };
    getData();
  }, []);

  return <pre>{JSON.stringify(blogs, null, 2)}</pre>;
}
