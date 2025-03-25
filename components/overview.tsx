import { motion } from 'framer-motion';

export const Overview = () => {
  return (
    <motion.h1
      key="overview"
      className="max-w-3xl mx-auto text-center text-2xl font-semibold mb-6"
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ delay: 0.5 }}
    >
      What can I help with?
    </motion.h1>
  );
};
