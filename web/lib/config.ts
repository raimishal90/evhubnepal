// Configuration file for the application
export const config = {
  // Backend API configuration
  api: {
    // baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3002',
    baseUrl: 'http://localhost:3001',
    endpoints: {
      auth: {
        login: '/user/login',
        signup: '/user',
        logout: '/user/logout',
      },
      user: '/user',
      vehicles: '/vehicles',
      categories: '/categories',
      media: '/media',
    },
  },

  // App configuration
  app: {
    name: 'EV Hub Nepal',
    description: 'Nepal\'s Premier Electric Vehicle Marketplace',
    version: '1.0.0',
  },

  // Feature flags
  features: {
    enableAnalytics: process.env.NODE_ENV === 'production',
    enableDebugMode: process.env.NODE_ENV === 'development',
  },
}
