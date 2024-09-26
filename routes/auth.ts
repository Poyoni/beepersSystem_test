import  express, { Router } from "express";
import {createBeeper, getAllBeepers, getBeeperDetails, deleteBeeper, getBeeperByStatus}from '../controllers/authController.js';
const router: Router = express.Router();

router.route('/beepers').post(createBeeper);
router.route('/beepers').get(getAllBeepers);
router.route('/beepers/:id').get(getBeeperDetails);
// router.route('/beepers/:id/status').put(updateStatusBeeper);
router.route('/beepers/:id').delete(deleteBeeper);
router.route('/beepers/status/:status').get(getBeeperByStatus);


export default router;