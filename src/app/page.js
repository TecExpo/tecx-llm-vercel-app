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
    <main 
      className="min-h-screen w-full flex flex-col items-center justify-start py-8 px-4"
      style={{ backgroundColor: '#0f172a', minHeight: '100vh', fontFamily: 'sans-serif', color: '#f8fafc' }}
    >
      <div className="w-full max-w-2xl flex flex-col gap-6" style={{ width: '100%', maxWidth: '600px', margin: '0 auto' }}>
        
        {/* ─── COMPANY BANNER CONTAINER ─── */}
        <div 
          className="w-full shadow-xl" 
          style={{ backgroundColor: '#ffffff', borderRadius: '16px', overflow: 'hidden', padding: '16px', border: '1px solid #334155', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.3)' }}
        >
          <img 
            src="/favicon.jpg" 
            alt="TecX Company Details Banner" 
            className="w-full h-auto"
            style={{ width: '100%', height: 'auto', display: 'block', maxHeight: '200px', objectFit: 'contain' }}
          />
        </div>

        {/* ─── MAIN APP DESKTOP CONSOLE CARD ─── */}
        <div 
          className="w-full shadow-2xl" 
          style={{ backgroundColor: '#1e293b', borderRadius: '20px', padding: '24px', border: '1px solid #475569', display: 'flex', flexDirection: 'column', gap: '20px' }}
        >
          
          {/* HEADER PARAGRAPH BLOCK */}
          <div style={{ borderBottom: '1px solid #334155', paddingBottom: '16px' }}>
            <h1 style={{ fontSize: '28px', fontWeight: '900', color: '#2dd4bf', margin: '0 0 6px 0', letterSpacing: '-0.5px' }}>
              TecX LLM Workspace
            </h1>
            <p style={{ fontSize: '13px', color: '#94a3b8', margin: '0', fontWeight: '500' }}>
              Deploying direct custom checkpoint weight inferences to Vercel Serverless runtimes.
            </p>
          </div>

          {/* INTERACTIVE FORM ENGINE */}
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
            {/* INPUT PROMPT CONTAINER */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'between', alignItems: 'center' }}>
                <label style={{ fontSize: '12px', fontWeight: '700', uppercase: 'true', tracking: 'wider', color: '#94a3b8', textTransform: 'uppercase' }}>
                  Input Prompt
                </label>
              </div>
              
              {/* ENLARGED, DEEP-SLATE PROMPT FIELD WITH CURVED CORNERS */}
              <textarea
                style={{
                  width: '100%',
                  minHeight: '180px',
                  padding: '16px',
                  backgroundColor: '#0f172a',
                  color: '#f8fafc',
                  border: '2px solid #2dd4bf', // Striking teal border highlight
                  borderRadius: '14px',        // Smoothly curved corners
                  fontSize: '16px',
                  lineHeight: '1.6',
                  outline: 'none',
                  resize: 'vertical',
                  boxSizing: 'border-box'
                }}
                placeholder="Type your system token or prompt query here..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
              />
            </div>

            {/* HIGH-VISIBILITY EXECUTE BUTTON */}
            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                padding: '16px',
                background: loading ? '#475569' : 'linear-gradient(135deg, #14b8a6 0%, #06b6d4 100%)',
                color: '#ffffff',
                fontWeight: '700',
                fontSize: '16px',
                border: 'none',
                borderRadius: '12px',         // Smooth curved button corners
                cursor: loading ? 'not-allowed' : 'pointer',
                boxShadow: '0 4px 14px 0 rgba(20, 184, 166, 0.3)',
                transition: 'all 0.2s ease',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}
            >
              {loading ? 'Processing Input Matrix...' : 'Execute TecX Inference'}
            </button>
          </form>

          {/* OUTPUT RESPONSE SECTION */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', paddingTop: '10px' }}>
            <label style={{ fontSize: '12px', fontWeight: '700', color: '#94a3b8', textTransform: 'uppercase' }}>
              Output Result
            </label>
            <div 
              style={{
                width: '100%',
                minHeight: '150px',
                padding: '16px',
                backgroundColor: '#0f172a',
                color: '#4ade80',              // High-contrast matrix green text output
                border: '1px solid #334155',
                borderRadius: '14px',          // Clean curved matching terminal corners
                fontFamily: 'monospace',
                fontSize: '14px',
                whiteSpace: 'pre-wrap',
                boxSizing: 'border-box'
              }}
            >
              {output || (
                <span style={{ color: '#475569', fontStyle: 'italic', fontFamily: 'sans-serif' }}>
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
