import React from 'react';
import { Group, Place, Profile } from '../types';
import { Card, CardContent } from './ui/Card';
import Button from './ui/Button';

interface GroupListPageProps {
  groups: Group[];
  navigateTo: (page: string, id?: string, mainCategory?: Place['mainCategory'], query?: string, slug?: string, filter?: 'my-listings' | 'my-groups') => void;
  currentUser: Profile | null;
  filter?: 'my-groups';
}

const GroupCard: React.FC<{ group: Group, navigateTo: (page: string, id: string) => void }> = ({ group, navigateTo }) => (
    <Card 
        onClick={() => navigateTo('group-detail', group.id)}
        className="group overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col"
    >
        <img className="h-32 w-full object-cover" src={group.bannerUrl} alt={`Bannière ${group.name}`} />
        <CardContent className="p-4 text-center -mt-12">
            <img className="w-20 h-20 rounded-full mx-auto border-4 border-white shadow-md" src={group.avatarUrl} alt={`Avatar ${group.name}`} />
            <h3 className="mt-2 text-lg font-bold text-gray-800 group-hover:text-sky-600">{group.name}</h3>
            <p className="text-sm text-gray-500 mt-1">{group.memberCount} membres</p>
        </CardContent>
    </Card>
);

const GroupListPage: React.FC<GroupListPageProps> = ({ groups: allGroups, navigateTo, currentUser, filter }) => {

    const groups = filter === 'my-groups' && currentUser
        ? allGroups.filter(g => g.members.some(m => m.profileId === currentUser.id))
        : allGroups;
    
    const pageTitle = filter === 'my-groups' ? "Mes Groupes" : "Groupes de la communauté";

  return (
    <div className="bg-slate-100 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-8">
            <div>
                <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">{pageTitle}</h1>
                <p className="mt-4 max-w-2xl text-xl text-gray-600">
                    Rejoignez des groupes pour partager vos passions.
                </p>
            </div>
            <Button onClick={() => navigateTo('new-group')} size="lg" className="mt-4 sm:mt-0">Créer un groupe</Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {groups.map(group => (
            <GroupCard key={group.id} group={group} navigateTo={navigateTo} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default GroupListPage;
