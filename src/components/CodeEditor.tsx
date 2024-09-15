import React, { useState, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import * as monaco from 'monaco-editor';

interface CodeEditorProps {
  code: string;
  onChange: (value: string | undefined) => void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ code, onChange }) => {
  const [language, setLanguage] = useState('javascript');
  const [fileName, setFileName] = useState('main.js');
  const editorRef = React.useRef<monaco.editor.IStandaloneCodeEditor | null>(null);

  useEffect(() => {
    switch (language) {
      case 'typescript':
        setFileName('main.tsx');
        break;
      case 'python':
        setFileName('main.py');
        break;
      case 'html':
        setFileName('index.html');
        break;
      case 'css':
        setFileName('styles.css');
        break;
      default:
        setFileName('main.js');
    }
  }, [language]);

  const handleEditorDidMount = (editor: monaco.editor.IStandaloneCodeEditor, monacoInstance: typeof monaco) => {
    monacoInstance.editor.setTheme('vs-dark');
    editorRef.current = editor;
  };

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLanguage = e.target.value;
    setLanguage(newLanguage);
    
    // Update the language model
    if (editorRef.current) {
      const model = editorRef.current.getModel();
      if (model) {
        monaco.editor.setModelLanguage(model, newLanguage);
      }
    }

    // Update the code based on the new language
    let updatedCode = '';
    switch (newLanguage) {
      case 'javascript':
        updatedCode = '// JavaScript code here\nconsole.log("Hello, JavaScript!");';
        break;
      case 'typescript':
        updatedCode = '// TypeScript code here\nconst greeting: string = "Hello, TypeScript!";\nconsole.log(greeting);';
        break;
      case 'python':
        updatedCode = '# Python code here\nprint("Hello, Python!")';
        break;
      case 'html':
        updatedCode = '<!DOCTYPE html>\n<html lang="en">\n<head>\n    <meta charset="UTF-8">\n    <meta name="viewport" content="width=device-width, initial-scale=1.0">\n    <title>Hello, HTML!</title>\n</head>\n<body>\n    <h1>Hello, HTML!</h1>\n</body>\n</html>';
        break;
      case 'css':
        updatedCode = '/* CSS code here */\nbody {\n    font-family: Arial, sans-serif;\n    background-color: #f0f0f0;\n}\n\nh1 {\n    color: #333;\n}';
        break;
    }
    onChange(updatedCode);
  };

  return (
    <div className="border rounded-lg overflow-hidden">
      <div className="flex justify-between items-center bg-[#1E1E1E] text-white p-2">
        <div className="text-lg font-semibold">{fileName}</div>
        <select
          value={language}
          onChange={handleLanguageChange}
          className="bg-[#2D2D2D] text-white border border-gray-700 rounded px-2 py-1"
        >
          <option value="javascript">JavaScript</option>
          <option value="typescript">TypeScript</option>
          <option value="python">Python</option>
          <option value="html">HTML</option>
          <option value="css">CSS</option>
        </select>
      </div>
      <Editor
        height="calc(92vh - 8rem)"
        language={language}
        value={code}
        onChange={onChange}
        onMount={handleEditorDidMount}
        options={{
          minimap: { enabled: true },
          fontSize: 14,
          lineNumbers: 'on',
          roundedSelection: false,
          scrollBeyondLastLine: false,
          readOnly: false,
          theme: 'vs-dark',
        }}
      />
    </div>
  );
};

export default CodeEditor;