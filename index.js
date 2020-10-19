const { response } = require('express')
const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')

app.use(express.json())
morgan.token('person', function (req) {return JSON.stringify(req.body)})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :person'))
app.use(cors())

let persons = [
    {
        id: 1,
        name: "Arto Hellas",
        number: "040-123456"
    },
    {
        id: 2,
        name: "Ada Lovelace",
        number: "32-455-123123"
    },
    {
        id: 3,
        name: "Dan Abramov",
        number: "55-6622-43"
    },
    {
        id: 4,
        name: "Mary Poppendick",
        number: "351-11-233"
    },
    {
        id: 5,
        name: "Pepe Yeesson",
        number: "232441-233"
    },
]

const Body = () => {
    date = new Date().toString()
    amt = persons.length

    return `<h2>Phonebook has info for ${amt} persons</h2><h2>${date}</h2>`
}

const randomId = () => {
    
    //hae lista id:istä
    const onTheList = persons.map(person => person.id)

    let testi

    do {
        //generoi id
        testi = Math.floor(Math.random() * Math.floor(100))

        //jos id on listalla, generoi uusi id
    } while (onTheList.includes(testi))

    //muuten palauta id
    return testi

    //jos henkilöitä tulee yli 100 tai muu rajaksi asetettu arvo, sovellus jää ikiluupppin
    //c'est la vie
}

app.get('/api/persons', (req, res) => {
    res.json(persons)
})

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find(person => person.id === id)

    if (person) {
        res.json(person)
    } else {
        res.status(404).end()
    }
})

app.get('/info', (req, res) => {
    res.send(Body())
})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    persons = persons.filter(person => person.id !== id)

    res.status(204).end()
})

app.post('/api/persons', (req, res) => {
    // henkilön lisäys
    const body = req.body

    if(!body.name || !body.number) {
        return res.status(400).json({
            error: 'name and/or number missing'
        })
    }

    if(persons.map(person => person.name).includes(body.name)){
        return res.status(400).json({
            error: 'name already in phonebook'
        })
    }

    const person = {
        id: randomId(),
        name: body.name,
        number: body.number
    }

    persons = persons.concat(person)

    //morgan.token('person', function (req, res) {return JSON.stringify(req.params[body])})
    res.json(person)
})

const port = process.env.port || 3001
app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})