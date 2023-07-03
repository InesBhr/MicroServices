const EventBus = {
    subscribers: {},
    httpSubscribers: {},
  
    subscriber: (eventType, callback) => {
      if (!EventBus.subscribers[eventType]) {
        EventBus.subscribers[eventType] = [];
      }
  
      EventBus.subscribers[eventType].push(callback);
    },
  
    unsubscriber: (eventType, callback) => {
      if (!EventBus.subscribers[eventType]) {
        return;
      }
  
      const index = EventBus.subscribers[eventType].indexOf(callback);
      if (index !== -1) {
        EventBus.subscribers[eventType].splice(index, 1);
      }
    },
  
    httpSubscriber: (eventType, url) => {
      if (!EventBus.httpSubscribers[eventType]) {
        EventBus.httpSubscribers[eventType] = [];
      }
  
      EventBus.httpSubscribers[eventType].push(url);
    },
  
    httpUnsubscriber: (eventType, url) => {
      if (!EventBus.httpSubscribers[eventType]) {
        return;
      }
  
      const index = EventBus.httpSubscribers[eventType].indexOf(url);
      if (index !== -1) {
        EventBus.httpSubscribers[eventType].splice(index, 1);
      }
    },
  
    publish: (eventType, data) => {
      if (!EventBus.subscribers[eventType]) {
        return;
      }
  
      EventBus.subscribers[eventType].forEach((callback) => {
        callback(data);
      });
  
      if (EventBus.httpSubscribers[eventType]) {
        EventBus.httpSubscribers[eventType].forEach((url) => {
          fetch(url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
              'Content-Type': 'application/json',
            },
          }).catch((error) => {
            console.error('HTTP request failed:', error);
          });
        });
      }
    },
  };
  
  export default EventBus;