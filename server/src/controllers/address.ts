import { Response } from "express";
import mongoose from "mongoose";

import Address from "../model/address";
import { AuthenticatedRequest } from "../middlewares/authmiddleware";

export const addAddress = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user?._id;

    if (!userId) {
      res.status(401).json({
        success: false,
        message: "Please login first.",
      });
      return;
    }

    const { fullName, phone, address, city, township, postalCode, type } =
      req.body;

    const addressCount = await Address.countDocuments({
      user_id: userId,
    });

    const newAddress = await Address.create({
      user_id: userId,
      fullName,
      phone,
      address,
      city,
      township,
      postalCode,
      type,
      isDefault: addressCount === 0,
    });

    res.status(201).json({
      success: true,
      message: "Address added successfully.",
      address: newAddress,
    });
  } catch (error) {
    console.error("Add Address Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to add address.",
    });
  }
};

export const getMyAddresses = async (
  req: AuthenticatedRequest,
  res: Response,
) => {
  try {
    const userId = req.user?._id;

    if (!userId) {
      res.status(401).json({
        success: false,
        message: "Please login first.",
      });
      return;
    }

    const addresses = await Address.find({
      user_id: userId,
    }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      addresses,
    });
  } catch (error) {
    console.error("Get Addresses Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch addresses.",
    });
  }
};

export const updateAddress = async (
  req: AuthenticatedRequest,
  res: Response,
) => {
  try {
    const userId = req.user?._id;
    const { id } = req.params;

    if (!userId) {
      res.status(401).json({
        success: false,
        message: "Please login first.",
      });
      return;
    }

    if (typeof id !== "string" || !mongoose.isValidObjectId(id)) {
      res.status(400).json({
        success: false,
        message: "Invalid address ID.",
      });
      return;
    }

    const updatedAddress = await Address.findOneAndUpdate(
      {
        _id: id,
        user_id: userId,
      },
      {
        $set: {
          fullName: req.body.fullName,
          phone: req.body.phone,
          address: req.body.address,
          city: req.body.city,
          township: req.body.township,
          postalCode: req.body.postalCode,
          type: req.body.type,
        },
      },
      {
        new: true,
        runValidators: true,
      },
    );

    if (!updatedAddress) {
      res.status(404).json({
        success: false,
        message: "Address not found.",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Address updated successfully.",
      address: updatedAddress,
    });
  } catch (error) {
    console.error("Update Address Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update address.",
    });
  }
};

export const deleteAddress = async (
  req: AuthenticatedRequest,
  res: Response,
) => {
  try {
    const userId = req.user?._id;
    const { id } = req.params;

    if (!userId) {
      res.status(401).json({
        success: false,
        message: "Please login first.",
      });
      return;
    }

    if (typeof id !== "string" || !mongoose.isValidObjectId(id)) {
      res.status(400).json({
        success: false,
        message: "Invalid address ID.",
      });
      return;
    }

    const deletedAddress = await Address.findOneAndDelete({
      _id: id,
      user_id: userId,
    });

    if (!deletedAddress) {
      res.status(404).json({
        success: false,
        message: "Address not found.",
      });
      return;
    }

    if (deletedAddress.isDefault) {
      const nextAddress = await Address.findOne({
        user_id: userId,
      }).sort({
        createdAt: -1,
      });

      if (nextAddress) {
        nextAddress.isDefault = true;
        await nextAddress.save();
      }
    }

    res.status(200).json({
      success: true,
      message: "Address deleted successfully.",
    });
  } catch (error) {
    console.error("Delete Address Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to delete address.",
    });
  }
};

export const setDefaultAddress = async (
  req: AuthenticatedRequest,
  res: Response,
): Promise<void> => {
  try {
    const userId = req.user?._id;
    const { id } = req.params;

    if (!userId) {
      res.status(401).json({
        success: false,
        message: "Please login first.",
      });
      return;
    }

    if (typeof id !== "string" || !mongoose.isValidObjectId(id)) {
      res.status(400).json({
        success: false,
        message: "Invalid address ID.",
      });
      return;
    }

    const selectedAddress = await Address.findOne({
      _id: id,
      user_id: userId,
    });

    if (!selectedAddress) {
      res.status(404).json({
        success: false,
        message: "Address not found.",
      });
      return;
    }

    // Already default
    if (selectedAddress.isDefault) {
      res.status(200).json({
        success: true,
        message: "This address is already the default address.",
        address: selectedAddress,
      });
      return;
    }

    // Remove default status from other addresses
    await Address.updateMany(
      {
        user_id: userId,
        isDefault: true,
      },
      {
        $set: { isDefault: false },
      },
    );

    // Set selected address as default
    selectedAddress.isDefault = true;
    await selectedAddress.save();

    res.status(200).json({
      success: true,
      message: "Default address updated successfully.",
      address: selectedAddress,
    });
  } catch (error) {
    console.error("Set Default Address Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to set default address.",
    });
  }
};
