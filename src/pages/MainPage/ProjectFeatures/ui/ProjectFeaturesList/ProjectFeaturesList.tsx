import { Badge } from '@/shared/ui/s';
import { featureList } from './ProjectFeaturesList.data';

interface Props {}

export function ProjectFeaturesFeatureList({}: Props) {
  return (
    <div
      className='flex flex-wrap justify-center gap-4
          md:justify-start'
    >
      {featureList.map((feature: string) => (
        <div key={feature}>
          <Badge variant='secondary' className='text-sm'>
            {feature}
          </Badge>
        </div>
      ))}
    </div>
  );
}
