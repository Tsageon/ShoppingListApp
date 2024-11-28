export const offlineMiddleware = (store) => (next) => (action) => {
    if (!navigator.onLine) {
      console.log("Offline: Saving action to localStorage", action);

      const offlineActions = JSON.parse(localStorage.getItem("offlineActions")) || [];
      offlineActions.push(action);
      localStorage.setItem("offlineActions", JSON.stringify(offlineActions));
  
      return;
    }
  
    return next(action);
  };
  