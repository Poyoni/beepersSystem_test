var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { v4 as uuid4 } from 'uuid';
import { BeeperStatus } from "../models/beeperType.js";
import { writeBeeperToJsonFile, readBeepersJsonFile } from "../DAL/jsonBeeper.js";
export const createBeeper = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const beeper = req.body;
        beeper.id = parseInt(uuid4());
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
