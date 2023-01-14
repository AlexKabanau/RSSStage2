import Component from '../../core/templates/components';

class Form extends Component {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(tagName: string, className: string) {
    super(tagName, className);
  }

  createForm() {
    const form = document.createElement('form');
    form.className = 'cars-form';

    const fieldset = document.createElement('fieldset');
    fieldset.innerHTML = `<legend>Cars</legend>
    <input type="text" name="name" class="car-name">
    <input type="color" name="color" class="car-color" value="#ffffff">
    <button type="button" class="button">Create</button><br /><br />
    <input type="text" name="name" class="name-change" disabled>
    <input type="color" name="color" class="color-change" value="#ffffff" disabled>
    <button type="button" class="button" disabled>Update</button><br /><br />`;

    form.append(fieldset);
    this.container.append(form);

    const buttonContainer = document.createElement('div');
    buttonContainer.className = 'button-container';
    buttonContainer.innerHTML = `<button type="button" class="button button-race">Race</button>
    <button type="button" class="button button-reset">Reset</button>
    <button type="button" class="button button-generate">Generate Cars</button>`;
    this.container.append(buttonContainer);
  }

  render() {
    this.createForm();
    return this.container;
  }
}
export default Form;
