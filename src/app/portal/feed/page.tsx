'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  INITIAL_POSTS,
  TOP_CONTRIBUTORS,
  FeedPost,
  CURRENT_USER,
} from '@/data/mockData';
import {
  Heart,
  MessageCircle,
  Share2,
  Sparkles,
  Send,
  Tag,
  Trophy,
  Flame,
  Award,
  TrendingUp,
  Image as ImageIcon,
  CheckCircle,
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function SocialFeedPage() {
  const [posts, setPosts] = useState<FeedPost[]>(INITIAL_POSTS);
  const [newContent, setNewContent] = useState('');
  const [selectedTag, setSelectedTag] = useState('Quantum Physics');
  const [filterTag, setFilterTag] = useState<string>('All');
  const [commentInputs, setCommentInputs] = useState<{ [key: string]: string }>({});
  const [openComments, setOpenComments] = useState<{ [key: string]: boolean }>({});

  const availableTags = ['Quantum Physics', 'AI & Robotics', 'Biochemistry', 'Mathematics', 'General Discussion'];

  // Handle New Post Creation
  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newContent.trim()) return;

    const newPost: FeedPost = {
      id: 'post-' + Date.now(),
      authorName: CURRENT_USER.name,
      authorRole: CURRENT_USER.role as 'teacher',
      authorAvatar: CURRENT_USER.avatar,
      timeAgo: 'Just now',
      subjectTag: selectedTag,
      content: newContent,
      likes: 0,
      userLiked: false,
      commentsCount: 0,
    };

    setPosts([newPost, ...posts]);
    setNewContent('');

    try {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.4 },
      });
    } catch (err) {
      // fallback
    }
  };

  // Toggle Like on a Post
  const handleLike = (id: string) => {
    setPosts((prev) =>
      prev.map((post) => {
        if (post.id !== id) return post;
        const willLike = !post.userLiked;
        return {
          ...post,
          userLiked: willLike,
          likes: willLike ? post.likes + 1 : post.likes - 1,
        };
      })
    );
  };

  // Toggle Comments view
  const toggleComments = (id: string) => {
    setOpenComments((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Add a quick comment
  const handleAddComment = (id: string) => {
    const text = commentInputs[id];
    if (!text || !text.trim()) return;

    setPosts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, commentsCount: p.commentsCount + 1 } : p))
    );
    setCommentInputs((prev) => ({ ...prev, [id]: '' }));
  };

  // Filter posts
  const filteredPosts = filterTag === 'All'
    ? posts
    : posts.filter((p) => p.subjectTag === filterTag);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* LEFT & CENTER (2 COLS): POST CREATOR & FEED */}
      <div className="lg:col-span-2 space-y-6">
        {/* CREATE POST CARD */}
        <div className="glass-card-crystal p-5 sm:p-6 rounded-3xl border border-white/80 bg-white/70 backdrop-blur-xl shadow-glass">
          <div className="flex items-center gap-3 mb-4">
            <div className="relative w-10 h-10 rounded-xl overflow-hidden border border-seagreen-300/60 shadow-sm shrink-0">
              <Image
                src={CURRENT_USER.avatar}
                alt={CURRENT_USER.name}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h3 className="text-sm font-bold text-teal-950">Broadcast to Campus Wall</h3>
              <p className="text-[11px] text-seagreen-700 font-mono">
                Posting as {CURRENT_USER.name} • {CURRENT_USER.quantumRank}
              </p>
            </div>
          </div>

          <form onSubmit={handleCreatePost} className="space-y-3">
            <textarea
              rows={3}
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
              placeholder="Share lab discoveries, project hypotheses, or classroom insights with your peers..."
              className="w-full px-4 py-3 bg-white/85 border border-seagreen-200/80 rounded-2xl text-sm text-teal-950 placeholder-slate-400 focus:outline-none focus:border-seagreen-500 focus:ring-1 focus:ring-seagreen-500 shadow-inner"
            />

            <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
              <div className="flex items-center gap-2">
                <Tag className="w-4 h-4 text-seagreen-600 shrink-0" />
                <select
                  value={selectedTag}
                  onChange={(e) => setSelectedTag(e.target.value)}
                  className="px-3 py-1.5 bg-white border border-seagreen-200 rounded-xl text-xs text-teal-950 focus:outline-none focus:border-seagreen-500 font-mono shadow-sm"
                >
                  {availableTags.map((tag) => (
                    <option key={tag} value={tag}>
                      #{tag}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                disabled={!newContent.trim()}
                className="px-5 py-2 bg-gradient-to-r from-seagreen-600 to-teal-700 hover:from-seagreen-500 hover:to-teal-600 text-white font-bold rounded-xl shadow-md text-xs sm:text-sm flex items-center gap-1.5 transition disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
                Publish Post
              </button>
            </div>
          </form>
        </div>

        {/* FEED FILTER TAGS */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 text-xs font-mono">
          {['All', ...availableTags].map((tag) => (
            <button
              key={tag}
              onClick={() => setFilterTag(tag)}
              className={`px-3.5 py-1.5 rounded-xl whitespace-nowrap transition border ${
                filterTag === tag
                  ? 'bg-seagreen-600 text-white font-bold border-seagreen-700 shadow-md'
                  : 'bg-white/60 text-slate-700 border-seagreen-200/60 hover:bg-white hover:text-teal-950 shadow-sm'
              }`}
            >
              {tag === 'All' ? '⚡ All Feeds' : `#${tag}`}
            </button>
          ))}
        </div>

        {/* FEED POSTS LIST */}
        <div className="space-y-5">
          {filteredPosts.map((post) => (
            <div
              key={post.id}
              className="glass-card-crystal p-5 sm:p-6 rounded-3xl border border-white/80 bg-white/70 backdrop-blur-xl shadow-glass hover:shadow-lg transition-all space-y-4"
            >
              {/* Author & Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative w-11 h-11 rounded-xl overflow-hidden border border-seagreen-200/80 shadow-sm">
                    <Image
                      src={post.authorAvatar}
                      alt={post.authorName}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-bold text-teal-950">{post.authorName}</h4>
                      <span className="px-2 py-0.2 text-[10px] font-mono capitalize rounded-full bg-seagreen-100 text-seagreen-800 border border-seagreen-300">
                        {post.authorRole}
                      </span>
                    </div>
                    <span className="text-xs text-slate-500 font-mono">{post.timeAgo}</span>
                  </div>
                </div>

                <span className="px-3 py-1 text-xs font-mono bg-seagreen-50 text-seagreen-800 border border-seagreen-200 rounded-xl font-semibold">
                  #{post.subjectTag}
                </span>
              </div>

              {/* Post Content */}
              <p className="text-sm text-slate-800 leading-relaxed">
                {post.content}
              </p>

              {/* Optional Attachment Preview */}
              {post.attachment && (
                <div className="relative rounded-2xl overflow-hidden border border-seagreen-200/80 max-h-72 shadow-sm">
                  <div className="relative h-60 w-full">
                    <Image
                      src={post.attachment.url}
                      alt={post.attachment.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-teal-950/90 to-transparent flex items-center justify-between text-xs font-mono text-seagreen-200">
                    <span className="flex items-center gap-1.5">
                      <ImageIcon className="w-3.5 h-3.5 text-seagreen-400" />
                      {post.attachment.title}
                    </span>
                    <span className="text-[10px] text-slate-300">Campus Cloud 4K</span>
                  </div>
                </div>
              )}

              {/* Post Action Buttons */}
              <div className="pt-3 border-t border-seagreen-100 flex items-center justify-between text-xs font-mono text-slate-600">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => handleLike(post.id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition ${
                      post.userLiked
                        ? 'text-rose-600 bg-rose-50 border border-rose-200 font-bold'
                        : 'hover:text-teal-950 hover:bg-seagreen-50'
                    }`}
                  >
                    <Heart
                      className={`w-4 h-4 ${
                        post.userLiked ? 'fill-rose-500 text-rose-500 animate-bounce' : ''
                      }`}
                    />
                    <span>{post.likes}</span>
                  </button>

                  <button
                    onClick={() => toggleComments(post.id)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl hover:text-teal-950 hover:bg-seagreen-50 transition"
                  >
                    <MessageCircle className="w-4 h-4 text-seagreen-600" />
                    <span>{post.commentsCount} Comments</span>
                  </button>
                </div>

                <button className="flex items-center gap-1 hover:text-seagreen-700 transition">
                  <Share2 className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Share Post</span>
                </button>
              </div>

              {/* Comments Section Drawer */}
              {openComments[post.id] && (
                <div className="pt-3 border-t border-seagreen-100 space-y-3">
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={commentInputs[post.id] || ''}
                      onChange={(e) =>
                        setCommentInputs({ ...commentInputs, [post.id]: e.target.value })
                      }
                      placeholder="Add an insight or question..."
                      className="flex-1 px-3 py-1.5 bg-white border border-seagreen-200 rounded-xl text-xs text-teal-950 placeholder-slate-400 focus:outline-none focus:border-seagreen-500 shadow-inner"
                    />
                    <button
                      onClick={() => handleAddComment(post.id)}
                      className="px-3.5 py-1.5 bg-seagreen-600 text-white font-bold rounded-xl text-xs hover:bg-seagreen-700 transition shadow-sm"
                    >
                      Reply
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT COLUMN: HOLOGRAPHIC TOP CONTRIBUTORS LEADERBOARD */}
      <div className="space-y-6">
        <div className="glass-card-crystal p-6 rounded-3xl border border-white/80 bg-white/70 backdrop-blur-xl shadow-glass sticky top-24">
          <div className="flex items-center justify-between pb-4 border-b border-seagreen-100">
            <div className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-amber-500" />
              <h3 className="font-bold text-teal-950 text-base">Top Contributors</h3>
            </div>
            <span className="px-2 py-0.5 text-[10px] font-mono rounded bg-amber-50 text-amber-800 border border-amber-300 font-semibold">
              Week 42 Sprint
            </span>
          </div>

          <div className="py-4 space-y-3">
            {TOP_CONTRIBUTORS.map((user) => {
              const isFirst = user.rank === 1;
              const isSecond = user.rank === 2;
              const isThird = user.rank === 3;

              return (
                <div
                  key={user.rank}
                  className={`p-3.5 rounded-2xl flex items-center justify-between transition border ${
                    isFirst
                      ? 'bg-amber-50/80 border-amber-300 shadow-sm'
                      : isSecond
                      ? 'bg-white/80 border-seagreen-200'
                      : 'bg-white/60 border-seagreen-100'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`w-6 h-6 rounded-full flex items-center justify-center font-mono font-bold text-xs ${
                        isFirst
                          ? 'bg-amber-400 text-amber-950 shadow-sm'
                          : isSecond
                          ? 'bg-slate-200 text-slate-800'
                          : isThird
                          ? 'bg-amber-700 text-white'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {user.rank}
                    </span>

                    <div className="relative w-10 h-10 rounded-xl overflow-hidden border border-seagreen-200 shadow-sm">
                      <Image
                        src={user.avatar}
                        alt={user.name}
                        fill
                        className="object-cover"
                      />
                    </div>

                    <div>
                      <h4 className="text-sm font-bold text-teal-950 truncate max-w-[120px]">
                        {user.name}
                      </h4>
                      <p className="text-[10px] text-seagreen-700 font-mono">
                        {user.badge}
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-sm font-extrabold text-teal-950 font-mono block">
                      {user.xp.toLocaleString()}
                    </span>
                    <span className="text-[10px] text-slate-500 font-mono">XP Points</span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="pt-3 border-t border-seagreen-100 text-center">
            <p className="text-xs text-slate-600 font-mono flex items-center justify-center gap-1.5">
              <Flame className="w-4 h-4 text-amber-500" />
              Contribute notes & solve doubts to earn XP
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
