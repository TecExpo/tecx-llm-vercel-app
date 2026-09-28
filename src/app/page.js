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
    <main className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 bg-slate-950 text-slate-100 selection:bg-teal-500/30">
      <div className="w-full max-w-2xl bg-slate-900 rounded-2xl shadow-2xl border border-slate-800 p-6 sm:p-8 space-y-6">
        
        {/* ─── ENHANCED COMPANY BANNER CARD ─── */}
        <div className="w-full rounded-xl overflow-hidden border border-slate-700/50 shadow-lg bg-white p-4 transition-all duration-300 hover:border-teal-500/50">
          <img 
            src="/favicon.jpg"  //src="/company-banner.png" 
            alt="TecX Company Details Banner" 
            className="w-full h-auto object-contain max-h-64 mx-auto"
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
        </div>

        {/* ─── HEADER SECTION ─── */}
        <div className="space-y-1 text-center sm:text-left border-b border-slate-800 pb-4">
          <h1 className="text-3xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-cyan-400 to-blue-500">
            TecX LLM Workspace
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 font-medium">
            Deploying direct custom checkpoint weight inferences to Vercel Serverless runtimes.
          </p>
        </div>

        {/* ─── INTERACTIVE INPUT FORM ─── */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400">
              Input Prompt
            </label>
            <textarea
              className="w-full h-36 p-4 bg-slate-950 rounded-xl border border-slate-800 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 focus:outline-none text-slate-200 placeholder-slate-600 resize-none font-sans text-sm transition-all duration-200"
              placeholder="Type your system token or prompt query here..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
          </div>

          {/* ─── CUSTOMIZED BUTTON ─── */}
          <button
            type="submit"
            disabled={loading}
            className="w-full relative group overflow-hidden py-3.5 px-4 bg-gradient-to-r from-teal-500 via-cyan-500 to-blue-600 text-white font-bold text-sm rounded-xl shadow-lg shadow-teal-500/10 hover:shadow-cyan-500/20 focus:outline-none disabled:opacity-40 transition-all duration-300 transform active:scale-[0.99]"
          >
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-emerald-500 to-teal-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out"></span>
            <span className="relative flex items-center justify-center gap-2 tracking-wide">
              {loading ? (
                <>
                  <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Processing Input Matrix...
                </>
              ) : (
                'Execute TecX Inference'
              )}
            </span>
          </button>
        </form>

        {/* ─── OUTPUT TERMINAL BLOCK ─── */}
        <div className="space-y-2 pt-2">
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400">
            Output Result
          </label>
          <div className="w-full min-h-36 p-4 bg-slate-950 rounded-xl border border-slate-800 text-teal-400 whitespace-pre-wrap font-mono text-xs sm:text-sm leading-relaxed shadow-inner">
            {output || (
              <span className="text-slate-600 italic font-sans">
                Generated tensor token arrays will stream here after execution execution...
              </span>
            )}
          </div>
        </div>
      </div>
    </main>
  );
              }
              
