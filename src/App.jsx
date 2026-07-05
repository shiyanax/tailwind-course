import Card from "./components/Card";
import Nav from "./components/Nav";
import ShoeDetail from "./components/ShoeDetail";
import { shoes } from "./data.js";
import { useMemo, useState } from "react";

export default function App() {
  const [selectedShoe, setSelectedShoe] = useState(shoes[0]);
  const [cartItems, setCartItems] = useState([]);
  const [currentPage, setCurrentPage] = useState("home");
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(false);

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const cartTotal = useMemo(
    () =>
      cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0,
      ),
    [cartItems],
  );

  function addToCart(shoe) {
    setCartItems((items) => {
      const existingItem = items.find((item) => item.id === shoe.id);

      if (existingItem) {
        return items.map((item) =>
          item.id === shoe.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }

      return [...items, { ...shoe, quantity: 1 }];
    });
    setIsCartOpen(true);
  }

  function removeFromCart(shoeId) {
    setCartItems((items) => items.filter((item) => item.id !== shoeId));
  }

  function viewDetails(shoe) {
    setSelectedShoe(shoe);
    setCurrentPage("details");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function navigateTo(page) {
    const pageName = page.toLowerCase();

    if (pageName === "cart") {
      setIsCartOpen(true);
      return;
    }

    if (["home", "products", "details"].includes(pageName)) {
      setCurrentPage(pageName);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    setCurrentPage("home");
    window.setTimeout(() => {
      document.getElementById(pageName)?.scrollIntoView({ behavior: "smooth" });
    }, 0);
  }

  const cartDrawer = (
    <div
      className={`fixed inset-0 z-[70] transition ${
        isCartOpen ? "pointer-events-auto" : "pointer-events-none"
      }`}
      aria-hidden={!isCartOpen}
    >
      <button
        type="button"
        aria-label="Close cart"
        onClick={() => setIsCartOpen(false)}
        className={`absolute inset-0 bg-black/50 transition-opacity ${
          isCartOpen ? "opacity-100" : "opacity-0"
        }`}
      />
      <aside
        className={`absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-white text-neutral-950 shadow-2xl transition-transform duration-300 ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-neutral-200 p-5">
          <div>
            <p className="text-sm font-bold uppercase tracking-wide text-lime-500">
              Your cart
            </p>
            <h2 className="text-2xl font-black">
              {cartCount} {cartCount === 1 ? "item" : "items"}
            </h2>
          </div>
          <button
            type="button"
            onClick={() => setIsCartOpen(false)}
            className="rounded-full border border-neutral-200 bg-white p-3 text-black shadow-sm transition-colors hover:bg-neutral-100"
            aria-label="Close cart"
          >
            x
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5">
          {cartItems.length === 0 ? (
            <div className="rounded-lg border border-neutral-200 p-5 font-medium text-neutral-500">
              Your cart is empty. Add a pair from the featured shoe or product
              collection.
            </div>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="grid grid-cols-[80px_1fr] gap-4 rounded-lg border border-neutral-200 p-4"
                >
                  <div
                    className={`flex size-20 items-center justify-center rounded-full ${item.className}`}
                  >
                    <img
                      src={item.src}
                      alt={item.title}
                      className="w-[120%] object-contain"
                    />
                  </div>
                  <div>
                    <h3 className="font-black leading-tight">{item.title}</h3>
                    <p className="mt-1 text-sm font-medium text-neutral-500">
                      Qty {item.quantity} x ${item.price}/-
                    </p>
                    <div className="mt-3 flex items-center justify-between gap-3">
                      <p className="font-black">
                        ${item.price * item.quantity}/-
                      </p>
                      <button
                        type="button"
                        onClick={() => removeFromCart(item.id)}
                        className="text-sm font-bold underline underline-offset-4"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="border-t border-neutral-200 p-5">
          <div className="mb-4 flex items-center justify-between text-xl font-black">
            <span>Total</span>
            <span>${cartTotal}/-</span>
          </div>
          <button
            type="button"
            className="w-full rounded-lg bg-black px-6 py-4 font-bold text-white transition-colors hover:bg-neutral-800 disabled:cursor-not-allowed disabled:bg-neutral-300"
            disabled={cartItems.length === 0}
          >
            Checkout
          </button>
        </div>
      </aside>
    </div>
  );

  if (currentPage === "products") {
    return (
      <main className="min-h-screen bg-neutral-50 text-neutral-950">
        <div className="px-5 py-5 xl:px-24">
          <Nav
            cartCount={cartCount}
            activePage="Products"
            onNavigate={navigateTo}
            onCartOpen={() => setIsCartOpen(true)}
          />
        </div>
        <section className="px-5 py-16 xl:px-24">
          <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-wide text-lime-500">
                Popular Collection
              </p>
              <h1 className="text-4xl font-black md:text-6xl">
                Choose your next pair
              </h1>
            </div>
            <p className="max-w-xl font-medium text-neutral-500">
              Pick a shoe to open its full product detail page, or add it
              straight to your cart from the collection.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {shoes.map((shoe) => (
              <Card
                key={shoe.id}
                item={shoe}
                isSelected={selectedShoe.id === shoe.id}
                onSelect={() => viewDetails(shoe)}
                onAddToCart={() => addToCart(shoe)}
              />
            ))}
          </div>
        </section>
        {cartDrawer}
      </main>
    );
  }

  if (currentPage === "details") {
    return (
      <main className="min-h-screen bg-white text-neutral-950">
        <div className="px-5 py-5 xl:px-24">
          <Nav
            cartCount={cartCount}
            activePage="Details"
            onNavigate={navigateTo}
            onCartOpen={() => setIsCartOpen(true)}
          />
        </div>
        <section className="px-5 py-16 xl:px-24">
          <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-wide text-lime-500">
                Product details
              </p>
              <h1 className="text-4xl font-black md:text-6xl">
                {selectedShoe.title}
              </h1>
            </div>
            <button
              type="button"
              onClick={() => navigateTo("products")}
              className="w-fit rounded-lg border border-neutral-300 px-5 py-3 font-bold transition-colors hover:border-black"
            >
              Back to products
            </button>
          </div>
          <ShoeDetail
            item={selectedShoe}
            onAddToCart={addToCart}
            onBackToProducts={() => navigateTo("products")}
          />
        </section>
        {cartDrawer}
      </main>
    );
  }

  return (
    <main className="min-h-screen overflow-hidden bg-neutral-50 text-neutral-950">
      <section id="home" className="relative min-h-screen overflow-hidden">
        <div className="absolute inset-0 bg-black">
          <iframe
            className="pointer-events-none absolute left-1/2 top-1/2 h-[56.25vw] min-h-full w-full min-w-[177.777778vh] -translate-x-1/2 -translate-y-1/2"
            src={`https://www.youtube.com/embed/zWfX5jeF6k4?autoplay=1&mute=${isVideoMuted ? "1" : "0"}&loop=1&playlist=zWfX5jeF6k4&controls=0&modestbranding=1&playsinline=1`}
            title="Nike shoe landing page reference video"
            allow="autoplay; encrypted-media; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
        <div className="absolute inset-0 bg-black/55" />

        <div className="relative z-10 px-5 py-5 text-white xl:px-24">
          <Nav
            cartCount={cartCount}
            isDark
            activePage="Home"
            onNavigate={navigateTo}
            onCartOpen={() => setIsCartOpen(true)}
          />
        </div>

        <div className="relative z-10 flex min-h-[calc(100vh-104px)] items-end px-5 pb-16 text-white md:items-center xl:px-24">
          <div className="max-w-3xl space-y-7">
            <p className="text-sm font-bold uppercase tracking-wide text-lime-500">
              Nike seasonal edit
            </p>
            <h1 className="text-5xl font-black leading-none md:text-7xl">
              Run the day in shoes built to move.
            </h1>
            <p className="text-lg font-medium text-white/80">
              Watch the drop, choose a featured pair, and add your favorites to
              the cart without leaving the page.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() => navigateTo("products")}
                className="rounded-lg bg-black px-8 py-4 font-bold text-white transition-colors hover:bg-neutral-800"
              >
                Shop products
              </button>
              <button
                type="button"
                onClick={() => addToCart(selectedShoe)}
                className="rounded-lg border border-white bg-white px-8 py-4 font-bold text-black transition-colors hover:bg-lime-300"
              >
                Add featured pair
              </button>
              <button
                type="button"
                onClick={() => setIsVideoMuted((muted) => !muted)}
                className="rounded-lg border border-white/60 bg-white/10 px-6 py-4 font-bold text-white backdrop-blur transition-colors hover:bg-white/20"
                aria-pressed={isVideoMuted}
              >
                {isVideoMuted ? "Sound on" : "Sound off"}
              </button>
            </div>
          </div>
        </div>
      </section>

      <section
        id="services"
        className="grid gap-6 bg-white px-5 py-16 md:grid-cols-3 xl:px-24"
      >
        {[
          ["Free Delivery", "Fast shipping on every featured sneaker."],
          ["Easy Returns", "Simple exchanges when the fit is not right."],
          ["Member Support", "Help with sizes, stock, and product picks."],
        ].map(([title, description]) => (
          <div key={title} className="rounded-lg border border-neutral-200 p-6">
            <h3 className="text-xl font-black">{title}</h3>
            <p className="mt-2 font-medium text-neutral-500">{description}</p>
          </div>
        ))}
      </section>

      <section
        id="contact"
        className="flex flex-col gap-4 px-5 py-12 md:flex-row md:items-center md:justify-between xl:px-24"
      >
        <div>
          <h2 className="text-2xl font-black">Ready to run?</h2>
          <p className="font-medium text-neutral-500">
            Pick a shoe above and add your preferred size and quantity.
          </p>
        </div>
        <button
          type="button"
          onClick={() => navigateTo("home")}
          className="inline-flex w-fit items-center justify-center rounded-lg bg-black px-6 py-4 font-bold text-white transition-colors hover:bg-neutral-800"
        >
          Back to top
        </button>
      </section>
      {cartDrawer}
    </main>
  );
}
