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
  public userResponse: EventEmitter<string>;

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

    this.userResponse.emit(text);
  };
}
