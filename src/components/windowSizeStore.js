
const store = {
  size: {
    height: undefined,
    width: undefined
  }
};

const serverSize = {
  size: {
    width: 0,
    height: 0,
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
    console.log(`getSnapshot ${store.size.width}`)
    return store.size;
  },

  getServerSnapshot() {
    return serverSize;
  }
}
