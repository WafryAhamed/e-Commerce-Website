import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, ArrowLeft } from 'lucide-react';
import { Button } from '../components/ui/Button';
export function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
      <motion.div
        initial={{
          opacity: 0,
          scale: 0.9
        }}
        animate={{
          opacity: 1,
          scale: 1
        }}
        transition={{
          duration: 0.5
        }}>

        <h1 className="text-9xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-accent-gold to-accent-blue mb-4">
          404
        </h1>
        <h2 className="text-3xl font-bold text-primary mb-4">Page Not Found</h2>
        <p className="text-body max-w-md mx-auto mb-8">
          The page you are looking for might have been removed, had its name
          changed, or is temporarily unavailable.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/">
            <Button size="lg" leftIcon={<Home className="w-5 h-5" />}>
              Back to Home
            </Button>
          </Link>
          <button onClick={() => window.history.back()}>
            <Button
              variant="outline"
              size="lg"
              leftIcon={<ArrowLeft className="w-5 h-5" />}>

              Go Back
            </Button>
          </button>
        </div>
      </motion.div>
    </div>);

}
