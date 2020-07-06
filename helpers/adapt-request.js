import { request } from "http"

export default function adaptRequest(request){
    return (
        Object.freeze({
            text : request.body.text,
            email: request.body.email,
        })
    )
}