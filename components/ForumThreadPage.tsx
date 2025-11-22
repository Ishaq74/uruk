import React, { useState } from 'react';
import { ForumThread, Profile, Place } from '../types';
import Icon from './Icon';
import Button from './ui/Button';
import Textarea from './ui/Textarea';

interface ForumThreadPageProps {
  id: string;
  threads: ForumThread[];
  profiles: Profile[];
  navigateTo: (page: string, id?: string, mainCategory?: Place['mainCategory'], query?: string) => void;
  currentUser: Profile | null;
  onLogin: () => void;
}

const PostItem: React.FC<{ post: ForumThread['posts'][0], author?: Profile }> = ({ post, author }) => {
    return (
        <div className="flex space-x-4 py-6">
            <div className="flex-shrink-0 flex flex-col items-center w-24">
                <img src={author?.avatarUrl} alt={author?.fullName} className="w-16 h-16 rounded-full" />
                <h4 className="font-bold text-center mt-2 text-sm">{author?.fullName}</h4>
                <p className="text-xs text-gray-500">@{author?.username}</p>
            </div>
            <div className="flex-1 border-l border-gray-200 pl-6">
                <p className="text-xs text-gray-400 mb-2">{post.createdAt}</p>
                <div className="prose max-w-none">
                    <p>{post.content}</p>
                </div>
            </div>
        </div>
    );
};

const ForumThreadPage: React.FC<ForumThreadPageProps> = ({ id, threads, profiles, navigateTo, currentUser, onLogin }) => {
  const thread = threads.find(t => t.id === id);
  const [replyContent, setReplyContent] = useState('');

  if (!thread) {
    return <div className="text-center py-20">Sujet non trouvé.</div>;
  }

  const author = profiles.find(p => p.id === thread.authorId);

  return (
    <div className="bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-4xl mx-auto">
          <Button variant="link" onClick={(e) => { e.preventDefault(); navigateTo('forums'); }} className="p-0 h-auto mb-4">&larr; Retour aux forums</Button>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900">{thread.title}</h1>
          <p className="text-gray-500 mt-2">par {author?.fullName}, {thread.createdAt}</p>
          
          <div className="mt-8 bg-white rounded-xl shadow-sm border divide-y divide-gray-200">
            {thread.posts.map(post => {
              const postAuthor = profiles.find(p => p.id === post.authorId);
              return <PostItem key={post.id} post={post} author={postAuthor} />;
            })}
          </div>

          <div className="mt-8 border-t pt-8">
            <h2 className="text-2xl font-bold">Répondre</h2>
             {currentUser ? (
                 <form className="mt-4">
                     <Textarea
                        value={replyContent}
                        onChange={(e) => setReplyContent(e.target.value)}
                        placeholder="Votre message..."
                        rows={5}
                     />
                     <div className="mt-4 text-right">
                         <Button type="submit" disabled={!replyContent.trim()}>
                            Envoyer la réponse
                         </Button>
                     </div>
                 </form>
             ) : (
                <div className="mt-6 text-center border p-6 rounded-lg bg-slate-50">
                    <p className="text-gray-600">Vous devez être connecté pour répondre.</p>
                    <button onClick={onLogin} className="mt-2 text-sm font-semibold text-sky-600 hover:underline">Se connecter</button>
                </div>
             )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForumThreadPage;
