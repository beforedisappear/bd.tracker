import image from '../../assets/growth.png';
import image3 from '../../assets/reflecting.png';
import image4 from '../../assets/looking-ahead.png';

import type { StaticImageData } from 'next/image';

interface DetailedFeature {
  title: string;
  description: string;
  image: StaticImageData;
}

export const detailedFeatures: DetailedFeature[] = [
  {
    title: 'Responsive Design',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi nesciunt est nostrum omnis ab sapiente.',
    image: image4,
  },
  {
    title: 'Intuitive user interface',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi nesciunt est nostrum omnis ab sapiente.',
    image: image3,
  },
  {
    title: 'AI-Powered insights',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi nesciunt est nostrum omnis ab sapiente.',
    image: image,
  },
];
