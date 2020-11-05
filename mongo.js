/*eslint-env es6*/
console.log(process.argv.length)

const mongoose = require('mongoose')

const password = process.argv[2]

const url =
    `mongodb+srv://fullstack:${password}@cluster0.nl9ea.mongodb.net/note-app?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

const personSchema = new mongoose.Schema({
    name: String,
    number: String
})

const Person = mongoose.model('Person', personSchema)

if(process.argv.length===3){
    console.log('phonebook:')
    Person.find({}).then(result => {
        result.forEach(person => {
            console.log(person.name, person.number)
        })
        mongoose.connection.close()
    })
}  else if (process.argv.length===5) {
    const person = new Person({
        name: process.argv[3],
        number: process.argv[4]
    })

    person.save().then(response => {
        console.log(`added ${person.name} number ${person.number} to phonebook`)
        mongoose.connection.close()
    })
} else {
    console.log('Error adding to phonebook, did you add a name and a number?')
    mongoose.connection.close()
}

