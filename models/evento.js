import mongoose from "mongoose";
const { Schema } = mongoose;

const eventoSchema = new Schema({
    nombre:{type: String},
    tematica:{type:String},
    fecha:{type: String},
    direccion:{type: String},
    coords:{type: [Number]},
    entrada:{type:String},
    acompa:{type: Boolean},
    barrio:[{ type: Schema.Types.ObjectId, ref: 'Barrio' }],
    howto:{type:String},
    src:{type:String}
});

export default mongoose.model('Evento', eventoSchema, 'Eventos');