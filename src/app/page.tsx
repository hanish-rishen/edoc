"use client";
import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import AICoach from '../components/AICoach';
import { Card, CardContent } from "@/components/ui/card";

const CodeEditor = dynamic(() => import('../components/CodeEditor'), {
  ssr: false,
});

const Home: React.FC = () => {
  const [code, setCode] = useState<string>('// Start coding here');

  const handleCodeChange = (value: string | undefined) => {
    if (value) {
      setCode(value);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-2 sm:gap-4 p-2 sm:p-4">
      <div className="w-full lg:w-2/3 flex flex-col">
        <h2 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-4">Code Editor</h2>
        <CodeEditor code={code} onChange={handleCodeChange} />
      </div>
      <div className="w-full lg:w-1/3 flex flex-col mt-2 lg:mt-0">
        <h2 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-4">AI Coach</h2>
        <Card className="flex-grow overflow-hidden h-[calc(100vh-12rem)]">
          <CardContent className="p-0 h-full">
            <AICoach code={code} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Home;