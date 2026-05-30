'use client';
import { useState, useEffect, useCallback, useRef } from 'react';
import { CheckCircle, ThumbsUp, ThumbsDown, MessageCircle, Send } from 'lucide-react';

interface Community {
  id: string;
  name: string;
  description: string;
}

interface Post {
  id: string;
  community_id: string;
  author: string;
  title: string;
  content: string;
  upvotes: number;
  downvotes: number;
  created_at: number;
}

interface Comment {
  id: string;
  post_id: string;
  author: string;
  content: string;
  upvotes: number;
  downvotes: number;
  created_at: number;
}

export function CommunityChat() {
  const [communities, setCommunities] = useState<Community[]>([]);
  const [selectedCommunity, setSelectedCommunity] = useState<string | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [comments, setComments] = useState<Record<string, Comment[]>>({});
  const [newCommunityName, setNewCommunityName] = useState('');
  const [newCommunityDesc, setNewCommunityDesc] = useState('');
  const [showCreate, setShowCreate] = useState(false);
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostContent, setNewPostContent] = useState('');
  const [newComment, setNewComment] = useState('');
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const pollInterval = useRef<NodeJS.Timeout | null>(null);

  const fetchCommunities = useCallback(async () => {
    try {
      const res = await fetch('/api/ki-community/communities');
      if (!res.ok) throw new Error('Failed to fetch communities');
      const data = await res.json();
      setCommunities(data);
      if (!selectedCommunity && data.length) setSelectedCommunity(data[0].id);
    } catch (err) {
      console.error(err);
      setError('Could not load communities. Please refresh.');
    }
  }, [selectedCommunity]);

  const fetchPosts = useCallback(async (communityId: string) => {
    try {
      const res = await fetch(`/api/ki-community/posts?communityId=${communityId}`);
      if (!res.ok) throw new Error('Failed to fetch posts');
      const data = await res.json();
      setPosts(data);
    } catch (err) {
      console.error(err);
    }
  }, []);

  const fetchComments = useCallback(async (postId: string) => {
    try {
      const res = await fetch(`/api/ki-community/comments?postId=${postId}`);
      if (!res.ok) throw new Error('Failed to fetch comments');
      const data = await res.json();
      setComments(prev => ({ ...prev, [postId]: data }));
    } catch (err) {
      console.error(err);
    }
  }, []);

  // Poll every 3 seconds for new posts/comments (real‑time feel)
  useEffect(() => {
    if (selectedCommunity) {
      fetchPosts(selectedCommunity);
      pollInterval.current = setInterval(() => fetchPosts(selectedCommunity), 3000);
      return () => {
        if (pollInterval.current) clearInterval(pollInterval.current);
      };
    }
  }, [selectedCommunity, fetchPosts]);

  useEffect(() => {
    fetchCommunities();
    const commInterval = setInterval(fetchCommunities, 10000);
    return () => clearInterval(commInterval);
  }, [fetchCommunities]);

  const createCommunity = async () => {
    if (!newCommunityName.trim()) return;
    setLoading(true);
    try {
      const res = await fetch('/api/ki-community/communities', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: crypto.randomUUID(), name: newCommunityName, description: newCommunityDesc }),
      });
      if (!res.ok) throw new Error('Failed to create community');
      setNewCommunityName('');
      setNewCommunityDesc('');
      setShowCreate(false);
      fetchCommunities();
    } catch (err) {
      console.error(err);
      setError('Could not create community.');
    } finally {
      setLoading(false);
    }
  };

  const createPost = async () => {
    if (!selectedCommunity || !newPostTitle.trim()) return;
    setLoading(true);
    try {
      const res = await fetch('/api/ki-community/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: crypto.randomUUID(),
          communityId: selectedCommunity,
          author: 'User',
          title: newPostTitle,
          content: newPostContent,
        }),
      });
      if (!res.ok) throw new Error('Failed to create post');
      setNewPostTitle('');
      setNewPostContent('');
      fetchPosts(selectedCommunity);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const votePost = async (postId: string, type: 'up' | 'down') => {
    try {
      await fetch('/api/ki-community/posts/vote', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ postId, type }),
      });
      // Optimistic update
      setPosts(prev => prev.map(p => p.id === postId ? { ...p, upvotes: p.upvotes + (type === 'up' ? 1 : 0), downvotes: p.downvotes + (type === 'down' ? 1 : 0) } : p));
    } catch (err) {
      console.error(err);
    }
  };

  const addComment = async (postId: string) => {
    if (!newComment.trim()) return;
    try {
      const res = await fetch('/api/ki-community/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: crypto.randomUUID(),
          postId,
          author: 'User',
          content: newComment,
        }),
      });
      if (!res.ok) throw new Error('Failed to add comment');
      setNewComment('');
      setReplyingTo(null);
      fetchComments(postId);
    } catch (err) {
      console.error(err);
    }
  };

  if (error) return <div className="text-red-400 text-center p-4">{error}</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-serif">KI Community Chat</h2>
        <button onClick={() => setShowCreate(!showCreate)} className="text-cyan-400 text-sm">+ New Community</button>
      </div>

      {showCreate && (
        <div className="glass-card p-4 rounded-xl space-y-3">
          <input type="text" placeholder="Community name" value={newCommunityName} onChange={e => setNewCommunityName(e.target.value)} className="w-full bg-black/50 rounded-lg px-3 py-2 border border-white/10" />
          <textarea placeholder="Description" value={newCommunityDesc} onChange={e => setNewCommunityDesc(e.target.value)} className="w-full bg-black/50 rounded-lg px-3 py-2 border border-white/10" rows={2} />
          <button onClick={createCommunity} disabled={loading} className="bg-gold-600 px-4 py-2 rounded-full text-sm">Create</button>
        </div>
      )}

      <div className="flex gap-4 flex-wrap">
        {communities.map(c => (
          <button key={c.id} onClick={() => setSelectedCommunity(c.id)} className={`px-4 py-2 rounded-full text-sm ${selectedCommunity === c.id ? 'bg-cyan-600' : 'bg-white/10 hover:bg-white/20'}`}>
            r/{c.name}
          </button>
        ))}
      </div>

      {selectedCommunity && (
        <>
          <div className="border-t border-white/10 pt-6">
            <div className="glass-card p-4 rounded-xl mb-6">
              <input type="text" placeholder="Post title" value={newPostTitle} onChange={e => setNewPostTitle(e.target.value)} className="w-full bg-black/50 rounded-lg px-3 py-2 mb-2" />
              <textarea placeholder="Content" value={newPostContent} onChange={e => setNewPostContent(e.target.value)} className="w-full bg-black/50 rounded-lg px-3 py-2" rows={3} />
              <button onClick={createPost} disabled={loading} className="mt-2 bg-cyan-600 px-4 py-2 rounded-full text-sm">Create Post</button>
            </div>

            {posts.map(post => (
              <div key={post.id} className="glass-card p-4 rounded-xl mb-4">
                <h3 className="text-xl font-semibold">{post.title}</h3>
                <p className="text-gray-300 mt-1">{post.content}</p>
                <div className="flex gap-4 mt-3 text-sm">
                  <button onClick={() => votePost(post.id, 'up')} className="flex items-center gap-1 hover:text-cyan-400">👍 {post.upvotes}</button>
                  <button onClick={() => votePost(post.id, 'down')} className="flex items-center gap-1 hover:text-red-400">👎 {post.downvotes}</button>
                  <button onClick={() => { setReplyingTo(replyingTo === post.id ? null : post.id); fetchComments(post.id); }} className="flex items-center gap-1 hover:text-gold-400">💬 {comments[post.id]?.length || 0} comments</button>
                </div>
                {replyingTo === post.id && (
                  <div className="mt-3 space-y-3">
                    {comments[post.id]?.map(comment => (
                      <div key={comment.id} className="bg-white/5 p-3 rounded-lg">
                        <p className="text-sm">{comment.content}</p>
                        <div className="flex gap-2 mt-1 text-xs text-gray-400">
                          <span>👍 {comment.upvotes}</span> <span>👎 {comment.downvotes}</span>
                        </div>
                      </div>
                    ))}
                    <div className="flex gap-2">
                      <input type="text" placeholder="Write a comment..." value={newComment} onChange={e => setNewComment(e.target.value)} className="flex-1 bg-black/50 rounded-lg px-3 py-2" />
                      <button onClick={() => addComment(post.id)} className="bg-gold-600 px-3 py-2 rounded-full text-sm">Post</button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
