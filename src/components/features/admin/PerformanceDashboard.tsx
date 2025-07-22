import React, { useState, useEffect, useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { usePerformanceMonitor } from '../../../utils/performance';
import { getMemoryUsage, getNetworkInfo } from '../../../utils/performance';
import { useABTest } from '../../../utils/abTesting';
import { GradientBackground } from '../../common/ui';
import './PerformanceDashboard.css';

interface PerformanceData {
  timestamp: number;
  memoryUsage: number;
  networkSpeed: number;
  loadTime: number;
  cacheHitRate: number;
}

const PerformanceDashboard: React.FC = () => {
  const { getMetrics, reportMetrics } = usePerformanceMonitor();
  const [performanceData, setPerformanceData] = useState<PerformanceData[]>([]);
  const [isMonitoring, setIsMonitoring] = useState(false);
  const [refreshInterval, setRefreshInterval] = useState<NodeJS.Timeout | null>(null);

  // AB Test results
  const { variant: uiVariant, config: uiConfig } = useABTest('quiz_ui_variant');
  const { variant: loadingVariant, config: loadingConfig } = useABTest('question_loading');

  // Start/Stop monitoring
  const toggleMonitoring = () => {
    if (isMonitoring) {
      if (refreshInterval) {
        clearInterval(refreshInterval);
        setRefreshInterval(null);
      }
      setIsMonitoring(false);
    } else {
      const interval = setInterval(() => {
        collectPerformanceData();
      }, 5000); // Collect data every 5 seconds
      setRefreshInterval(interval);
      setIsMonitoring(true);
    }
  };

  const collectPerformanceData = () => {
    const memory = getMemoryUsage();
    const network = getNetworkInfo();
    const metrics = getMetrics();

    const data: PerformanceData = {
      timestamp: Date.now(),
      memoryUsage: memory ? (memory.usedJSHeapSize / memory.jsHeapSizeLimit) * 100 : 0,
      networkSpeed: network ? network.downlink : 0,
      loadTime: metrics['fetchQuestions'] ? metrics['fetchQuestions'].reduce((a, b) => a + b, 0) / metrics['fetchQuestions'].length : 0,
      cacheHitRate: metrics['cache_hit'] ? (metrics['cache_hit'].length / (metrics['cache_hit'].length + (metrics['fetch_error']?.length || 0))) * 100 : 0
    };

    setPerformanceData(prev => [...prev.slice(-20), data]); // Keep last 20 data points
  };

  // Memoized chart data
  const chartData = useMemo(() => {
    return performanceData.map(data => ({
      time: new Date(data.timestamp).toLocaleTimeString(),
      memory: data.memoryUsage,
      network: data.networkSpeed,
      loadTime: data.loadTime,
      cacheHitRate: data.cacheHitRate
    }));
  }, [performanceData]);

  // Performance summary
  const performanceSummary = useMemo(() => {
    if (performanceData.length === 0) return null;

    const latest = performanceData[performanceData.length - 1];
    const avgMemory = performanceData.reduce((sum, data) => sum + data.memoryUsage, 0) / performanceData.length;
    const avgLoadTime = performanceData.reduce((sum, data) => sum + data.loadTime, 0) / performanceData.length;
    const avgCacheHitRate = performanceData.reduce((sum, data) => sum + data.cacheHitRate, 0) / performanceData.length;

    return {
      currentMemory: latest?.memoryUsage || 0,
      averageMemory: avgMemory,
      currentLoadTime: latest?.loadTime || 0,
      averageLoadTime: avgLoadTime,
      currentCacheHitRate: latest?.cacheHitRate || 0,
      averageCacheHitRate: avgCacheHitRate,
      dataPoints: performanceData.length
    };
  }, [performanceData]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (refreshInterval) {
        clearInterval(refreshInterval);
      }
    };
  }, [refreshInterval]);

  // const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <GradientBackground variant="admin" showParticles={true} particleCount={6}>
      <div className="performance-dashboard">
      <div className="dashboard-header">
        <h1>Performance Dashboard</h1>
        <button 
          onClick={toggleMonitoring}
          className={`monitoring-btn ${isMonitoring ? 'active' : ''}`}
        >
          {isMonitoring ? 'Stop Monitoring' : 'Start Monitoring'}
        </button>
      </div>

      {/* AB Test Information */}
      <div className="ab-test-section">
        <h2>AB Test Status</h2>
        <div className="ab-test-grid">
          <div className="ab-test-card">
            <h3>UI Variant</h3>
            <p>Current: {uiVariant}</p>
            <p>Progress Bar: {uiConfig.showProgressBar ? 'Yes' : 'No'}</p>
            <p>Animation Speed: {uiConfig.animationSpeed}</p>
          </div>
          <div className="ab-test-card">
            <h3>Loading Variant</h3>
            <p>Current: {loadingVariant}</p>
            <p>Cache Size: {loadingConfig.cacheSize}</p>
            <p>Strategy: {loadingConfig.loadingStrategy}</p>
          </div>
        </div>
      </div>

      {/* Performance Summary */}
      {performanceSummary && (
        <div className="performance-summary">
          <h2>Performance Summary</h2>
          <div className="summary-grid">
            <div className="summary-card">
              <h3>Memory Usage</h3>
              <p className="current">{performanceSummary.currentMemory.toFixed(2)}%</p>
              <p className="average">Avg: {performanceSummary.averageMemory.toFixed(2)}%</p>
            </div>
            <div className="summary-card">
              <h3>Load Time</h3>
              <p className="current">{performanceSummary.currentLoadTime.toFixed(2)}ms</p>
              <p className="average">Avg: {performanceSummary.averageLoadTime.toFixed(2)}ms</p>
            </div>
            <div className="summary-card">
              <h3>Cache Hit Rate</h3>
              <p className="current">{performanceSummary.currentCacheHitRate.toFixed(2)}%</p>
              <p className="average">Avg: {performanceSummary.averageCacheHitRate.toFixed(2)}%</p>
            </div>
            <div className="summary-card">
              <h3>Data Points</h3>
              <p className="current">{performanceSummary.dataPoints}</p>
            </div>
          </div>
        </div>
      )}

      {/* Charts */}
      {chartData.length > 0 && (
        <div className="charts-section">
          <h2>Performance Charts</h2>
          
          <div className="chart-grid">
            <div className="chart-container">
              <h3>Memory Usage Over Time</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="memory" stroke="#8884d8" />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="chart-container">
              <h3>Load Time Over Time</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="loadTime" stroke="#82ca9d" />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="chart-container">
              <h3>Cache Hit Rate</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="cacheHitRate" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="chart-container">
              <h3>Network Speed</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="network" stroke="#ffc658" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {/* Export Data */}
      <div className="export-section">
        <h2>Export Data</h2>
        <button onClick={() => reportMetrics()}>
          Export Metrics
        </button>
        <button onClick={() => {
          const dataStr = JSON.stringify(performanceData, null, 2);
          const dataBlob = new Blob([dataStr], { type: 'application/json' });
          const url = URL.createObjectURL(dataBlob);
          const link = document.createElement('a');
          link.href = url;
          link.download = 'performance-data.json';
          link.click();
        }}>
          Export Performance Data
        </button>
      </div>
    </div>
    </GradientBackground>
  );
};

export default PerformanceDashboard; 