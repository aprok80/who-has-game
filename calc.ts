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

function calculate( par1: number, par2: number, op: string ): number | string {
    if( op === "add" ) {
        return par1 + par2
    }
    if( op === "sub" ) {
        return par1 - par2
    }
    if( op === "mul" ) {
        return par1 * par2
    }
    if( op === "div" ) {
        return par1 / par2
    }
    return "Error"
}

async function handleRequest( request: any ) {
    if( request?.method === "GET" ) {
        const ip = request.headers.get("x-forwarded-for");
        return welcomeMessage(ip)
    }
    if( request?.method === "POST" ) {
        const requestData = await request.json()
        const { par1, par2, op } = requestData
        const returnedValue = calculate( par1, par2, op )
        let statusCode = 405
        if( typeof returnedValue === 'number' ) {
            statusCode = 200
        }
        return new Response( `${returnedValue}`, {
            headers: {
                'content-type': 'text/plain',
                'test-header':  '123'
            },
            status: statusCode
        })
    }
    return errorResponse()
}
addEventListener('fetch', (event) => {
    event.respondWith(handleRequest(event.request))
})
