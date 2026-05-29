'use client';
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { CreateMLCEngine } from '@mlc-ai/web-llm';

const MODEL_ID = 'SmolLM2-135M-Instruct-q0f16-MLC';
const NODE_ID_KEY = 'ki_node_id';

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

  // Register node immediately (no engine required)
  useEffect(() => {
    let nodeId = localStorage.getItem(NODE_ID_KEY);
    if (!nodeId) {
      nodeId = crypto.randomUUID();
      localStorage.setItem(NODE_ID_KEY, nodeId);
    }

    const register = () => {
      fetch('/api/node/heartbeat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nodeId }),
      }).catch(e => console.warn('Heartbeat failed:', e));
    };

    register();
    const heartbeatInterval = setInterval(register, 30000);
    const unregister = () => {
      fetch('/api/node/unregister', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nodeId }),
      }).catch(e => console.warn('Unregister failed:', e));
    };
    window.addEventListener('beforeunload', unregister);

    return () => {
      clearInterval(heartbeatInterval);
      window.removeEventListener('beforeunload', unregister);
      unregister();
    };
  }, []);

  // Load WebLLM engine in background
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
        console.error('Engine load error', err);
        setLoading(false);
      }
    };
    load();
    return () => { mounted = false; };
  }, []);

  // Poll node count every 2 seconds
  useEffect(() => {
    const fetchNodes = async () => {
      try {
        const res = await fetch('/api/node/count');
        const data = await res.json();
        setActiveNodes(data.count || 0);
      } catch (err) {
        console.error('Node count poll failed', err);
      }
    };
    fetchNodes();
    const interval = setInterval(fetchNodes, 2000);
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
