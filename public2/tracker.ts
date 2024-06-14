interface Tracker {
    track(event: string, ...tags: string[]): void
}


const tracker: Tracker = {
    track(event: string, ...tags) {
        const ts = Math.round(new Date().getTime() / 1000.0)
        const url = window.location.href
        const title = document.title

        fetch('http://localhost:8888/track', {
            method: 'POST', body: JSON.stringify({
                event,
                tags,
                url,
                title,
                ts

            }), headers: {'content-type': 'application/json'}
        })




    }
}

