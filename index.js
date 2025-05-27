require('./src/DB/DB')
const app =require('./app');
const http = require('http');
const server = http.createServer(app);
const PORT = 8081
server.listen(PORT ,()=>{
    console.log(`Server At http://localhost:${PORT}`)
});

