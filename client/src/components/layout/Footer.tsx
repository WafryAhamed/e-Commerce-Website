import { Link } from 'react-router-dom';
import { Laptop, Twitter, Github, Linkedin, Mail } from 'lucide-react';
export function Footer() {
  return (
    <footer className="bg-surface border-t border-subtle/30 pt-16 pb-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-accent-gold flex items-center justify-center text-background">
                <Laptop className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold text-primary tracking-tight">
                TechVault
              </span>
            </Link>
            <p className="text-body text-sm mb-6 leading-relaxed">
              Premium laptops and accessories for professionals, creators, and
              gamers. Engineered for excellence.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="#"
                className="text-muted hover:text-primary transition-colors">

                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-muted hover:text-primary transition-colors">

                <Github className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-muted hover:text-primary transition-colors">

                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-primary font-semibold mb-4">Shop</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/shop?category=laptops"
                  className="text-body hover:text-accent-gold transition-colors text-sm">

                  All Laptops
                </Link>
              </li>
              <li>
                <Link
                  to="/shop?category=accessories"
                  className="text-body hover:text-accent-gold transition-colors text-sm">

                  Accessories
                </Link>
              </li>
              <li>
                <Link
                  to="/shop?sort=newest"
                  className="text-body hover:text-accent-gold transition-colors text-sm">

                  New Arrivals
                </Link>
              </li>
              <li>
                <Link
                  to="/shop?sort=deals"
                  className="text-body hover:text-accent-gold transition-colors text-sm">

                  Best Deals
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-primary font-semibold mb-4">Support</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="#"
                  className="text-body hover:text-accent-gold transition-colors text-sm">

                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="text-body hover:text-accent-gold transition-colors text-sm">

                  FAQs
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="text-body hover:text-accent-gold transition-colors text-sm">

                  Shipping & Returns
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="text-body hover:text-accent-gold transition-colors text-sm">

                  Warranty
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-primary font-semibold mb-4">Stay Updated</h3>
            <p className="text-body text-sm mb-4">
              Subscribe to get special offers, free giveaways, and
              once-in-a-lifetime deals.
            </p>
            <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <div className="relative flex-1">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full bg-background border border-subtle/50 rounded-lg py-2 pl-9 pr-4 text-sm text-primary focus:outline-none focus:border-accent-gold transition-colors" />

              </div>
              <button
                type="submit"
                className="bg-accent-gold text-background px-4 py-2 rounded-lg text-sm font-medium hover:bg-accent-goldHover transition-colors">

                Join
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-subtle/30 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-muted text-sm">
            © {new Date().getFullYear()} TechVault. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link
              to="#"
              className="text-muted hover:text-primary text-sm transition-colors">

              Privacy Policy
            </Link>
            <Link
              to="#"
              className="text-muted hover:text-primary text-sm transition-colors">

              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>);

}
