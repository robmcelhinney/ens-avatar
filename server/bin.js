#!/usr/bin/env node

import server from "./server.js"

const port = process.env.PORT || 3456

server({
    port: port
})