import { Component, h, Prop } from '@stencil/core';

@Component({
    tag: 'app-top-bar',
    styleUrl: 'app-top-bar.scss',
})
export class AppTopBar {
    @Prop()
    public title: string;

    render() {
        return <h1>{this.title}</h1>
    }
}