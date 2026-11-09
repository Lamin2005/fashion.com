import { Router } from "express";

import {
  addAddress,
  getMyAddresses,
  updateAddress,
  deleteAddress,
  setDefaultAddress,
} from "../controllers/address";

import { authMiddleware } from "../middlewares/authmiddleware";
import { validateRequest } from "../middlewares/validatorRequest";

import { addressValidation, addressIdValidation } from "../validator/address";

const router = Router();

router.use(authMiddleware);

router.get("/", getMyAddresses);

router.post("/", addressValidation, validateRequest, addAddress);

router.put(
  "/:id",
  addressIdValidation,
  addressValidation,
  validateRequest,
  updateAddress,
);

router.delete("/:id", addressIdValidation, validateRequest, deleteAddress);

router.patch(
  "/:id/default",
  addressIdValidation,
  validateRequest,
  setDefaultAddress,
);

export default router;
