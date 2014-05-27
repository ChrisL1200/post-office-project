'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PictureSchema = new Schema({
    img: { data: Buffer, contentType: String }
});

mongoose.model('Picture', PictureSchema);
