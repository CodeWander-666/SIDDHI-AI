'use client';
import { useState } from 'react';

export function BotUploadForm() {
  const [status, setStatus] = useState('');

  const handleUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    setStatus('Uploading...');
    // Simulate upload – replace with real API call
    setTimeout(() => {
      setStatus('✅ Bot submitted for review. You will be paid per 1000 uses.');
    }, 1500);
  };

  return (
    <div className="glass-card p-6 rounded-2xl mt-8">
      <h3 className="text-2xl font-serif mb-4">Submit Your AI Bot</h3>
      <p className="text-gray-400 text-sm mb-4">Upload a zip file containing your bot definition (JSON).</p>
      <form onSubmit={handleUpload} className="space-y-4">
        <input type="text" name="name" placeholder="Bot Name" required className="w-full bg-black/50 rounded-full px-4 py-2 border border-gold-400/30" />
        <input type="file" name="zipFile" accept=".zip" required className="text-gray-400" />
        <button type="submit" className="px-6 py-2 rounded-full bg-gold-600 text-white font-semibold">Submit</button>
        {status && <p className="text-sm text-cyan-400">{status}</p>}
      </form>
    </div>
  );
}
