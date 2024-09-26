var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { BeeperStatus } from "../models/beeperType.js";
import { writeBeeperToJsonFile, readBeepersJsonFile, deleteBeeperFromJson, changeStatus } from "../DAL/jsonBeeper.js";
export const createBeeper = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const beeper = req.body;
        beeper.id = Math.floor(Math.random() * 10000);
        beeper.status = BeeperStatus.Manufactured;
        beeper.created_at = new Date();
        yield writeBeeperToJsonFile(beeper);
        res.status(201).json({ beeper });
    }
    catch (err) {
        res.status(500).send(err);
    }
});
export const getAllBeepers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const beepers = yield readBeepersJsonFile();
        res.status(201).json({ beepers });
    }
    catch (err) {
        console.error('Error:', err);
        res.status(500).send(err.message);
    }
});
export const getBeeperDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const beeperId = parseInt(req.params.id);
    try {
        const beepers = yield readBeepersJsonFile();
        const beeperFind = beepers.find((b) => b.id === beeperId);
        if (beeperFind) {
            res.status(201).json({ beeperFind });
        }
        else {
            res.status(404).send(`Beeper with ID ${beeperId} not found`);
        }
    }
    catch (err) {
        console.error('Error:', err);
        res.status(500).send(err.message);
    }
});
export const deleteBeeper = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const beeperId = parseInt(req.params.id);
    try {
        yield deleteBeeperFromJson(beeperId);
        res.status(201).send();
    }
    catch (err) {
        console.error('Error:', err);
        res.status(500).send(err.message);
    }
});
export const getBeeperByStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const status = req.params.status;
    try {
        const beepers = yield readBeepersJsonFile();
        const newBeepersArray = beepers.filter((b) => b.status == status);
        if (newBeepersArray.length > 0) {
            res.status(201).json({ newBeepersArray });
        }
        else {
            res.status(404).send(`not found`);
        }
    }
    catch (err) {
        console.error('Error:', err);
        res.status(500).send(err.message);
    }
});
export const updateStatusBeeper = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const beeperId = parseInt(req.params.id);
    const LAT = req.body.LAT;
    const LON = req.body.LON;
    try {
        yield changeStatus(beeperId, LAT, LON);
        res.status(201).send();
    }
    catch (err) {
        console.error('Error:', err);
        res.status(500).send(err.message);
    }
});
