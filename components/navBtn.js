import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

const btnVariant = {
  hidden: {
    opacity: 0,
    scaleX: 0
  },
  visible: {
    opacity: 1,
    scaleX: 1,
    transition: { 
      type: "tween",
      stiffness: 10,
      mass: .1
    }
  }
}

const NavBtn = ({ text, icon, ...props }) => {
  const [show, setShow] = useState(false)

  return (
    <Link {...props}>
      <motion.div className="nav-item h-full"
      onHoverStart={() => setShow(true)} onHoverEnd={() => setShow(false)}
      >
        { icon }

        <div className="relative">
          { text }
          <AnimatePresence mode="wait">
            {show && (
              <motion.div
                className="absolute -bottom-2 w-full origin-left h-[3px] bg-[#f9f9f9]"
                variants={btnVariant}
                initial="hidden"
                animate="visible"
                exit="hidden"
              ></motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </Link>
  );
}
 
export default NavBtn;