'use client';
import { useState, useEffect } from 'react';

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

  const fetchPosts = async () => {
    const res = await fetch('/api/ki-social');
    const data = await res.json();
    setPosts(data);
  };

  useEffect(() => {
    fetchPosts();
    const interval = setInterval(fetchPosts, 3000);
    return () => clearInterval(interval);
  }, []);

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
  };

  const vote = async (id: string, type: 'up' | 'down') => {
    await fetch('/api/ki-social', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, type }),
    });
    fetchPosts();
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-serif">KI Social – Image Sharing</h2>
      <div className="glass-card p-4 rounded-xl space-y-3">
        <input type="file" accept="image/*" onChange={handleImageUpload} className="text-gray-400" />
        <input type="text" placeholder="Caption" value={caption} onChange={e => setCaption(e.target.value)} className="w-full bg-black/50 rounded-lg px-3 py-2" />
        <button onClick={addPost} className="bg-cyan-600 px-4 py-2 rounded-full">Share</button>
      </div>

      <div className="space-y-4">
        {posts.map(post => (
          <div key={post.id} className="glass-card p-4 rounded-xl">
            <img src={post.image_base64} alt="post" className="max-h-96 rounded-lg mb-2" />
            <p className="text-gray-300">{post.caption}</p>
            <div className="flex gap-4 mt-2">
              <button onClick={() => vote(post.id, 'up')}>👍 {post.upvotes}</button>
              <button onClick={() => vote(post.id, 'down')}>👎 {post.downvotes}</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
