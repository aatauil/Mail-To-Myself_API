
export default function MailAdapter(info){
    return (
        Object.freeze({
            status: "success",
            data : {
                sender: info.envelope.from,
                receiver: info.envelope.to[0],
            }
           
        })
    )
}