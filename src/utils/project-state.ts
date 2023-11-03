import { Project, ProjectStatus, type ProjectStatusType } from "../models/Project";
import type { Listener } from "./types";

class ProjectState {
  private listeners: Listener[] = [];
  private projects: Project[] = [];
  private static instance: ProjectState;

  private constructor() {}

  static getInstance() {
    if (this.instance) {
      return this.instance;
    }
    this.instance = new ProjectState();
    return this.instance;
  }

  public addProject(title: string, description: string, people: number) {
    const newProject = new Project(
      title,
      description,
      people,
      ProjectStatus.Enum.Active
    );
    this.projects.push(newProject);
    this.updateListeners();
  }

  public addListener(listenerFn: Listener) {
    this.listeners.push(listenerFn);
  }

  public moveProject(id: string, newStatus: ProjectStatusType) {
    const project = this.projects.find(p => p.id === id);

    if (project && project.status !== newStatus) {
      project.status = newStatus;
      this.updateListeners();
    }
  }

  private updateListeners() {
    for (let listenerFn of this.listeners) {
      listenerFn([...this.projects]);
    }
  }
}

export const projectState = ProjectState.getInstance();