// High-frequency scroll progress kept outside React state to avoid re-rendering
// the component tree on every scroll frame. Consumers either read it inside a
// useFrame loop (3D) or subscribe via useSyncExternalStore (the progress bar).

let _scroll = 0
const listeners = new Set<() => void>()

export function getScroll(): number {
  return _scroll
}

export function setScroll(v: number): void {
  if (v !== _scroll) {
    _scroll = v
    listeners.forEach((l) => l())
  }
}

export function subscribeScroll(l: () => void): () => void {
  listeners.add(l)
  return () => {
    listeners.delete(l)
  }
}
