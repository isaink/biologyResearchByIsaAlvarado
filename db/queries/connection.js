const pgp = require('pg-promise')({}) // the database takes big obj that have a "promise"...
const db = pgp('postgres://localhost:5432/biologyresearch'); //Access to "biologyresearch" DATABASE

module.exports = { db }

// DATABASE methods: none, one, oneOrNone, many, manyOrNone = any, and result....
