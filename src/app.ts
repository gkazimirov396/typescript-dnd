import { ProjectForm } from './components/ProjectForm';
import { ProjectList } from './components/ProjectList';

class App {
  static init() {
    new ProjectForm();
    new ProjectList('active');
    new ProjectList('finished');
  }
}

App.init();
