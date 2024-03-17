import { CssVar } from '@/constants';

export function openSidebar() {
  if (typeof document !== 'undefined') {
    document.body.style.overflow = 'hidden';
    document.documentElement.style.setProperty(
      CssVar.SIDE_NAVIGATION_SLIDE_IN,
      '1',
    );
  }
}

export function closeSidebar() {
  if (typeof document !== 'undefined') {
    document.documentElement.style.removeProperty(
      CssVar.SIDE_NAVIGATION_SLIDE_IN,
    );
    document.body.style.removeProperty('overflow');
  }
}

export function toggleSidebar() {
  if (typeof window !== 'undefined' && typeof document !== 'undefined') {
    const slideIn = window
      .getComputedStyle(document.documentElement)
      .getPropertyValue(CssVar.SIDE_NAVIGATION_SLIDE_IN);
    if (slideIn) {
      closeSidebar();
    } else {
      openSidebar();
    }
  }
}
