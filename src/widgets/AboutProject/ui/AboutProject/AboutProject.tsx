import img from '../../assets/pilot.png';

import Image from 'next/image';
import { AboiutProjectStatistics } from '../AboutProjectStatistics/AboutProjectStatistics';

interface Props {}

export function AboutProject({}: Props) {
  return (
    <section
      id='about'
      className='container py-20 space-y-4      
      xl:py-16
      lg:py-10'
    >
      <div
        className='bg-muted/50 border rounded-lg py-12
        md:py-8'
      >
        <div
          className='px-6 flex flex-row gap-12 
          md:flex-col-reverse md:gap-8'
        >
          <Image
            src={img}
            alt='some'
            className='w-[300px] object-contain rounded-lg 
            md:mx-auto'
          />
          <div className='bg-green-0 flex flex-col justify-between space-y-4'>
            <div className='space-y-4'>
              <h2
                className='text-3xl font-bold
                md:text-2xl'
              >
                <span className='bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text'>
                  About{' '}
                </span>
                Company
              </h2>
              <p
                className='text-base text-muted-foreground
                sm:text-base'
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit
                amet, consectetur adipiscing elit.
              </p>
            </div>

            <AboiutProjectStatistics />
          </div>
        </div>
      </div>
    </section>
  );
}
