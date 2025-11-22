
import React, { useState, useMemo } from 'react';
import { Place, Profile, PlaceClaim, Organization } from '../types';
import { PLACES, ORGANIZATIONS } from '../constants';
import Button from './ui/Button';
import Input from './ui/Input';
import Select from './ui/Select';

interface ClaimPlacePageProps {
  currentUser: Profile | null;
  navigateTo: (page: string, id?: string) => void;
  onClaim: (claim: Omit<PlaceClaim, 'id' | 'status'>) => void;
}

const ClaimPlacePage: React.FC<ClaimPlacePageProps> = ({ currentUser, navigateTo, onClaim }) => {
  const [selectedPlaceId, setSelectedPlaceId] = useState('');
  const [proof, setProof] = useState('');
  
  const userOrganization = useMemo(() => ORGANIZATIONS.find(org => org.primary_owner_id === currentUser?.id), [currentUser]);

  if (!currentUser || !userOrganization) {
    return (
      <div className="text-center py-20">
        <h1 className="text-2xl font-bold text-gray-800">Accès non autorisé</h1>
        <p className="text-gray-600 mt-2">Vous devez avoir une organisation enregistrée pour revendiquer un lieu.</p>
        <Button onClick={() => navigateTo('espace-pro')} className="mt-4">
            Retour à l'Espace Pro
        </Button>
      </div>
    );
  }

  const alreadyOwnedPlaceIds = ORGANIZATIONS.flatMap(org => org.place_ids);
  const unclaimedPlaces = PLACES.filter(p => !alreadyOwnedPlaceIds.includes(p.id));
  
  const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (!selectedPlaceId || !proof.trim()) {
          alert('Veuillez sélectionner un lieu et fournir une preuve.');
          return;
      }
      
      onClaim({
          placeId: selectedPlaceId,
          organizationId: userOrganization.id,
          userId: currentUser.id
      });
  };

  return (
    <div className="bg-slate-100 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="text-left mb-12">
            <Button variant="link" onClick={(e) => { e.preventDefault(); navigateTo('espace-pro'); }} className="p-0 h-auto">&larr; Retour à l'Espace Pro</Button>
            <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">Revendiquer un Établissement</h1>
            <p className="mt-4 text-xl text-gray-600">
              Votre établissement est déjà sur Salut Annecy ? Revendiquez sa propriété pour en prendre le contrôle.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-lg space-y-6">
            <div>
              <label htmlFor="placeId" className="block text-sm font-medium text-gray-700">Établissement à revendiquer</label>
              <Select
                id="placeId"
                value={selectedPlaceId}
                onChange={(e) => setSelectedPlaceId(e.target.value)}
                required
                className="mt-1"
              >
                <option value="">-- Sélectionnez un lieu --</option>
                {unclaimedPlaces.map(place => (
                  <option key={place.id} value={place.id}>{place.name} - {place.address}</option>
                ))}
              </Select>
            </div>

            <div>
              <label htmlFor="proof" className="block text-sm font-medium text-gray-700">Preuve de propriété</label>
              <Input
                type="text"
                id="proof"
                value={proof}
                onChange={(e) => setProof(e.target.value)}
                required
                className="mt-1"
                placeholder="Ex: N° SIRET, lien vers un document officiel..."
              />
              <p className="mt-2 text-xs text-gray-500">
                Cette information sera vérifiée par notre équipe et ne sera pas rendue publique.
              </p>
            </div>
            
            <div className="pt-5 text-right">
              <Button type="submit">
                Envoyer la demande
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ClaimPlacePage;
