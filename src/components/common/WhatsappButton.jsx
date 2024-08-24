import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";

const WhatsappButton = ({ phoneNumber }) => {
  const handleWhatsAppClick = () => {
    const url = `https://wa.me/${phoneNumber}`;
    window.open(url, "_blank");
  };

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    window.addEventListener("scroll", scroll);
  }, []);

  const [scrolled, setScrolled] = useState(false);

  const scroll = () => {
    const scrollY = window.scrollY;
    if (scrollY > 250) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  return (
    <div>
      {scrolled && (
        <button
          onClick={handleWhatsAppClick}
          className="bg-active-green  text-light w-12 h-12 rounded-full  fixed bottom-5 left-6 flex justify-center items-center z-[99]"
          aria-label="bottom to top "
        >
          <FaWhatsapp />
        </button>
      )}
    </div>
  );
};

WhatsappButton.propTypes = {
  phoneNumber: PropTypes.string.isRequired,
};

export default WhatsappButton;
