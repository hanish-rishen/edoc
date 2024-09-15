import React, { useState } from 'react';
import Editor from '@monaco-editor/react';

interface CodeEditorProps {
  code: string;
  onChange: (value: string | undefined) => void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ code, onChange }) => {
  const [language, setLanguage] = useState('javascript');

  const handleEditorDidMount = (editor: any, monaco: any) => {
    monaco.editor.setTheme('vs-dark');
  };

  return (
    <div className="border rounded-lg overflow-hidden">
      <div className="flex justify-between items-center bg-[#1E1E1E] text-white p-2">
        <div className="text-lg font-semibold">main.js</div>
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
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
        height="calc(90vh - 8rem)"
        defaultLanguage={language}
        defaultValue={code}
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