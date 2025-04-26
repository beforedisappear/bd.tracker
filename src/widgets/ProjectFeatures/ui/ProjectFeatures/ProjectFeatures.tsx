import { ProjectFeaturesFeatureList } from '../ProjectFeaturesList/ProjectFeaturesList';
import { ProjectFeaturesDetails } from '../ProjectFeaturesDetails/ProjectFeaturesDetails';

interface Props {}

export function ProjectFeatures({}: Props) {
  return (
    <section
      id='features'
      className='container py-20 space-y-8 scroll-m-6
      xl:py-16
      lg:py-10'
    >
      <h2
        className='text-3xl font-bold text-center
        md:text-2xl'
      >
        Many{' '}
        <span className='bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text'>
          Great Features
        </span>
      </h2>

      <ProjectFeaturesFeatureList />

      <ProjectFeaturesDetails />
    </section>
  );
}
