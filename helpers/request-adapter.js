
export function RequestAdapter({request}){
    return (
        Object.freeze({
            path: request.path,
            method: request.method,
            text : request.body.text,
            email: request.body.email,
            original: request.files[0].originalname,
            modified: request.files[0].path
        })
    )
}