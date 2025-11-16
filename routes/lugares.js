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
        const lugar = await Lugar.findOne({_id:id}).select("nombre direccion coords entrada barrio acompa semana horarios howto src")
        return res.status(200).send({message:"Tu lugar",lugar:lugar})
    } catch(error){
        return res.status(501).send({message:"Failed",error})
    }
}

const addAPlace = async (req,res) => {
    const {nombre, barrio, direccion, coords, entrada, acompa, howto, src} = req.body;
    try{
        const lugar = new Lugar({nombre, barrio, direccion, coords, entrada, acompa, howto, src})
        await lugar.save()
        return res.status(200).send({message:"Nuevo lugar",lugar})
    } catch(error) {
        return res.status(501).send({message:"FAIL",error})
    }
}


router.get("/",findAllPlaces);
router.get("/:id", findOnePlace);
router.post("/", addAPlace) ;

export default router;