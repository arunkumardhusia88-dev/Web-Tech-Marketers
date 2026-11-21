import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    appType: 'mpa' as const,
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    build: {
      rollupOptions: {
        input: {
          main: path.resolve(__dirname, 'index.html'),
          about: path.resolve(__dirname, 'about.html'),
          contact: path.resolve(__dirname, 'contact.html'),
          pricing: path.resolve(__dirname, 'pricing.html'),
          blog: path.resolve(__dirname, 'blog.html'),
          service: path.resolve(__dirname, 'services/service.html'),
          portfolio: path.resolve(__dirname, 'portfolio/project.html'),
          blogPost: path.resolve(__dirname, 'blog/post.html'),
          adminIndex: path.resolve(__dirname, 'webluxe-portal/index.html'),
          adminLogin: path.resolve(__dirname, 'webluxe-portal/login.html'),
          adminDashboard: path.resolve(__dirname, 'webluxe-portal/dashboard.html'),
        },
      },
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
