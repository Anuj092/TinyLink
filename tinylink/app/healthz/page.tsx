'use client';

import { useEffect, useState } from 'react';

interface HealthData {
  ok: boolean;
  version: string;
  uptime: number;
  timestamp: string;
}

export default function HealthPage() {
  const [health, setHealth] = useState<HealthData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHealth();
  }, []);

  const fetchHealth = async () => {
    try {
      const res = await fetch('/api/healthz');
      if (res.ok) {
        const data = await res.json();
        setHealth(data);
      }
    } catch (err) {
      console.error('Failed to fetch health:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatUptime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours}h ${minutes}m ${secs}s`;
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-md p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          System Health
        </h1>

        {loading ? (
          <div className="text-center text-gray-600">Loading...</div>
        ) : health ? (
          <div className="space-y-4">
            <div className="flex items-center justify-center">
              <div
                className={`w-4 h-4 rounded-full mr-2 ${
                  health.ok ? 'bg-green-500' : 'bg-red-500'
                }`}
              />
              <span className="text-lg font-medium text-gray-800">
                {health.ok ? 'Healthy' : 'Unhealthy'}
              </span>
            </div>

            <div className="border-t pt-4 space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Version:</span>
                <span className="font-medium text-gray-800">{health.version}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Uptime:</span>
                <span className="font-medium text-gray-800">{formatUptime(health.uptime)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Timestamp:</span>
                <span className="font-medium text-sm text-gray-800">
                  {new Date(health.timestamp).toLocaleString()}
                </span>
              </div>
            </div>

            <div className="pt-4">
              <a
                href="/"
                className="block text-center text-blue-600 hover:text-blue-700 font-medium"
              >
                ← Back to Dashboard
              </a>
            </div>
          </div>
        ) : (
          <div className="text-center text-red-600 font-medium">Failed to load health data</div>
        )}
      </div>
    </div>
  );
}
