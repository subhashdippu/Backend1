const mongoose = require('mongoose')

const { schema } = mongoose

const menuSchema = new mongoose({
    name: {
        type: string,
        trim: true,
        required: true,
        minlength
    }
})
