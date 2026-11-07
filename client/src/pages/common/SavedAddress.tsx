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
} from "lucide-react";

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

interface Address {
  _id: string;
  fullName: string;
  phone: string;
  address: string;
  city: string;
  township: string;
  postalCode: string;
  type: "Home" | "Office";
  isDefault: boolean;
}

const initialAddresses: Address[] = [
  {
    _id: "1",
    fullName: "Mg Mg",
    phone: "+95 9 123456789",
    address: "No. 25, Pyay Road",
    city: "Yangon",
    township: "Kamayut",
    postalCode: "11041",
    type: "Home",
    isDefault: true,
  },
  {
    _id: "2",
    fullName: "Mg Mg",
    phone: "+95 9 123456789",
    address: "No. 120, University Avenue",
    city: "Yangon",
    township: "Bahan",
    postalCode: "11201",
    type: "Office",
    isDefault: false,
  },
];

const emptyAddress: Omit<Address, "_id" | "isDefault"> = {
  fullName: "",
  phone: "",
  address: "",
  city: "",
  township: "",
  postalCode: "",
  type: "Home",
};

function SavedAddressPage() {
  const [addresses, setAddresses] = useState<Address[]>(initialAddresses);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [form, setForm] = useState(emptyAddress);

  const updateField = (field: keyof typeof emptyAddress, value: string) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const openAddForm = () => {
    setEditingId(null);
    setForm(emptyAddress);
    setIsFormOpen(true);
  };

  const openEditForm = (address: Address) => {
    setEditingId(address._id);

    setForm({
      fullName: address.fullName,
      phone: address.phone,
      address: address.address,
      city: address.city,
      township: address.township,
      postalCode: address.postalCode,
      type: address.type,
    });

    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setEditingId(null);
    setForm(emptyAddress);
  };

  const saveAddress = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      !form.fullName.trim() ||
      !form.phone.trim() ||
      !form.address.trim() ||
      !form.city.trim() ||
      !form.township.trim()
    ) {
      return;
    }

    if (editingId) {
      setAddresses((prev) =>
        prev.map((item) =>
          item._id === editingId ? { ...item, ...form } : item,
        ),
      );
    } else {
      setAddresses((prev) => [
        ...prev,
        {
          ...form,
          _id: crypto.randomUUID(),
          isDefault: prev.length === 0,
        },
      ]);
    }

    closeForm();
  };

  const deleteAddress = (id: string) => {
    setAddresses((prev) => {
      const filtered = prev.filter((item) => item._id !== id);

      if (filtered.length > 0 && !filtered.some((item) => item.isDefault)) {
        filtered[0].isDefault = true;
      }

      return filtered;
    });
  };

  const setDefaultAddress = (id: string) => {
    setAddresses((prev) =>
      prev.map((item) => ({
        ...item,
        isDefault: item._id === id,
      })),
    );
  };

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
                size="icon"
                variant="ghost"
                onClick={closeForm}
                className="text-gray-500 hover:text-black"
              >
                <X size={18} />
              </Button>
            </CardHeader>

            <CardContent>
              <form onSubmit={saveAddress} className="space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Full Name
                    </label>

                    <Input
                      required
                      value={form.fullName}
                      onChange={(e) => updateField("fullName", e.target.value)}
                      placeholder="Enter full name"
                      className="border-gray-200"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Phone Number
                    </label>

                    <Input
                      required
                      value={form.phone}
                      onChange={(e) => updateField("phone", e.target.value)}
                      placeholder="+95 9..."
                      className="border-gray-200"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Street Address
                  </label>

                  <Input
                    required
                    value={form.address}
                    onChange={(e) => updateField("address", e.target.value)}
                    placeholder="House number, street name..."
                    className="border-gray-200"
                  />
                </div>

                <div className="grid gap-5 sm:grid-cols-3">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      City
                    </label>

                    <Input
                      required
                      value={form.city}
                      onChange={(e) => updateField("city", e.target.value)}
                      placeholder="City"
                      className="border-gray-200"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Township
                    </label>

                    <Input
                      required
                      value={form.township}
                      onChange={(e) => updateField("township", e.target.value)}
                      placeholder="Township"
                      className="border-gray-200"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Postal Code
                    </label>

                    <Input
                      value={form.postalCode}
                      onChange={(e) =>
                        updateField("postalCode", e.target.value)
                      }
                      placeholder="Optional"
                      className="border-gray-200"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-medium text-gray-700">
                    Address Type
                  </label>

                  <div className="flex flex-wrap gap-3">
                    {[
                      {
                        type: "Home",
                        icon: Home,
                      },
                      {
                        type: "Office",
                        icon: BriefcaseBusiness,
                      },
                    ].map((item) => {
                      const Icon = item.icon;

                      return (
                        <button
                          key={item.type}
                          type="button"
                          onClick={() => updateField("type", item.type)}
                          className={`flex items-center gap-2 rounded-lg border px-5 py-3 text-sm transition ${
                            form.type === item.type
                              ? "border-black bg-black text-white"
                              : "border-gray-200 bg-white text-gray-600 hover:border-gray-400"
                          }`}
                        >
                          <Icon size={16} />
                          {item.type}
                        </button>
                      );
                    })}
                  </div>
                </div>

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
                    className="bg-black px-8 text-white hover:bg-zinc-800"
                  >
                    {editingId ? "Update Address" : "Save Address"}
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
                            onClick={() => deleteAddress(item._id)}
                            className="border-red-100 text-red-500 hover:bg-red-50 hover:text-red-600"
                          >
                            <Trash2 size={13} className="mr-1.5" />
                            Delete
                          </Button>
                        </div>

                        {!item.isDefault && (
                          <button
                            onClick={() => setDefaultAddress(item._id)}
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
