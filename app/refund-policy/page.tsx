export default function RefundPolicy() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 min-h-[70vh]">
      <h1 className="text-3xl md:text-5xl font-bold tracking-widest uppercase mb-12 text-center border-b border-gray-100 pb-8">
        Refund & Exchange Policy
      </h1>
      
      <div className="space-y-8 text-gray-600 text-sm sm:text-base leading-relaxed">
        <section>
          <h2 className="text-black text-lg font-semibold tracking-widest uppercase mb-4">Strict No Refund Policy</h2>
          <p>
            Due to the nature of our products and strict hygiene standards, Olfacto Perfume operates on a strict <strong>No Refund</strong> policy. Once an order is placed and processed, it cannot be canceled or refunded under any circumstances.
          </p>
        </section>

        <section>
          <h2 className="text-black text-lg font-semibold tracking-widest uppercase mb-4">Exchanges for Damaged Goods</h2>
          <p>
            We take utmost care in packaging your fragrances. However, if you receive a damaged, leaked, or incorrect product, we will gladly offer a replacement. 
          </p>
          <div className="bg-gray-50 border-l-4 border-black p-6 mt-4">
            <h3 className="text-black font-bold tracking-widest uppercase mb-2">Mandatory Requirement for Exchange:</h3>
            <p className="mb-4">
              To be eligible for an exchange, you <strong>must</strong> provide a clear, continuous, unedited video recording of the unboxing process. 
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>The video must start with the package completely sealed in its original shipping material.</li>
              <li>The shipping label must be clearly visible in the video.</li>
              <li>The video must capture the opening of the box and clearly show the damage or leakage as soon as it is revealed.</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-black text-lg font-semibold tracking-widest uppercase mb-4">How to Request an Exchange</h2>
          <p>
            If your situation meets the criteria above, please contact our support team at <strong>support@olfactoperfume.com</strong> within 48 hours of delivery. Attach your unboxing video and order number. Our team will review the footage and arrange a replacement at no additional cost.
          </p>
        </section>
      </div>
    </div>
  );
}