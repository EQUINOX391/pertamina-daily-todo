# Reflection Log

## Day 1

### Completed

- Created initial project structure.
- Added initial documentation.
- Added `.gitignore`.
- Added `.env.example`.
- Added security notes.
- Added decision log.
- Added Gen-AI usage notes.

### Notes

The project is intentionally kept simple and focused on the main recruitment requirements.

### Reflection

The original study case emphasizes not only the result, but also the development approach. Because of that, I decided to start from planning and documentation before writing implementation code.

This approach helps me clarify the scope, reduce unnecessary features, and keep the project realistic for the deadline.

I also documented how Gen-AI is used in this project to show that it supports learning and planning, while official documentation remains the main technical reference.

### Risks

- EF Core version compatibility needs to be verified.
- JWT storage strategy needs to be decided carefully.
- Time management is important because the deadline is 4 days.

### Next Step

Set up backend ASP.NET Core Web API project structure.


## Reflection: Frontend Foundation Setup

Date: 2026-05-13

Today I started the frontend foundation after completing backend review and cleanup.

The focus was not to build the full UI immediately, but to prepare a clean structure first. I created a React project using Vite, added routing with React Router, prepared an Axios HTTP client, and separated token storage logic into a utility file.

This approach helps keep the frontend organized before connecting it to the backend API.

Next focus:

- Implement login form.
- Integrate login with backend JWT endpoint.
- Store token after successful login.
- Test protected TODO page with authenticated API request.

I started by adding a CORS policy in the backend because the frontend and backend run on different local origins during development. After that, I implemented the login and register forms, connected them to the API wrapper functions, stored the JWT token, and redirected authenticated users to the protected TODO page.

I also tested positive and negative authentication scenarios from the browser.

This step helped connect the backend authentication foundation with the frontend application flow.

Next focus:

- Fetch authenticated user's TODO list.
- Display TODO items on the frontend.
- Implement create TODO form.
- Continue with update and delete TODO integration.

## Reflection: Frontend TODO CRUD Integration

Date: 2026-05-13

Today I integrated the TODO list page with the protected backend TODO API.

I implemented loading TODO items, creating new TODO items, updating completed status, editing TODO details, and deleting TODO items. All TODO API requests use the JWT token through the Axios HTTP client interceptor.

I also tested several important scenarios, including empty state, invalid token handling, validation errors, long text layout behavior, delete confirmation, and local UI updates after API success.

One important finding was that UI validation and layout behavior must be tested with edge cases such as long title and long description input. The backend remains the source of truth for validation and ownership protection.

Next focus:

- Review frontend code readability.
- Reduce duplication if needed.
- Improve documentation and README.
- Prepare final testing checklist before submission.

## Reflection: Frontend Review and Documentation Cleanup

Date: 2026-05-13

I reviewed the frontend implementation after completing TODO CRUD integration.

The main goal was not to add new features, but to improve readability and make sure the project remains simple and understandable for a recruitment study case.

I reviewed the frontend folder structure, API wrapper usage, token storage helper, protected route flow, and TODO page implementation.

Some small cleanup was done, such as reducing duplicated API error handling logic, removing unused template files, and updating the frontend README so it reflects the actual project instead of the default Vite template.

I decided not to split the TODO page into too many smaller components yet because the current scope is still small. Keeping it as one page is acceptable for the deadline, as long as the logic remains readable.

This step helped prepare the project for final review without overengineering the frontend.

Next focus:

- Run final lint and build checks.
- Review Git status.
- Make sure `.env` files are not committed.
- Prepare the repository before sharing it for review.
