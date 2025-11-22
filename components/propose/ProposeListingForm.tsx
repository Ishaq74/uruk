
import React, { useState } from 'react';
import { Listing, Profile, ListingType } from '../../types';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Select from '../ui/Select';
import Textarea from '../ui/Textarea';

interface ProposeListingFormProps {
  currentUser: Profile | null;
  navigateTo: (page: string) => void;
  onAddListing: (listing: Omit<Listing, 'id' | 'date' | 'userId' | 'status' | 'expires_at' | 'rejection_reason' | 'imageUrl' | 'metadata'>) => void;
}

const ProposeListingForm: React.FC<ProposeListingFormProps> = ({ currentUser, navigateTo, onAddListing }) => {
    if (!currentUser) return <div className="text-center py-20">Accès non autorisé.</div>;

    const [formData, setFormData] = useState({
        type: ListingType.BonnesAffaires,
        title: '',
        price: '',
        description: '',
    });
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onAddListing(formData);
    };

  return (
    <div className="bg-slate-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-3xl mx-auto">
            <Button variant="link" onClick={(e) => { e.preventDefault(); navigateTo('propose'); }} className="p-0 h-auto">&larr; Choisir un autre type de contenu</Button>
            <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">Déposer une Petite Annonce</h1>
            <form onSubmit={handleSubmit} className="mt-8 bg-white p-8 rounded-2xl shadow-lg space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="type">Type d'annonce</label>
                        <Select id="type" name="type" value={formData.type} onChange={handleChange} className="mt-1">
                            {Object.values(ListingType).map(t => <option key={t} value={t}>{t}</option>)}
                        </Select>
                    </div>
                    <div>
                        <label htmlFor="price">Prix ou Rémunération</label>
                        <Input type="text" name="price" id="price" value={formData.price} onChange={handleChange} required className="mt-1" placeholder="Ex: 450€, 20€/h, ..." />
                    </div>
                </div>
                <div>
                    <label htmlFor="title">Titre de l'annonce</label>
                    <Input type="text" name="title" id="title" value={formData.title} onChange={handleChange} required className="mt-1" />
                </div>
                <div>
                    <label htmlFor="description">Description</label>
                    <Textarea id="description" name="description" rows={6} value={formData.description} onChange={handleChange} required className="mt-1" />
                </div>
                <div className="pt-5 flex justify-end">
                    <Button type="submit">
                        Soumettre pour modération
                    </Button>
                </div>
            </form>
        </div>
      </div>
    </div>
  );
};
export default ProposeListingForm;
