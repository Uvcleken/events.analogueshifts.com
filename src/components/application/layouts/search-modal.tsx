import { X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

interface Params {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function SearchModal({ open, setOpen }: Params) {
  return (
    <AnimatePresence>
      {open && (
        <motion.section
          animate={{ y: 0 }}
          exit={{ y: "100%", transition: { delay: 0.7 } }}
          initial={{ y: "100%" }}
          transition={{ duration: 0.5, ease: "circIn" }}
          className="fixed bg-white w-screen h-screen top-0 left-0 z-50 bg-transparent"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: 0.5 } }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="w-full h-full bg-transparent top-0 left-0 absolute"
          >
            <button
              onClick={() => setOpen(false)}
              className="absolute top-6 flex justify-center items-center right-6 w-16 h-16 rounded-full text-primary-boulder500/70 bg-primary-boulder700/10"
            >
              <X className="w-8" />
            </button>
          </motion.div>
        </motion.section>
      )}
    </AnimatePresence>
  );
}
