"use client";
import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { DataTable } from '@/components/ui/data-table';
import { columns } from '@/app/problems/columns';
import RouteLoader from '@/components/RouteLoader';

export default function ProblemsPage() {
  const [problems, setProblems] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProblems = async () => {
      setIsLoading(true);
      let allProblems: any[] = [];
      let from = 0;
      const limit = 1000; // Supabase default limit

      while (true) {
        const { data, error } = await supabase
          .from('problems')
          .select('*')
          .range(from, from + limit - 1);

        if (error) {
          console.error('Error fetching problems:', error);
          break;
        }

        if (!data || data.length === 0) {
          break;
        }

        allProblems = [...allProblems, ...data];
        from += limit;
      }

      console.log('Fetched problems:', allProblems);
      console.log('Number of problems:', allProblems.length);
      setProblems(allProblems);
      setIsLoading(false);
    };

    fetchProblems();
  }, []);

  return (
    <div className="container mx-auto py-10 max-w-full px-4">
      <h1 className="text-2xl font-bold mb-5">Coding Problems</h1>
      {isLoading ? (
        <div className="relative h-[calc(100vh-12rem)]">
          <RouteLoader />
        </div>
      ) : (
        <DataTable columns={columns} data={problems} />
      )}
    </div>
  );
}