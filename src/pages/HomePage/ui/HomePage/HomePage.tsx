import { AboutProject } from '@/widgets/AboutProject';
// import { ProjectFeatures } from '@/widgets/ProjectFeatures';
import { ProjectHero } from '@/widgets/ProjectHero';

export async function HomePage() {
  return (
    <>
      <ProjectHero />
      <AboutProject />
      {/* <ProjectFeatures /> */}
    </>
  );
}
