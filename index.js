const express =  require('express');

const hubsRouter = require('./hubs/hubs-router.js');

const server = express();

server.use(express.json());

server.get('/',(req, res) => {
    console.log("Lambda Project")
    res.send(`
        <h1>Lambda Project<h1>
    `);
});

server.use('/api', hubsRouter)

const port = 7000;
server.listen(port, () => console.log('\n=== API on port 7000 ===\n'));