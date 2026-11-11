import { MapPin, Plus } from "lucide-react";

import type { Address } from "@/types/address";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import AddressCard from "./AddressCard";

type AddressListProps = {
  addresses: Address[];
  onEdit: (item: Address) => void;
  onDelete: (id: string) => void;
  onSetDefault: (id: string) => void;
  onAdd: () => void;
};

const AddressList = ({
  addresses,
  onEdit,
  onDelete,
  onSetDefault,
  onAdd,
}: AddressListProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-black">My Addresses</h2>

        <span className="text-sm text-gray-500">{addresses.length} Saved</span>
      </div>

      {addresses.length > 0 ? (
        <div className="grid gap-5 md:grid-cols-2">
          {addresses.map((item) => (
            <AddressCard
              key={item._id}
              item={item}
              onEdit={onEdit}
              onDelete={onDelete}
              onSetDefault={onSetDefault}
            />
          ))}
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
              onClick={onAdd}
              className="mt-5 bg-black text-white hover:bg-zinc-800"
            >
              <Plus size={16} className="mr-2" />
              Add Address
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AddressList;
