import { useNavigate } from 'react-router-dom';

export default function Modal({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();

  return (
    <div style={overlayStyle} onClick={() => navigate('/')}>
      <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
        <button onClick={() => navigate('/')} style={{ backgroundColor: 'rgba(75, 78, 229, 0.42)', float: 'right' }}>Close</button>
        {children}
      </div>
    </div>
  );
}

const overlayStyle: React.CSSProperties = {
  position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
  backgroundColor: 'rgba(138, 139, 232, 0.29)', display: 'flex', justifyContent: 'center', alignItems: 'center'
};

const modalStyle: React.CSSProperties = {
  background: 'rgba(200, 183, 121, 1)', padding: '2rem', borderRadius: '8px', minWidth: '400px', maxWidth: '90%'
};