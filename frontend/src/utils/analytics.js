/**
 * Analytics utilities for tracking user interactions
 */

export const trackEvent = (category, action, label) => {
  if (window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
    });
  }
  console.log(`Analytics: ${category} - ${action} - ${label}`);
};

export const trackPageView = (path) => {
  if (window.gtag) {
    window.gtag('config', 'GA_MEASUREMENT_ID', {
      page_path: path,
    });
  }
  console.log(`Page view: ${path}`);
};

export const trackProjectClick = (projectName) => {
  trackEvent('Projects', 'click', projectName);
};

export const trackDownload = (fileName) => {
  trackEvent('Downloads', 'resume', fileName);
};
