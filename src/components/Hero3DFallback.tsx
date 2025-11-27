export default function Hero3DFallback() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/10" />
      
      {/* Large glass bubble effect (CSS only) - very prominent */}
      <div 
        className="absolute rounded-full"
        style={{
          width: '600px',
          height: '600px',
          right: '5%',
          top: '50%',
          transform: 'translateY(-50%)',
          background: 'radial-gradient(circle at 30% 30%, rgba(14, 165, 233, 0.4) 0%, rgba(14, 165, 233, 0.2) 30%, rgba(6, 182, 212, 0.1) 60%, transparent 100%)',
          filter: 'blur(40px)',
          animation: 'pulse 6s ease-in-out infinite',
        }}
      />
      
      {/* Inner glow */}
      <div 
        className="absolute rounded-full"
        style={{
          width: '400px',
          height: '400px',
          right: '10%',
          top: '50%',
          transform: 'translateY(-50%)',
          background: 'radial-gradient(circle, rgba(56, 189, 248, 0.6) 0%, rgba(14, 165, 233, 0.3) 40%, transparent 70%)',
          filter: 'blur(20px)',
          animation: 'pulse 8s ease-in-out infinite reverse',
        }}
      />
      
      {/* Animated gradient overlay */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(circle at 70% 50%, hsl(var(--primary) / 0.15) 0%, transparent 40%), radial-gradient(circle at 30% 30%, hsl(var(--accent) / 0.1) 0%, transparent 50%)',
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
