// Standard footer component used across multiple screens
const StandardFooter = ({ 
  children,
  showProgressDots = false,
  className = '',
  style = {},
  alignProgressDots = 'center'
}) => {
  const baseFooterStyles = {
    position: 'fixed',
    bottom: '0',
    left: '0',
    right: '0',
    height: 'min(4.375rem, 7vh)', 
    padding: 'min(0.625rem, 1vh) min(1.25rem, 2vw)',
    minHeight: 'min(3.125rem, 5vh)',
    zIndex: 20,
    ...style
  };

  return (
    <div 
      className={`relative flex ${alignProgressDots === 'inline' && showProgressDots ? 'justify-center' : 'justify-between'} items-center ${className}`}
      style={baseFooterStyles}
    >
      <div style={{ flex: 1 }} />
      <div style={alignProgressDots === 'inline' && showProgressDots ? { position: 'absolute', right: 'min(6.6rem, 11vw)' } : {}}>
        {children}
      </div>
    </div>
  );
};

export default StandardFooter;
