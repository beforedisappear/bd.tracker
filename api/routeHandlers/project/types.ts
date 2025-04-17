import { z } from 'zod';
import { CreateProjectReqBodySchema } from './dto';

export type CreateProjectReqDto = z.infer<typeof CreateProjectReqBodySchema>;
