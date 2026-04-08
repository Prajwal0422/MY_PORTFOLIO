// Analytics utilities for tracking user interactions

/**
 * Track page view
 */
export const trackPageView = (pageName) => {
  if (window.gtag) {
    window.gtag('event', 'page_view', {
      page_title: pageName,
      page_location: window.location.href,
      page_path: window.location.pathname,
    });
  }
  console.log('Page view:', pageName);
};

/**
 * Track custom event
 */
export const trackEvent = (eventName, eventParams = {}) => {
  if (window.gtag) {
    window.gtag('event', eventName, eventParams);
  }
  console.log('Event:', eventName, eventParams);
};

/**
 * Track button click
 */
export const trackButtonClick = (buttonName, location) => {
  trackEvent('button_click', {
    button_name: buttonName,
    location: location,
  });
};

/**
 * Track project view
 */
export const trackProjectView = (projectName) => {
  trackEvent('project_view', {
    project_name: projectName,
  });
};

/**
 * Track section scroll
 */
export const trackSectionScroll = (sectionName) => {
  trackEvent('section_scroll', {
    section_name: sectionName,
  });
};

/**
 * Track download
 */
export const trackDownload = (fileName) => {
  trackEvent('file_download', {
    file_name: fileName,
  });
};

/**
 * Track external link click
 */
export const trackExternalLink = (url, linkName) => {
  trackEvent('external_link_click', {
    url: url,
    link_name: linkName,
  });
};

/**
 * Track form submission
 */
export const trackFormSubmission = (formName, success = true) => {
  trackEvent('form_submission', {
    form_name: formName,
    success: success,
  });
};

/**
 * Track error
 */
export const trackError = (errorMessage, errorLocation) => {
  trackEvent('error', {
    error_message: errorMessage,
    error_location: errorLocation,
  });
};
