import express from "express";
const router = express.Router();
import Evento from "../models/evento.js"

const findAllEvents = async(req,res) => {
    try{
        const eventos = await Evento.find().select("_id nombre fecha direccion entrada barrio howto")
        return res
            .status(200)
            .send({message:"Todos los eventos", eventos:eventos})
    } catch (error) {
        return res.status(501).send({message:"FAIL",error});
    }
}

const findOneEvent = async(req,res) => {
    const {id} = req.params;
    try{
        const evento = await Evento.findOne({ _id: id }).select("_id nombre tematica fecha direccion coords entrada acompa barrio howto")
        return res
            .status(200)
            .send({message:"Tu evento", evento:evento})
    } catch (error) {
        return res.status(501).send({message:"FAIL",error});
    }
}

const addAnEvent = async (req, res) => {
    const {nombre, barrio, tematica, fecha, direccion, coords, entrada, acompa} = req.body
    try{
        const evento = new Evento({nombre, tematica, barrio, fecha, direccion, coords, entrada, acompa})
        await evento.save()
        return res.status(200).send({message:"Nuevo evento",evento})
    } catch(error){
        return res.status(501).send({message:"FAIL",error})
    }
}

const deleteAnEvent = async(req,res) => {
    const {id} = req.params
    try{
        const eventToDelete = await Evento.findOne({_id:id})

        if(!eventToDelete){
            return res.status(404).send({message:"No existe el evento",_id:id});
        }

        await Evento.deleteOne({_id:id})
        return res.status(200).send({message:"Evento eliminado", evento:eventToDelete})
    } catch (error) {

    }
}

router.get("/",findAllEvents);
router.get("/:id",findOneEvent);
router.post('/',addAnEvent);
router.delete("/:id",deleteAnEvent);

export default router;