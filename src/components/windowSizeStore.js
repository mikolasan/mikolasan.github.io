
const store = {
  size: {
    height: undefined,
    width: undefined
  }
};

export const windowSizeStore = {
  subscribe(callback) {
    window.addEventListener('resize', callback);
    return () => window.removeEventListener('resize', callback);
  },

  getSnapshot() {
    if (
      store.size.height !== window.innerHeight ||
      store.size.width !== window.innerWidth
    ) {
      store.size = { height: window.innerHeight, width: window.innerWidth };
    }
    return store.size;
  }
}
