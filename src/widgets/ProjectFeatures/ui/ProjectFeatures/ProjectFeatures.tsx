import { ProjectFeaturesFeatureList } from '../ProjectFeaturesList/ProjectFeaturesList';
import { ProjectFeaturesDetails } from '../ProjectFeaturesDetails/ProjectFeaturesDetails';

interface Props {}

export function ProjectFeatures({}: Props) {
  return (
    <section
      id='features'
      className='container py-32 space-y-8
      xl:py-16
      lg:py-8'
    >
      <h2
        className='text-4xl font-bold text-center
        lg:text-3xl'
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
