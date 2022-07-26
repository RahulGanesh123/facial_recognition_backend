
const handleImage = (req, res, db)=>{
	const {id} = req.body
	db('users')
	.where('id', '=', id)
	.increment('entries', 1) //increments the value of the user\s entries by 1
	.returning('entries') //we only want to return the user's entries
	.then(entries => {
		res.json(entries[0].entries)
	}).catch(err => res.status(400).json('unable to get entries'))
}

module.exports = {
	handleImage : handleImage
}