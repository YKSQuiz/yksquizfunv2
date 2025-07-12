// A/B Testing Framework
interface ABTest {
  id: string;
  name: string;
  variants: {
    [key: string]: {
      weight: number;
      config: any;
    };
  };
  defaultVariant: string;
}

class ABTestingFramework {
  private static instance: ABTestingFramework;
  private tests: Map<string, ABTest> = new Map();
  private userAssignments: Map<string, string> = new Map();
  private userId: string | null = null;

  private constructor() {
    this.loadUserAssignments();
  }

  static getInstance(): ABTestingFramework {
    if (!ABTestingFramework.instance) {
      ABTestingFramework.instance = new ABTestingFramework();
    }
    return ABTestingFramework.instance;
  }

  setUserId(userId: string) {
    this.userId = userId;
    this.loadUserAssignments();
  }

  private loadUserAssignments() {
    if (this.userId) {
      const stored = localStorage.getItem(`ab_assignments_${this.userId}`);
      if (stored) {
        this.userAssignments = new Map(JSON.parse(stored));
      }
    }
  }

  private saveUserAssignments() {
    if (this.userId) {
      localStorage.setItem(`ab_assignments_${this.userId}`, JSON.stringify(Array.from(this.userAssignments.entries())));
    }
  }

  registerTest(test: ABTest) {
    this.tests.set(test.id, test);
  }

  getVariant(testId: string): string {
    const test = this.tests.get(testId);
    if (!test) {
      console.warn(`AB Test not found: ${testId}`);
      return 'default';
    }

    // Check if user already has an assignment
    const assignmentKey = `${testId}_${this.userId || 'anonymous'}`;
    if (this.userAssignments.has(assignmentKey)) {
      return this.userAssignments.get(assignmentKey)!;
    }

    // Assign user to a variant based on weights
    const variant = this.assignVariant(test);
    this.userAssignments.set(assignmentKey, variant);
    this.saveUserAssignments();

    return variant;
  }

  private assignVariant(test: ABTest): string {
    const random = Math.random();
    let cumulativeWeight = 0;

    for (const [variantId, variant] of Object.entries(test.variants)) {
      cumulativeWeight += variant.weight;
      if (random <= cumulativeWeight) {
        return variantId;
      }
    }

    return test.defaultVariant;
  }

  getTestConfig(testId: string): any {
    const variant = this.getVariant(testId);
    const test = this.tests.get(testId);
    
    if (!test) {
      return {};
    }

    return test.variants[variant]?.config || {};
  }

  trackEvent(testId: string, event: string, data?: any) {
    const variant = this.getVariant(testId);
    
    // Send to analytics
    if (process.env.NODE_ENV === 'production') {
      this.sendToAnalytics(testId, variant, event, data);
    }

    // Log for development
    if (process.env.NODE_ENV === 'development') {
      console.log(`AB Test Event: ${testId} - ${variant} - ${event}`, data);
    }
  }

  private sendToAnalytics(testId: string, variant: string, event: string, data?: any) {
    try {
      // Send to Firebase Analytics or other analytics service
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'ab_test_event', {
          test_id: testId,
          variant: variant,
          event: event,
          data: data
        });
      }
    } catch (e) {
      console.warn('Failed to send AB test event to analytics:', e);
    }
  }

  getTestResults(testId: string): any {
    // This would typically fetch from analytics service
    // For now, return mock data
    return {
      testId,
      totalUsers: 1000,
      variants: {
        A: { users: 500, conversions: 50 },
        B: { users: 500, conversions: 55 }
      }
    };
  }
}

// Predefined AB Tests
export const AB_TESTS = {
  QUIZ_UI_VARIANT: {
    id: 'quiz_ui_variant',
    name: 'Quiz UI Variant',
    variants: {
      A: {
        weight: 0.5,
        config: {
          showProgressBar: true,
          showTimer: true,
          showJokers: true,
          animationSpeed: 'normal'
        }
      },
      B: {
        weight: 0.5,
        config: {
          showProgressBar: false,
          showTimer: true,
          showJokers: true,
          animationSpeed: 'fast'
        }
      }
    },
    defaultVariant: 'A'
  },
  
  QUESTION_LOADING: {
    id: 'question_loading',
    name: 'Question Loading Strategy',
    variants: {
      A: {
        weight: 0.5,
        config: {
          preloadNext: true,
          cacheSize: 10,
          loadingStrategy: 'progressive'
        }
      },
      B: {
        weight: 0.5,
        config: {
          preloadNext: false,
          cacheSize: 5,
          loadingStrategy: 'on_demand'
        }
      }
    },
    defaultVariant: 'A'
  }
};

// React Hook for AB Testing
export const useABTest = (testId: string) => {
  const framework = ABTestingFramework.getInstance();
  
  const getVariant = () => framework.getVariant(testId);
  const getConfig = () => framework.getTestConfig(testId);
  const trackEvent = (event: string, data?: any) => framework.trackEvent(testId, event, data);

  return {
    variant: getVariant(),
    config: getConfig(),
    trackEvent
  };
};

// Initialize AB Tests
export const initializeABTests = () => {
  const framework = ABTestingFramework.getInstance();
  
  Object.values(AB_TESTS).forEach(test => {
    framework.registerTest(test);
  });
};

export default ABTestingFramework; 