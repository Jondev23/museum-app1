import { useState, useEffect, useRef } from 'react';
import KioskSelectorScreen from './KioskSelector';

const AdminPanel = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [clickSequence, setClickSequence] = useState([]);
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showKioskSelector, setShowKioskSelector] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const passwordInputRef = useRef(null);

  const SECRET_SEQUENCE = ['tr', 'tr', 'br'];
  const ADMIN_PASSWORD = 'museum2025';

  useEffect(() => {
    const timer = setTimeout(() => {
      setClickSequence([]);
    }, 10000);
    return () => clearTimeout(timer);
  }, [clickSequence]);

  useEffect(() => {
    if (isVisible && !isAuthenticated && passwordInputRef.current) {
      const timer = setTimeout(() => {
        passwordInputRef.current.focus();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isVisible, isAuthenticated, password]);

  const handleCornerClick = (corner) => {
    const newSequence = [...clickSequence, corner];
    setClickSequence(newSequence);

    if (newSequence.length === SECRET_SEQUENCE.length) {
      if (JSON.stringify(newSequence) === JSON.stringify(SECRET_SEQUENCE)) {
        setIsVisible(true);
      }
      setClickSequence([]);
    }
  };

  const handleCornerTouch = (e, corner) => {
    e.preventDefault();
    handleCornerClick(corner);
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setErrorMsg('');
    } else {
      setPassword('');
      setErrorMsg('Passwort inkorrekt. Bitte versuchen Sie es erneut.');
      setTimeout(() => setErrorMsg(''), 3000);
      passwordInputRef.current?.focus();
      setTimeout(() => passwordInputRef.current?.focus(), 50);
    }
  };

  const handlePasswordTouchSubmit = (e) => {
    e.preventDefault();
    handlePasswordSubmit(e);
  };

  const handleInputClick = () => passwordInputRef.current?.focus();
  const handleInputTouch = (e) => {
    e.preventDefault();
    passwordInputRef.current?.focus();
  };

  const handleClose = () => {
    setIsVisible(false);
    setPassword('');
    setIsAuthenticated(false);
    setShowKioskSelector(false);
    setSuccessMsg('');
    setErrorMsg('');
  };

  const handleExitKiosk = () => {
    if (window.confirm('Kiosk-Modus wirklich beenden?')) {
      if (window.electronAPI) {
        window.close();
      } else {
        window.location.href = 'about:blank';
      }
    }
  };

  return (
    <>
      <div
        className="admin-corner-trigger top-0 right-0"
        onClick={() => handleCornerClick('tr')}
        onTouchStart={(e) => handleCornerTouch(e, 'tr')}
        style={{ touchAction: 'manipulation', userSelect: 'none' }}
      />
      <div
        className="admin-corner-trigger bottom-0 right-0"
        onClick={() => handleCornerClick('br')}
        onTouchStart={(e) => handleCornerTouch(e, 'br')}
        style={{ touchAction: 'manipulation', userSelect: 'none' }}
      />

      {isVisible && !showKioskSelector && (
        <div className="admin-overlay">
          <div className="admin-panel">
            <h2 className="admin-title">Admin Panel</h2>
            {successMsg && <div className="admin-success-message">{successMsg}</div>}
            {errorMsg && <div className="admin-error-message">{errorMsg}</div>}

            {!isAuthenticated ? (
              <form onSubmit={handlePasswordSubmit} className="admin-form">
                <div>
                  <label className="admin-label">Passwort</label>
                  <input
                    ref={passwordInputRef}
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onClick={handleInputClick}
                    onTouchStart={handleInputTouch}
                    className="admin-input"
                    autoFocus
                    style={{ touchAction: 'manipulation', userSelect: 'none' }}
                  />
                </div>
                <div className="admin-button-group-spaced">
                  <button
                    type="submit"
                    className="flex-1 admin-button-primary"
                    onTouchStart={handlePasswordTouchSubmit}
                    style={{ touchAction: 'manipulation', userSelect: 'none' }}
                  >
                    Anmelden
                  </button>
                  <button
                    type="button"
                    onClick={handleClose}
                    onTouchStart={(e) => { e.preventDefault(); handleClose(); }}
                    className="flex-1 admin-button-secondary"
                    style={{ touchAction: 'manipulation', userSelect: 'none' }}
                  >
                    Abbrechen
                  </button>
                </div>
              </form>
            ) : (
              <div className="admin-form-group">
                <button
                  onClick={() => setShowKioskSelector(true)}
                  onTouchStart={(e) => { e.preventDefault(); setShowKioskSelector(true); }}
                  className="w-full admin-button-primary"
                  style={{ touchAction: 'manipulation', userSelect: 'none' }}
                >
                  Kiosk auswählen
                </button>

                <button
                  onClick={handleClose}
                  onTouchStart={(e) => { e.preventDefault(); handleClose(); }}
                  className="w-full admin-button-secondary"
                  style={{ marginBottom: 'min(1.5rem, 3vw)', touchAction: 'manipulation', userSelect: 'none' }}
                >
                  Panel schließen
                </button>

                <div className="admin-separator" />

                <button
                  onClick={handleExitKiosk}
                  onTouchStart={(e) => { e.preventDefault(); handleExitKiosk(); }}
                  className="w-full admin-button-danger"
                  style={{ touchAction: 'manipulation', userSelect: 'none' }}
                >
                  Kiosk-Modus beenden
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {isVisible && showKioskSelector && (
        <KioskSelectorScreen
          onKioskSelected={(id) => {
            setShowKioskSelector(false);
            setSuccessMsg('Kiosk erfolgreich ausgewählt.');
            setTimeout(() => setSuccessMsg(''), 2000);
          }}
          onBack={() => setShowKioskSelector(false)}
        />
      )}
    </>
  );
};

export default AdminPanel;
