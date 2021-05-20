addEventListener('fetch', (event) => {
    const answer = 42
    const response = new Response(`The answer is: ${answer}`, {
        headers: { 'content-type': 'text/plain' }
    })
    event.respondWith(response)
})