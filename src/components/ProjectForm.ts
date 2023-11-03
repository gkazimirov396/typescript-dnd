import { Component } from '../models/Component';
import { Autobind } from '../utils/decorators';
import type { ProjectFormData } from '../utils/types';
import { FormSchema } from './../utils/types';
import { projectState } from './../utils/project-state';

export class ProjectForm extends Component<HTMLDivElement, HTMLFormElement> {
  titleElement: HTMLInputElement;
  descriptionElement: HTMLInputElement;
  peopleElement: HTMLInputElement;

  titleErrorEl: HTMLSpanElement;
  descriptionErrorEl: HTMLSpanElement;
  peopleErrorEl: HTMLSpanElement;

  constructor() {
    super('project-input', 'app', true, 'user-input');

    this.titleElement = this.element.querySelector<HTMLInputElement>('#title')!;
    this.descriptionElement =
      this.element.querySelector<HTMLInputElement>('#description')!;
    this.peopleElement =
      this.element.querySelector<HTMLInputElement>('#people')!;

    this.titleErrorEl =
      this.element.querySelector<HTMLSpanElement>('#titleErrorElement')!;
    this.descriptionErrorEl =
      this.element.querySelector<HTMLSpanElement>('#descErrorElement')!;
    this.peopleErrorEl = this.element.querySelector<HTMLSpanElement>(
      '#peopleErrorElement'
    )!;

    this.config();
  }

  config() {
    this.element.addEventListener('submit', this.submitHandler);
  }

  render() {}

  private getUserInput(): ProjectFormData | void {
    const enteredTitle = this.titleElement.value;
    const enteredDescription = this.descriptionElement.value;
    const enteredPeople = this.peopleElement.valueAsNumber;

    const formData = {
      title: enteredTitle,
      description: enteredDescription,
      people: enteredPeople,
    };

    const results = FormSchema.safeParse(formData);
    if (results.success) {
      return formData;
    }
    const formattedErrors = results.error.format();
    console.error(formattedErrors);
    this.titleErrorEl.textContent =
      formattedErrors.title?._errors.join(', ') || '';
    this.descriptionErrorEl.textContent =
      formattedErrors.description?._errors.join(', ') || '';
    this.peopleErrorEl.textContent =
      formattedErrors.people?._errors.join(', ') || '';
  }

  private clearInputs() {
    this.titleElement.value = '';
    this.descriptionElement.value = '';
    this.peopleElement.value = '';

    this.titleErrorEl.textContent = '';
    this.descriptionErrorEl.textContent = '';
    this.peopleErrorEl.textContent = '';
  }

  @Autobind
  private submitHandler(event: SubmitEvent) {
    event.preventDefault();
    const userInput = this.getUserInput();
    if (userInput) {
      const { description, people, title } = userInput;
      projectState.addProject(title, description, people);
      this.clearInputs();
    }
  }
}
