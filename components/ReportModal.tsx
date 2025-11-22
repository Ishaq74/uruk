
import React, { useState } from 'react';
import { Modal, ModalHeader, ModalTitle, ModalDescription, ModalBody, ModalFooter } from './ui/Modal';
import Button from './ui/Button';
import Select from './ui/Select';
import Textarea from './ui/Textarea';

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (reportData: { targetId: string; targetType: string; reason: string; comment: string }) => void;
  targetId: string;
  targetType: string;
}

const reportReasons = [
  'Spam ou contenu publicitaire',
  'Contenu inapproprié ou offensant',
  'Fausses informations',
  'Violation de droits d\'auteur',
  'Autre (préciser)',
];

const ReportModal: React.FC<ReportModalProps> = ({ isOpen, onClose, onSubmit, targetId, targetType }) => {
  const [reason, setReason] = useState('');
  const [comment, setComment] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reason) {
      alert('Veuillez sélectionner une raison.');
      return;
    }
    onSubmit({ targetId, targetType, reason, comment });
    setReason('');
    setComment('');
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
        <form onSubmit={handleSubmit}>
            <ModalHeader>
                <ModalTitle>Signaler un contenu</ModalTitle>
                <ModalDescription>Aidez-nous à maintenir une communauté sûre et respectueuse.</ModalDescription>
            </ModalHeader>
            <ModalBody className="space-y-4">
                <div>
                    <label htmlFor="reason" className="block text-sm font-medium text-gray-700">Raison du signalement</label>
                    <Select
                        id="reason"
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        className="mt-1"
                    >
                        <option value="">-- Choisissez une raison --</option>
                        {reportReasons.map(r => <option key={r} value={r}>{r}</option>)}
                    </Select>
                </div>
                <div>
                    <label htmlFor="comment" className="block text-sm font-medium text-gray-700">Commentaire (facultatif)</label>
                    <Textarea
                        id="comment"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        rows={3}
                        className="mt-1"
                        placeholder="Fournissez plus de détails si nécessaire..."
                    />
                </div>
            </ModalBody>
            <ModalFooter>
                <Button type="button" variant="secondary" onClick={onClose}>
                    Annuler
                </Button>
                <Button type="submit" variant="destructive" disabled={!reason}>
                    Envoyer le signalement
                </Button>
            </ModalFooter>
        </form>
    </Modal>
  );
};

export default ReportModal;
