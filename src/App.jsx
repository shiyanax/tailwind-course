import { useEffect, useMemo, useState } from "react";
import {
  Link,
  Route,
  Routes,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import Card from "./components/Card";
import Nav from "./components/Nav";
import ShoeDetail from "./components/ShoeDetail";
import Nikelogo from "./assets/nike-logo.svg?react";
import { shoes } from "./data.js";

function CartDrawer({
  cartItems,
  cartCount,
  cartTotal,
  isOpen,
  onClose,
  onRemove,
}) {
  return (
    <div
      className={`fixed inset-0 z-[70] transition ${
        isOpen ? "pointer-events-auto" : "pointer-events-none"
      }`}
      aria-hidden={!isOpen}
    >
      <button
        type="button"
        aria-label="Close cart"
        onClick={onClose}
        className={`absolute inset-0 bg-black/50 transition-opacity ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
      />
      <aside
        className={`absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-white text-neutral-950 shadow-2xl transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
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
            onClick={onClose}
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
                        onClick={() => onRemove(item.id)}
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
}

function HomePage({
  cartCount,
  detailsPath,
  isVideoMuted,
  onAddFeatured,
  onCartOpen,
  onToggleSound,
}) {
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
            detailsPath={detailsPath}
            onCartOpen={onCartOpen}
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
              <Link
                to="/products"
                className="rounded-lg bg-black px-8 py-4 font-bold text-white transition-colors hover:bg-neutral-800"
              >
                Shop products
              </Link>
              <button
                type="button"
                onClick={onAddFeatured}
                className="rounded-lg border border-white bg-white px-8 py-4 font-bold text-black transition-colors hover:bg-lime-300"
              >
                Add featured pair
              </button>
              <button
                type="button"
                onClick={onToggleSound}
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

      <section className="flex flex-col gap-4 px-5 py-12 md:flex-row md:items-center md:justify-between xl:px-24">
        <div>
          <h2 className="text-2xl font-black">Ready to run?</h2>
          <p className="font-medium text-neutral-500">
            Pick a shoe above and add your preferred size and quantity.
          </p>
        </div>
        <Link
          to="/contact"
          className="inline-flex w-fit items-center justify-center rounded-lg bg-black px-6 py-4 font-bold text-white transition-colors hover:bg-neutral-800"
        >
          Contact us
        </Link>
      </section>
    </main>
  );
}

function ProductsPage({
  cartCount,
  detailsPath,
  selectedShoe,
  onCartOpen,
  onAddToCart,
  onViewDetails,
}) {
  return (
    <main className="min-h-screen bg-neutral-50 text-neutral-950">
      <div className="px-5 py-5 xl:px-24">
        <Nav
          cartCount={cartCount}
          detailsPath={detailsPath}
          onCartOpen={onCartOpen}
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
              onSelect={() => onViewDetails(shoe)}
              onAddToCart={() => onAddToCart(shoe)}
            />
          ))}
        </div>
      </section>
    </main>
  );
}

function DetailsPage({
  cartCount,
  onCartOpen,
  onAddToCart,
}) {
  const { shoeId } = useParams();
  const navigate = useNavigate();
  const shoe = shoes.find((item) => item.id === Number(shoeId)) || shoes[0];

  return (
    <main className="min-h-screen bg-white text-neutral-950">
      <div className="px-5 py-5 xl:px-24">
          <Nav
            cartCount={cartCount}
            detailsPath={`/details/${shoe.id}`}
            onCartOpen={onCartOpen}
          />
      </div>
      <section className="px-5 py-16 xl:px-24">
        <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-wide text-lime-500">
              Product details
            </p>
            <h1 className="text-4xl font-black md:text-6xl">{shoe.title}</h1>
          </div>
          <Link
            to="/products"
            className="w-fit rounded-lg border border-neutral-300 px-5 py-3 font-bold transition-colors hover:border-black"
          >
            Back to products
          </Link>
        </div>
        <ShoeDetail
          item={shoe}
          onAddToCart={onAddToCart}
          onBackToProducts={() => navigate("/products")}
        />
      </section>
    </main>
  );
}

function ContactPage({ cartCount, detailsPath, onCartOpen }) {
  return (
    <main className="min-h-screen bg-neutral-50 text-neutral-950">
      <div className="px-5 py-5 xl:px-24">
        <Nav
          cartCount={cartCount}
          detailsPath={detailsPath}
          onCartOpen={onCartOpen}
        />
      </div>

      <section className="grid gap-10 px-5 py-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start xl:px-24">
        <div className="space-y-6">
          <div className="flex size-24 items-center justify-center rounded-full bg-white shadow-sm">
            <Nikelogo className="h-16 w-16" />
          </div>
          <div>
            <p className="text-sm font-bold uppercase tracking-wide text-lime-500">
              Contact Nike
            </p>
            <h1 className="mt-2 text-4xl font-black leading-none md:text-6xl">
              Tell us what you need.
            </h1>
          </div>
          <p className="max-w-xl text-lg font-medium text-neutral-500">
            Questions about sizing, delivery, returns, or a specific sneaker?
            Send a message and our store team will help you choose the right
            pair.
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg border border-neutral-200 bg-white p-5">
              <h2 className="font-black">Store support</h2>
              <p className="mt-1 font-medium text-neutral-500">
                support@nike-store.test
              </p>
            </div>
            <div className="rounded-lg border border-neutral-200 bg-white p-5">
              <h2 className="font-black">Response time</h2>
              <p className="mt-1 font-medium text-neutral-500">
                Within one business day
              </p>
            </div>
          </div>
        </div>

        <form className="rounded-lg border border-neutral-200 bg-white p-6 shadow-sm md:p-8">
          <div className="grid gap-5 md:grid-cols-2">
            <label className="space-y-2">
              <span className="text-sm font-bold text-neutral-700">
                First name
              </span>
              <input
                type="text"
                className="w-full rounded-lg border border-neutral-300 px-4 py-3 outline-none transition-colors focus:border-black"
                placeholder="Alex"
              />
            </label>
            <label className="space-y-2">
              <span className="text-sm font-bold text-neutral-700">
                Last name
              </span>
              <input
                type="text"
                className="w-full rounded-lg border border-neutral-300 px-4 py-3 outline-none transition-colors focus:border-black"
                placeholder="Morgan"
              />
            </label>
            <label className="space-y-2 md:col-span-2">
              <span className="text-sm font-bold text-neutral-700">Email</span>
              <input
                type="email"
                className="w-full rounded-lg border border-neutral-300 px-4 py-3 outline-none transition-colors focus:border-black"
                placeholder="alex@example.com"
              />
            </label>
            <label className="space-y-2 md:col-span-2">
              <span className="text-sm font-bold text-neutral-700">Topic</span>
              <select className="w-full rounded-lg border border-neutral-300 bg-white px-4 py-3 outline-none transition-colors focus:border-black">
                <option>Size and fit</option>
                <option>Delivery</option>
                <option>Returns</option>
                <option>Product availability</option>
              </select>
            </label>
            <label className="space-y-2 md:col-span-2">
              <span className="text-sm font-bold text-neutral-700">
                Message
              </span>
              <textarea
                rows="6"
                className="w-full resize-none rounded-lg border border-neutral-300 px-4 py-3 outline-none transition-colors focus:border-black"
                placeholder="Tell us how we can help."
              />
            </label>
          </div>
          <button
            type="button"
            className="mt-6 w-full rounded-lg bg-black px-6 py-4 font-bold text-white transition-colors hover:bg-neutral-800"
          >
            Send message
          </button>
        </form>
      </section>
    </main>
  );
}

export default function App() {
  const [selectedShoe, setSelectedShoe] = useState(shoes[0]);
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const cartTotal = useMemo(
    () =>
      cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0,
      ),
    [cartItems],
  );
  const detailsPath = `/details/${selectedShoe.id}`;

  useEffect(() => {
    if (location.hash) {
      document
        .getElementById(location.hash.slice(1))
        ?.scrollIntoView({ behavior: "smooth" });
      return;
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname, location.hash]);

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
    navigate(`/details/${shoe.id}`);
  }

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              cartCount={cartCount}
              detailsPath={detailsPath}
              isVideoMuted={isVideoMuted}
              onAddFeatured={() => addToCart(selectedShoe)}
              onCartOpen={() => setIsCartOpen(true)}
              onToggleSound={() => setIsVideoMuted((muted) => !muted)}
            />
          }
        />
        <Route
          path="/products"
          element={
            <ProductsPage
              cartCount={cartCount}
              detailsPath={detailsPath}
              selectedShoe={selectedShoe}
              onCartOpen={() => setIsCartOpen(true)}
              onAddToCart={addToCart}
              onViewDetails={viewDetails}
            />
          }
        />
        <Route
          path="/details/:shoeId"
          element={
            <DetailsPage
              cartCount={cartCount}
              onCartOpen={() => setIsCartOpen(true)}
              onAddToCart={addToCart}
            />
          }
        />
        <Route
          path="/contact"
          element={
            <ContactPage
              cartCount={cartCount}
              detailsPath={detailsPath}
              onCartOpen={() => setIsCartOpen(true)}
            />
          }
        />
      </Routes>
      <CartDrawer
        cartItems={cartItems}
        cartCount={cartCount}
        cartTotal={cartTotal}
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onRemove={removeFromCart}
      />
    </>
  );
}
