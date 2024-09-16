"use client";
import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import dynamic from 'next/dynamic';
import AICoach from '@/components/AICoach';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Groq } from "groq-sdk";
import RouteLoader from '@/components/RouteLoader';

const CodeEditor = dynamic(() => import('@/components/CodeEditor'), {
  ssr: false,
});

export default function ProblemPage() {
  const { id } = useParams();
  const [problem, setProblem] = useState<any>(null);
  const [formattedProblem, setFormattedProblem] = useState<any>(null);
  const [code, setCode] = useState<string>('// Start coding here');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProblem = async () => {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('problems')
        .select('*')
        .eq('id', id)
        .single();
      if (error) console.error('Error fetching problem:', error);
      else {
        setProblem(data);
        await formatProblemDescription(data.description);
      }
      setIsLoading(false);
    };

    fetchProblem();
  }, [id]);

  const formatProblemDescription = async (description: string) => {
    const groq = new Groq({
      apiKey: process.env.NEXT_PUBLIC_GROQ_API_KEY,
      dangerouslyAllowBrowser: true
    });

    const prompt = `
    Given the following problem description, please format it into these sections:
    1. Problem Statement
    2. Examples (with inputs and outputs)
    3. Constraints

    Format the output in JSON with the following structure:
    {
      "problemStatement": "...",
      "examples": [
        {
          "input": "...",
          "output": "...",
          "explanation": "..." (if available)
        }
      ],
      "constraints": [
        "...",
        "..."
      ]
    }

    Problem description:
    ${description}
    `;

    try {
      const completion = await groq.chat.completions.create({
        messages: [{ role: "user", content: prompt }],
        model: "llama-3.1-8b-instant",
      });

      const content = completion.choices[0]?.message?.content || "";
      
      // Extract JSON content from markdown response
      const jsonMatch = content.match(/```json\n([\s\S]*?)\n```/);
      const jsonContent = jsonMatch ? jsonMatch[1] : content;

      let formattedContent;

      try {
        formattedContent = JSON.parse(jsonContent);
      } catch (parseError) {
        console.error('Error parsing JSON:', parseError);
        // Fallback: use the original description if parsing fails
        formattedContent = {
          problemStatement: description,
          examples: [],
          constraints: []
        };
      }

      setFormattedProblem(formattedContent);
    } catch (error) {
      console.error('Error formatting problem description:', error);
      // Fallback: use the original description if API call fails
      setFormattedProblem({
        problemStatement: description,
        examples: [],
        constraints: []
      });
    }
  };

  const handleCodeChange = (value: string | undefined) => {
    if (value) {
      setCode(value);
    }
  };

  if (isLoading) return (
    <div className="relative min-h-[calc(100vh-4rem)]">
      <RouteLoader />
    </div>
  );

  if (!problem || !formattedProblem) return <div>Problem not found</div>;

  return (
    <div className="mx-auto py-10 space-y-6 px-4 sm:px-6 lg:px-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-bold">{problem.title}</CardTitle>
          <div className="flex space-x-2 mt-2">
            <Badge variant="outline">{problem.difficulty}</Badge>
            <Badge variant="outline">Acceptance: {problem.acceptance_rate}%</Badge>
            {problem.is_premium && <Badge variant="secondary">Premium</Badge>}
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-semibold">Problem Statement</h3>
              <p>{formattedProblem.problemStatement}</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold">Examples</h3>
              {formattedProblem.examples.map((example: any, index: number) => (
                <div key={index} className="mt-2">
                  <p><strong>Example {index + 1}:</strong></p>
                  <p>Input: {example.input}</p>
                  <p>Output: {example.output}</p>
                  {example.explanation && <p>Explanation: {example.explanation}</p>}
                </div>
              ))}
            </div>
            <div className="mb-4">
              <h3 className="text-xl font-semibold mb-2">Constraints</h3>
              <div className="flex flex-wrap gap-2">
                {formattedProblem.constraints.map((constraint: string, index: number) => (
                  <Badge key={index} variant="secondary">{constraint}</Badge>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-4 space-y-4">
            <div>
              <h3 className="text-xl font-semibold mb-2">Companies</h3>
              <div className="flex flex-wrap gap-2">
                {typeof problem.companies === 'string'
                  ? problem.companies.split(',').map((company: string, index: number) => (
                      <Badge key={index} variant="outline">{company.trim()}</Badge>
                    ))
                  : Array.isArray(problem.companies)
                    ? problem.companies.map((company: string, index: number) => (
                        <Badge key={index} variant="outline">{company}</Badge>
                      ))
                    : <Badge variant="outline">{problem.companies}</Badge>
                }
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Related Topics</h3>
              <div className="flex flex-wrap gap-2">
                {typeof problem.related_topics === 'string'
                  ? problem.related_topics.split(',').map((topic: string, index: number) => (
                      <Badge key={index} variant="outline">{topic.trim()}</Badge>
                    ))
                  : Array.isArray(problem.related_topics)
                    ? problem.related_topics.map((topic: string, index: number) => (
                        <Badge key={index} variant="outline">{topic}</Badge>
                      ))
                    : <Badge variant="outline">{problem.related_topics}</Badge>
                }
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <Badge variant="secondary" className="bg-green-300 text-green-800">Likes: {problem.likes}</Badge>
            <Badge variant="secondary" className="bg-red-300 text-red-800">Dislikes: {problem.dislikes}</Badge>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <h2 className="text-2xl font-bold mb-4">Code Editor</h2>
          <CodeEditor code={code} onChange={handleCodeChange} />
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-4">AI Coach</h2>
          <Card className="h-[calc(100vh-16rem)] overflow-hidden">
            <CardContent className="p-0 h-full">
              <AICoach code={code} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}