import { Component } from '../models/Component';
import type { DragTarget } from '../models/Drag-Drop';
import { type Project, ProjectStatus } from '../models/Project';
import { Autobind } from '../utils/decorators';
import { projectState } from '../utils/project-state';
import { ProjectItem } from './ProjectItem';

export class ProjectList
  extends Component<HTMLDivElement, HTMLElement>
  implements DragTarget
{
  assignedProjects: Project[] = [];

  constructor(private type: 'active' | 'finished') {
    super('project-list', 'app', false, `${type}-projects`);

    this.filterProjects();

    this.config();
  }

  @Autobind
  dragOverHandler(event: DragEvent) {
    if (event.dataTransfer?.types[0] === 'text/plain') {
      event.preventDefault();
      const listEl = this.element.querySelector('ul')!;
      listEl.classList.add('droppable');
    }
  }

  @Autobind
  dragLeaveHandler(_: DragEvent) {
    const listEl = this.element.querySelector('ul')!;
    listEl.classList.remove('droppable');
  }

  @Autobind
  dropHandler(event: DragEvent) {
    const projectId = event.dataTransfer!.getData('text/plain');
    projectState.moveProject(
      projectId,
      this.type === 'active'
        ? ProjectStatus.Enum.Active
        : ProjectStatus.Enum.Finished,
    );
  }

  render() {
    const listEl = document.getElementById(`${this.type}-projects-list`)!;
    listEl.innerHTML = '';
    for (const project of this.assignedProjects) {
      new ProjectItem(this.element.querySelector('ul')!.id, project);
    }
  }

  config() {
    const listId = `${this.type}-projects-list`;
    this.element.querySelector('ul')!.id = listId;
    this.element.querySelector('h2')!.textContent =
      this.type.toUpperCase() + 'PROJECTS';

    this.element.addEventListener('dragover', this.dragOverHandler);
    this.element.addEventListener('dragleave', this.dragLeaveHandler);
    this.element.addEventListener('drop', this.dropHandler);
  }

  private filterProjects() {
    projectState.addListener((projects: Project[]) => {
      const filteredProjects = projects.filter(project => {
        if (this.type === 'active') {
          return project.status === ProjectStatus.Enum.Active;
        }
        return project.status === ProjectStatus.Enum.Finished;
      });
      this.assignedProjects = filteredProjects;
      this.render();
    });
  }
}
