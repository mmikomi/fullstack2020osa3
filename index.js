const express = require('express')
const app = express()
require('dotenv').config()
const Person = require('./models/person')

const morgan = require('morgan')
const cors = require('cors')
const { response } = require('express')

app.use(cors())
app.use(express.json())
app.use(express.static('build'))

morgan.token('person', function (req) {return JSON.stringify(req.body)})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :person'))


// const randomId = () => {
    
    //hae lista id:istä
  //  const onTheList = persons.map(person => person.id)

  //  let testi

  //  do {
        //generoi id
   //     testi = Math.floor(Math.random() * Math.floor(100))

        //jos id on listalla, generoi uusi id
    //} while (onTheList.includes(testi))

    //muuten palauta id
    //return testi

    //jos henkilöitä tulee yli 100 tai muu rajaksi asetettu arvo, sovellus jää ikiluupppin
    //c'est la vie
//}

app.get('/api/persons', (req, res) => {
    Person.find({}).then(persons => {
        res.json(persons)
    })
})

app.get('/api/persons/:id', (req, res, next) => {
    Person.findById(req.params.id).then(person => {
        if(person) {
            res.json(person)
        } else {
            res.status(404).end()
        }
    })
    .catch(error => next(error))
})

app.get('/info', (req, res) => {
    Person.countDocuments().then(result => {
        console.log(result)
        const amt = result
        date = new Date().toString()

        const content = `<h2>${date}</h2>\n<h2>Phonebook contains ${amt} entries</h2>`

        res.send(content)
    })
})

app.delete('/api/persons/:id', (req, res, next) => {
    Person.findByIdAndRemove(req.params.id)
        .then(result => {
            res.status(204).end()
        })
        .catch(error => next(error))
})

app.post('/api/persons', (req, res, next) => {
    // henkilön lisäys
    const body = req.body

    if(!body.name || !body.number) {
        return res.status(400).json({
            error: 'name and/or number missing'
        })
    }

   // if(Person.find({}).map(person => person.name).includes(body.name)){
    //    return res.status(400).json({
    //        error: 'name already in phonebook'
    //    })
    //}

    const person = new Person({
        name: body.name,
        number: body.number
    })

    person.save().then(savedPerson => {
        res.json(savedPerson)
    })
    .catch(error => next(error))
})

app.put('/api/persons/:id', (req, res, next) => {
    const body = req.body

    const person = {
        name: body.name,
        number: body.number
    }

    Person.findByIdAndUpdate(req.params.id, person, {new:true})
        .then(updatedPerson => {
            res.json(updatedPerson)
        })
        .catch(error => next(error))
})

const unknownEndpoint = (req, res) => {
    res.status(404).send({error: 'unknown endpoint'})
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id'})
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message})
    }

    next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})