import Select from "./Select";

const SIZE = [40, 42, 44, 46, 48, 50];
const QTY = [1, 2, 3, 4, 5];

export default function ShoeDetail({ item, onAddToCart, onBackToProducts }) {
  return (
    <div className="flex flex-col gap-10 lg:flex-row-reverse lg:items-center">
      <div
        className={`mx-auto flex size-80 shrink-0 items-center justify-center rounded-full ${item.className} shadow-2xl shadow-neutral-300/70 lg:size-[520px]`}
      >
        <img
          src={item.src}
          alt={item.title}
          className="animate-wiggle w-[120%] drop-shadow-2xl"
        />
      </div>
      <div className="flex-1">
        <div className="max-w-3xl space-y-6">
          <p className="text-sm font-bold uppercase tracking-wide text-lime-500">
            Men&apos;s Shoes
          </p>
          <h1 className="text-5xl font-black leading-none md:text-8xl">
            {item.title}
          </h1>
          <p className="font-medium text-gray-500 md:text-xl">
            {item.description}
          </p>
          <div className="rounded-lg border border-neutral-200 bg-neutral-50 p-5">
            <h2 className="text-xl font-black">Product description</h2>
            <p className="mt-2 font-medium text-gray-500">
              {item.description} This pair is selected for everyday comfort,
              lightweight movement, and a bold Nike look that works from casual
              outfits to active days.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4 md:gap-6">
            <h1 className="text-3xl font-black text-black md:text-6xl">
              ${item.price}/-
            </h1>
            <Select title={"QTY"} options={QTY} />
            <Select title={"SIZE"} options={SIZE} />
          </div>
          <div className="flex flex-wrap items-center gap-6">
            <button
              type="button"
              onClick={() => onAddToCart(item)}
              className="rounded-lg bg-black px-8 py-4 font-bold text-white transition-colors hover:bg-gray-900 active:bg-gray-700"
            >
              Add to cart
            </button>
            <button
              type="button"
              onClick={onBackToProducts}
              className="text-lg font-bold underline underline-offset-4"
            >
              Back to products
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
