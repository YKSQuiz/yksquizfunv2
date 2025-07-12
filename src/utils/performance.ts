// Performance monitoring utilities
export class PerformanceMonitor {
  private static instance: PerformanceMonitor;
  private metrics: Map<string, number[]> = new Map();
  private observers: PerformanceObserver[] = [];

  private constructor() {
    this.initObservers();
  }

  static getInstance(): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor();
    }
    return PerformanceMonitor.instance;
  }

  private initObservers() {
    // Observe navigation timing
    if ('PerformanceObserver' in window) {
      const navigationObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === 'navigation') {
            const navEntry = entry as PerformanceNavigationTiming;
            this.recordMetric('navigation', navEntry.loadEventEnd - navEntry.loadEventStart);
          }
        }
      });
      
      try {
        navigationObserver.observe({ entryTypes: ['navigation'] });
        this.observers.push(navigationObserver);
      } catch (e) {
        console.warn('Navigation timing not supported');
      }

      // Observe paint timing
      const paintObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === 'paint') {
            this.recordMetric('paint', entry.startTime);
          }
        }
      });
      
      try {
        paintObserver.observe({ entryTypes: ['paint'] });
        this.observers.push(paintObserver);
      } catch (e) {
        console.warn('Paint timing not supported');
      }
    }
  }

  recordMetric(name: string, value: number) {
    if (!this.metrics.has(name)) {
      this.metrics.set(name, []);
    }
    this.metrics.get(name)!.push(value);
  }

  getAverageMetric(name: string): number {
    const values = this.metrics.get(name);
    if (!values || values.length === 0) return 0;
    return values.reduce((sum, val) => sum + val, 0) / values.length;
  }

  getMetrics(): Record<string, number[]> {
    const result: Record<string, number[]> = {};
    this.metrics.forEach((values, key) => {
      result[key] = [...values];
    });
    return result;
  }

  measureAsync<T>(name: string, fn: () => Promise<T>): Promise<T> {
    const start = performance.now();
    return fn().finally(() => {
      const duration = performance.now() - start;
      this.recordMetric(name, duration);
    });
  }

  measureSync<T>(name: string, fn: () => T): T {
    const start = performance.now();
    try {
      return fn();
    } finally {
      const duration = performance.now() - start;
      this.recordMetric(name, duration);
    }
  }

  reportMetrics() {
    const metrics = this.getMetrics();
    console.log('Performance Metrics:', metrics);
    
    // Send to analytics if available
    if (process.env.NODE_ENV === 'production') {
      // Send to analytics service
      this.sendToAnalytics(metrics);
    }
  }

  private sendToAnalytics(metrics: Record<string, number[]>) {
    // Implementation for sending metrics to analytics service
    // This could be Google Analytics, Firebase Analytics, etc.
    try {
      // Example: Send to Firebase Analytics
      if (typeof window !== 'undefined' && (window as any).gtag) {
        Object.entries(metrics).forEach(([name, values]) => {
          const average = values.reduce((sum, val) => sum + val, 0) / values.length;
          (window as any).gtag('event', 'performance_metric', {
            metric_name: name,
            metric_value: average,
            metric_count: values.length
          });
        });
      }
    } catch (e) {
      console.warn('Failed to send metrics to analytics:', e);
    }
  }

  destroy() {
    this.observers.forEach(observer => observer.disconnect());
    this.observers = [];
    this.metrics.clear();
  }
}

// React Hook for performance monitoring
export const usePerformanceMonitor = () => {
  const monitor = PerformanceMonitor.getInstance();

  const measureAsync = (name: string, fn: () => Promise<any>) => {
    return monitor.measureAsync(name, fn);
  };

  const measureSync = (name: string, fn: () => any) => {
    return monitor.measureSync(name, fn);
  };

  const recordMetric = (name: string, value: number) => {
    monitor.recordMetric(name, value);
  };

  return {
    measureAsync,
    measureSync,
    recordMetric,
    getMetrics: () => monitor.getMetrics(),
    reportMetrics: () => monitor.reportMetrics()
  };
};

// Web Vitals monitoring
export const reportWebVitals = (onPerfEntry: (metric: any) => void) => {
  import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
    getCLS(onPerfEntry);
    getFID(onPerfEntry);
    getFCP(onPerfEntry);
    getLCP(onPerfEntry);
    getTTFB(onPerfEntry);
  });
};

// Memory usage monitoring
export const getMemoryUsage = () => {
  if ('memory' in performance) {
    const memory = (performance as any).memory;
    return {
      usedJSHeapSize: memory.usedJSHeapSize,
      totalJSHeapSize: memory.totalJSHeapSize,
      jsHeapSizeLimit: memory.jsHeapSizeLimit
    };
  }
  return null;
};

// Network monitoring
export const getNetworkInfo = () => {
  if ('connection' in navigator) {
    const connection = (navigator as any).connection;
    return {
      effectiveType: connection.effectiveType,
      downlink: connection.downlink,
      rtt: connection.rtt
    };
  }
  return null;
}; 