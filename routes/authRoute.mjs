

import express from 'express';

import {registerController,loginController,addController,fetchController,completedController,editController, deleteController} from '../controllers/authControllers.mjs'

const app = express();

const router = express.Router();
// Multer setup
router.post('/register',registerController)
router.post('/login',loginController)
router.post('/addtask',addController)
router.post('/fetchtasks',fetchController)
router.post('/completed',completedController)
router.post('/delete',deleteController)
router.post('/edit',editController)

export default router