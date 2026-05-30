'use client';
import { useState, useEffect, useCallback, useRef } from 'react';
import { ThumbsUp, ThumbsDown, ImagePlus } from 'lucide-react';

interface SocialPost {
  id: string;
  author: string;
  image_base64: string;
  caption: string;
  upvotes: number;
  downvotes: number;
  created_at: number;
}

export function SocialFeed() {
  const [posts, setPosts] = useState<SocialPost[]>([]);
  const [imageBase64, setImageBase64] = useState('');
  const [caption, setCaption] = useState('');
  const [loading, setLoading] = useState(false);
  const pollInterval = useRef<NodeJS.Timeout | null>(null);

  const fetchPosts = useCallback(async () => {
    try {
      const res = await fetch('/api/ki-social');
      if (!res.ok) throw new Error('Failed to fetch posts');
      const data = await res.json();
      setPosts(data);
    } catch (err) {
      console.error(err);
    }
  }, []);

  useEffect(() => {
    fetchPosts();
    pollInterval.current = setInterval(fetchPosts, 3000);
    return () => {
      if (pollInterval.current) clearInterval(pollInterval.current);
    };
  }, [fetchPosts]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.size <= 102400) {
      const reader = new FileReader();
      reader.onloadend = () => setImageBase64(reader.result as string);
      reader.readAsDataURL(file);
    } else {
      alert('Image must be under 100KB');
    }
  };

  const addPost = async () => {
    if (!imageBase64) return;
    setLoading(true);
    try {
      await fetch('/api/ki-social', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: crypto.randomUUID(),
          author: 'User',
          imageBase64,
          caption,
        }),
      });
      setImageBase64('');
      setCaption('');
      fetchPosts();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const vote = async (id: string, type: 'up' | 'down') => {
    try {
      await fetch('/api/ki-social', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, type }),
      });
      setPosts(prev => prev.map(p => p.id === id ? { ...p, upvotes: p.upvotes + (type === 'up' ? 1 : 0), downvotes: p.downvotes + (type === 'down' ? 1 : 0) } : p));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-serif">KI Social – Image Sharing</h2>
      <div className="glass-card p-4 rounded-xl space-y-3">
        <input type="file" accept="image/*" onChange={handleImageUpload} className="text-gray-400" />
        <input type="text" placeholder="Caption" value={caption} onChange={e => setCaption(e.target.value)} className="w-full bg-black/50 rounded-lg px-3 py-2" />
        <button onClick={addPost} disabled={loading} className="bg-cyan-600 px-4 py-2 rounded-full">Share</button>
      </div>

      <div className="space-y-4">
        {posts.map(post => (
          <div key={post.id} className="glass-card p-4 rounded-xl">
            <img src={post.image_base64} alt="post" className="max-h-96 rounded-lg mb-2" />
            <p className="text-gray-300">{post.caption}</p>
            <div className="flex gap-4 mt-2">
              <button onClick={() => vote(post.id, 'up')} className="flex items-center gap-1 hover:text-cyan-400">👍 {post.upvotes}</button>
              <button onClick={() => vote(post.id, 'down')} className="flex items-center gap-1 hover:text-red-400">👎 {post.downvotes}</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
