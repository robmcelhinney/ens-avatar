#!/usr/bin/env node

import server from "./server.js"
import meow from "meow"

const cli = meow(`
    Usage
      $ ens-avatar
 
    Options
        --port, -o  Port to listen on
 
`, {
    boolean: ["help", "version"],
    alias: { h: "help", v: "version" },
	importMeta: import.meta,
    flags: {
        port: {
            type: "number",
            default: 3456,
            alias: "o"
        },
    }
})

const port = Number.isInteger(cli.flags.port) ? 
        cli.flags.port : undefined

if (port == undefined || (port > 65535  || (port <= 1023))) {
    console.log("Port must be a number between 1024 - 65535.")
    quit()
}

server({
    port: port
})