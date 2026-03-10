import React from 'react';
import { motion } from 'framer-motion';
import { mockBrands } from '../../data/mock';
export function TopBrands() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-primary mb-2">
          Trusted by Top Brands
        </h2>
        <p className="text-body">We partner with the best in the industry.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {mockBrands.map((brand, i) =>
        <motion.div
          key={brand.id}
          initial={{
            opacity: 0,
            y: 20
          }}
          whileInView={{
            opacity: 1,
            y: 0
          }}
          viewport={{
            once: true
          }}
          transition={{
            delay: i * 0.05
          }}
          className="bg-surface border border-subtle/20 rounded-xl p-8 flex flex-col items-center justify-center gap-3 hover:border-subtle/60 hover:bg-elevated transition-colors cursor-pointer group">

            <span className="text-4xl grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300">
              {brand.logo}
            </span>
            <span className="text-primary font-medium">{brand.name}</span>
          </motion.div>
        )}
      </div>
    </section>);

}