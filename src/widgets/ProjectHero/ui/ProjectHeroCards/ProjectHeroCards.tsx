import { ProjectHeroCardTestimonial } from '../ProjectHeroCardTestimonial/ProjectHeroCardTestimonial';
import { ProjectHeroTeam } from '../ProjectHeroTeam/ProjectHeroTeam';
import { ProjectHeroPricing } from '../ProjectHeroPricing/ProjectHeroPricing';
import { ProjectHeroService } from '../ProjectHeroService/ProjectHeroService';

export const ProjectHeroCards = () => {
  return (
    <div
      className='flex flex-row flex-wrap gap-8 relative w-[700px] h-[500px] z-10
      md:w-full md:h-auto'
    >
      <ProjectHeroCardTestimonial />

      <ProjectHeroTeam />

      <ProjectHeroPricing />

      <ProjectHeroService />
    </div>
  );
};
