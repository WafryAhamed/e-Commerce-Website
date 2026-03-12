import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { mockTestimonials } from '../../data/mock';
import { Card } from '../ui/Card';
export function Testimonials() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-primary mb-2">
          What Our Customers Say
        </h2>
        <p className="text-body">Real reviews from verified buyers.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockTestimonials.map((testimonial, i) =>
        <motion.div
          key={testimonial.id}
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
            delay: i * 0.1
          }}>

            <Card className="p-6 h-full flex flex-col">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, idx) =>
              <Star
                key={idx}
                className={`w-4 h-4 ${idx < testimonial.rating ? 'fill-accent-gold text-accent-gold' : 'text-subtle'}`} />

              )}
              </div>
              <p className="text-body italic mb-6 flex-1">
                "{testimonial.comment}"
              </p>
              <div className="flex items-center gap-4 mt-auto">
                <img
                src={testimonial.avatar}
                alt={testimonial.name}
                className="w-12 h-12 rounded-full object-cover border border-subtle/30" />

                <div>
                  <h4 className="text-primary font-medium text-sm">
                    {testimonial.name}
                  </h4>
                  <p className="text-muted text-xs">
                    Purchased: {testimonial.product}
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        )}
      </div>
    </section>);

}
