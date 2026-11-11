import { Home, BriefcaseBusiness, AlertCircleIcon } from "lucide-react";

import type {
  UseFormRegister,
  FieldErrors,
  UseFormSetValue,
} from "react-hook-form";

import type { AddressFormInput } from "@/schema/address";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type AddressFormProps = {
  open: boolean;
  editingId: string | null;
  register: UseFormRegister<AddressFormInput>;
  errors: FieldErrors<AddressFormInput>;
  setValue: UseFormSetValue<AddressFormInput>;
  selectedType: "Home" | "Office";
  setSelectedType: (type: "Home" | "Office") => void;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
  onClose: () => void;
  isSaving: boolean;
};

const AddressForm = ({
  open,
  editingId,
  register,
  errors,
  setValue,
  selectedType,
  setSelectedType,
  onSubmit,
  onClose,
  isSaving,
}: AddressFormProps) => {
  return (
    <Dialog open={open} onOpenChange={(value) => !value && onClose()}>
      <DialogContent className="max-h-[90vh] overflow-y-auto rounded-2xl bg-white sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-black">
            {editingId ? "Edit Address" : "Add New Address"}
          </DialogTitle>

          <DialogDescription>
            Enter your delivery information below.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={onSubmit} className="space-y-5 pt-3">
          {/* Full Name and Phone */}
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Full Name
              </label>

              <Input placeholder="Enter full name" {...register("fullName")} />

              {errors.fullName && (
                <p className="flex items-center gap-1 text-xs text-red-500">
                  <AlertCircleIcon size={13} />
                  {errors.fullName.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Phone Number
              </label>

              <Input placeholder="+95 9..." {...register("phone")} />

              {errors.phone && (
                <p className="text-xs text-red-500">{errors.phone.message}</p>
              )}
            </div>
          </div>

          {/* Street Address */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Street Address
            </label>

            <Input
              placeholder="House number, street name..."
              {...register("address")}
            />

            {errors.address && (
              <p className="text-xs text-red-500">{errors.address.message}</p>
            )}
          </div>

          {/* Location */}
          <div className="grid gap-5 sm:grid-cols-3">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">City</label>

              <Input placeholder="City" {...register("city")} />

              {errors.city && (
                <p className="text-xs text-red-500">{errors.city.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Township
              </label>

              <Input placeholder="Township" {...register("township")} />

              {errors.township && (
                <p className="text-xs text-red-500">
                  {errors.township.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Postal Code
              </label>

              <Input placeholder="Optional" {...register("postalCode")} />
            </div>
          </div>

          {/* Address Type */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-gray-700">
              Address Type
            </label>

            <div className="flex gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setSelectedType("Home");
                  setValue("type", "Home", {
                    shouldValidate: true,
                    shouldDirty: true,
                  });
                }}
                className={
                  selectedType === "Home"
                    ? "border-black bg-black text-white hover:bg-zinc-800 hover:text-white"
                    : "border-gray-200"
                }
              >
                <Home size={16} className="mr-2" />
                Home
              </Button>

              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setSelectedType("Office");
                  setValue("type", "Office", {
                    shouldValidate: true,
                    shouldDirty: true,
                  });
                }}
                className={
                  selectedType === "Office"
                    ? "border-black bg-black text-white hover:bg-zinc-800 hover:text-white"
                    : "border-gray-200"
                }
              >
                <BriefcaseBusiness size={16} className="mr-2" />
                Office
              </Button>
            </div>

            {errors.type && (
              <p className="text-xs text-red-500">{errors.type.message}</p>
            )}
          </div>

          {/* Actions */}
          <div className="flex flex-col-reverse justify-end gap-3 border-t border-gray-100 pt-5 sm:flex-row">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>

            <Button
              type="submit"
              disabled={isSaving}
              className="bg-black px-8 text-white hover:bg-zinc-800"
            >
              {isSaving
                ? "Saving..."
                : editingId
                  ? "Update Address"
                  : "Save Address"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddressForm;
