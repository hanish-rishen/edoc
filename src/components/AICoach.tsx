import React, { useState, useEffect } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import BlurIn from "@/components/magicui/blur-in";
import { useCallback } from 'react';
import debounce from 'lodash/debounce';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Button } from "@/components/ui/button";
import { ClipboardCopy, Check } from "lucide-react";
import EnhancedLoadingIndicator from "@/components/EnhancedLoadingIndicator";

interface AICoachProps {
  code: string;
}

const AICoach: React.FC<AICoachProps> = ({ code }) => {
  const [feedback, setFeedback] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const analyzecode = useCallback(
    debounce((codeToAnalyze: string) => {
      const analyze = async () => {
        setIsLoading(true);
        const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
        if (!apiKey) {
          console.error('API key is not set');
          setFeedback('API key is not configured properly.');
          setIsLoading(false);
          return;
        }
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

        const prompt = `Analyze the following code and provide feedback on any mistakes or improvements:

${codeToAnalyze}

Please provide concise feedback in markdown format.`;

        try {
          const result = await model.generateContent(prompt);
          const response = await result.response;
          const text = response.text();
          setFeedback(text);
        } catch (error) {
          console.error('Error generating content:', error);
          setFeedback('An error occurred while analyzing the code.');
        } finally {
          setIsLoading(false);
        }
      };
      analyze();
    }, 2000),
    []
  );

  useEffect(() => {
    analyzecode(code);
  }, [code, analyzecode]);

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    });
  };

  return (
    <ScrollArea className="h-full w-full">
      {isLoading ? (
        <div className="h-full flex items-center justify-center">
          <EnhancedLoadingIndicator value={5000} duration={5} />
        </div>
      ) : (
        <BlurIn
          word={
            <ReactMarkdown
              className="whitespace-pre-wrap text-black dark:text-white text-sm text-left p-2 sm:p-4"
              components={{
                code({ inline, className, children, ...props }: React.ComponentPropsWithoutRef<'code'> & { inline?: boolean }) {
                  const match = /language-(\w+)/.exec(className || '');
                  return !inline && match ? (
                    <div className="relative my-2 sm:my-4">
                      <div className="overflow-x-auto">
                        <SyntaxHighlighter
                          style={vscDarkPlus as any}
                          language={match[1]}
                          PreTag="div"
                          {...props}
                          customStyle={{
                            fontSize: '0.75rem',
                            padding: '0.5rem',
                            borderRadius: '0.375rem',
                          }}
                          wrapLines={true}
                          wrapLongLines={true}
                        >
                          {String(children).replace(/\n$/, '')}
                        </SyntaxHighlighter>
                      </div>
                      <Button
                        className="absolute top-2 right-2 p-1 z-10"
                        variant="outline"
                        size="sm"
                        onClick={() => copyToClipboard(String(children), 0)}
                      >
                        {copiedIndex === 0 ? (
                          <Check className="h-4 w-4 text-green-500" />
                        ) : (
                          <ClipboardCopy className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  ) : (
                    <code className={className} {...props}>
                      {children}
                    </code>
                  );
                },
              }}
            >
              {feedback}
            </ReactMarkdown>
          }
        />
      )}
      <ScrollBar orientation="vertical" />
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
};

export default AICoach;