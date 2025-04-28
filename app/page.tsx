"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  Building,
  ChevronRight,
  Coins,
  LandPlot,
  Shield,
} from "lucide-react";
import { createClient } from "@/utils/supabase/client";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";

export default function Home() {
  const router = useRouter();
  const plugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: false }));

  useEffect(() => {
    const checkAuth = async () => {
      const supabase = createClient();
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session) {
        router.replace('/dashboard');
      }
    };

    checkAuth();
  }, [router]);

  return (
    <div className='flex min-h-screen flex-col bg-gradient-to-b from-background to-background/80'>
      <header className='sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
        <div className='container flex h-16 items-center justify-between'>
          <div className='flex items-center gap-2 font-bold text-xl'>
            <Coins className='h-6 w-6 text-emerald-500' />
            <span className='bg-gradient-to-r from-emerald-500 to-teal-600 bg-clip-text text-transparent'>
              InvestHub
            </span>
          </div>
          <nav className='hidden md:flex gap-6'>
            <Link
              href='#features'
              className='text-sm font-medium hover:text-emerald-500 transition-colors'
            >
              Features
            </Link>
            <Link
              href='#investments'
              className='text-sm font-medium hover:text-emerald-500 transition-colors'
            >
              Investments
            </Link>
            <Link
              href='#how-it-works'
              className='text-sm font-medium hover:text-emerald-500 transition-colors'
            >
              How It Works
            </Link>
            <Link
              href='#testimonials'
              className='text-sm font-medium hover:text-emerald-500 transition-colors'
            >
              Testimonials
            </Link>
          </nav>
          <div className='flex items-center gap-4'>
            <Link
              href='/login'
              className='text-sm font-medium hover:text-emerald-500 transition-colors'
            >
              Login
            </Link>
            <Link href='/signup'>
              <Button className='bg-emerald-600 hover:bg-emerald-700'>
                Sign Up
              </Button>
            </Link>
          </div>
        </div>
      </header>
      <main className='flex-1'>
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-[url('/images/farm-investment.jpg?height=1080&width=1920')] bg-cover bg-center relative">
          <div className='absolute inset-0 bg-black/50'></div>
          <div className='container px-4 md:px-6 relative z-10'>
            <div className='grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]'>
              <div className='flex flex-col justify-center space-y-4'>
                <div className='space-y-2'>
                  <h1 className='text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-white'>
                    Invest in Your Future with Confidence
                  </h1>
                  <p className='max-w-[600px] text-gray-200 md:text-xl'>
                    Diversify your portfolio with farm stocks, real estate, and
                    cryptocurrency investments. Start your journey to financial
                    freedom today.
                  </p>
                </div>
                <div className='flex flex-col gap-2 min-[400px]:flex-row'>
                  <Link href='/signup'>
                    <Button
                      size='lg'
                      className='gap-1.5 bg-emerald-600 hover:bg-emerald-700'
                    >
                      Get Started
                      <ArrowRight className='h-4 w-4' />
                    </Button>
                  </Link>
                  <Link href='#how-it-works'>
                    <Button
                      size='lg'
                      variant='outline'
                      className='text-slate-500 border-white hover:bg-white/10'
                    >
                      Learn More
                    </Button>
                  </Link>
                </div>
              </div>
              <div className='flex items-center justify-center'>
                <Carousel 
                  plugins={[plugin.current]}
                  opts={{ loop: true }}>
                  <CarouselContent>
                    <CarouselItem>
                      <div className='relative h-[450px] w-full overflow-hidden rounded-xl bg-muted/20 backdrop-blur-sm border border-white/10 shadow-2xl'>
                        <img
                          src='/images/house-image.jpg?height=450&width=600'
                          alt='Investment Dashboard Preview'
                          className='object-cover w-full h-full opacity-90'
                        />
                      </div>
                    </CarouselItem>
                    <CarouselItem>
                      <div className='relative h-[450px] w-full overflow-hidden rounded-xl bg-muted/20 backdrop-blur-sm border border-white/10 shadow-2xl'>
                        <img
                          src='/images/dashboard-preview.png?height=450&width=600'
                          alt='Investment Dashboard Preview'
                          className='object-cover w-full h-full opacity-90'
                        />
                      </div>
                    </CarouselItem>
                    <CarouselItem>
                      <div className='relative h-[450px] w-full overflow-hidden rounded-xl bg-muted/20 backdrop-blur-sm border border-white/10 shadow-2xl'>
                        <img
                          src='/images/tomato.jpg?height=450&width=600'
                          alt='Investment Dashboard Preview'
                          className='object-cover w-full h-full opacity-90'
                        />
                      </div>
                    </CarouselItem>
                  </CarouselContent>
                 
                </Carousel>
              </div>
              {/* <div className='flex items-center justify-center'>
                <div className='relative h-[450px] w-full overflow-hidden rounded-xl bg-muted/20 backdrop-blur-sm border border-white/10 shadow-2xl'>
                  <Carousel
                    plugins={[plugin.current]}
                    className='w-full max-w-xs'
                    onMouseEnter={plugin.current.stop}
                    onMouseLeave={plugin.current.reset}
                  >
                    <div className='relative h-[450px] w-full overflow-hidden rounded-xl bg-muted/20 backdrop-blur-sm border border-white/10 shadow-2xl'>
                    <CarouselContent>
                      <CarouselItem>
                        <img
                          
                        />
                      </CarouselItem>
                      <CarouselItem>
                        <img
                          
                        />
                      </CarouselItem>
                      <CarouselItem>
                        <img
                          
                        />
                      </CarouselItem>
                    </CarouselContent>
                    </div>
                   
                   <CarouselPrevious />
                    <CarouselNext /> 
                  </Carousel>
                </div>
              </div> */}
            </div>
          </div>
        </section>
        <section
          id='features'
          className='w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-emerald-50 to-white dark:from-emerald-950/20 dark:to-background'
        >
          <div className='container px-4 md:px-6'>
            <div className='flex flex-col items-center justify-center space-y-4 text-center'>
              <div className='space-y-2'>
                <div className='inline-block rounded-lg bg-emerald-500 px-3 py-1 text-sm text-white'>
                  Features
                </div>
                <h2 className='text-3xl font-bold tracking-tighter md:text-4xl'>
                  Everything You Need to Invest Wisely
                </h2>
                <p className='max-w-[900px] text-muted-foreground md:text-xl'>
                  Our platform provides all the tools and resources you need to
                  make informed investment decisions.
                </p>
              </div>
            </div>
            <div className='mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3'>
              <div className='flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm transition-all hover:shadow-md hover:border-emerald-200 dark:hover:border-emerald-800'>
                <div className='rounded-full bg-emerald-100 dark:bg-emerald-900/50 p-3 text-emerald-600 dark:text-emerald-400'>
                  <Shield className='h-6 w-6' />
                </div>
                <h3 className='text-xl font-bold'>Secure Investments</h3>
                <p className='text-center text-muted-foreground'>
                  Bank-level security protocols to protect your investments and
                  personal information.
                </p>
              </div>
              <div className='flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm transition-all hover:shadow-md hover:border-emerald-200 dark:hover:border-emerald-800'>
                <div className='rounded-full bg-emerald-100 dark:bg-emerald-900/50 p-3 text-emerald-600 dark:text-emerald-400'>
                  <BarChart3 className='h-6 w-6' />
                </div>
                <h3 className='text-xl font-bold'>Portfolio Tracking</h3>
                <p className='text-center text-muted-foreground'>
                  Real-time analytics and reporting to monitor your investment
                  performance.
                </p>
              </div>
              <div className='flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm transition-all hover:shadow-md hover:border-emerald-200 dark:hover:border-emerald-800'>
                <div className='rounded-full bg-emerald-100 dark:bg-emerald-900/50 p-3 text-emerald-600 dark:text-emerald-400'>
                  <Coins className='h-6 w-6' />
                </div>
                <h3 className='text-xl font-bold'>Diverse Asset Classes</h3>
                <p className='text-center text-muted-foreground'>
                  Access to farm stocks, real estate, and cryptocurrency
                  investments in one platform.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section id='investments' className='w-full py-12 md:py-24 lg:py-32'>
          <div className='container px-4 md:px-6'>
            <div className='flex flex-col items-center justify-center space-y-4 text-center'>
              <div className='space-y-2'>
                <h2 className='text-3xl font-bold tracking-tighter md:text-4xl'>
                  Investment Opportunities
                </h2>
                <p className='max-w-[900px] text-muted-foreground md:text-xl'>
                  Explore our diverse range of investment options to build your
                  ideal portfolio.
                </p>
              </div>
            </div>
            <div className='mx-auto grid max-w-5xl grid-cols-1 gap-8 py-12 md:grid-cols-3'>
              <div className='group relative overflow-hidden rounded-xl border shadow-sm transition-all hover:shadow-lg'>
                <div className='absolute inset-0 z-10 bg-gradient-to-b from-transparent to-black/80'></div>
                <img
                  src='/images/tomato.jpg?height=400&width=300'
                  alt='Farm Stock Investment'
                  className='h-[300px] w-full object-cover transition-transform group-hover:scale-105'
                />
                <div className='absolute bottom-0 z-20 p-6 text-white'>
                  <div className='flex items-center gap-2 mb-2'>
                    <div className='rounded-full bg-emerald-500 p-1.5'>
                      <LandPlot className='h-4 w-4' />
                    </div>
                    <h3 className='text-xl font-bold'>Farm Stocks</h3>
                  </div>
                  <p className='mb-4 text-sm text-gray-200'>
                    Invest in agricultural businesses and farm operations with
                    high growth potential.
                  </p>
                  <Link href='/investments/farm-stocks'>
                    <Button
                      variant='secondary'
                      size='sm'
                      className='gap-1 bg-white/20 hover:bg-white/30 backdrop-blur-sm'
                    >
                      Explore
                      <ChevronRight className='h-4 w-4' />
                    </Button>
                  </Link>
                </div>
              </div>
              <div className='group relative overflow-hidden rounded-xl border shadow-sm transition-all hover:shadow-lg'>
                <div className='absolute inset-0 z-10 bg-gradient-to-b from-transparent to-black/80'></div>
                <img
                  src='/images/house-image2.jpg?height=400&width=300'
                  alt='Real Estate Investment'
                  className='h-[300px] w-full object-cover transition-transform group-hover:scale-105'
                />
                <div className='absolute bottom-0 z-20 p-6 text-white'>
                  <div className='flex items-center gap-2 mb-2'>
                    <div className='rounded-full bg-blue-500 p-1.5'>
                      <Building className='h-4 w-4' />
                    </div>
                    <h3 className='text-xl font-bold'>Real Estate</h3>
                  </div>
                  <p className='mb-4 text-sm text-gray-200'>
                    Access premium real estate opportunities with fractional
                    ownership and regular returns.
                  </p>
                  <Link href='/investments/real-estate'>
                    <Button
                      variant='secondary'
                      size='sm'
                      className='gap-1 bg-white/20 hover:bg-white/30 backdrop-blur-sm'
                    >
                      Explore
                      <ChevronRight className='h-4 w-4' />
                    </Button>
                  </Link>
                </div>
              </div>
              <div className='group relative overflow-hidden rounded-xl border shadow-sm transition-all hover:shadow-lg'>
                <div className='absolute inset-0 z-10 bg-gradient-to-b from-transparent to-black/80'></div>
                <img
                  src='/images/dashboard-preview.png?height=400&width=300'
                  alt='Cryptocurrency Investment'
                  className='h-[300px] w-full object-cover transition-transform group-hover:scale-105'
                />
                <div className='absolute bottom-0 z-20 p-6 text-white'>
                  <div className='flex items-center gap-2 mb-2'>
                    <div className='rounded-full bg-purple-500 p-1.5'>
                      <Coins className='h-4 w-4' />
                    </div>
                    <h3 className='text-xl font-bold'>Cryptocurrency</h3>
                  </div>
                  <p className='mb-4 text-sm text-gray-200'>
                    Invest in a curated selection of cryptocurrencies with our
                    expert guidance.
                  </p>
                  <Link href='/investments/crypto'>
                    <Button
                      variant='secondary'
                      size='sm'
                      className='gap-1 bg-white/20 hover:bg-white/30 backdrop-blur-sm'
                    >
                      Explore
                      <ChevronRight className='h-4 w-4' />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section
          id='how-it-works'
          className='w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-emerald-50 to-white dark:from-emerald-950/20 dark:to-background'
        >
          <div className='container px-4 md:px-6'>
            <div className='flex flex-col items-center justify-center space-y-4 text-center'>
              <div className='space-y-2'>
                <h2 className='text-3xl font-bold tracking-tighter md:text-4xl'>
                  How It Works
                </h2>
                <p className='max-w-[900px] text-muted-foreground md:text-xl'>
                  Start your investment journey in just a few simple steps.
                </p>
              </div>
            </div>
            <div className='mx-auto grid max-w-5xl grid-cols-1 gap-8 py-12 md:grid-cols-3'>
              <div className='flex flex-col items-center space-y-2 rounded-lg border bg-background p-6 shadow-sm relative'>
                <div className='absolute -top-4 -left-4 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500 text-xl font-bold text-white shadow-lg'>
                  1
                </div>
                <h3 className='text-xl font-bold'>Create an Account</h3>
                <p className='text-center text-muted-foreground'>
                  Sign up and complete your profile to get started on your
                  investment journey.
                </p>
              </div>
              <div className='flex flex-col items-center space-y-2 rounded-lg border bg-background p-6 shadow-sm relative'>
                <div className='absolute -top-4 -left-4 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500 text-xl font-bold text-white shadow-lg'>
                  2
                </div>
                <h3 className='text-xl font-bold'>Fund Your Wallet</h3>
                <p className='text-center text-muted-foreground'>
                  Add funds to your wallet using our secure payment methods.
                </p>
              </div>
              <div className='flex flex-col items-center space-y-2 rounded-lg border bg-background p-6 shadow-sm relative'>
                <div className='absolute -top-4 -left-4 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500 text-xl font-bold text-white shadow-lg'>
                  3
                </div>
                <h3 className='text-xl font-bold'>Start Investing</h3>
                <p className='text-center text-muted-foreground'>
                  Browse available investments and build your diversified
                  portfolio.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section id='testimonials' className='w-full py-12 md:py-24 lg:py-32'>
          <div className='container px-4 md:px-6'>
            <div className='flex flex-col items-center justify-center space-y-4 text-center'>
              <div className='space-y-2'>
                <h2 className='text-3xl font-bold tracking-tighter md:text-4xl'>
                  What Our Investors Say
                </h2>
                <p className='max-w-[900px] text-muted-foreground md:text-xl'>
                  Hear from our community of successful investors.
                </p>
              </div>
            </div>
            <div className='mx-auto grid max-w-5xl grid-cols-1 gap-8 py-12 md:grid-cols-2 lg:grid-cols-3'>
              <div className='flex flex-col justify-between rounded-lg border p-6 shadow-sm bg-white dark:bg-background'>
                <div className='space-y-4'>
                  <div className='flex gap-1'>
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        xmlns='http://www.w3.org/2000/svg'
                        width='24'
                        height='24'
                        viewBox='0 0 24 24'
                        fill='none'
                        stroke='currentColor'
                        strokeWidth='2'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        className='h-5 w-5 text-yellow-500'
                      >
                        <polygon points='12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2' />
                      </svg>
                    ))}
                  </div>
                  <p className='text-muted-foreground'>
                    "InvestHub has transformed my investment strategy. The
                    platform is intuitive, and I've seen consistent returns on
                    my farm stock investments."
                  </p>
                </div>
                <div className='flex items-center gap-4 pt-4'>
                  <div className='rounded-full bg-emerald-100 h-10 w-10 flex items-center justify-center'>
                    <span className='text-emerald-700 font-semibold'>SJ</span>
                  </div>
                  <div>
                    <p className='text-sm font-medium'>Sarah Johnson</p>
                    <p className='text-xs text-muted-foreground'>
                      Farm Stock Investor
                    </p>
                  </div>
                </div>
              </div>
              <div className='flex flex-col justify-between rounded-lg border p-6 shadow-sm bg-white dark:bg-background'>
                <div className='space-y-4'>
                  <div className='flex gap-1'>
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        xmlns='http://www.w3.org/2000/svg'
                        width='24'
                        height='24'
                        viewBox='0 0 24 24'
                        fill='none'
                        stroke='currentColor'
                        strokeWidth='2'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        className='h-5 w-5 text-yellow-500'
                      >
                        <polygon points='12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2' />
                      </svg>
                    ))}
                  </div>
                  <p className='text-muted-foreground'>
                    "The real estate opportunities on InvestHub have allowed me
                    to diversify my portfolio without the hassle of traditional
                    property management."
                  </p>
                </div>
                <div className='flex items-center gap-4 pt-4'>
                  <div className='rounded-full bg-blue-100 h-10 w-10 flex items-center justify-center'>
                    <span className='text-blue-700 font-semibold'>MC</span>
                  </div>
                  <div>
                    <p className='text-sm font-medium'>Michael Chen</p>
                    <p className='text-xs text-muted-foreground'>
                      Real Estate Investor
                    </p>
                  </div>
                </div>
              </div>
              <div className='flex flex-col justify-between rounded-lg border p-6 shadow-sm bg-white dark:bg-background'>
                <div className='space-y-4'>
                  <div className='flex gap-1'>
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        xmlns='http://www.w3.org/2000/svg'
                        width='24'
                        height='24'
                        viewBox='0 0 24 24'
                        fill='none'
                        stroke='currentColor'
                        strokeWidth='2'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        className='h-5 w-5 text-yellow-500'
                      >
                        <polygon points='12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2' />
                      </svg>
                    ))}
                  </div>
                  <p className='text-muted-foreground'>
                    "As a newcomer to cryptocurrency, InvestHub's guidance and
                    security features gave me the confidence to start investing
                    in digital assets."
                  </p>
                </div>
                <div className='flex items-center gap-4 pt-4'>
                  <div className='rounded-full bg-purple-100 h-10 w-10 flex items-center justify-center'>
                    <span className='text-purple-700 font-semibold'>JW</span>
                  </div>
                  <div>
                    <p className='text-sm font-medium'>Jessica Williams</p>
                    <p className='text-xs text-muted-foreground'>
                      Crypto Investor
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className='w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-emerald-50 to-white dark:from-emerald-950/20 dark:to-background'>
          <div className='container px-4 md:px-6'>
            <div className='flex flex-col items-center justify-center space-y-4 text-center'>
              <div className='space-y-2'>
                <h2 className='text-3xl font-bold tracking-tighter md:text-4xl'>
                  Ready to Start Investing?
                </h2>
                <p className='max-w-[900px] text-muted-foreground md:text-xl'>
                  Join thousands of investors who are building their financial
                  future with InvestHub.
                </p>
              </div>
              <div className='flex flex-col gap-2 min-[400px]:flex-row'>
                <Link href='/signup'>
                  <Button
                    size='lg'
                    className='gap-1.5 bg-emerald-600 hover:bg-emerald-700'
                  >
                    Create Account
                    <ArrowRight className='h-4 w-4' />
                  </Button>
                </Link>
                <Link href='/contact'>
                  <Button
                    size='lg'
                    variant='outline'
                    className='border-emerald-600 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/20'
                  >
                    Contact Us
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className='w-full border-t py-6 md:py-0 bg-gradient-to-b from-white to-emerald-50 dark:from-background dark:to-emerald-950/10'>
        <div className='container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row'>
          <div className='flex items-center gap-2 font-bold'>
            <Coins className='h-6 w-6 text-emerald-500' />
            <span className='bg-gradient-to-r from-emerald-500 to-teal-600 bg-clip-text text-transparent'>
              InvestHub
            </span>
          </div>
          <p className='text-center text-sm leading-loose text-muted-foreground md:text-left'>
            © {new Date().getFullYear()} InvestHub. All rights reserved.
          </p>
          <div className='flex gap-4'>
            <Link
              href='/terms'
              className='text-sm text-muted-foreground hover:text-emerald-500 transition-colors'
            >
              Terms
            </Link>
            <Link
              href='/privacy'
              className='text-sm text-muted-foreground hover:text-emerald-500 transition-colors'
            >
              Privacy
            </Link>
            <Link
              href='/contact'
              className='text-sm text-muted-foreground hover:text-emerald-500 transition-colors'
            >
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
