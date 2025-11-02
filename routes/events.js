import express from "express";
const router = express.Router();
import Evento from "../models/event.js"

const findAllEvents = async(req,res) => {
    try{
        const eventos = await Evento.find().select("_id tematica fecha direccion coords entrada acompa")
        return res
            .status(200)
            .send({message:"Todos los eventos", eventos:eventos})
    } catch{

    }
}

const findOneEvent = async(req,res) => {}

const addAnEvent = () => {}

const removeanEvent = () => {}