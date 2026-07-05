export default function Card({ item, isSelected, onSelect, onAddToCart }) {
  if (!item) return null;

  return (
    <article
      className={`rounded-3xl border bg-white p-6 text-center shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl ${
        isSelected
          ? "border-black ring-2 ring-black"
          : "border-neutral-200 ring-0"
      }`}
    >
      <div>
        <h3 className="text-lg font-black leading-tight">{item.title}</h3>
        <p className="mt-1 text-sm font-bold text-neutral-500">
          ${item.price}/-
        </p>
      </div>

      <button
        type="button"
        onClick={onSelect}
        className={`mx-auto mt-6 flex size-64 items-center justify-center rounded-full ${item.className} transition-transform hover:scale-105`}
      >
        <img
          src={item.src}
          alt={item.title}
          className="animate-wiggle w-[120%] object-contain drop-shadow-2xl"
        />
      </button>

      <div className="mt-6 flex items-center justify-center gap-3">
        <button
          type="button"
          onClick={onSelect}
          className="text-sm font-bold underline underline-offset-4"
        >
          View details
        </button>
        <button
          type="button"
          onClick={onAddToCart}
          className="rounded-lg bg-black px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-neutral-800"
        >
          Add to cart
        </button>
      </div>
    </article>
  );
}
