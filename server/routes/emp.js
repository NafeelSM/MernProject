import express from "express";
import empController from "../controllers/emp.js";
const router = express.Router();


//All routers are here
router.get("/emp", empController.getAllEmp);
router.post("/emp", empController.createEmp);
router.get("/emp/single/:id", empController.getSingleEmp);
router.put("/emp/:id", empController.updateEmp);
router.delete("/emp/:id", empController.deleteEmp);
router.get("/emp/search?",empController.getsearchemployee);
export default router;