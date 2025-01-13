import { Component, h } from '@stencil/core';

@Component({
  tag: 'app-input-field',
  styleUrl: 'input-field.scss',
})
export class AppInputField {
  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <label htmlFor="text">First name:</label>
          <input type="text" id="text" name="text" />
          <br />
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }

  private onSubmit = async (event: SubmitEvent): Promise<void> => {
    event.preventDefault();
    event.stopPropagation();

    const targetEl: HTMLFormElement = event.target as HTMLFormElement;
    const inputEl: HTMLInputElement = targetEl.querySelector('#text');
    const text: string = inputEl.value;
    inputEl.value = '';

    await this.makeRequest(text);
  };

  private async makeRequest(text: string): Promise<string | void> {
    const url = `http://127.0.0.1:5000/process-input?text=${text}`;

    return fetch(url)
      .then((response: Response) => {
        if (!response.ok) {
          throw new Error(`Response not OK: returned status code ${response.status}`);
        }
        return response.json();
      })
      .catch(error => {
        console.error(error);
      });
  }
}
