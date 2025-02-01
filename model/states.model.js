const mongoose = require('mongoose');

const stateSchema = new mongoose.Schema(
	{
		state_name: { type: String },
		cities: [{ type: String }],
		isActive: { type: Boolean, default: true },
	},
	{ timestamps: true }
);

const stateModel = mongoose.model('states', stateSchema);
module.exports = stateModel;
