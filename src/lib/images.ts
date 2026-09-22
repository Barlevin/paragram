/**
 * Images are revealed by CSS once `data-loaded="true"` is set, which normally
 * happens in React's `onLoad`. In production the HTML is prerendered, so the
 * browser starts fetching before the bundle hydrates — an eager or cached image
 * can finish first, and `onLoad` never fires for an already-complete image,
 * leaving it stuck at `opacity: 0`.
 *
 * Attach as a ref alongside `onLoad` to cover both orderings.
 */
export function revealIfAlreadyLoaded(node: HTMLImageElement | null) {
  if (node?.complete && node.naturalWidth > 0) node.dataset.loaded = "true";
}
