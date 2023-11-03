import { z } from 'zod';

export const ProjectStatus = z.enum(['Active', 'Finished']);
export type ProjectStatusType = z.infer<typeof ProjectStatus>;

export class Project {
  id: string;

  constructor(
    public title: string,
    public description: string,
    public people: number,
    public status: ProjectStatusType,
  ) {
    this.id = crypto.randomUUID();
  }
}
