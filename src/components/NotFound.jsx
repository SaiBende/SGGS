import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Compass, Link2 } from 'lucide-react';
import { BackgroundBeams } from './ui/background-beams';
import { GridPattern } from './ui/grid-pattern';
import { Spotlight } from './ui/spotlight';
import { Badge } from './ui/badge';
import { buttonVariants } from './ui/button';

function NotFound() {
  return (
    <section className="container-wide py-6 sm:py-8">
      <div className="noise relative overflow-hidden rounded-[2rem] border border-white/10 bg-ink px-5 py-16 text-center sm:rounded-[2.75rem] sm:px-10 sm:py-24">
        <GridPattern stroke="rgba(255,255,255,0.06)" size={56} />
        <BackgroundBeams className="opacity-45" />
        <Spotlight className="-left-32 -top-40" fill="rgba(109,94,246,0.5)" />

        <div className="relative z-10 mx-auto max-w-2xl">
          <Badge variant="dark-outline" className="gap-1.5">
            <Compass className="h-3 w-3" /> 404 · off the map
          </Badge>
          <p className="mt-8 font-display text-[6rem] font-semibold leading-none tracking-[-0.09em] text-white/10 sm:text-[9rem]">
            404
          </p>
          <h1 className="-mt-5 font-display text-3xl font-semibold leading-[1.05] tracking-[-0.055em] text-white sm:text-5xl">
            This page doesn&apos;t exist.
          </h1>
          <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-white/45">
            The link may be broken, or the page may have moved. Either way, there
            are better places to be.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              to="/"
              className={buttonVariants({ variant: 'white', size: 'lg', className: 'w-full sm:w-auto' })}
            >
              <ArrowLeft className="h-4 w-4" /> Back home
            </Link>
            <Link
              to="/services"
              className={buttonVariants({
                variant: 'dark-outline',
                size: 'lg',
                className: 'w-full text-white sm:w-auto',
              })}
            >
              Explore tools <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4 border-t border-white/10 pt-6 text-[11px] text-white/30">
            {[
              { to: '/shortenlink', label: 'Shorten a link', icon: Link2 },
              { to: '/qrgenerate', label: 'QR studio', icon: Compass },
              { to: '/pricing', label: 'Plans', icon: ArrowRight },
            ].map((item) => (
              <Link key={item.to} to={item.to} className="inline-flex items-center gap-1.5 transition hover:text-white">
                <item.icon className="h-3.5 w-3.5" /> {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default NotFound;
