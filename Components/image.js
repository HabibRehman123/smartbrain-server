const Clarifai = require('clarifai');

const app = new Clarifai.App({
 apiKey: 'c5b37e40cad74520bd0b7293784cb86a'
});


const handleAPIcall = (req, res) => {
	app.models
	.predict(
		Clarifai.FACE_DETECT_MODEL, 
		req.body.input)
		}

const handleImage = (req, res, db) =>{
	const { id } = req.body;
		db('users').where('id', '=', id)
		.increment('entries', 1)
		.returning('entries')
		.then(entries => {
			res.json(entries[0])
		})
		.catch(err =>{
			res.status(400).json('')
	})
}

module.exports ={
handleImage:handleImage,
handleAPIcall:handleAPIcall
}