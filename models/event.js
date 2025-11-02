import mongoose from "mongoose";
const { Schema } = mongoose;

const eventoSchema = new Schema({
    nombre:{type: String},
    tematica:[{ type: Schema.Types.ObjectId, ref: 'Category' }],
    fecha:{type: String},
    direccion:{type: String},
    coords:{type: [Number]},
    entrada:{type:String},
    acompa:{type:String},
});

export default mongoose.model('Evento', eventoSchema, 'Eventos');