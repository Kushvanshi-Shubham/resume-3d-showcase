import { Palette } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme, ThemePreset } from "@/contexts/ThemeContext";

const themes: { value: ThemePreset; label: string; description: string }[] = [
  { value: 'visionos', label: 'VisionOS Soft', description: 'Apple-inspired depth' },
  { value: 'minimal', label: 'Minimal', description: 'Clean & subtle' },
  { value: 'cyber-neon', label: 'Cyber Neon', description: 'Vivid & electric' },
  { value: 'dark-matte', label: 'Dark Matte', description: 'Pure monochrome' },
];

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="glass-panel hover-glow">
          <Palette className="h-5 w-5" />
          <span className="sr-only">Change theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="glass-panel w-48">
        <DropdownMenuLabel>Theme Preset</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {themes.map((t) => (
          <DropdownMenuItem
            key={t.value}
            onClick={() => setTheme(t.value)}
            className={theme === t.value ? 'bg-primary/20' : ''}
          >
            <div className="flex flex-col gap-1">
              <span className="font-medium">{t.label}</span>
              <span className="text-xs text-muted-foreground">{t.description}</span>
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
