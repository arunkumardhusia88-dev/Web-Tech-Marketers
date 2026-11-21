/**
 * Veltrix Growth — LocalStorage Persistence & Backend-Ready Data Adapter
 *
 * PRODUCTION NOTE:
 * LocalStorage is strictly used for this frontend browser demo.
 * To upgrade to Firebase or Supabase in production, replace the async/sync
 * adapter methods in VeltrixStorage with Firestore/Supabase SDK calls for:
 *  - Secure admin authentication (Firebase Auth / Supabase Auth)
 *  - Shared database & multi-device synchronization
 *  - Cloud object storage for uploaded images
 */
(function (global) {
  'use strict';

  var STORAGE_KEY = 'webluxe_agency_cms_v9';
  var AUTH_KEY = 'webluxe_admin_session_v1';
  var VISITOR_SESSION_KEY = 'veltrix_visitor_counted';

  function deepClone(obj) {
    return JSON.parse(JSON.stringify(obj));
  }

  function getDefaultData() {
    if (!global.VELTRIX_DEFAULT_DATA) {
      throw new Error('VELTRIX_DEFAULT_DATA is not loaded.');
    }
    return deepClone(global.VELTRIX_DEFAULT_DATA);
  }

  var VeltrixStorage = {
    /**
     * Load complete website state from LocalStorage or initialize with seed data.
     */
    getState: function () {
      try {
        var raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) {
          var seed = getDefaultData();
          localStorage.setItem(STORAGE_KEY, JSON.stringify(seed));
          return seed;
        }
        var parsed = JSON.parse(raw);
        var defaults = getDefaultData();
        // Ensure top-level keys exist if schema evolved
        Object.keys(defaults).forEach(function (key) {
          if (parsed[key] === undefined) {
            parsed[key] = defaults[key];
          }
        });
        return parsed;
      } catch (err) {
        console.error('Failed to read LocalStorage state:', err);
        return getDefaultData();
      }
    },

    /**
     * Persist complete state back to LocalStorage.
     */
    saveState: function (nextState) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(nextState));
        return true;
      } catch (err) {
        console.error('Failed to save LocalStorage state:', err);
        return false;
      }
    },

    /**
     * Reset all demo content back to initial seed dataset.
     */
    resetAll: function () {
      var seed = getDefaultData();
      this.saveState(seed);
      return seed;
    },

    /**
     * Update a top-level section object (e.g., 'settings', 'hero', 'about', 'promoBanner').
     */
    updateSection: function (sectionKey, partialOrFullData) {
      var state = this.getState();
      if (Array.isArray(partialOrFullData)) {
        state[sectionKey] = partialOrFullData;
      } else {
        state[sectionKey] = Object.assign({}, state[sectionKey] || {}, partialOrFullData);
      }
      this.saveState(state);
      return state[sectionKey];
    },

    /**
     * Generic Collection CRUD Helpers
     */
    getCollection: function (collectionKey) {
      var state = this.getState();
      return Array.isArray(state[collectionKey]) ? state[collectionKey] : [];
    },

    upsertItem: function (collectionKey, item, idField) {
      var key = idField || 'id';
      var state = this.getState();
      var list = Array.isArray(state[collectionKey]) ? state[collectionKey] : [];
      if (!item[key]) {
        item[key] = collectionKey.slice(0, 3) + '-' + Date.now();
      }
      var index = list.findIndex(function (entry) {
        return entry[key] === item[key];
      });
      if (index >= 0) {
        list[index] = Object.assign({}, list[index], item);
      } else {
        list.push(item);
      }
      state[collectionKey] = list;
      this.saveState(state);
      return item;
    },

    deleteItem: function (collectionKey, id, idField) {
      var key = idField || 'id';
      var state = this.getState();
      var list = Array.isArray(state[collectionKey]) ? state[collectionKey] : [];
      state[collectionKey] = list.filter(function (entry) {
        return entry[key] !== id;
      });
      this.saveState(state);
      return state[collectionKey];
    },

    /**
     * Increment demo visitor counter once per browser session.
     */
    recordVisit: function () {
      try {
        if (!sessionStorage.getItem(VISITOR_SESSION_KEY)) {
          var state = this.getState();
          state.settings.visitorCount = (Number(state.settings.visitorCount) || 14820) + 1;
          this.saveState(state);
          sessionStorage.setItem(VISITOR_SESSION_KEY, '1');
        }
      } catch (e) {
        // Ignore storage errors in private mode
      }
    },

    /**
     * Demo Admin Session Management (Frontend Mock Only — Not Production Auth)
     */
    loginDemoAdmin: function (email, password) {
      var cleanEmail = String(email || '').trim().toLowerCase();
      var cleanPass = String(password || '').trim();
      if ((cleanEmail === 'webluxeadmin@gmail.com' && cleanPass === 'WebluxeAdmin2026!') ||
          (cleanEmail === 'admin@webluxe.com' && cleanPass === 'WebluxeAdmin2026!')) {
        var session = {
          email: cleanEmail,
          role: 'Agency Administrator (Demo)',
          loggedInAt: new Date().toISOString()
        };
        localStorage.setItem(AUTH_KEY, JSON.stringify(session));
        return { ok: true, session: session };
      }
      return { ok: false, error: 'Invalid demo credentials. Use webluxeadmin@gmail.com / WebluxeAdmin2026!' };
    },

    getAdminSession: function () {
      try {
        var raw = localStorage.getItem(AUTH_KEY);
        return raw ? JSON.parse(raw) : null;
      } catch (e) {
        return null;
      }
    },

    logoutDemoAdmin: function () {
      localStorage.removeItem(AUTH_KEY);
    },

    /**
     * Utility: Convert text to URL-friendly slug
     */
    slugify: function (text) {
      return String(text || '')
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-');
    }
  };

  var THEME_KEY = 'webluxe_theme_mode_v2';

  var VeltrixTheme = {
    getTheme: function () {
      try {
        var saved = localStorage.getItem(THEME_KEY);
        return saved === 'dark' ? 'dark' : 'light';
      } catch (e) {
        return 'light';
      }
    },
    applyTheme: function (mode) {
      var target = mode === 'light' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', target);
      try {
        localStorage.setItem(THEME_KEY, target);
      } catch (e) {
        // Ignore storage errors
      }
      return target;
    },
    toggleTheme: function () {
      var next = this.getTheme() === 'light' ? 'dark' : 'light';
      return this.applyTheme(next);
    }
  };

  // Apply theme immediately as script loads
  VeltrixTheme.applyTheme(VeltrixTheme.getTheme());

  global.VeltrixStorage = VeltrixStorage;
  global.VeltrixTheme = VeltrixTheme;
})(window);
