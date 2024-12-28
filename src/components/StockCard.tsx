import { forwardRef } from "react";
import { Stock } from "../types";

interface StockCardProps {
  stock: Stock;
}

const StockCard = forwardRef<HTMLDivElement, StockCardProps>(
  ({ stock }, ref) => {
    return (
      <div
        className="overflow-hidden rounded-xl border border-gray-200 bg-white"
        ref={ref}
      >
        <div className="flex items-center gap-x-4 border-b border-gray-900/5 bg-gray-50 p-6">
          <img
            alt="https://cdn.sanity.io/images/dhlwe0i3/production/45b8746656a67e241f885576b1efeab87fe60f0b-32x32.svg"
            loading="lazy"
            width="32"
            height="32"
            decoding="async"
            data-nimg="1"
            className="size-12 flex-none rounded-lg bg-white object-cover p-2 ring-1 ring-gray-900/10"
            style={{ color: "transparent" }}
            src="https://cdn.sanity.io/images/dhlwe0i3/production/45b8746656a67e241f885576b1efeab87fe60f0b-32x32.svg?w=64&amp;q=75&amp;fm=webp"
          ></img>
          <div className="leading-6 text-gray-900">
            <div className="font-semibold">{stock.ticker}</div>
            <p className="text-sm text-gray-700">{stock.name}</p>
          </div>
        </div>

        <dl className="-my-3 divide-y divide-gray-100 px-6 py-4 text-sm leading-6">
          <div className="flex justify-between gap-x-4 py-3">
            <dt className="text-gray-500">Base Currency Name</dt>
            <dd className="text-gray-700">{stock.base_currency_name}</dd>
          </div>
          <div className="flex justify-between gap-x-4 py-3">
            <dt className="text-gray-500">Currency Name</dt>
            <dd className="text-gray-700">{stock.currency_name}</dd>
          </div>
          <div className="flex justify-between gap-x-4 py-3">
            <dt className="text-gray-500">Currency Symbol</dt>
            <dd className="text-gray-700">{stock.currency_symbol}</dd>
          </div>
        </dl>
      </div>
    );
  }
);

StockCard.displayName = "StockCard";

export default StockCard;
