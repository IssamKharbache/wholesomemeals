import Image from "next/image";
import Link from "next/link";

const HeroSection = () => {
  return (
    <section
      className="min-h-screen"
      style={{
        background: "linear-gradient(333deg, #FFA500 50%, #ffffff 50%)",
      }}
    >
      <div className="min-h-[calc(100vh-68px)] flex items-center justify-center px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center max-w-5xl w-full">
          {/* ── Left Copy ── */}
          <div className="flex flex-col gap-7">
            {/* Badge */}
            <span className="inline-flex items-center gap-2 w-fit bg-white/70 border border-orange-200 rounded-full px-4 py-1.5 text-xs font-semibold text-orange-500 uppercase tracking-widest backdrop-blur-sm">
              🌿 Your cooking companion
            </span>

            {/* Title */}
            <h1
              className="text-5xl md:text-6xl font-bold leading-tight tracking-tight text-gray-900"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Cook with{" "}
              <em style={{ fontStyle: "italic", color: "#FF6B00" }}>heart</em>,
              <br /> eat with joy.
            </h1>

            {/* Description */}
            <p className="text-base text-gray-500 leading-relaxed max-w-sm font-light">
              Welcome to{" "}
              <span className="font-medium text-orange-700">
                WholesomeMeals
              </span>{" "}
              — find, cook, and enjoy nourishing recipes crafted for real life,
              every single day.
            </p>

            {/* Stats */}
            <div className="flex  items-center gap-6">
              <div className="flex flex-col">
                <span
                  className="text-2xl font-bold text-gray-900"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  500+
                </span>
                <span className="text-xs text-gray-400 uppercase tracking-widest">
                  Recipes
                </span>
              </div>
              <div className="w-px self-stretch bg-gray-200" />
              <div className="flex flex-col">
                <span
                  className="text-2xl font-bold text-gray-900"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  30 min
                </span>
                <span className="text-xs text-gray-400 uppercase tracking-widest">
                  Avg. cook time
                </span>
              </div>
              <div className="w-px self-stretch bg-gray-200" />
              <div className="flex flex-col">
                <span
                  className="text-2xl font-bold text-gray-900"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  100%
                </span>
                <span className="text-xs text-gray-400 uppercase tracking-widest">
                  Wholesome
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4">
              <Link
                href="/recipes"
                className="bg-orange-500 hover:bg-orange-600 active:scale-95 text-white text-sm font-medium px-6 py-3 rounded-xl transition-all duration-200 shadow-lg shadow-orange-200 flex items-center gap-2"
              >
                Browse Recipes
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>

          {/* ── Right Image ── */}
          <div className="relative flex justify-center items-center">
            {/* Decorative blob */}
            <div className="absolute w-80 h-80 bg-orange-100 rounded-full blur-3xl opacity-60 -z-10" />
            {/* Main image */}
            <div className="w-full max-w-sm rounded-3xl overflow-hidden shadow-2xl ring-4 ring-white">
              <Image
                priority
                src="/meal.jpg"
                width={1500}
                height={1500}
                alt="A beautiful wholesome meal"
                className="w-full h-105 object-cover hover:scale-105 transition-transform duration-700 ease-out"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
