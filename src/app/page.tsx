"use client";
import React, { useState } from 'react';
import CodeEditor from '../components/CodeEditor';
import AICoach from '../components/AICoach';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Home: React.FC = () => {
  const [code, setCode] = useState<string>('// Start coding here');

  const handleCodeChange = (value: string | undefined) => {
    if (value) {
      setCode(value);
    }
  };

  return (
    <div className="container mx-auto p-4 flex flex-col lg:flex-row gap-4 h-screen">
      <div className="w-full lg:w-2/3 flex flex-col">
        <h2 className="text-2xl font-bold mb-4">Code Editor</h2>
        <CodeEditor code={code} onChange={handleCodeChange} />
      </div>
      <div className="w-full lg:w-1/3 flex flex-col">
        <h2 className="text-2xl font-bold mb-4">AI Coach</h2>
        <Card className="flex-grow overflow-hidden">
          <CardContent className="p-0 h-full">
            <AICoach code={code} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Home;