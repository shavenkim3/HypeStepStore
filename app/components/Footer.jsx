export default function Footer() {
  return (
    <footer className="bg-[#161616] text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div>
          <h3 className="mb-4 text-2xl font-bold">Shop</h3>
          <ul className="space-y-2 text-white/75">
            <li>Men</li>
            <li>Women</li>
            <li>New Arrival</li>
            <li>Brands</li>
            <li>Sale</li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-2xl font-bold">Customer Service</h3>
          <ul className="space-y-2 text-white/75">
            <li>FAQ</li>
            <li>Shipping & Delivery</li>
            <li>Returns & Refunds</li>
            <li>Track Order</li>
            <li>Contact Us</li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-2xl font-bold">About</h3>
          <ul className="space-y-2 text-white/75">
            <li>About Us</li>
            <li>Terms & Conditions</li>
            <li>Privacy Policy</li>
            <li>Cookie Policy</li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-2xl font-bold">HypeStepStore</h3>
          <p className="text-white/75">
            Premium sneakers for everyday wear and street style.
          </p>
        </div>
      </div>

      <div className="border-t border-white/10 py-5 text-center text-sm text-white/50">
        © 2026 HypeStepStore. All rights reserved.
      </div>
    </footer>
  );
}