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
    <div 
      className="fixed z-50 bg-black bg-opacity-50 rounded-lg"
      style={{
        top: 'min(1rem, 2vw)', // Responsive top position
        right: 'min(1rem, 2vw)', // Responsive right position
        padding: 'min(1rem, 2vw)', // Responsive padding
        borderRadius: 'min(0.5rem, 1vw)' // Responsive border radius
      }}
    >
      <h3 
        className="text-white mb-2"
        style={{
          fontSize: 'min(0.875rem, 1.75vw)', // Responsive font size
          marginBottom: 'min(0.5rem, 1vw)' // Responsive margin
        }}
      >
        Kiosk Auswahl (Dev Mode)
      </h3>
      <div style={{ gap: 'min(0.5rem, 1vw)', display: 'flex', flexDirection: 'column' }}>
        {kiosks.map((kiosk) => (
          <button
            key={kiosk.id}
            onClick={() => setKioskId(kiosk.id)}
            className={`
              block w-full text-left rounded
              ${kioskId === kiosk.id 
                ? 'bg-museum-gold text-black' 
                : 'bg-white text-black hover:bg-gray-200'
              }
            `}
            style={{
              padding: 'min(0.5rem, 1vw)', // Responsive padding
              borderRadius: 'min(0.25rem, 0.5vw)', // Responsive border radius
              fontSize: 'min(0.875rem, 1.75vw)' // Responsive font size
            }}
          >
            <div 
              className="font-bold"
              style={{
                fontSize: 'min(0.875rem, 1.75vw)', // Responsive font size
                fontWeight: 'bold'
              }}
            >
              {kiosk.title}
            </div>
            <div 
              className="opacity-70"
              style={{
                fontSize: 'min(0.75rem, 1.5vw)', // Responsive font size
                opacity: 0.7
              }}
            >
              {kiosk.description}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default KioskSelector;
