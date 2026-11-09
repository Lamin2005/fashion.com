import { useState } from "react";
import {
  MapPin,
  Plus,
  Home,
  BriefcaseBusiness,
  Pencil,
  Trash2,
  Check,
  MapPinned,
  X,
  AlertCircleIcon,
} from "lucide-react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

import { addressSchema, type AddressFormInput } from "@/schema/address";

import {
  useGetMyAddressesQuery,
  useAddAddressMutation,
  useUpdateAddressMutation,
  useDeleteAddressMutation,
  useSetDefaultAddressMutation,
} from "@/store/slices/api/addressApi";

import type { Address } from "@/types/address";
import { toast } from "sonner";

const defaultValues: AddressFormInput = {
  fullName: "",
  phone: "",
  address: "",
  city: "",
  township: "",
  postalCode: "",
  type: "Home",
};

function SavedAddressPage() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Selected address type
  const [selectedType, setSelectedType] = useState<"Home" | "Office">("Home");

  // Fetch addresses
  const {
    data: addressData,
    isLoading,
    isError,
    refetch,
  } = useGetMyAddressesQuery();

  // Address mutations
  const [addAddress, { isLoading: isAdding }] = useAddAddressMutation();

  const [updateAddress, { isLoading: isUpdating }] = useUpdateAddressMutation();

  const [deleteAddress] = useDeleteAddressMutation();

  const [setDefaultAddress] = useSetDefaultAddressMutation();

  // React Hook Form
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<AddressFormInput>({
    resolver: zodResolver(addressSchema),
    defaultValues,
  });

  // Address list
  const addresses: Address[] = addressData?.addresses ?? [];

  // Open add form
  const openAddForm = () => {
    setEditingId(null);
    setSelectedType("Home");
    reset(defaultValues);
    setIsFormOpen(true);
  };

  // Open edit form
  const openEditForm = (item: Address) => {
    setEditingId(item._id);
    setSelectedType(item.type);

    reset({
      fullName: item.fullName,
      phone: item.phone,
      address: item.address,
      city: item.city,
      township: item.township,
      postalCode: item.postalCode ?? "",
      type: item.type,
    });

    setIsFormOpen(true);
  };

  // Close form
  const closeForm = () => {
    setIsFormOpen(false);
    setEditingId(null);
    setSelectedType("Home");
    reset(defaultValues);
  };

  // Submit form
  const onSubmit = async (data: AddressFormInput) => {
    try {
      if (editingId) {
        const response = await updateAddress({
          id: editingId,
          data,
        }).unwrap();

        toast.success(response.message || "Address updated successfully");
      } else {
        const response = await addAddress(data).unwrap();

        toast.success(response.message || "Address added successfully");
      }

      closeForm();
    } catch (error) {
      const err = error as {
        data?: {
          message?: string;
        };
      };

      toast.error(err.data?.message || "Something went wrong");
    }
  };

  // Delete address
  const handleDelete = async (id: string) => {
    try {
      const response = await deleteAddress(id).unwrap();

      toast.success(response.message || "Address deleted successfully");
    } catch (error) {
      const err = error as {
        data?: {
          message?: string;
        };
      };

      toast.error(err.data?.message || "Failed to delete address");
    }
  };

  // Set default address
  const handleSetDefault = async (id: string) => {
    try {
      const response = await setDefaultAddress(id).unwrap();

      toast.success(response.message || "Default address updated");
    } catch (error) {
      const err = error as {
        data?: {
          message?: string;
        };
      };

      toast.error(err.data?.message || "Failed to update default address");
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <section className="min-h-screen bg-zinc-50 px-4 pb-16 pt-28 sm:px-6">
        <div className="mx-auto max-w-5xl space-y-8">
          <div className="h-8 w-56 animate-pulse rounded bg-zinc-200" />

          <div className="grid gap-5 md:grid-cols-2">
            {Array.from({ length: 2 }).map((_, index) => (
              <div
                key={index}
                className="h-64 animate-pulse rounded-2xl border border-zinc-200 bg-white"
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Error state
  if (isError) {
    return (
      <section className="flex min-h-screen flex-col items-center justify-center gap-4 bg-zinc-50 px-4">
        <p className="text-sm text-red-500">Failed to load your addresses.</p>

        <Button
          onClick={() => refetch()}
          className="bg-black text-white hover:bg-zinc-800"
        >
          Try Again
        </Button>
      </section>
    );
  }

  return (
    <section className="min-h-screen w-full bg-zinc-50 px-4 pb-16 pt-28 sm:px-6">
      <div className="mx-auto w-full max-w-5xl space-y-8">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-black">
              Saved Addresses
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              Manage your delivery addresses for a faster checkout.
            </p>
          </div>

          <Button
            onClick={openAddForm}
            className="bg-black px-6 text-white hover:bg-zinc-800"
          >
            <Plus size={16} className="mr-2" />
            Add New Address
          </Button>
        </div>

        {/* Address Information */}
        <Card className="rounded-2xl border-gray-200 shadow-sm">
          <CardContent className="flex items-start gap-4 p-5">
            <div className="rounded-xl bg-zinc-100 p-3 text-black">
              <MapPinned size={23} />
            </div>

            <div>
              <h3 className="font-semibold text-black">
                Your Delivery Addresses
              </h3>

              <p className="mt-1 text-sm leading-6 text-gray-500">
                Save multiple addresses and select your preferred delivery
                location during checkout.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Address Form */}
        {isFormOpen && (
          <Card className="rounded-2xl border-gray-200 shadow-sm">
            <CardHeader className="flex flex-row items-start justify-between">
              <div>
                <CardTitle className="text-xl text-black">
                  {editingId ? "Edit Address" : "Add New Address"}
                </CardTitle>

                <CardDescription className="mt-1">
                  Enter your delivery information below.
                </CardDescription>
              </div>

              <Button
                type="button"
                size="icon"
                variant="ghost"
                onClick={closeForm}
                className="text-gray-500 hover:text-black"
              >
                <X size={18} />
              </Button>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                {/* Full Name and Phone */}
                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Full Name
                    </label>

                    <Input
                      placeholder="Enter full name"
                      {...register("fullName")}
                      className="border-gray-200"
                    />

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

                    <Input
                      placeholder="+95 9..."
                      {...register("phone")}
                      className="border-gray-200"
                    />

                    {errors.phone && (
                      <p className="flex items-center gap-1 text-xs text-red-500">
                        <AlertCircleIcon size={13} />
                        {errors.phone.message}
                      </p>
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
                    className="border-gray-200"
                  />

                  {errors.address && (
                    <p className="flex items-center gap-1 text-xs text-red-500">
                      <AlertCircleIcon size={13} />
                      {errors.address.message}
                    </p>
                  )}
                </div>

                {/* City, Township, Postal Code */}
                <div className="grid gap-5 sm:grid-cols-3">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      City
                    </label>

                    <Input
                      placeholder="City"
                      {...register("city")}
                      className="border-gray-200"
                    />

                    {errors.city && (
                      <p className="text-xs text-red-500">
                        {errors.city.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Township
                    </label>

                    <Input
                      placeholder="Township"
                      {...register("township")}
                      className="border-gray-200"
                    />

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

                    <Input
                      placeholder="Optional"
                      {...register("postalCode")}
                      className="border-gray-200"
                    />

                    {errors.postalCode && (
                      <p className="text-xs text-red-500">
                        {errors.postalCode.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Address Type */}
                <div className="space-y-3">
                  <label className="text-sm font-medium text-gray-700">
                    Address Type
                  </label>

                  <div className="flex flex-wrap gap-3">
                    {/* Home */}
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedType("Home");
                        setValue("type", "Home", {
                          shouldValidate: true,
                          shouldDirty: true,
                        });
                      }}
                      className={`flex items-center gap-2 rounded-lg border px-5 py-3 text-sm transition ${
                        selectedType === "Home"
                          ? "border-black bg-black text-white"
                          : "border-gray-200 bg-white text-gray-600 hover:border-gray-400"
                      }`}
                    >
                      <Home size={16} />
                      Home
                    </button>

                    {/* Office */}
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedType("Office");
                        setValue("type", "Office", {
                          shouldValidate: true,
                          shouldDirty: true,
                        });
                      }}
                      className={`flex items-center gap-2 rounded-lg border px-5 py-3 text-sm transition ${
                        selectedType === "Office"
                          ? "border-black bg-black text-white"
                          : "border-gray-200 bg-white text-gray-600 hover:border-gray-400"
                      }`}
                    >
                      <BriefcaseBusiness size={16} />
                      Office
                    </button>
                  </div>

                  {errors.type && (
                    <p className="text-xs text-red-500">
                      {errors.type.message}
                    </p>
                  )}
                </div>

                {/* Form Actions */}
                <div className="flex flex-col-reverse justify-end gap-3 border-t border-gray-100 pt-5 sm:flex-row">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={closeForm}
                    className="border-gray-200"
                  >
                    Cancel
                  </Button>

                  <Button
                    type="submit"
                    disabled={isSubmitting || isAdding || isUpdating}
                    className="bg-black px-8 text-white hover:bg-zinc-800"
                  >
                    {isSubmitting || isAdding || isUpdating
                      ? "Saving..."
                      : editingId
                        ? "Update Address"
                        : "Save Address"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Address List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-black">My Addresses</h2>

            <span className="text-sm text-gray-500">
              {addresses.length} Saved
            </span>
          </div>

          {addresses.length > 0 ? (
            <div className="grid gap-5 md:grid-cols-2">
              {addresses.map((item) => {
                const Icon = item.type === "Home" ? Home : BriefcaseBusiness;

                return (
                  <Card
                    key={item._id}
                    className={`rounded-2xl border shadow-sm transition ${
                      item.isDefault
                        ? "border-black"
                        : "border-gray-200 hover:border-gray-400"
                    }`}
                  >
                    <CardContent className="space-y-5 p-6">
                      {/* Card Header */}
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className="rounded-xl bg-zinc-100 p-3 text-black">
                            <Icon size={21} />
                          </div>

                          <div>
                            <h3 className="font-semibold text-black">
                              {item.type} Address
                            </h3>

                            <p className="mt-1 text-xs text-gray-500">
                              Delivery Location
                            </p>
                          </div>
                        </div>

                        {item.isDefault && (
                          <Badge className="border-0 bg-black text-white hover:bg-black">
                            <Check size={12} className="mr-1" />
                            Default
                          </Badge>
                        )}
                      </div>

                      {/* Address Details */}
                      <div className="space-y-2 border-t border-gray-100 pt-4">
                        <p className="font-semibold text-black">
                          {item.fullName}
                        </p>

                        <p className="text-sm text-gray-500">{item.phone}</p>

                        <div className="flex items-start gap-2 pt-2">
                          <MapPin
                            size={16}
                            className="mt-0.5 shrink-0 text-gray-400"
                          />

                          <p className="text-sm leading-6 text-gray-600">
                            {item.address}, {item.township}, {item.city}
                            {item.postalCode && `, ${item.postalCode}`}
                          </p>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-gray-100 pt-4">
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => openEditForm(item)}
                            className="border-gray-200 text-gray-700 hover:bg-gray-100"
                          >
                            <Pencil size={13} className="mr-1.5" />
                            Edit
                          </Button>

                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDelete(item._id)}
                            className="border-red-100 text-red-500 hover:bg-red-50 hover:text-red-600"
                          >
                            <Trash2 size={13} className="mr-1.5" />
                            Delete
                          </Button>
                        </div>

                        {!item.isDefault && (
                          <button
                            type="button"
                            onClick={() => handleSetDefault(item._id)}
                            className="text-xs font-medium text-black underline underline-offset-4 hover:text-gray-500"
                          >
                            Set as Default
                          </button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          ) : (
            <Card className="rounded-2xl border-gray-200 shadow-sm">
              <CardContent className="flex flex-col items-center justify-center py-16 text-center">
                <div className="rounded-full bg-gray-100 p-5">
                  <MapPin size={30} className="text-gray-400" />
                </div>

                <h3 className="mt-4 font-semibold text-black">
                  No saved addresses
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                  Add a delivery address to make checkout easier.
                </p>

                <Button
                  onClick={openAddForm}
                  className="mt-5 bg-black text-white hover:bg-zinc-800"
                >
                  <Plus size={16} className="mr-2" />
                  Add Address
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </section>
  );
}

export default SavedAddressPage;
