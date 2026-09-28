'use client';
import { useState } from 'react';

export default function Home() {
  const [prompt, setPrompt] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setLoading(true);
    setOutput('');

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });
      const data = await response.json();
      
      if (data.error) {
        setOutput(`Error: ${data.error}`);
      } else {
        setOutput(data.output);
      }
    } catch (err) {
      setOutput('Failed to communicate with your serverless .pth backend function.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 bg-slate-900 text-slate-100">
      <div className="w-full max-w-3xl bg-slate-800 rounded-xl shadow-2xl border border-slate-700 p-8">
        <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-400 mb-2">
          Custom .pth LLM Workspace
        </h1>
        <p className="text-sm text-slate-400 mb-6">
          Deploying direct custom checkpoint weight inferences to Vercel Serverless runtimes.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Input Prompt</label>
            <textarea
              className="w-full h-32 p-4 bg-slate-950 rounded-lg border border-slate-700 focus:ring-2 focus:ring-blue-500 focus:outline-none text-slate-200 placeholder-slate-500 resize-none"
              placeholder="Type your prompt here..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-teal-500 text-white font-semibold rounded-lg shadow-md hover:from-blue-600 hover:to-teal-600 focus:outline-none disabled:opacity-50 transition duration-150"
          >
            {loading ? 'Processing Input Matrix...' : 'Run .pth Inference'}
          </button>
        </form>

        <div className="mt-8">
          <label className="block text-sm font-medium text-slate-300 mb-2">Output Result</label>
          <div className="w-full min-h-32 p-4 bg-slate-950 rounded-lg border border-slate-700 text-slate-300 whitespace-pre-wrap font-mono text-sm">
            {output || <span className="text-slate-600">Generated inference text will output here...</span>}
          </div>
        </div>
      </div>
    </main>
  );
}
