import ColorBends from "./ColorBends";



export default function Background({ children }) {
  return (
    <div className="relative min-h-screen overflow-hidden">
      
      {/* Background */}
      <div className="absolute inset-0 -z-10">
  
        <ColorBends
        style={{ backgroundColor: '#090c15' }}
        colors={["#3b82f6", "#8b5cf6", "#ec4899"]}  
        rotation={1}
        speed={0.35}
        scale={1}
        frequency={1}
        warpStrength={1}
        mouseInfluence={1}
        parallax={0.5}
        noise={0.1}
        transparent
        autoRotate={0}
        color="#cd1818"
        />
        <div className="absolute inset-0 bg-black/60" /> {/* Adjust opacity: 40, 50, 60, 70 */}
      </div>

      {/* Foreground content */}
      <div className="relative z-10 text-red-500">
        {children}
      </div>
    </div>
  );
}
