import React, { useState } from 'react';
import { draftWhatsAppMessage } from '../services/geminiService';

interface MagicDraftModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDraftReady: (message: string) => void;
}

const MagicDraftModal: React.FC<MagicDraftModalProps> = ({ isOpen, onClose, onDraftReady }) => {
  const [issue, setIssue] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleGenerate = async () => {
    if (!issue.trim()) return;
    setLoading(true);
    const draft = await draftWhatsAppMessage(issue);
    setLoading(false);
    onDraftReady(draft);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div className="bg-gray-800 rounded-xl p-6 w-full max-w-md border border-primary-600 shadow-2xl">
        <h3 className="text-xl font-title font-bold text-white mb-2 flex items-center gap-2">
          <i className="fa-solid fa-wand-magic-sparkles text-primary-400"></i>
          Assistente de Mensagem
        </h3>
        <p className="text-gray-400 text-sm mb-4">
          Descreva seu problema resumidamente e a IA criará uma mensagem formal para o suporte.
        </p>
        
        <textarea
          className="w-full bg-gray-900 border border-gray-700 rounded-lg p-3 text-white focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 transition-all mb-4"
          rows={3}
          placeholder="Ex: Minha internet está caindo toda hora..."
          value={issue}
          onChange={(e) => setIssue(e.target.value)}
          disabled={loading}
        />

        <div className="flex gap-3 justify-end">
          <button 
            onClick={onClose}
            className="px-4 py-2 text-gray-400 hover:text-white transition-colors text-sm"
          >
            Cancelar
          </button>
          <button
            onClick={handleGenerate}
            disabled={loading || !issue.trim()}
            className="px-4 py-2 bg-primary-600 hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg flex items-center gap-2 font-bold transition-all shadow-lg shadow-primary-900/50"
          >
            {loading ? (
              <><i className="fa-solid fa-circle-notch fa-spin"></i> Criando...</>
            ) : (
              <><i className="fa-solid fa-pen-nib"></i> Gerar Texto</>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MagicDraftModal;