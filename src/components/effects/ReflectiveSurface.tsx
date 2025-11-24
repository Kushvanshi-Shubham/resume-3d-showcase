import { ReactNode } from 'react';

interface ReflectiveSurfaceProps {
  metalness?: number;
  roughness?: number;
  children: ReactNode;
}

export default function ReflectiveSurface({
  metalness = 0.9,
  roughness = 0.1,
  children,
}: ReflectiveSurfaceProps) {
  // For now, this is a wrapper that can be extended later with custom shaders
  // The metalness and roughness are applied directly to the MeshDistortMaterial
  return <>{children}</>;
}
