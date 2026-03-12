import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  ShieldCheck,
  Truck,
  Clock,
  HeadphonesIcon,
} from 'lucide-react';
import type { Product } from '../types';
import { Button } from '../components/ui/Button';
import { ProductCard } from '../components/ProductCard';
import { apiRequest, getErrorMessage } from '../lib/api';
import { normalizeProduct } from '../utils/product';
import { AnnouncementBar } from '../components/home/AnnouncementBar';
import { TopBrands } from '../components/home/TopBrands';
import { BestDeals } from '../components/home/BestDeals';
import { Testimonials } from '../components/home/Testimonials';
import { Newsletter } from '../components/home/Newsletter';

export function Home() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    let isCancelled = false;

    const fetchProducts = async () => {
      try {
        const response = await apiRequest<Product[]>('/api/products');

        if (!isCancelled) {
          setProducts(response.map((product) => normalizeProduct(product)));
        }
      } catch (error) {
        if (!isCancelled) {
          setProducts([]);
          console.error(getErrorMessage(error));
        }
      }
    };

    fetchProducts();

    return () => {
      isCancelled = true;
    };
  }, []);

  const featuredLaptops = useMemo(
    () =>
      products
        .filter((p) => p.category === 'Laptops' && p.featured)
        .slice(0, 4),
    [products]
  );

  const featuredAccessories = useMemo(
    () => products.filter((p) => p.category === 'Accessories').slice(0, 4),
    [products]
  );

  const containerVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <>
      <AnnouncementBar />
      <div className="flex flex-col gap-24 pb-24">
        <section className="relative h-[80vh] min-h-[600px] flex items-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img
              src="https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&q=80&w=2000"
              alt="Premium workspace"
              className="w-full h-full object-cover opacity-30"
            />

            <motion.div
              className="absolute -top-24 -left-24 w-[420px] h-[420px] rounded-full bg-accent-gold/10 blur-3xl"
              animate={{
                x: [0, 80, 0],
                y: [0, 40, 0],
                scale: [1, 1.15, 1],
              }}
              transition={{
                duration: 12,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />

            <motion.div
              className="absolute top-1/3 right-[-120px] w-[380px] h-[380px] rounded-full bg-accent-blue/10 blur-3xl"
              animate={{
                x: [0, -70, 0],
                y: [0, -30, 0],
                scale: [1, 1.12, 1],
              }}
              transition={{
                duration: 14,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />

            <motion.div
              className="absolute bottom-[-120px] left-1/3 w-[320px] h-[320px] rounded-full bg-accent-gold/10 blur-3xl"
              animate={{
                x: [0, 50, 0],
                y: [0, -40, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 16,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />

            <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
            <motion.div
              initial={{
                opacity: 0,
                y: 30,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.8,
                ease: 'easeOut',
              }}
              className="max-w-2xl"
            >
              <span className="inline-block py-1 px-3 rounded-full bg-accent-gold/10 text-accent-gold border border-accent-gold/20 text-sm font-medium mb-6">
                New Arrivals 2026
              </span>
              <h1 className="text-5xl md:text-7xl font-bold text-primary tracking-tight mb-6 leading-tight">
                Power Your <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-gold to-accent-goldHover">
                  Potential.
                </span>
              </h1>
              <p className="text-lg md:text-xl text-body mb-10 leading-relaxed max-w-xl">
                Discover premium laptops and accessories engineered for
                professionals, creators, and gamers who demand excellence.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/shop?category=laptops">
                  <Button size="lg" className="w-full sm:w-auto text-base px-8">
                    Shop Laptops
                  </Button>
                </Link>
                <Link to="/shop?category=accessories">
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full sm:w-auto text-base px-8"
                  >
                    Explore Accessories
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.6,
              ease: 'easeOut',
            }}
            className="rounded-[2rem] bg-white p-6 md:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.18)] border border-white/60"
          >
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                {
                  icon: Truck,
                  title: 'Free Shipping',
                  desc: 'On orders over $500',
                },
                {
                  icon: ShieldCheck,
                  title: 'Secure Payment',
                  desc: '100% secure checkout',
                },
                {
                  icon: Clock,
                  title: '30 Days Return',
                  desc: 'No questions asked',
                },
                {
                  icon: HeadphonesIcon,
                  title: '24/7 Support',
                  desc: 'Dedicated premium support',
                },
              ].map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{
                    opacity: 0,
                    y: 20,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                  }}
                  transition={{
                    delay: i * 0.1,
                  }}
                  whileHover={{
                    y: -6,
                    scale: 1.02,
                  }}
                  className="flex flex-col items-center text-center p-6 rounded-2xl bg-yellow-400 border border-yellow-300 shadow-md"
                >
                  <div className="w-12 h-12 rounded-full bg-white/50 flex items-center justify-center text-gray-900 mb-4">
                    <feature.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-gray-900 font-semibold mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-800">{feature.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        <BestDeals />

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold text-primary mb-2">Laptops</h2>
              <p className="text-body">
                Premium machines for ultimate performance.
              </p>
            </div>
            <Link
              to="/shop?category=laptops"
              className="hidden sm:flex items-center text-accent-blue hover:text-accent-blueHover font-medium transition-colors"
            >
              View All <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              margin: '-100px',
            }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {featuredLaptops.map((product) => (
              <motion.div key={product.id} variants={itemVariants}>
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link
              to="/shop?category=laptops"
              className="group relative h-80 rounded-2xl overflow-hidden"
            >
              <img
                src="https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&q=80&w=1000"
                alt="Laptops"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
              <div className="absolute bottom-0 left-0 p-8">
                <h3 className="text-3xl font-bold text-primary mb-2">
                  Pro Laptops
                </h3>
                <p className="text-body mb-4">
                  Unleash your creativity with top-tier performance.
                </p>
                <span className="inline-flex items-center text-accent-gold font-medium group-hover:underline">
                  Shop Now <ArrowRight className="w-4 h-4 ml-1" />
                </span>
              </div>
            </Link>

            <Link
              to="/shop?category=accessories"
              className="group relative h-80 rounded-2xl overflow-hidden"
            >
              <img
                src="https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&q=80&w=1000"
                alt="Accessories"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
              <div className="absolute bottom-0 left-0 p-8">
                <h3 className="text-3xl font-bold text-primary mb-2">
                  Premium Accessories
                </h3>
                <p className="text-body mb-4">
                  Elevate your workspace with precision tools.
                </p>
                <span className="inline-flex items-center text-accent-blue font-medium group-hover:underline">
                  Shop Now <ArrowRight className="w-4 h-4 ml-1" />
                </span>
              </div>
            </Link>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold text-primary mb-2">
                Accessories
              </h2>
              <p className="text-body">
                Complete your setup with premium gear.
              </p>
            </div>
            <Link
              to="/shop?category=accessories"
              className="hidden sm:flex items-center text-accent-blue hover:text-accent-blueHover font-medium transition-colors"
            >
              View All <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              margin: '-100px',
            }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {featuredAccessories.map((product) => (
              <motion.div key={product.id} variants={itemVariants}>
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        </section>

        <TopBrands />
        <Testimonials />
        <Newsletter />
      </div>
    </>
  );
}