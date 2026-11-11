import {
  MapPin,
  Home,
  BriefcaseBusiness,
  Pencil,
  Trash2,
  Check,
} from "lucide-react";

import type { Address } from "@/types/address";

import { Card, CardContent } from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

type AddressCardProps = {
  item: Address;
  onEdit: (item: Address) => void;
  onDelete: (id: string) => void;
  onSetDefault: (id: string) => void;
};

const AddressCard = ({
  item,
  onEdit,
  onDelete,
  onSetDefault,
}: AddressCardProps) => {
  const Icon = item.type === "Home" ? Home : BriefcaseBusiness;

  return (
    <Card
      className={`rounded-2xl border shadow-sm transition ${
        item.isDefault
          ? "border-black"
          : "border-gray-200 hover:border-gray-400"
      }`}
    >
      <CardContent className="space-y-5 p-6">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-zinc-100 p-3 text-black">
              <Icon size={21} />
            </div>

            <div>
              <h3 className="font-semibold text-black">{item.type} Address</h3>

              <p className="mt-1 text-xs text-gray-500">Delivery Location</p>
            </div>
          </div>

          {item.isDefault && (
            <Badge className="bg-black text-white hover:bg-black">
              <Check size={12} className="mr-1" />
              Default
            </Badge>
          )}
        </div>

        {/* Details */}
        <div className="space-y-2 border-t border-gray-100 pt-4">
          <p className="font-semibold text-black">{item.fullName}</p>

          <p className="text-sm text-gray-500">{item.phone}</p>

          <div className="flex items-start gap-2 pt-2">
            <MapPin size={16} className="mt-0.5 shrink-0 text-gray-400" />

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
              onClick={() => onEdit(item)}
              className="border-gray-200 text-gray-700"
            >
              <Pencil size={13} className="mr-1.5" />
              Edit
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={() => onDelete(item._id)}
              className="border-red-100 text-red-500 hover:bg-red-50 hover:text-red-600"
            >
              <Trash2 size={13} className="mr-1.5" />
              Delete
            </Button>
          </div>

          {!item.isDefault && (
            <button
              type="button"
              onClick={() => onSetDefault(item._id)}
              className="text-xs font-medium text-black underline underline-offset-4 hover:text-gray-500"
            >
              Set as Default
            </button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default AddressCard;
