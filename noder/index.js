const express = require("express")
var cors = require('cors')
const app = express()
const port = 5000

app.use(cors());
app.use(express.json());
app.get('/', (req, res) => {
    res.send("Hello World")
})

const users = [
    {
        id: 0,
        name: 'himel',
        email: 'kala@gmail.com'
    },
    {
        id: 1,
        name: 'kimel',
        email: 'kala@gmail.com'
    },
    {
        id: 2,
        name: 'jimel',
        email: 'kala@gmail.com'
    },
    {
        id: 3,
        name: 'rimel',
        email: 'kala@gmail.com'
    }
];


app.get('/users', (req, res) => {
    const search = req.query.name;
    if (search) {
        const searchResult = users.filter(user => user.name.toLowerCase().includes(search))
        res.send(searchResult)
    }
    else {
        res.send(users)
    }
})
// post method
app.post('/users', (req, res) => {
    const newUser = req.body;
    newUser.id = users.length;
    users.push(newUser)
    res.json(newUser);
})


app.listen(port)