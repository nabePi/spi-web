import { contactMapContent } from "@/content/inner/contact";

const MapSection = () => {
  return (
    <div className="map">
      <iframe
        src={contactMapContent.src}
        style={{ border: '0' }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
};

export default MapSection;
