'use client';
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { CreateMLCEngine } from '@mlc-ai/web-llm';

const MODEL_ID = 'SmolLM2-135M-Instruct-q0f16-MLC';

interface KIContextType {
  engine: any | null;
  loading: boolean;
  activeNodes: number;
}

const KIContext = createContext<KIContextType | undefined>(undefined);

export function KIProvider({ children }: { children: ReactNode }) {
  const [engine, setEngine] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeNodes, setActiveNodes] = useState(0);

  // Load WebLLM engine silently
  useEffect(() => {
    let mounted = true;
    const load = async () => {
      try {
        const eng = await CreateMLCEngine(MODEL_ID, {
          initProgressCallback: () => {},
        });
        if (mounted) {
          setEngine(eng);
          setLoading(false);
        }
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    load();
    return () => { mounted = false; };
  }, []);

  // Poll node count every 5 seconds (reliable, no WebSocket needed)
  useEffect(() => {
    const fetchNodes = async () => {
      try {
        const res = await fetch('/api/node/count');
        const data = await res.json();
        setActiveNodes(data.count);
      } catch (err) {
        console.error('Failed to fetch node count', err);
      }
    };
    fetchNodes();
    const interval = setInterval(fetchNodes, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <KIContext.Provider value={{ engine, loading, activeNodes }}>
      {children}
    </KIContext.Provider>
  );
}

export const useKI = () => {
  const ctx = useContext(KIContext);
  if (!ctx) throw new Error('useKI must be used within KIProvider');
  return ctx;
};
