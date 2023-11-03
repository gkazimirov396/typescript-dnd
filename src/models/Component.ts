export abstract class Component<T extends HTMLElement, U extends HTMLElement> {
  templateElement: HTMLTemplateElement;
  hostElement: T;
  element: U;

  constructor(
    templateId: string,
    hostId: string,
    insertAtStart: boolean,
    newElemId?: string
  ) {
    this.templateElement = document.getElementById(
      templateId
    ) as HTMLTemplateElement;
    this.hostElement = document.getElementById(hostId) as T;

    const templateContent = document.importNode(
      this.templateElement.content,
      true
    );
    this.element = templateContent.firstElementChild as U;
    this.element.id = newElemId ?? '';

    this.attach(insertAtStart);
  }

  private attach(insertAtBeginnig: boolean) {
    this.hostElement.insertAdjacentElement(
      insertAtBeginnig ? 'afterbegin' : 'beforeend',
      this.element
    );
  }

  abstract config(): void;

  abstract render(): void;
}
