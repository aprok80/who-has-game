let eintest:any = 666
let envtest = Deno.env.get("meinenvtest")

function welcomeMessage( ip: string ) {  
    return new Response(`Hallo Welt!, Your IP is: ${ip}, the Value is: ${eintest} Type is ${typeof eintest}, the Env Var is: ${Deno.env.get("meinenvtest")}`, {
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
/*     if( request?.method === "POST" ) {
        const requestData = await request.text()
        console.log(requestData)
        eintest = requestData
        Deno.env.set( "meinenvtest", requestData )
        envtest = Deno.env.get("meinenvtest")
        return new Response( `${requestData}`, {
            headers: {
                'content-type': 'text/plain',
                'test-header':  '123'
            },
            status: 200
        })
    }
 */
    if( request?.method === "POST" ) {
        const requestData = await request.json()
        const { par1, par2, op } = requestData
        const returnedValue = calculate( par1, par2, op )
        //Deno.env.set( "meinenvtest", op )
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
