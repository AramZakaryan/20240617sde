const ENDPOINT: string = "http://localhost:8888/track";
const MIN_TRACKS_TO_SEND = 3;
const SEND_INTERVAL_MS = 1000;
const REQUEUE_INTERVAL_MS = 1000;

let tracksBuffer: Track[] = [];
let lastSendTime: number = 0;

const tracker: Tracker = {
  track(event, ...tags) {
    const track: Track = {
      event,
      tags,
      url: window.location.href,
      title: document.title,
      ts: Math.round(new Date().getTime() / 1000.0),
    };

    tracksBuffer.push(track);

    if (shouldSendTracks()) sendTracks();
  },
};

//* predicate function checking if tracks should be sent */
function shouldSendTracks(): boolean {
  return (
    tracksBuffer.length >= MIN_TRACKS_TO_SEND ||
    Date.now() - lastSendTime >= SEND_INTERVAL_MS
  );
}

async function sendTracks() {
  // getting current tracks and clearing tracksBuffer
  const tracks: Track[] = tracksBuffer;
  tracksBuffer = [];

  try {
    await fetch(ENDPOINT, {
      method: "POST",
      body: JSON.stringify(tracks),
      headers: { "Content-Type": "application/json" },
      keepalive: true,
    });
    lastSendTime = Date.now();
  } catch (error) {
    // Requeue tracks (take them back to tracksBuffer)
    setTimeout(() => {
      tracksBuffer.push(...tracks);
    }, REQUEUE_INTERVAL_MS);
  }
}

window.addEventListener("beforeunload", async () => {
  if (tracksBuffer.length === 0) return;
  await sendTracks();
});

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
