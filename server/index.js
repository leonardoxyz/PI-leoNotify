const express = require('express')
const cors = require('cors')
const { connect } = require('mongoose')
const upload = require('express-fileupload')
require('dotenv').config()

const userRoutes = require('./routes/userRoutes')
const postRoutes = require('./routes/postRoutes')
const { notFound, errorMiddleware } = require('./middleware/errorMiddleware')

const app = express();
app.use(express.json({ extended: true }))
app.use(express.urlencoded({ extended: true }))
app.use(cors({ credentials: true, origin: "http://localhost:3000" }))
app.use(upload());
app.use('/uploads', express.static(__dirname + '/uploads'))

app.use('/api/users', userRoutes)
app.use('/api/posts', postRoutes)

app.use(notFound);
app.use(errorMiddleware);

connect(process.env.MONGO).then(app.listen(5510, () => console.log(`Server running on port ${process.env.PORT}`)))
    .catch(err => console.log(err))


