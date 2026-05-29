'use client';
import { useState, useEffect } from 'react';

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

  const fetchCommunities = async () => {
    const res = await fetch('/api/ki-community/communities');
    const data = await res.json();
    setCommunities(data);
  };

  const fetchPosts = async (communityId: string) => {
    const res = await fetch(`/api/ki-community/posts?communityId=${communityId}`);
    const data = await res.json();
    setPosts(data);
  };

  const fetchComments = async (postId: string) => {
    const res = await fetch(`/api/ki-community/comments?postId=${postId}`);
    const data = await res.json();
    setComments(prev => ({ ...prev, [postId]: data }));
  };

  useEffect(() => {
    fetchCommunities();
    const interval = setInterval(fetchCommunities, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (selectedCommunity) {
      fetchPosts(selectedCommunity);
      const interval = setInterval(() => fetchPosts(selectedCommunity), 3000);
      return () => clearInterval(interval);
    }
  }, [selectedCommunity]);

  const createCommunity = async () => {
    if (!newCommunityName.trim()) return;
    await fetch('/api/ki-community/communities', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: crypto.randomUUID(),
        name: newCommunityName,
        description: newCommunityDesc,
      }),
    });
    setNewCommunityName('');
    setNewCommunityDesc('');
    setShowCreate(false);
    fetchCommunities();
  };

  const createPost = async () => {
    if (!selectedCommunity || !newPostTitle.trim()) return;
    await fetch('/api/ki-community/posts', {
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
    setNewPostTitle('');
    setNewPostContent('');
    fetchPosts(selectedCommunity);
  };

  const votePost = async (postId: string, type: 'up' | 'down') => {
    await fetch('/api/ki-community/posts/vote', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ postId, type }),
    });
    fetchPosts(selectedCommunity!);
  };

  const addComment = async (postId: string) => {
    if (!newComment.trim()) return;
    await fetch('/api/ki-community/comments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: crypto.randomUUID(),
        postId,
        author: 'User',
        content: newComment,
      }),
    });
    setNewComment('');
    setReplyingTo(null);
    fetchComments(postId);
  };

  const voteComment = async (commentId: string, postId: string, type: 'up' | 'down') => {
    await fetch('/api/ki-community/comments/vote', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ commentId, type }),
    });
    fetchComments(postId);
  };

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
          <button onClick={createCommunity} className="bg-gold-600 px-4 py-2 rounded-full text-sm">Create</button>
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
              <button onClick={createPost} className="mt-2 bg-cyan-600 px-4 py-2 rounded-full text-sm">Create Post</button>
            </div>

            {posts.map(post => (
              <div key={post.id} className="glass-card p-4 rounded-xl mb-4">
                <h3 className="text-xl font-semibold">{post.title}</h3>
                <p className="text-gray-300 mt-1">{post.content}</p>
                <div className="flex gap-4 mt-3 text-sm">
                  <button onClick={() => votePost(post.id, 'up')}>👍 {post.upvotes}</button>
                  <button onClick={() => votePost(post.id, 'down')}>👎 {post.downvotes}</button>
                  <button onClick={async () => {
                    setReplyingTo(replyingTo === post.id ? null : post.id);
                    await fetchComments(post.id);
                  }}>💬 Reply ({comments[post.id]?.length || 0})</button>
                </div>
                {replyingTo === post.id && (
                  <div className="mt-3 space-y-3">
                    {comments[post.id]?.map(comment => (
                      <div key={comment.id} className="bg-white/5 p-3 rounded-lg">
                        <p className="text-sm">{comment.content}</p>
                        <div className="flex gap-2 mt-1 text-xs">
                          <button onClick={() => voteComment(comment.id, post.id, 'up')}>👍 {comment.upvotes}</button>
                          <button onClick={() => voteComment(comment.id, post.id, 'down')}>👎 {comment.downvotes}</button>
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
