import express from "express";
import Barrio from "../models/barrio.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { name, slug } = req.body;
    const barrio = new Barrio({ name, slug });
    await barrio.save();
    return res.status(201).send({ message: "Nuevo Barrio", barrio });
  } catch (error) {
    return res.status(500).send({ message: "Hubo un error", error });
  }
});

router.get("/", async (_req, res) => {
  try {
    const barrios = await Barrio.find().select("_id name slug");
    return res.status(200).send({ message: "Todas las categorías", barrios });
  } catch (error) {
    return res.status(500).send({ message: "Hubo un error", error });
  }
});

router.get("/:key/eventos", async (req, res) => {
  const { key } = req.params;
  try {
    const isId = key.match(/^[0-9a-fA-F]{24}$/);
    const barrio = isId
      ? await Barrio.findById(key)
      : await Barrio.findOne({ slug: key });

    if (!barrio) return res.status(404).send({ message: "Categoría no encontrada" });

    const eventos = await (await import("../models/evento.js")).default
      .find({ barrio: barrio._id })
      .select("_id nombre barrio")
      .populate("barrio", "name slug");

    return res.status(200).send({
      message: "Eventos por categoría",
      barrio: { _id: barrio._id, name: barrio.nombre, slug: barrio.slug },
      eventos
    });
  } catch (error) {
    return res.status(500).send({ message: "Hubo un error", error });
  }
});

router.get("/:key/lugares", async (req, res) => {
  const { key } = req.params;
  try {
    const isId = key.match(/^[0-9a-fA-F]{24}$/);
    const barrio = isId
      ? await Barrio.findById(key)
      : await Barrio.findOne({ slug: key });

    if (!barrio) return res.status(404).send({ message: "Categoría no encontrada" });

    const lugares = await (await import("../models/lugar.js")).default
      .find({ barrio: barrio._id })
      .select("_id nombre barrio")
      .populate("barrio", "name slug");

    return res.status(200).send({
      message: "Lugares por Barrio",
      barrio: { _id: barrio._id, name: barrio.nombre, slug: barrio.slug },
      lugares,
    });
  } catch (error) {
    return res.status(500).send({ message: "Hubo un error", error });
  }
});

export default router;
