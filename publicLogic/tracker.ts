const minTracksToSend = 3;
let lastSendTime = 0;
const sendIntervalMs = 1000;

const tracker: Tracker = {
  track(event: string, ...tags) {
    const ts = Math.round(new Date().getTime() / 1000.0);
    const url = window.location.href;
    const title = document.title;
    const track: Track = { event, tags, url, title, ts };
    setTracksToStore(track);
    maybeFlushStore();
  },
};

function maybeFlushStore() {
  if (
    getTracksFromStore().length >= minTracksToSend ||
    Date.now() - lastSendTime >= sendIntervalMs
  ) {
    flushStore();
  }
}

function flushStore() {
  if (getTracksFromStore().length === 0) return;
  const tracksStored = getTracksFromStore();
  clearStore();
  sendTracks(tracksStored).catch(() => setTracksToStore(...tracksStored));
}

function sendTracks(tracks: Track[]) {
  lastSendTime = Date.now();
  let body = JSON.stringify(tracks);
  return fetch("http://localhost:8888/track", {
    method: "POST",
    body,
    headers: { "content-type": "application/json" },
  });
}

function getTracksFromStore(): Track[] {
  const tracksStored = localStorage.getItem("tracks");
  return tracksStored ? JSON.parse(tracksStored) : [];
}

function setTracksToStore(...newTracks: Track[]): void {
  let tracks: Track[] = getTracksFromStore();
  tracks.push(...newTracks);
  const tracksUpdated = JSON.stringify(tracks);
  localStorage.setItem("tracks", tracksUpdated);
}

function clearStore(): void {
  localStorage.removeItem("tracks");
}

window.addEventListener("beforeunload", flushStore);

interface Tracker {
  track(event: string, ...tags: string[]): void;
}

interface Track {
  event: string;
  tags: string[];
  url: string;
  title: string;
  ts: number;
}
