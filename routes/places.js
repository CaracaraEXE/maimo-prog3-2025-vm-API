import express from "express"
const router = express.Router();
import Lugar from "../models/place.js";

const findAllPlaces = async(req, res) => {
    try{
        const places = await Lugar.find().select("nombre direccion coords entrada acompa imagen semana horarios")
        return res.status(200).send({message:"Todos los lugares", places:places})
    } catch (error) {
        return res.status(501).send({message:"FAIL",error})
    }
}

const findOnePlace = async(req,res) => {
    const {id} = req.params;
    try{
        const place = await Lugar.findOne({_id:id}).select("nombre direccion coords entrada acompa imagen semana horarios")
        return res.status(200).send({message:"Tu lugar",place:place})
    } catch(error){
        return res.status(501).send({message:"Failed",error})
    }
}

router.get("/",findAllPlaces);
router.get("/", findOnePlace);

export default router;