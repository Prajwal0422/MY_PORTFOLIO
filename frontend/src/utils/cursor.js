// Cinematic Cursor System with smooth lerp animation
class CinematicCursor {
  constructor() {
    this.cursor = {
      outer: null,
      inner: null,
    };
    this.mouse = { x: 0, y: 0 };
    this.cursorPos = { x: 0, y: 0 };
    this.isHovering = false;
    this.isActive = false;
    this.rafId = null;
    
    this.init();
  }

  init() {
    // Create cursor elements
    this.createCursorElements();
    
    // Bind events
    this.bindEvents();
    
    // Start animation loop
    this.animate();
  }

  createCursorElements() {
    // Outer ring
    this.cursor.outer = document.createElement('div');
    this.cursor.outer.className = 'cursor-outer';
    this.cursor.outer.style.cssText = `
      position: fixed;
      width: 40px;
      height: 40px;
      border: 2px solid rgba(0, 212, 255, 0.5);
      border-radius: 50%;
      pointer-events: none;
      z-index: 10000;
      transition: width 0.3s, height 0.3s, border-color 0.3s;
      will-change: transform;
    `;

    // Inner dot
    this.cursor.inner = document.createElement('div');
    this.cursor.inner.className = 'cursor-inner';
    this.cursor.inner.style.cssText = `
      position: fixed;
      width: 8px;
      height: 8px;
      background: rgba(0, 212, 255, 0.9);
      border-radius: 50%;
      pointer-events: none;
      z-index: 10001;
      box-shadow: 0 0 10px rgba(0, 212, 255, 0.8);
      will-change: transform;
    `;

    document.body.appendChild(this.cursor.outer);
    document.body.appendChild(this.cursor.inner);

    // Hide default cursor
    document.body.style.cursor = 'none';
  }

  bindEvents() {
    // Mouse move
    document.addEventListener('mousemove', (e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
    });

    // Hover effects on interactive elements
    const interactiveElements = 'a, button, .project-card, .skill-card, [role="button"]';
    
    document.addEventListener('mouseover', (e) => {
      if (e.target.matches(interactiveElements) || e.target.closest(interactiveElements)) {
        this.setHoverState(true);
      }
    });

    document.addEventListener('mouseout', (e) => {
      if (e.target.matches(interactiveElements) || e.target.closest(interactiveElements)) {
        this.setHoverState(false);
      }
    });

    // Click effect
    document.addEventListener('mousedown', () => {
      this.setActiveState(true);
    });

    document.addEventListener('mouseup', () => {
      this.setActiveState(false);
    });
  }

  setHoverState(isHovering) {
    this.isHovering = isHovering;
    
    if (isHovering) {
      this.cursor.outer.style.width = '60px';
      this.cursor.outer.style.height = '60px';
      this.cursor.outer.style.borderColor = 'rgba(0, 212, 255, 0.9)';
      this.cursor.inner.style.transform = 'translate(-50%, -50%) scale(1.5)';
    } else {
      this.cursor.outer.style.width = '40px';
      this.cursor.outer.style.height = '40px';
      this.cursor.outer.style.borderColor = 'rgba(0, 212, 255, 0.5)';
      this.cursor.inner.style.transform = 'translate(-50%, -50%) scale(1)';
    }
  }

  setActiveState(isActive) {
    this.isActive = isActive;
    
    if (isActive) {
      this.cursor.outer.style.width = '35px';
      this.cursor.outer.style.height = '35px';
    }
  }

  // Smooth lerp animation
  lerp(start, end, factor) {
    return start + (end - start) * factor;
  }

  animate() {
    // Smooth lag effect using lerp
    this.cursorPos.x = this.lerp(this.cursorPos.x, this.mouse.x, 0.15);
    this.cursorPos.y = this.lerp(this.cursorPos.y, this.mouse.y, 0.15);

    // Update outer ring (slower)
    this.cursor.outer.style.transform = `translate3d(${this.cursorPos.x - 20}px, ${this.cursorPos.y - 20}px, 0)`;
    
    // Update inner dot (faster)
    const innerX = this.lerp(this.cursorPos.x, this.mouse.x, 0.3);
    const innerY = this.lerp(this.cursorPos.y, this.mouse.y, 0.3);
    this.cursor.inner.style.transform = `translate3d(${innerX - 4}px, ${innerY - 4}px, 0)`;

    this.rafId = requestAnimationFrame(() => this.animate());
  }

  destroy() {
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
    }
    
    if (this.cursor.outer) {
      this.cursor.outer.remove();
    }
    
    if (this.cursor.inner) {
      this.cursor.inner.remove();
    }
    
    document.body.style.cursor = 'auto';
  }
}

export default CinematicCursor;
