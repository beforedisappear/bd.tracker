import './ProjectHero.css';

import { ProjectHeroCards } from '../ProjectHeroCards/ProjectHeroCards';
import { ProjectHeroMain } from '../ProjectHeroMain/ProjectHeroMain';

interface Props {}

export function ProjectHero({}: Props) {
  return (
    <section
      className='container grid grid-cols-2 place-items-center pt-32 pb-32 gap-10
      xl:gap-20 xl:grid-cols-1 xl:pb-16
      md:gap-8 md:pt-20 md:pb-8'
    >
      <ProjectHeroMain />

      <ProjectHeroCards />

      {/* Shadow effect */}
      <div className='shadow_circle'></div>
    </section>
  );
}
