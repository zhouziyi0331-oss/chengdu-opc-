import { useState, useEffect } from 'react';
import { getAccessCodes, generateAccessCodes } from '../../services/api';

export default function AccessCodesManager() {
  const [codes, setCodes] = useState([]);
  const [count, setCount] = useState(1);
  const [memberNames, setMemberNames] = useState('');
  const [expiresInDays, setExpiresInDays] = useState('');

  useEffect(() => {
    fetchCodes();
  }, []);

  const fetchCodes = async () => {
    try {
      const response = await getAccessCodes();
      setCodes(response.data);
    } catch (error) {
      console.error('获取访问码失败:', error);
    }
  };

  const handleGenerate = async () => {
    try {
      const names = memberNames.split('\n').map(n => n.trim()).filter(Boolean);
      await generateAccessCodes({
        count: Math.max(count, names.length),
        memberNames: names,
        expiresInDays: expiresInDays ? parseInt(expiresInDays) : null
      });
      setCount(1);
      setMemberNames('');
      setExpiresInDays('');
      fetchCodes();
    } catch (error) {
      alert('生成失败');
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">访问码管理</h2>

      <div className="mb-6 p-4 bg-gray-50 rounded">
        <h3 className="font-bold mb-2">生成新访问码</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm mb-1">生成数量</label>
            <input
              type="number"
              min="1"
              value={count}
              onChange={(e) => setCount(parseInt(e.target.value))}
              className="w-full px-4 py-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm mb-1">成员名称（每行一个，可选）</label>
            <textarea
              value={memberNames}
              onChange={(e) => setMemberNames(e.target.value)}
              className="w-full px-4 py-2 border rounded"
              rows="3"
              placeholder="张三&#10;李四&#10;王五"
            />
          </div>
          <div>
            <label className="block text-sm mb-1">有效期（天数，留空为永久）</label>
            <input
              type="number"
              min="1"
              value={expiresInDays}
              onChange={(e) => setExpiresInDays(e.target.value)}
              className="w-full px-4 py-2 border rounded"
              placeholder="例如: 30"
            />
          </div>
          <button
            onClick={handleGenerate}
            className="bg-indigo-600 text-white px-4 py-2 rounded"
          >
            生成访问码
          </button>
        </div>
      </div>

      <div>
        <h3 className="font-bold mb-2">已生成的访问码</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 border">访问码</th>
                <th className="px-4 py-2 border">成员名称</th>
                <th className="px-4 py-2 border">状态</th>
                <th className="px-4 py-2 border">使用时间</th>
                <th className="px-4 py-2 border">过期时间</th>
              </tr>
            </thead>
            <tbody>
              {codes.map((code) => (
                <tr key={code.id}>
                  <td className="px-4 py-2 border font-mono">{code.code}</td>
                  <td className="px-4 py-2 border">{code.member_name || '-'}</td>
                  <td className="px-4 py-2 border">
                    <span className={code.is_used ? 'text-green-600' : 'text-gray-500'}>
                      {code.is_used ? '已使用' : '未使用'}
                    </span>
                  </td>
                  <td className="px-4 py-2 border text-sm">
                    {code.used_at ? new Date(code.used_at).toLocaleString() : '-'}
                  </td>
                  <td className="px-4 py-2 border text-sm">
                    {code.expires_at ? new Date(code.expires_at).toLocaleString() : '永久'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
