import { Request, Response } from "express";
import { v4 as uuid4 } from 'uuid';
import { Beeper, BeeperStatus } from "../models/beeperType.js";
import {writeBeeperToJsonFile, readBeepersJsonFile } from "../DAL/jsonBeeper.js";

export const createBeeper = async (req:Request, res:Response) => {
    try{
        const beeper: Beeper = req.body;
        beeper.id = parseInt(uuid4());
        beeper.status = BeeperStatus.Manufactured;
        beeper.created_at = new Date();

        await writeBeeperToJsonFile(beeper);
        res.status(201).json({beeper});
    }catch(err){
        res.status(500).send(err);
    }
}

export const getAllBeepers = async (req:Request, res:Response) => {

    try{

    const beepers: Beeper[] = await readBeepersJsonFile();
    res.status(201).json({beepers});

    } catch (err: any) {
        console.error('Error:', err);
        res.status(500).send(err.message);
    }
}

