import React from 'react';
import { Profile, Place } from '../types';
import Icon from './Icon';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/Tabs';
import Button from './ui/Button';

interface ProfilePageProps {
  id: string;
  profiles: Profile[];
  places: Place[];
  navigateTo: (page: string, id?: string, mainCategory?: Place['mainCategory'], query?: string, slug?: string, filter?: 'my-listings' | 'my-groups' | 'contributions') => void;
  currentUser: Profile | null;
  filter?: 'my-listings' | 'my-groups' | 'contributions';
}

const ProfilePage: React.FC<ProfilePageProps> = ({ id, profiles, places, navigateTo, currentUser, filter }) => {
  const profile = profiles.find(p => p.id === id);

  if (!profile) {
    return <div className="text-center py-20">Profil non trouvé.</div>;
  }

  const isCurrentUserProfile = currentUser?.id === profile.id;

  return (
    <div className="bg-slate-100">
      <div className="relative h-48 md:h-64">
        <img src={profile.coverImageUrl} alt={`Image de couverture de ${profile.fullName}`} className="w-full h-full object-cover" />
      </div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative -mt-16 md:-mt-20">
          <div className="flex flex-col md:flex-row items-center md:items-end space-y-4 md:space-y-0 md:space-x-6">
            <img src={profile.avatarUrl} alt={profile.fullName} className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white shadow-lg" />
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800">{profile.fullName}</h1>
              <p className="text-gray-500">@{profile.username}</p>
            </div>
            <div className="flex-shrink-0">
              {isCurrentUserProfile ? (
                <Button variant="secondary" onClick={() => navigateTo('settings')}>Modifier le profil</Button>
              ) : (
                <Button>Envoyer un message</Button>
              )}
            </div>
          </div>
          <div className="mt-6 p-6 bg-white rounded-xl shadow-sm border">
            <p className="text-gray-600">{profile.bio}</p>
          </div>
        </div>

        <div className="mt-8">
          <Tabs defaultValue={filter || "overview"}>
            <TabsList>
              <TabsTrigger value="overview">Aperçu</TabsTrigger>
              <TabsTrigger value="contributions">Contributions</TabsTrigger>
              <TabsTrigger value="my-listings">Annonces</TabsTrigger>
              <TabsTrigger value="my-groups">Groupes</TabsTrigger>
            </TabsList>
            <TabsContent value="overview">
                <div className="p-4 bg-white rounded-xl shadow-sm border">
                    <p>Section Aperçu à venir.</p>
                </div>
            </TabsContent>
            <TabsContent value="contributions">
                <div className="p-4 bg-white rounded-xl shadow-sm border">
                    <p>Section Contributions à venir.</p>
                </div>
            </TabsContent>
             <TabsContent value="my-listings">
                <div className="p-4 bg-white rounded-xl shadow-sm border">
                    <p>Section Annonces à venir.</p>
                </div>
            </TabsContent>
             <TabsContent value="my-groups">
                <div className="p-4 bg-white rounded-xl shadow-sm border">
                    <p>Section Groupes à venir.</p>
                </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
