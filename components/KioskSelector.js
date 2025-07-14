import { useApp } from '../context/AppContext';
import { motion } from 'framer-motion';

const KioskSelector = () => {
  const { setKioskId, kioskId } = useApp();

  const kiosks = [
    { id: 'kiosk1', title: 'Allgemeine Geschichte', description: 'Grundlagen der Kutschengeschichte' },
    { id: 'kiosk2', title: 'Luxuskutschen', description: 'Prachtvolle Kutschen des Adels' },
    { id: 'kiosk3', title: 'Kutschenbau', description: 'Handwerk und Technik' },
  ];

  // Only show in development mode
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <div className="fixed top-4 right-4 z-50 bg-black bg-opacity-50 p-4 rounded-lg">
      <h3 className="text-white text-sm mb-2">Kiosk Auswahl (Dev Mode)</h3>
      <div className="space-y-2">
        {kiosks.map((kiosk) => (
          <button
            key={kiosk.id}
            onClick={() => setKioskId(kiosk.id)}
            className={`
              block w-full text-left p-2 rounded text-sm
              ${kioskId === kiosk.id 
                ? 'bg-museum-gold text-black' 
                : 'bg-white text-black hover:bg-gray-200'
              }
            `}
          >
            <div className="font-bold">{kiosk.title}</div>
            <div className="text-xs opacity-70">{kiosk.description}</div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default KioskSelector;
