import { useState } from 'react';
import { verifyAccessCode } from '../services/api';
import { useAuthStore } from '../store/auth';

export default function AccessCodeModal({ onClose }) {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await verifyAccessCode(code);
      login(response.data.token, response.data.memberName);
      onClose();
      window.location.reload();
    } catch (err) {
      setError(err.response?.data?.error || '验证失败，请检查访问码');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-[32px] p-10 max-w-md w-full shadow-2xl">
        <h2 className="text-3xl font-extrabold mb-4 text-center">输入访问码</h2>
        <p className="text-gray-600 text-center mb-8">
          此内容需要访问码才能查看。请输入您的访问码。
        </p>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="请输入访问码"
            className="input mb-4"
            autoFocus
          />

          {error && (
            <p className="text-red-500 text-sm text-center mb-4">{error}</p>
          )}

          <div className="flex gap-3">
            <button
              type="submit"
              disabled={loading || !code}
              className="flex-1 bg-gray-900 text-white py-3 px-6 rounded-full font-semibold hover:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all hover:-translate-y-0.5"
            >
              {loading ? '验证中...' : '确认'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-100 text-gray-700 py-3 px-6 rounded-full font-semibold hover:bg-gray-200 transition-all"
            >
              取消
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
