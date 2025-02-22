import { Component, Event, EventEmitter, h } from '@stencil/core';

@Component({
  tag: 'app-input-field',
  styleUrl: 'input-field.scss',
})
export class AppInputField {
  /**
   * Emitted when a response to the query is received from the server
   */
  @Event()
  public response: EventEmitter<string>;

  render() {
    return (
      <div id="input-field">
        <form onSubmit={this.onSubmit}>
          <input type="text" id="text" name="text" autocomplete="off" />
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

    const response: string | void = await this.makeRequest(text);

    if (!response) {
      return;
    }

    this.response.emit(response);
  };

  private async makeRequest(text: string): Promise<string | void> {
    const url = `http://127.0.0.1:8000/process-input?text=${text}`;

    return fetch(url, {
      credentials: 'include',
    })
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
