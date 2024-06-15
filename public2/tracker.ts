interface Tracker {
  track(event: string, ...tags: string[]): void;
}


function debounce<T extends (...args: any[]) => any>(func: T, wait: number): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout>;
  return function(...args: Parameters<T>): void {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      func(...args);
    }, wait);
  };
}


const tracker: Tracker = {
  track(event: string, ...tags) {
    const ts = Math.round(new Date().getTime() / 1000.0);
    const url = window.location.href;
    const title = document.title;

    fetch("http://localhost:8888/track", {
      method: "POST", body: JSON.stringify([{
        event,
        tags,
        url,
        title,
        ts

      }]), headers: { "content-type": "application/json" }
    });


  }
};

