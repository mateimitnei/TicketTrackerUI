# Angular Exercises

## Context and General Rules

These exercises are designed for beginners learning Angular and focusing strictly on testing framework concepts. All data used (tickets, statuses, priorities, audit history) is mocked—written directly in code within variables or services returning mock data without making real HTTP requests to a server. 
The theme chosen is a **Ticket Management System** (matching the .NET API project: tickets with a title, description, status, priority, creation date, and modification history).

Work is conducted on a single Angular project created at the beginning, named `ticket-tracker-ui`. Each exercise adds new functionality on top of previous work. Completing exercises sequentially is essential, as subsequent tasks build upon concepts introduced earlier.

Before starting each exercise, review and understand the specified theoretical topics to ensure conceptual clarity before writing code.

---

## Exercises

### 1. Components, Interpolation, and Property Binding

* **Theory to review:** CLI project structure, Angular components (`.ts`, `.html`, `.css`/`.scss`, `@Component` decorator with `selector`, `templateUrl`, `styleUrl`), double curly brace interpolation `{{ }}`, and property binding with square brackets `[]`.
* **Task:**
  1. Create the `ticket-tracker-ui` project using Angular CLI.
  2. Create a component named `ticket-card`.
  3. In the TypeScript class, declare hardcoded properties for a single mock ticket: `id`, `ticketKey` (string), `title`, `description`, `createdAt` (`Date`), `statusId` (number), and `priorityId` (number).
  4. In the HTML template, display these properties using interpolation for `title`, `ticketKey`, and `description`.
  5. Use property binding to bind the native HTML `title` attribute (tooltip) of an element to the ticket's `description`, so hovering over the card title shows the full description.
  6. Render `ticket-card` inside `AppComponent` (static single ticket display).

---

### 2. `*ngIf` and `*ngFor` Directives

* **Theory to review:** Structural directives in Angular, `*ngFor` syntax with `index` and `trackBy`, `*ngIf` syntax, and the difference between `*ngIf` and hiding elements via CSS.
* **Task:**
  1. Create a new component named `ticket-list`.
  2. Declare an array of at least 6 mock tickets in `ticket-list.component.ts`.
  3. Render each ticket using the `ticket-card` component by iterating through the array with `*ngFor`. For now, pass data directly in the template without `@Input`.
  4. Optimize the list rendering using `trackBy` with the ticket `id`.
  5. Above the list, display an empty-state message ("No tickets to display") using `*ngIf` when the array is empty.
  6. Add a temporary button to clear the list to verify the empty state works correctly.

---

### 3. Event Binding and Two-Way Binding with `ngModel`

* **Theory to review:** Event binding with parentheses `()`, importing `FormsModule` for `ngModel`, two-way data binding with banana-in-a-box syntax `[(ngModel)]`, and template reference variables (`#variable`).
* **Task:**
  1. Add a search input above the list in `ticket-list`, bound via two-way binding to a `searchText` property in the component class.
  2. Filter the displayed list in real-time by `title` as the user types (using a getter or template method; custom pipes are not required yet).
  3. Add a minimal form (without validation for now) containing:
     * A text input for `title`.
     * A select dropdown for `priorityId` (options `1`, `2`, `3` representing `LOW`, `MEDIUM`, `HIGH`).
     * An "Add Ticket" button.
  4. On button click (via event binding), create a new mock ticket with:
     * Auto-generated ID (e.g., `array.length + 1`).
     * `createdAt` set to current date.
     * `statusId` defaulted to `1` (`TODO`, matching backend business logic).
  5. Append the ticket to the array so it immediately appears in the list.

---

### 4. Component Communication (`@Input` and `@Output`)

* **Theory to review:** Parent-child component relationships, the `@Input` decorator for passing data down, and the `@Output` decorator with `EventEmitter` for emitting events up.
* **Task:**
  1. Refactor `ticket-card` to receive a complete `ticket` object via `@Input() ticket: Ticket` instead of hardcoded class properties.
  2. Update `ticket-list` (parent) to pass data down to `ticket-card` (child) using property binding inside the `*ngFor` loop.
  3. Add a "Delete" button inside `ticket-card`. Clicking it emits a `@Output() deleteTicket = new EventEmitter<number>()` event containing the ticket `id`.
  4. Handle the event in `ticket-list` via event binding and remove the corresponding ticket from the array.
  5. Ensure all ticket markup duplication is removed from `ticket-list` and delegated entirely to `ticket-card`.

---

### 5. Built-in and Custom Pipes

* **Theory to review:** What pipes are, pipe syntax (`|`), built-in pipes (`DatePipe`, `UpperCasePipe`, `TitleCasePipe`), creating custom pipes with `@Pipe`, and implementing `PipeTransform`.
* **Task:**
  1. In `ticket-card`, format `createdAt` using `DatePipe` for a readable date output.
  2. Display the ticket title using `TitleCasePipe`.
  3. Create two custom pipes:
     * `StatusLabelPipe`: maps numeric `statusId` (`1` to `4`) to status labels (`TODO`, `IN PROGRESS`, `IN REVIEW`, `DONE`).
     * `PriorityLabelPipe`: maps numeric `priorityId` (`1`, `2`, `3`) to priority labels (`LOW`, `MEDIUM`, `HIGH`).
  4. Apply both custom pipes in `ticket-card` to replace raw numbers.
  5. Add an optional parameter to `PriorityLabelPipe` to control uppercase/lowercase output.

---

### 6. Services and Dependency Injection with RxJS Observables

* **Theory to review:** Angular Services, `@Injectable({ providedIn: 'root' })`, Dependency Injection via constructor, RxJS `Observable` basics, and the `of()` creation operator.
* **Task:**
  1. Generate a `TicketService`.
  2. Move the mock tickets array from `ticket-list` into a private property inside `TicketService`.
  3. Expose a `getTickets(): Observable<Ticket[]>` method returning an observable using `of(this.tickets)`.
  4. Add `addTicket(ticket: Ticket)` and `deleteTicket(id: number)` methods in the service to mutate internal state.
  5. Inject `TicketService` into `ticket-list`. Retrieve tickets by subscribing to `getTickets()` in `ngOnInit` or directly in the template using the `async` pipe.
  6. Delegate add/delete actions to service methods instead of manipulating local component arrays.

---

### 7. Reactive Forms, Validation, and Form State

* **Theory to review:** Template-driven vs. Reactive Forms, importing `ReactiveFormsModule`, `FormGroup`, `FormControl`, built-in validators (`Validators.required`, `Validators.maxLength`), and control properties (`valid`, `invalid`, `touched`, `dirty`).
* **Task:**
  1. Rewrite the ticket addition form from Exercise 3 as a Reactive Form.
  2. Define a `FormGroup` with controls:
     * `title`: Required, max 100 characters.
     * `description`: Optional, max 1000 characters.
     * `priorityId`: Required (`1`, `2`, or `3`).
  3. Disable the submit button while the form is invalid.
  4. Display contextual error messages beneath fields only after they have been interacted with (`touched` / `dirty`).
  5. On valid submission, call `TicketService.addTicket(...)` with form values and reset the form.

---

### 8. Routing, Navigation, and Route Parameters

* **Theory to review:** Route configuration with `RouterModule`, `router-outlet`, `routerLink` directive, and accessing route parameters with `ActivatedRoute`.
* **Task:**
  1. Configure two main routes:
     * `/tickets`: displays `ticket-list`.
     * `/tickets/:ticketKey`: displays `ticket-detail`.
  2. In `ticket-card`, make the title a clickable link navigating to `/tickets/:ticketKey` using `routerLink`.
  3. In `ticket-detail`, extract `ticketKey` from `ActivatedRoute`.
  4. Add `getTicketByKey(key: string)` to `TicketService` and fetch ticket details.
  5. Display title, description, creation date, status, and priority (using custom pipes).
  6. Display a "Ticket not found" message if the key does not match any existing ticket.

---

### 9. Component Lifecycle Hooks and RxJS Operators

* **Theory to review:** `ngOnInit` and `ngOnDestroy` lifecycle hooks, unsubscription best practices, RxJS operators (`map`, `filter`, `delay`), and chaining operators with `pipe()`.
* **Task:**
  1. Add `getAuditForTicket(ticketKey: string)` to `TicketService`.
  2. Return an `Observable` containing mock modification history (at least 3 entries per ticket with date, old status, and new status), applying `delay(500)` to simulate network latency.
  3. In `ticket-detail`, add an "Audit Log / Modification History" section.
  4. Subscribe manually in `ngOnInit` to `getAuditForTicket`, save the data, and show a loading spinner/state while pending.
  5. Save the subscription reference and unsubscribe explicitly in `ngOnDestroy`.
  6. Filter audit history using RxJS `filter` operator inside `pipe()` before subscription to include only entries where the status changed.

---

### 10. Shared State and Interactive Dashboard

* **Theory to review:** State sharing across non-parent-child components using RxJS `BehaviorSubject`.
* **Task:**
  1. Add a private `BehaviorSubject` in `TicketService` tracking the currently selected status filter (initial value: no filter / null).
  2. Expose a public method to update filter state and a public `$statusFilter` Observable for components to subscribe to.
  3. Create a `ticket-dashboard` component rendered at the root route `/`.
  4. Display summary cards for each status (`TODO`, `IN PROGRESS`, `IN REVIEW`, `DONE`) showing ticket counts.
  5. Clicking a dashboard card updates the selected status in `TicketService`.
  6. `ticket-list` subscribes to the filter observable and filters displayed tickets dynamically.
  7. Include a "Show All" button to clear active status filters.
