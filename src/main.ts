import { bootstrapApplication } from '@angular/platform-browser';
    import { TableRowEditDemo } from './app/table-row-edit-demo';
    import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

    bootstrapApplication(TableRowEditDemo, {
    providers: [provideAnimationsAsync()],
    }).catch((err) => console.error(err));