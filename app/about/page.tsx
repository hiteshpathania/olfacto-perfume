import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* ========================================== */}
      {/* HERO SECTION                               */}
      {/* ========================================== */}
      <div className="bg-black text-white py-24 md:py-32 px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl md:text-6xl font-bold tracking-[0.2em] uppercase mb-6">
          The Unseen Accessory.
        </h1>
        <p className="text-gray-400 text-sm md:text-base tracking-widest uppercase max-w-2xl mx-auto">
          Fragrance is more than a scent. It is an identity. The invisible aura that enters a room before you do, and lingers long after you leave.
        </p>
      </div>

      {/* ========================================== */}
      {/* STORY SECTION                              */}
      {/* ========================================== */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
          
          {/* LEFT SIDE: Bold Callout */}
          <div className="md:col-span-5 border-t-4 border-black pt-6">
            <h2 className="text-2xl font-bold tracking-widest uppercase mb-4">Our Genesis</h2>
            <p className="text-sm font-semibold tracking-wide text-gray-500 uppercase">
              Est. February 12, 2025
            </p>
            <p className="text-sm font-semibold tracking-wide text-gray-500 uppercase mt-2">
              Founder: Abhishek Sharma
            </p>
          </div>

          {/* RIGHT SIDE: The Narrative */}
          <div className="md:col-span-7 space-y-8 text-gray-600 text-sm sm:text-base leading-relaxed">
            <p>
              Founded on <strong>February 12, 2025</strong>, by <strong>Abhishek Sharma</strong>, Olfacto Perfume was born from a singular, uncompromising vision: to disrupt the traditional luxury fragrance market by focusing entirely on the quality of the juice inside the bottle. 
            </p>
            <p>
              Abhishek recognized a gap in the modern market—a need for high-end, long-lasting fragrances that speak to the bold, the confident, and the unapologetic, without the inflated retail markups. Olfacto was created to strip away the unnecessary noise and deliver pure, concentrated character.
            </p>
            
            <blockquote className="border-l-2 border-black pl-6 py-2 my-8 italic text-black font-medium text-lg">
              "You don't wear our fragrances to blend in. You wear them to leave a mark."
            </blockquote>

            <p>
              Every bottle of Olfacto is crafted with precision, drawing inspiration from the world's most iconic scent profiles, refined and intensified for maximum longevity. Whether you are seeking the fresh magnetism of Neosil, the dark luxury of Smoky Knight, or the elegant seduction of First Kiss, we have engineered a scent to match your exact energy.
            </p>
            <p>
              We don't just sell perfume. We provide the final layer of your outfit.
            </p>

            <div className="pt-8">
              <Link 
                href="/#collection"
                className="inline-block border border-black bg-white text-black px-8 py-4 text-xs tracking-widest uppercase hover:bg-black hover:text-white transition-colors"
              >
                Explore The Collection
              </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}