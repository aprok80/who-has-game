function welcomeMessage() {
    return new Response("Hello, welcome!!!!", {
        headers: {
            'content-type': 'text/plain',
            'test-header':  '123'
        }
    })
}

function errorResponse() {
    return new Response("Error, kein plan.", {
        headers: {
            'content-type': 'text/plain',
        },
        status: 405
    })
}

function handleRequest( request: any ) {
    if( request?.method === "GET" ) {
        return welcomeMessage()
    }
    return errorResponse()
}
addEventListener('fetch', (event) => {
    event.respondWith(handleRequest(event.request))
})
