import Image from 'next/image';

import { detailedFeatures } from './ProjectFeaturesDetails.data';
import { Card } from '@/shared/ui/s';

interface Props {}

export function ProjectFeaturesDetails({}: Props) {
  return (
    <div className='grid grid-cols-3 gap-8 lg:grid-cols-2 md:grid-cols-1'>
      {detailedFeatures.map(({ title, description, image }, i) => {
        const footerContent = (
          <Image
            src={image}
            className='w-[300px] mx-auto
                lg:w-[200px]'
            alt={`Фича №${i}`}
          />
        );

        return (
          <Card key={title} title={title} footerContent={footerContent}>
            {description}
          </Card>
        );
      })}
    </div>
  );
}
