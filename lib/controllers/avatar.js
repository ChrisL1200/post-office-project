var mongoose = require('mongoose');

var Picture = mongoose.model('Picture');

exports.show = function (req, res, next) {
  var userId = req.params.id;

  Picture.findById(userId, function (err, doc) {
	if (err) return next(err);
	res.contentType(doc.img.contentType);
	res.send(doc.img.data);
  });
};