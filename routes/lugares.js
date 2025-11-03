import express from "express"
const router = express.Router();
import Lugar from "../models/lugar.js";

const findAllPlaces = async(req, res) => {
    try{
        const lugares = await Lugar.find().select("nombre direccion coords entrada acompa")
        return res.status(200).send({message:"Todos los lugares", lugares:lugares})
    } catch (error) {
        return res.status(501).send({message:"FAIL",error})
    }
}

const findOnePlace = async(req,res) => {
    const {id} = req.params;
    try{
        const lugar = await Lugar.findOne({_id:id}).select("nombre direccion coords entrada")
        return res.status(200).send({message:"Tu lugar",lugar:lugar})
    } catch(error){
        return res.status(501).send({message:"Failed",error})
    }
}

router.get("/",findAllPlaces);
router.get("/", findOnePlace);

export default router;