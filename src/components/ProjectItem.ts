import { Component } from '../models/Component';
import type { Draggable } from '../models/Drag-Drop';
import type { Project } from '../models/Project';
import { Autobind } from '../utils/decorators';

export class ProjectItem
  extends Component<HTMLUListElement, HTMLLIElement>
  implements Draggable
{
  private project: Project;

  private get people() {
    return this.project.people === 1
      ? '1 person'
      : `${this.project.people} people`;
  }

  constructor(hostId: string, project: Project) {
    super('single-project', hostId, true, project.id);
    this.project = project;

    this.config();
    this.render();
  }

  @Autobind
  dragStartHandler(event: DragEvent) {
    event.dataTransfer?.setData('text/plain', this.project.id);
    event.dataTransfer!.effectAllowed = 'move';
  }

  dragEndHandler(_: DragEvent) {}

  config() {
    this.element.addEventListener('dragstart', this.dragStartHandler);
    this.element.addEventListener('dragend', this.dragEndHandler);
  }

  render() {
    this.element.querySelector('h2')!.textContent = this.project.title;
    this.element.querySelector('h3')!.textContent = this.people + ' assigned.';
    this.element.querySelector('p')!.textContent = this.project.description;
  }
}
