# Starting a New Feature

This guide outlines the process for starting and implementing a new feature in the Hytale.gg project.

## Pre-Implementation Checklist

- [ ] Feature is documented in the roadmap or PRD
- [ ] Feature scope and requirements are clearly defined
- [ ] Acceptance criteria are established
- [ ] Dependencies on other features or systems are identified
- [ ] Database schema changes (if any) are planned

## Planning Phase

1. **Define the Feature Scope**
   - Write clear user stories and acceptance criteria
   - Identify any new database tables, columns, or relationships needed
   - List API endpoints required
   - Determine frontend components and pages needed

2. **Architecture Review**
   - Review existing patterns in the codebase
   - Identify reusable components and utilities
   - Plan the data flow from backend to frontend
   - Consider authentication and authorization requirements

3. **Task Breakdown**
   - Break the feature into smaller, manageable tasks
   - Prioritize tasks by dependency order
   - Estimate effort for each task

## Implementation Phase

1. **Database Setup** (if applicable)
   - Create migration files in `/scripts`
   - Update schema documentation
   - Set up any necessary indexes or constraints

2. **Backend Development**
   - Create API routes in `/app/api`
   - Implement business logic and validation
   - Add error handling and logging
   - Write tests for critical paths

3. **Frontend Development**
   - Create components in `/components`
   - Build pages in `/app`
   - Integrate with backend API
   - Add proper error states and loading indicators
   - Implement responsive design

4. **Integration & Testing**
   - Test feature end-to-end
   - Test edge cases and error scenarios
   - Verify database queries perform well
   - Test on multiple devices/browsers

## Code Organization

```
/app
  /api             # API route handlers
  /(routes)        # Page routes
/components
  /feature-name    # Feature-specific components
/lib
  /feature-name    # Feature utilities and helpers
/scripts
  /migrations      # Database migration scripts
/docs
  /memories        # Store feature context and decisions
```

## Documentation

- Update this guide if implementing a major architectural pattern
- Document non-obvious design decisions in `/docs/memories`
- Add code comments for complex business logic
- Update the roadmap upon completion

## Branch & Commit Strategy

- Create feature branch from `main`: `feature/feature-name`
- Keep commits atomic and descriptive
- Reference relevant issues or tickets in commit messages
- Create a pull request with clear description before merging
