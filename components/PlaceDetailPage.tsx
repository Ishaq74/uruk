import React from 'react';
import { Place, Profile, Review } from '../types';
import Icon from './Icon';
import StarRating from './StarRating';
import ReviewForm from './ReviewForm';
import { ATTRIBUTE_ICONS } from '../constants';

interface PlaceDetailPageProps {
  id: string;
  places: Place[];
  profiles: Profile[];
  navigateTo: (page: string, id?: string) => void;
  currentUser: Profile | null;
  onLogin: () => void;
  onOpenReportModal: (targetId: string, targetType: string) => void;
}

const ReviewItem: React.FC<{ review: Review; author?: Profile }> = ({ review, author }) => (
    <div className="flex space-x-4 py-4">
        <img src={author?.avatarUrl} alt={author?.fullName} className="w-12 h-12 rounded-full" />
        <div>
            <div className="flex items-center space-x-2">
                <h4 className="font-bold text-gray-800">{author?.fullName}</h4>
                <span className="text-xs text-gray-400">&middot; {review.date}</span>
            </div>
            <StarRating rating={review.rating} hideCount />
            <p className="mt-2 text-gray-600">{review.comment}</p>
        </div>
    </div>
);

const PlaceDetailPage: React.FC<PlaceDetailPageProps> = ({ id, places, profiles, navigateTo, currentUser, onLogin, onOpenReportModal }) => {
  const place = places.find(p => p.id === id);

  if (!place) {
    return <div className="text-center py-20">Lieu non trouvé.</div>;
  }
  
  const hasUserReviewed = currentUser && place.reviews.some(r => r.profileId === currentUser.id);

  return (
    <div className="bg-white">
      <div className="relative h-96">
        <img src={place.imageUrl} alt={place.name} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-8 text-white">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight drop-shadow-lg">{place.name}</h1>
          <div className="flex items-center space-x-2 mt-2">
            <StarRating rating={place.rating} />
            <span className="text-lg">({place.reviewCount} avis)</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="lg:grid lg:grid-cols-3 lg:gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <p className="text-lg text-gray-700">{place.description}</p>
            <div className="mt-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Avis</h2>
              <div className="divide-y divide-gray-200">
                {place.reviews.map(review => {
                  const author = profiles.find(p => p.id === review.profileId);
                  return <ReviewItem key={review.id} review={review} author={author} />;
                })}
              </div>
               {currentUser && !hasUserReviewed && (
                    <ReviewForm currentUser={currentUser} onSubmit={() => {}} />
                )}
                {!currentUser && (
                    <div className="mt-8 text-center border p-6 rounded-lg bg-slate-50">
                        <p className="text-gray-600">Vous devez être connecté pour laisser un avis.</p>
                        <button onClick={onLogin} className="mt-2 text-sm font-semibold text-sky-600 hover:underline">Se connecter</button>
                    </div>
                )}
            </div>
          </div>
          {/* Sidebar */}
          <aside className="lg:col-span-1 mt-12 lg:mt-0">
            <div className="sticky top-24 space-y-8">
                <div className="bg-white rounded-xl shadow-sm p-6 border space-y-4">
                    <h3 className="text-lg font-bold text-gray-800 mb-2">Informations</h3>
                    <div className="flex items-start space-x-3">
                        <Icon name="map-pin" className="w-5 h-5 text-gray-400 mt-1"/>
                        <span className="text-gray-700">{place.address}</span>
                    </div>
                     <div className="flex items-start space-x-3">
                        <Icon name="phone" className="w-5 h-5 text-gray-400 mt-1"/>
                        <a href={`tel:${place.phone}`} className="text-sky-600 hover:underline">{place.phone}</a>
                    </div>
                     <div className="flex items-start space-x-3">
                        <Icon name="globe-alt" className="w-5 h-5 text-gray-400 mt-1"/>
                        <a href={`https://${place.website}`} target="_blank" rel="noopener noreferrer" className="text-sky-600 hover:underline">{place.website}</a>
                    </div>
                </div>
                {place.attributes.length > 0 && (
                     <div className="bg-white rounded-xl shadow-sm p-6 border">
                        <h3 className="text-lg font-bold text-gray-800 mb-4">Attributs</h3>
                        <div className="flex flex-wrap gap-2">
                            {place.attributes.map(attr => (
                                <div key={attr} className="flex items-center space-x-2 px-3 py-1 bg-slate-100 rounded-full text-sm font-medium text-slate-700">
                                    <Icon name={ATTRIBUTE_ICONS[attr] || 'sparkles'} className="w-4 h-4"/>
                                    <span>{attr}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default PlaceDetailPage;
