import { Navigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuthStore } from '../store/auth';
import AccessCodeModal from './AccessCodeModal';

export default function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuthStore();
  const [showModal, setShowModal] = useState(!isAuthenticated);

  if (!isAuthenticated && !showModal) {
    return <Navigate to="/" replace />;
  }

  if (!isAuthenticated && showModal) {
    return (
      <>
        <AccessCodeModal onClose={() => setShowModal(false)} />
        <div className="text-center py-12">
          <p className="text-gray-500">请输入访问码以查看此内容</p>
        </div>
      </>
    );
  }

  return children;
}
