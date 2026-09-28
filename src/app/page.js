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
    <main className="min-h-screen w-full flex flex-col items-center justify-start py-8 px-4 sm:px-6 bg-slate-950 text-slate-100 selection:bg-teal-500/30">
      <div className="w-full max-w-2xl flex flex-col gap-6">
        
        {/* ─── ENHANCED COMPANY BANNER CARD ─── */}
        <div className="w-full rounded-2xl overflow-hidden border border-slate-800 bg-white p-4 shadow-xl transition-all duration-300 hover:border-teal-500/30">
          <img 
            src="/favicon.jpg"  // Maps to your fallback if banner isn't found
            alt="TecX Company Details Banner" 
            className="w-full h-auto object-contain max-h-48 mx-auto"
            onError={(e) => {
              // Standard styling fallback if missing image causes distortion
              e.target.style.maxHeight = '140px'; 
            }}
          />
        </div>

        {/* ─── MAIN WORKSPACE CONSOLE ─── */}
        <div className="w-full bg-slate-900 rounded-2xl shadow-2xl border border-slate-800/80 p-5 sm:p-8 flex flex-col gap-6">
          
          {/* HEADER SECTION */}
          <div className="flex flex-col gap-1 border-b border-slate-800/60 pb-5">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-cyan-400 to-blue-500">
              TecX LLM Workspace
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 font-medium">
              Deploying direct custom checkpoint weight inferences to Vercel Serverless runtimes.
            </p>
          </div>

          {/* INTERACTIVE FORM SECTION */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">
                  Input Prompt
                </label>
                <span className="text-[10px] text-slate-500 font-mono">Status: Ready</span>
              </div>
              
              {/* FIXED PROMPT AREA: Enlarged, highlighted, and forced visibility */}
              <div className="relative group rounded-xl p-[1px] bg-gradient-to-b from-slate-800 to-slate-900 focus-within:from-teal-500 focus-within:to-cyan-500 transition-all duration-300 shadow-md">
                <textarea
                  className="w-full min-h-[160px] p-4 bg-slate-950 rounded-[11px] border-none focus:outline-none focus:ring-0 text-slate-200 placeholder-slate-500 resize-y font-sans text-sm sm:text-base leading-relaxed transition-all"
                  placeholder="Type your system token or prompt query here..."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                />
              </div>
            </div>

            {/* ACTION BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="w-full relative group overflow-hidden py-4 px-6 bg-gradient-to-r from-teal-500 via-cyan-500 to-blue-600 text-white font-bold text-sm sm:text-base rounded-xl shadow-lg shadow-teal-950/50 hover:shadow-cyan-500/10 focus:outline-none disabled:opacity-40 transition-all duration-300 transform active:scale-[0.995]"
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-emerald-500 to-teal-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out"></span>
              <span className="relative flex items-center justify-center gap-2.5 tracking-wide">
                {loading ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
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

          {/* OUTPUT TERMINAL BLOCK */}
          <div className="flex flex-col gap-2 pt-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">
              Output Result
            </label>
            <div className="w-full min-h-[160px] p-4 bg-slate-950 rounded-xl border border-slate-800 text-teal-400 whitespace-pre-wrap font-mono text-xs sm:text-sm leading-relaxed shadow-inner border-t-2 border-t-slate-800">
              {output || (
                <span className="text-slate-600 italic font-sans block pt-1">
                  Generated tensor token arrays will stream here after execution...
                </span>
              )}
            </div>
          </div>

        </div>
      </div>
    </main>
  );
                }
                
