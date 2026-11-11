import { useState } from "react";
import { Plus, MapPinned } from "lucide-react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Card, CardContent } from "@/components/ui/card";

import { Button } from "@/components/ui/button";

import { addressSchema, type AddressFormInput } from "@/schema/address";

import type { Address } from "@/types/address";

import {
  useGetMyAddressesQuery,
  useAddAddressMutation,
  useUpdateAddressMutation,
  useDeleteAddressMutation,
  useSetDefaultAddressMutation,
} from "@/store/slices/api/addressApi";

import { toast } from "sonner";

import AddressForm from "@/components/address/AddressForm";
import AddressList from "@/components/address/AddressList";
import AddressSkeleton from "@/components/address/AddressSkeleton";

const defaultValues: AddressFormInput = {
  fullName: "",
  phone: "",
  address: "",
  city: "",
  township: "",
  postalCode: "",
  type: "Home",
};

const SavedAddressPage = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [selectedType, setSelectedType] = useState<"Home" | "Office">("Home");

  const {
    data: addressData,
    isLoading,
    isError,
    refetch,
  } = useGetMyAddressesQuery();

  const [addAddress, { isLoading: isAdding }] = useAddAddressMutation();

  const [updateAddress, { isLoading: isUpdating }] = useUpdateAddressMutation();

  const [deleteAddress] = useDeleteAddressMutation();

  const [setDefaultAddress] = useSetDefaultAddressMutation();

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

  const addresses: Address[] = addressData?.addresses ?? [];

  const openAddForm = () => {
    setEditingId(null);
    setSelectedType("Home");
    reset(defaultValues);
    setIsFormOpen(true);
  };

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

  const closeForm = () => {
    setIsFormOpen(false);
    setEditingId(null);
    setSelectedType("Home");
    reset(defaultValues);
  };

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
        data?: { message?: string };
      };

      toast.error(err.data?.message || "Something went wrong");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await deleteAddress(id).unwrap();

      toast.success(response.message || "Address deleted successfully");
    } catch (error) {
      const err = error as {
        data?: { message?: string };
      };

      toast.error(err.data?.message || "Failed to delete address");
    }
  };

  const handleSetDefault = async (id: string) => {
    try {
      const response = await setDefaultAddress(id).unwrap();

      toast.success(response.message || "Default address updated");
    } catch (error) {
      const err = error as {
        data?: { message?: string };
      };

      toast.error(err.data?.message || "Failed to update default address");
    }
  };

  if (isLoading) {
    return <AddressSkeleton />;
  }

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

        <AddressList
          addresses={addresses}
          onEdit={openEditForm}
          onDelete={handleDelete}
          onSetDefault={handleSetDefault}
          onAdd={openAddForm}
        />

        <AddressForm
          open={isFormOpen}
          editingId={editingId}
          register={register}
          errors={errors}
          setValue={setValue}
          selectedType={selectedType}
          setSelectedType={setSelectedType}
          onSubmit={handleSubmit(onSubmit)}
          onClose={closeForm}
          isSaving={isSubmitting || isAdding || isUpdating}
        />
      </div>
    </section>
  );
};

export default SavedAddressPage;
