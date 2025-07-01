import { AboutProject } from '../../AboutProject';
import { NewsLetter } from '../../NewsLetter';
import { ProjectFaq } from '../../ProjectFaq';
import { ProjectFeatures } from '../../ProjectFeatures';
import { ProjectHero } from '../../ProjectHero';
import { ProjectTestimonials } from '../../ProjectTestimonials';

export async function MainPage() {
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
