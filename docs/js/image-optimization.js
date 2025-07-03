// Image Optimization and Lazy Loading Script
document.addEventListener('DOMContentLoaded', function() {
  
  // Check if browser supports native lazy loading
  const supportsLazyLoading = 'loading' in HTMLImageElement.prototype;
  
  if (!supportsLazyLoading) {
    // Fallback for browsers that don't support native lazy loading
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    
    if (lazyImages.length > 0) {
      // Create intersection observer for lazy loading fallback
      const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src || img.src;
            img.classList.remove('lazy');
            observer.unobserve(img);
          }
        });
      }, {
        rootMargin: '50px 0px',
        threshold: 0.01
      });
      
      lazyImages.forEach(img => {
        imageObserver.observe(img);
      });
    }
  }
  
  // Image error handling
  const allImages = document.querySelectorAll('img');
  allImages.forEach(img => {
    img.addEventListener('error', function() {
      console.warn('Failed to load image:', this.src);
      // Optionally set a placeholder image
      // this.src = './img/placeholder.jpg';
    });
    
      // Add fade-in effect when image loads
  img.addEventListener('load', function() {
    this.style.opacity = '1';
    this.classList.add('loaded');
    
    // Remove blur effect if it was applied
    if (this.style.filter) {
      this.style.filter = 'none';
      this.style.transform = 'scale(1)';
    }
  });
  });
  
  // Preload critical images on user interaction
  let hasPreloaded = false;
  const preloadCriticalImages = () => {
    if (hasPreloaded) return;
    hasPreloaded = true;
    
    const criticalImages = [
      './img/products/1.jpg',
      './img/products/2.jpg',
      './img/products/3.jpg',
      './img/products/4.jpg'
    ];
    
    criticalImages.forEach(src => {
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.href = src;
      document.head.appendChild(link);
    });
  };
  
  // Preload on first user interaction
  document.addEventListener('mouseover', preloadCriticalImages, { once: true });
  document.addEventListener('touchstart', preloadCriticalImages, { once: true });
  document.addEventListener('scroll', preloadCriticalImages, { once: true });
  
  // Performance monitoring
  if ('performance' in window && 'PerformanceObserver' in window) {
    const observer = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        if (entry.entryType === 'largest-contentful-paint') {
          console.log('LCP:', entry.startTime);
        }
      });
    });
    
    try {
      observer.observe({ entryTypes: ['largest-contentful-paint'] });
    } catch (e) {
      console.log('Performance monitoring not supported');
    }
  }
  
  console.log('Image optimization script loaded');
}); 