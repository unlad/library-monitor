import { useEffect, useState } from "react";

export type Port = {
  path: string
  manufacturer?: string
  serialNumber?: string
  pnpId?: string
  locationId?: string
  vendorId?: string
  productId?: string
}

type BaseLog = { timestamp: number }

type SuccessLog = BaseLog & { 
    success: true
    id: string
    name: string
    section: string
    email: string
}

type FailureLog = BaseLog & {
    success: false
    id: string
    name?: string
    section?: string
    email?: string
    remarks: string
}

export type Log = SuccessLog | FailureLog

type BaseStateMessage = { type: "state" }
type ActiveStateMessage = BaseStateMessage & { active: true, path: string }
type InactiveStateMessage = BaseStateMessage & { active: false }

type StateMessage = ActiveStateMessage | InactiveStateMessage
type DataMessage = { type: "data", data: Log }
type ErrorMessage = { type: "error", source: "port" | "parser", err: string }

export type Message = StateMessage | DataMessage | ErrorMessage

export function useInterceptor(host: string,) {
    const [ws, setWs] = useState<WebSocket | null>(null)

    const [ports, setPorts] = useState<Port[]>([])
    const [path, setPath] = useState<string | null>(null)
    const [logs, setLogs] = useState<Log[]>([])

    function getPorts() {
        fetch(`http://${host}/list`)
            .then(response => response.json())
            .then(json => setPorts(json))
    }

    function selectPort(path?: string) {
        console.log(JSON.stringify({ path }))
        fetch(`http://${host}/select`, { 
            method: "POST", 
            headers: { "Content-type": "application/json"},
            body: JSON.stringify({ path })
        })
    }

    useEffect(getPorts, [])

    useEffect(() => {
        if (!ws) {
            const socket = new WebSocket(`ws://${host}/listen`)

            socket.onopen = () => {
                console.log("Connected to socket.")
                setWs(socket)
            }

            socket.onmessage = (e) => {
                const data = JSON.parse(e.data) as Message
            
                switch(data.type) {
                    case "state":
                        getPorts()
                        setPath(data.active ? data.path : null)
                    break

                    case "data":
                        setLogs(previous => [data.data, ...previous])
                    break

                    case "error":
                        // TODO: implement this
                    break
                }
            }

            socket.onclose = () => {
                console.log("Socket has closed, retrying in 5s.")

                setTimeout(() => setWs(null), 5000)
            }

            socket.onerror = () => {
                console.log(`Socket error encountered.`)
            }

            return () => {
                function cleanup() {
                    console.log("Cleaning up websocket.")

                    socket.onopen = null
                    socket.onmessage = null
                    socket.onclose = null
                    socket.onerror = null

                    socket.close()
                }
                
                if (socket.readyState === WebSocket.OPEN) cleanup
                else socket.onopen = cleanup
            }
        }
    }, [ws])

    return { ports, path, logs, getPorts, selectPort }
}