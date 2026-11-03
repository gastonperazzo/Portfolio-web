/**
 * Smooth scrolling utility using requestAnimationFrame for guaranteed,
 * cross-browser, iframe-compatible animated transitions with cubic easing.
 */

let activeScrollAnimationId: number | null = null;

// Easing function: easeInOutCubic for a smooth, natural acceleration and deceleration
function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

export function cancelCurrentScroll() {
  if (activeScrollAnimationId !== null) {
    cancelAnimationFrame(activeScrollAnimationId);
    activeScrollAnimationId = null;
  }
}

/**
 * Gets current vertical scroll position across window, documentElement, and body
 */
export function getCurrentScrollY(): number {
  return (
    window.pageYOffset ||
    document.documentElement.scrollTop ||
    document.body.scrollTop ||
    0
  );
}

/**
 * Set scroll position across window, documentElement, and body
 */
export function setScrollPosition(y: number) {
  window.scrollTo(0, y);
  if (document.documentElement && document.documentElement.scrollTop !== y) {
    document.documentElement.scrollTop = y;
  }
  if (document.body && document.body.scrollTop !== y) {
    document.body.scrollTop = y;
  }
}

/**
 * Animate scroll to a specific vertical position
 */
export function scrollToY(targetY: number, duration = 700): Promise<void> {
  return new Promise((resolve) => {
    cancelCurrentScroll();

    const startY = getCurrentScrollY();
    const clampedTargetY = Math.max(0, targetY);
    const distance = clampedTargetY - startY;

    // If already at or very close to target, finish immediately
    if (Math.abs(distance) < 2) {
      setScrollPosition(clampedTargetY);
      resolve();
      return;
    }

    const startTime = performance.now();

    // Allow user to cancel animation by scrolling manually
    const cancelOnUserInteraction = () => {
      cancelCurrentScroll();
      cleanupListeners();
      resolve();
    };

    const cleanupListeners = () => {
      window.removeEventListener('wheel', cancelOnUserInteraction);
      window.removeEventListener('touchstart', cancelOnUserInteraction);
    };

    window.addEventListener('wheel', cancelOnUserInteraction, { passive: true });
    window.addEventListener('touchstart', cancelOnUserInteraction, { passive: true });

    function animateStep(currentTime: number) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeInOutCubic(progress);

      const nextY = startY + distance * easedProgress;
      setScrollPosition(nextY);

      if (progress < 1) {
        activeScrollAnimationId = requestAnimationFrame(animateStep);
      } else {
        setScrollPosition(clampedTargetY);
        activeScrollAnimationId = null;
        cleanupListeners();
        resolve();
      }
    }

    activeScrollAnimationId = requestAnimationFrame(animateStep);
  });
}

/**
 * Smoothly scrolls to a DOM element with given id, accounting for the fixed header
 */
export function scrollToElement(elementId: string, offset = 80, duration = 750): Promise<void> {
  if (elementId === 'top' || elementId === 'hero') {
    return scrollToY(0, duration);
  }

  const el = document.getElementById(elementId);
  if (!el) {
    console.warn(`[smoothScroll] Element #${elementId} not found`);
    return Promise.resolve();
  }

  const rect = el.getBoundingClientRect();
  const currentY = getCurrentScrollY();
  const targetY = currentY + rect.top - offset;

  return scrollToY(targetY, duration);
}
