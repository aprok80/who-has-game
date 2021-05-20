function welcomeMessage( ip: string ) {  
    return new Response(`Hello, welcome!!!!, Your IP is: ${ip}`, {
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
            'test-header':  '123'
        },
        status: 405
    })
}

function handleRequest( request: any ) {
    if( request?.method === "GET" ) {
        const ip = request.headers.get("x-forwarded-for");
        return welcomeMessage(ip)
    }
    return errorResponse()
}
addEventListener('fetch', (event) => {
    event.respondWith(handleRequest(event.request))
})
