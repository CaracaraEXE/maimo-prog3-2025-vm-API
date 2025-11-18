import mongoose from "mongoose";
const { Schema } = mongoose;

const lugarSchema = new Schema({
    nombre: {type: String},
	direccion:{type: String},
    coords:{type: [Number]},
	entrada:{type: String},
	acompa:{type: Boolean},
    barrio:[{ type: Schema.Types.ObjectId, ref: 'Barrio' }],
    img:{type: String},
    semana:{type: [Boolean]},
    horarios:[{type: String}],
    howto:{type:String},
    src:{type:String},
    tematica:{type:String},
});

export default mongoose.model('Lugar', lugarSchema, 'Lugares');