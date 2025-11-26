export default function Hero3DFallback() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      {/* Smooth animated gradient background */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(circle at 50% 50%, hsl(var(--primary) / 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 20%, hsl(var(--accent) / 0.12) 0%, transparent 50%), radial-gradient(circle at 20% 80%, hsl(var(--secondary) / 0.12) 0%, transparent 50%)',
          animation: 'gradientShift 20s ease-in-out infinite',
        }}
      />

      {/* CSS-only particles */}
      <div className="absolute inset-0">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full opacity-20"
            style={{
              width: `${Math.random() * 4 + 2}px`,
              height: `${Math.random() * 4 + 2}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: `hsl(var(--primary))`,
              animation: `float ${Math.random() * 10 + 10}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      <style>{`
        @keyframes gradientShift {
          0%, 100% {
            opacity: 1;
            transform: scale(1) rotate(0deg);
          }
          33% {
            opacity: 0.9;
            transform: scale(1.05) rotate(2deg);
          }
          66% {
            opacity: 0.85;
            transform: scale(1.08) rotate(-2deg);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0);
            opacity: 0.2;
          }
          33% {
            transform: translateY(-30px) translateX(15px);
            opacity: 0.3;
          }
          66% {
            transform: translateY(15px) translateX(-15px);
            opacity: 0.25;
          }
        }
      `}</style>
    </div>
  );
}
