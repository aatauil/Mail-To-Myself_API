
export default function RequestAdapter(request){
    return (
        Object.freeze({
            path: request.path,
            method: request.method,
            text : request.body.text,
            email: request.body.email,
        })
    )
}