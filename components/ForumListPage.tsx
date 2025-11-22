import React from 'react';
import { ForumThread, Profile, Place } from '../types';
import { FORUM_CATEGORIES } from '../constants';
import Icon from './Icon';
import Button from './ui/Button';
import { Card, CardContent } from './ui/Card';

interface ForumListPageProps {
  threads: ForumThread[];
  profiles: Profile[];
  navigateTo: (page: string, id?: string, mainCategory?: Place['mainCategory'], query?: string) => void;
}

const ThreadRow: React.FC<{ thread: ForumThread, author?: Profile, navigateTo: (page: string, id: string) => void }> = ({ thread, author, navigateTo }) => (
    <div onClick={() => navigateTo('forum-thread', thread.id)} className="flex items-center justify-between p-4 hover:bg-slate-50 cursor-pointer">
        <div className="flex items-center space-x-4">
            <img src={author?.avatarUrl} alt={author?.fullName} className="w-10 h-10 rounded-full" />
            <div>
                <h4 className="font-bold text-gray-800">{thread.title}</h4>
                <p className="text-sm text-gray-500">par {author?.fullName} &middot; {thread.createdAt}</p>
            </div>
        </div>
        <div className="text-right text-sm">
            <p className="font-semibold">{thread.posts.length}</p>
            <p className="text-gray-500">réponses</p>
        </div>
    </div>
);

const ForumListPage: React.FC<ForumListPageProps> = ({ threads, profiles, navigateTo }) => {
  return (
    <div className="bg-slate-100 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-8">
            <div>
                <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">Forums</h1>
                <p className="mt-4 max-w-2xl text-xl text-gray-600">
                    Échangez avec la communauté, posez vos questions et partagez vos bons plans.
                </p>
            </div>
            <Button onClick={() => navigateTo('new-thread')} size="lg" className="mt-4 sm:mt-0">Créer un sujet</Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {FORUM_CATEGORIES.map(cat => (
                 <Card key={cat.id} onClick={() => navigateTo('forum-category', cat.id)} className="hover:shadow-lg transition-shadow cursor-pointer">
                    <CardContent className="p-6 flex items-center space-x-4">
                        <Icon name={cat.icon} className="w-12 h-12 text-sky-500 flex-shrink-0" />
                        <div>
                            <h3 className="font-bold text-lg text-gray-800">{cat.title}</h3>
                            <p className="text-sm text-gray-500 mt-1">{cat.description}</p>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>

        <Card>
             <h2 className="text-2xl font-bold text-gray-800 p-6 border-b">Derniers Sujets</h2>
             <div className="divide-y divide-gray-200">
                {threads.slice(0, 10).map(thread => {
                    const author = profiles.find(p => p.id === thread.authorId);
                    return <ThreadRow key={thread.id} thread={thread} author={author} navigateTo={navigateTo} />;
                })}
             </div>
        </Card>
      </div>
    </div>
  );
};

export default ForumListPage;
