// Enhanced Modal System with proper close handling
import gsap from 'gsap';

class ModalManager {
  constructor() {
    this.activeModal = null;
    this.isOpen = false;
    this.originalBodyOverflow = '';
  }

  open(modalElement, onClose) {
    if (this.isOpen) {
      console.warn('Modal already open');
      return;
    }

    this.activeModal = modalElement;
    this.isOpen = true;
    this.onCloseCallback = onClose;

    // Prevent body scroll
    this.originalBodyOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Show modal with animation
    modalElement.style.display = 'flex';
    gsap.fromTo(
      modalElement,
      { opacity: 0, scale: 0.95 },
      { opacity: 1, scale: 1, duration: 0.4, ease: 'power2.out' }
    );

    // Bind close events
    this.bindCloseEvents(modalElement);
  }

  bindCloseEvents(modalElement) {
    // Close button click
    const closeBtn = modalElement.querySelector('.modal-close, [data-modal-close]');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => this.close());
    }

    // ESC key press
    this.escHandler = (e) => {
      if (e.key === 'Escape') {
        this.close();
      }
    };
    document.addEventListener('keydown', this.escHandler);

    // Click outside modal content
    this.outsideClickHandler = (e) => {
      const modalContent = modalElement.querySelector('.modal-content');
      if (modalContent && !modalContent.contains(e.target)) {
        this.close();
      }
    };
    modalElement.addEventListener('click', this.outsideClickHandler);
  }

  close() {
    if (!this.isOpen || !this.activeModal) {
      return;
    }

    // Animate out
    gsap.to(this.activeModal, {
      opacity: 0,
      scale: 0.95,
      duration: 0.3,
      ease: 'power2.in',
      onComplete: () => {
        if (this.activeModal) {
          this.activeModal.style.display = 'none';
        }
        
        // Restore body scroll
        document.body.style.overflow = this.originalBodyOverflow;
        
        // Cleanup
        this.cleanup();
        
        // Call callback
        if (this.onCloseCallback) {
          this.onCloseCallback();
        }
      }
    });
  }

  cleanup() {
    // Remove event listeners
    if (this.escHandler) {
      document.removeEventListener('keydown', this.escHandler);
    }
    
    if (this.outsideClickHandler && this.activeModal) {
      this.activeModal.removeEventListener('click', this.outsideClickHandler);
    }

    this.activeModal = null;
    this.isOpen = false;
    this.escHandler = null;
    this.outsideClickHandler = null;
  }
}

// Singleton instance
const modalManager = new ModalManager();

export default modalManager;
