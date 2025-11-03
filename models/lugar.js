import mongoose from "mongoose";
const { Schema } = mongoose;

const lugarSchema = new Schema({
    nombre: {type: String},
	direccion:{type: String},
    coords:{type: [Number]},
	entrada:{type: String},
	acompa:{type: Boolean},
    //imagen:{type: String},
    //semana:{type: [Boolean]},
    //horarios:{type: String},
});

export default mongoose.model('Lugar', lugarSchema, 'Lugares');