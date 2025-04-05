import { AboutProject } from '@/widgets/AboutProject';
import { NewsLetter } from '@/widgets/NewsLetter';
import { ProjectFaq } from '@/widgets/ProjectFaq';
import { ProjectFeatures } from '@/widgets/ProjectFeatures';
import { ProjectHero } from '@/widgets/ProjectHero';
import { ProjectTestimonials } from '@/widgets/ProjectTestimonials';

export async function PublicHomePage() {
  return (
    <>
      <ProjectHero />
      <ProjectFeatures />
      <AboutProject />
      <NewsLetter />
      <ProjectTestimonials />
      <ProjectFaq />
    </>
  );
}
