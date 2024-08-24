import { useFullscreen } from "@mantine/hooks";
import PropTypes from "prop-types";

const ZoomableImage = ({ srcImage }) => {
  const { toggle, fullscreen } = useFullscreen();
  function onZoom(e) {
    const x = e.nativeEvent.offsetX;
    const y = e.nativeEvent.offsetY;

    const scaleX = e.target.offsetWidth;
    const scaleY = e.target.offsetHeight;

    // Limit the scale to the maximum allowed (2.5)
    const scale = Math.min(2.5, Math.min(scaleX, scaleY));

    // Apply the transform
    e.target.style.transformOrigin = `${x}px ${y}px`;
    e.target.style.transform = `scale(${scale})`;
  }

  function offZoom(e) {
    e.target.style.transformOrigin = `center center`;
    e.target.style.transform = "scale(1)";
  }

  return (
    <div
      id="slider-container"
      className=" md:p-5 xl:sticky xl:top-10 sm:p-10 overflow-hidden "
    >
      <img
        src={srcImage}
        alt="Image Alt"
        className="transform relative cursor-pointer  origin-center object-cover  rounded-sm  object-top  sm:h-[400px] h-[300px] w-full"
        onMouseMove={onZoom}
        onMouseOver={onZoom}
        onMouseLeave={offZoom}
      />
    </div>
  );
};

ZoomableImage.propTypes = {
  srcImage: PropTypes.string.isRequired,
};

export default ZoomableImage;
