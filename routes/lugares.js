import express from "express"
const router = express.Router();
import Lugar from "../models/lugar.js";
import lugar from "../models/lugar.js";

const findAllPlaces = async(req, res) => {
    try{
        const lugares = await Lugar.find().select("nombre direccion coords entrada acompa barrio howto")
        return res.status(200).send({message:"Todos los lugares", lugares:lugares})
    } catch (error) {
        return res.status(501).send({message:"FAIL",error})
    }
}

const findOnePlace = async(req,res) => {
    const {id} = req.params;
    try{
        const lugar = await Lugar.findOne({_id:id}).select("nombre direccion coords entrada barrio acompa howto")
        return res.status(200).send({message:"Tu lugar",lugar:lugar})
    } catch(error){
        return res.status(501).send({message:"Failed",error})
    }
}

const addAPlace = async (req,res) => {
    const {nombre, barrio, direccion, coords, entrada, acompa} = req.body;
    try{
        const lugar = new Lugar({nombre, barrio, direccion, coords, entrada, acompa})
        await lugar.save()
        return res.status(200).send({message:"Nuevo lugar",lugar})
    } catch(error) {
        return res.status(501).send({message:"FAIL",error})
    }
}

const editPlace = async(req, res) => {
    const {id} = req.params;
    const {nombre, barrio, direccion, coords, entrada, acompa, howto, horarios, semana} = req.body;
    try{
        const lugarAAct = await Lugar.findOne({_id:id});
        if(!lugarAAct){
            return res.status(404).send({message: "No existe el lugar.", id:id});
        }

        lugarAAct.nombre = nombre;
        lugarAAct.barrio = barrio;
        lugarAAct.direccion = direccion;
        lugarAAct.coords = coords;
        lugarAAct.entrada = entrada;
        lugarAAct.acompa = acompa;
        lugarAAct.howto = howto;
        lugarAAct.horarios = horarios;
        lugarAAct.semana = semana;

        await lugarAAct.save();
        return res
            .status(200)
            .send({message:"Lugar actualizado",lugar: lugarAAct});
    } catch(error) {
        return res.status(501).send({message:"Hubo un error",error});
    }
}

router.get("/",findAllPlaces);
router.get("/:id", findOnePlace);
router.post("/", addAPlace) ;
router.put("/:id", editPlace);

export default router;