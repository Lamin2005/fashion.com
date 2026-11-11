import type { Order } from "@/types/order";

type OrderProductItemProps = {
  item: Order["items"][number];
};

const OrderProductItem = ({ item }: OrderProductItemProps) => {
  return (
    <div className="flex gap-4 border-b border-zinc-100 py-4 last:border-0">
      <img
        src={item.image[0]}
        alt={item.name}
        className="h-20 w-20 shrink-0 rounded-xl border border-zinc-200 bg-zinc-50 object-cover"
      />

      <div className="min-w-0 flex-1">
        <h4 className="truncate text-sm font-semibold text-zinc-900">
          {item.name}
        </h4>

        <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-zinc-500">
          <span>
            Qty:{" "}
            <span className="font-medium text-zinc-800">{item.quantity}</span>
          </span>

          <span className="flex items-center gap-2">
            Color:
            <span
              className="h-3.5 w-3.5 rounded-full border border-zinc-300"
              style={{ backgroundColor: item.color }}
            />
          </span>

          <span>
            Size: <span className="font-medium text-zinc-800">{item.size}</span>
          </span>
        </div>

        <p className="mt-2 text-xs text-zinc-500">
          ${item.price.toFixed(2)} × {item.quantity}
        </p>
      </div>

      <p className="shrink-0 text-sm font-semibold text-zinc-900">
        ${(item.price * item.quantity).toFixed(2)}
      </p>
    </div>
  );
};

export default OrderProductItem;
