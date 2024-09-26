import { Request, Response } from "express";
import { v4 as uuid4 } from 'uuid';
import { Beeper, BeeperStatus } from "../models/beeperType.js";
import {writeBeeperToJsonFile, readBeepersJsonFile, deleteBeeperFromJson } from "../DAL/jsonBeeper.js";

export const createBeeper = async (req:Request, res:Response) => {
    const ID = uuid4();
    try{
        const beeper: Beeper = req.body;
        beeper.id = parseInt(ID);
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

export const getBeeperDetails = async (req:Request, res:Response) => {

    const beeperId: number = parseInt(req.params.id);

    try {
        const beepers: Beeper[] = await readBeepersJsonFile();
        
        const beeperFind: Beeper | undefined = beepers.find((b) => b.id === beeperId);
        if (beeperFind) {
            res.status(201).json({beeperFind});

        } else {
            res.status(404).send(`Beeper with ID ${beeperId} not found`);
        }
        
   } catch (err: any) {
        console.error('Error:', err);
        res.status(500).send(err.message);
    }  

};

export const deleteBeeper = async (req:Request, res:Response) =>{

    const beeperId: number = parseInt(req.params.id);

    try {

        await deleteBeeperFromJson(beeperId);
        res.status(201).send();
        
   } catch (err: any) {
        console.error('Error:', err);
        res.status(500).send(err.message);
    } 
}

export const getBeeperByStatus = async (req:Request, res:Response) =>  {

    const status: string = req.params.status;

    try {
        const beepers: Beeper[] = await readBeepersJsonFile();

        const newBeepersArray: Beeper[] = beepers.filter((b: Beeper) => b.status == status);

        if (newBeepersArray.length > 0) {
            res.status(201).json({newBeepersArray});

        } else {
            res.status(404).send(`not found`);
        }
        
   } catch (err: any) {
        console.error('Error:', err);
        res.status(500).send(err.message);
    }  

};