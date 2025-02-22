import { Component, h } from '@stencil/core';

@Component({
  tag: 'app-sidebar',
  styleUrl: 'sidebar.scss',
})
export class AppSideBar {
  render() {
    return <app-sidebar-conversations />;
  }
}
