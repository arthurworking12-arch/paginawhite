import React, { useState } from 'react';
import { ContactInfo } from '../types';
import MagicDraftModal from './MagicDraftModal';

const SupportCard: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Configuration matching the visual requirements
  const contact: ContactInfo = {
    whatsappNumber: "5500000000000",
    avatarUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a",
    title: "Fale com nosso suporte e tire suas dúvidas.",
    buttonText: "Fale conosco no WhatsApp"
  };

  const handleDraftReady = (message: string) => {
    // URL Encode the message and open WhatsApp
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${contact.whatsappNumber}?text=${encodedMessage}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-6 text-white relative overflow-hidden">
      {/* Background decoration to enhance the 'World Class' feel without breaking the layout */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-primary-600/20 rounded-full blur-[128px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-blue-600/10 rounded-full blur-[128px] pointer-events-none"></div>

      <div className="max-w-md w-full bg-gray-800 rounded-xl shadow-2xl overflow-hidden transform hover:scale-105 transition-transform duration-300 border border-gray-700 relative z-10">
        <div className="flex flex-col items-center p-8">
          
          <div className="relative h-36 w-36 mb-6 rounded-full overflow-hidden border-4 border-primary-500 shadow-lg transform hover:rotate-3 transition-transform duration-300 group">
            <img 
              src={contact.avatarUrl} 
              alt="Profile picture" 
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
            />
          </div>
          
          <h1 className="text-2xl md:text-3xl font-title font-bold text-center mb-6 bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">
            {contact.title}
          </h1>
          
          <a 
            href={`https://wa.me/${contact.whatsappNumber}`}
            className="w-full py-4 px-6 bg-green-600 hover:bg-green-700 active:scale-95 rounded-lg flex items-center justify-center gap-3 font-bold text-lg shadow-lg transform hover:-translate-y-1 transition-all duration-300 mb-4 group"
          >
            <i className="fa-brands fa-whatsapp text-2xl group-hover:animate-bounce"></i> 
            {contact.buttonText}
          </a>

          {/* AI Feature Enhancement */}
          <button 
            onClick={() => setIsModalOpen(true)}
            className="w-full py-3 px-6 bg-gray-700 hover:bg-gray-600 rounded-lg flex items-center justify-center gap-2 text-sm text-gray-300 hover:text-white transition-all duration-300"
          >
            <i className="fa-solid fa-wand-magic-sparkles text-primary-400"></i>
            Não sabe o que dizer? Use a IA
          </button>

        </div>
      </div>

      <MagicDraftModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        onDraftReady={handleDraftReady}
      />
      
      <div className="mt-8 text-gray-500 text-xs text-center">
        Powered by React & Gemini AI
      </div>
    </div>
  );
};

export default SupportCard;