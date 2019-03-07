import { Router } from "express";
import NumberController from "../controllers/number";
const router = Router();

router.get("/", NumberController.getAllNumbers);

router.get("/:numberId", NumberController.getNumber);

router.post("/", NumberController.createNumber);

router.delete("/:numberId", NumberController.deleteNumber);

router.get("/contact/:contactId", NumberController.getAllNumbersInContact);

export default router;
