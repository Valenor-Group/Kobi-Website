import { cn } from '@/lib/utils'

type AtmosphereVariant = 'front' | 'vault' | 'lab' | 'connect'

interface SectionAtmosphereProps {
  variant: AtmosphereVariant
  className?: string
}

export function SectionAtmosphere({ variant, className }: SectionAtmosphereProps) {
  return (
    <div className={cn('pointer-events-none absolute inset-0 overflow-hidden', className)}>
      {variant === 'front' && (
        <>
          <div className="absolute top-1/2 left-1/2 h-[600px] w-[600px] animate-morph bg-white/[0.03] blur-[100px]" />
          <div className="absolute top-[20%] left-[15%] h-[300px] w-[300px] animate-drift rounded-full bg-white/[0.025] blur-[80px]" />
          <div className="absolute top-[60%] right-[20%] h-[350px] w-[350px] animate-drift-reverse rounded-full bg-white/[0.03] blur-[90px]" />
          <div className="absolute bottom-[15%] left-[40%] h-[250px] w-[250px] animate-float rounded-full bg-white/[0.02] blur-[70px]" />
          <div className="absolute top-1/2 left-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 animate-pulse-slow rounded-full bg-white/[0.015] blur-[120px]" />
        </>
      )}

      {variant === 'vault' && (
        <>
          <div className="absolute inset-0 opacity-[0.03] bg-[repeating-linear-gradient(90deg,transparent,transparent_2px,rgba(255,255,255,0.15)_2px,rgba(255,255,255,0.15)_3px)]" />
          <div className="absolute top-1/2 left-1/2 h-[700px] w-[700px] animate-morph bg-white/[0.02] blur-[120px]" />
          <div className="absolute top-[15%] right-[20%] h-[380px] w-[380px] animate-drift rounded-full bg-white/[0.025] blur-[100px]" />
          <div className="absolute bottom-[25%] left-[10%] h-[320px] w-[320px] animate-drift-reverse rounded-full bg-white/[0.02] blur-[90px]" />
        </>
      )}

      {variant === 'lab' && (
        <>
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                'linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)',
              backgroundSize: '48px 48px',
            }}
          />
          <div className="absolute top-1/2 left-1/2 h-[550px] w-[550px] animate-morph bg-white/[0.02] blur-[110px]" />
          <div className="absolute top-[30%] left-[25%] h-[280px] w-[280px] animate-float rounded-full bg-white/[0.02] blur-[80px]" />
          <div className="absolute right-[20%] bottom-[25%] h-[340px] w-[340px] animate-drift rounded-full bg-white/[0.015] blur-[95px]" />
        </>
      )}

      {variant === 'connect' && (
        <>
          <div className="absolute top-1/2 left-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.012] blur-[100px]" />
          <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black opacity-60" />
        </>
      )}
    </div>
  )
}
