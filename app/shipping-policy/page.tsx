export default function ShippingPolicy() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 min-h-[70vh]">
      <h1 className="text-3xl md:text-5xl font-bold tracking-widest uppercase mb-12 text-center border-b border-gray-100 pb-8">
        Shipping Policy
      </h1>
      
      <div className="space-y-8 text-gray-600 text-sm sm:text-base leading-relaxed">
        <section>
          <h2 className="text-black text-lg font-semibold tracking-widest uppercase mb-4">PAN India Delivery</h2>
          <p>
            We are proud to offer shipping across all states and union territories in India. No matter where you are located, Olfacto Perfume will deliver your signature scent directly to your doorstep.
          </p>
        </section>

        <section>
          <h2 className="text-black text-lg font-semibold tracking-widest uppercase mb-4">Free Shipping</h2>
          <p>
            We believe in a seamless luxury experience. Therefore, we provide absolutely <strong>Free Shipping</strong> on all orders across India, with no minimum purchase required.
          </p>
        </section>

        <section>
          <h2 className="text-black text-lg font-semibold tracking-widest uppercase mb-4">Delivery Timeline</h2>
          <p>
            All orders are processed and dispatched promptly. You can expect your package to arrive within <strong>7 to 10 business days</strong> from the date of order confirmation. 
          </p>
          <p className="mt-4">
            Please note that deliveries to remote areas may occasionally take slightly longer depending on our courier partners. You will receive a tracking link via email/SMS once your order has been dispatched.
          </p>
        </section>
      </div>
    </div>
  );
}