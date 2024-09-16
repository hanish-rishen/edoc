"use client";
import { ColumnDef } from "@tanstack/react-table";
import Link from 'next/link';
import { Badge } from "@/components/ui/badge";

const companyColors = [
  'bg-red-500 text-white',
  'bg-blue-500 text-white',
  'bg-green-500 text-white',
  'bg-yellow-500 text-black',
  'bg-purple-500 text-white',
  'bg-pink-500 text-white',
];

// Removed the unused companyLogos object

export const columns: ColumnDef<any>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => {
      const id = row.original.id;
      return <Link href={`/problems/${id}`} className="text-blue-500 hover:underline">{row.getValue("title")}</Link>;
    },
  },
  {
    accessorKey: "difficulty",
    header: "Difficulty",
  },
  {
    accessorKey: "acceptance_rate",
    header: "Acceptance",
    cell: ({ row }) => `${row.getValue("acceptance_rate")}%`,
  },
  {
    accessorKey: "frequency",
    header: "Frequency",
  },
  {
    accessorKey: "is_premium",
    header: "Premium",
    cell: ({ row }) => row.getValue("is_premium") ? "Yes" : "No",
  },
  {
    accessorKey: "companies",
    header: "Companies",
    cell: ({ row }) => {
      const companies = row.getValue("companies");
      return Array.isArray(companies) ? (
        <div className="flex flex-wrap gap-2">
          {companies.map((company: string, index: number) => (
            <Badge key={company} className={companyColors[index % companyColors.length]}>
              {company}
            </Badge>
          ))}
        </div>
      ) : companies;
    },
  },
  {
    accessorKey: "related_topics",
    header: "Related Topics",
    cell: ({ row }) => {
      const topics = row.getValue("related_topics");
      return Array.isArray(topics) ? topics.join(", ") : topics;
    },
  },
  {
    accessorKey: "likes",
    header: "Likes",
  },
  {
    accessorKey: "dislikes",
    header: "Dislikes",
  },
  {
    accessorKey: "asked_by_faang",
    header: "Asked by FAANG",
    cell: ({ row }) => row.getValue("asked_by_faang") ? "Yes" : "No",
  },
];