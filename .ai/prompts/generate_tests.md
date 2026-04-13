# TASK: Generate Tests

## Input
- Target file path
- Test framework (Jest/Vitest)

## Constraints
- Cover all exported functions
- Include edge cases
- Mock external dependencies (Telnyx, weather APIs)
- Use descriptive test names

## Output Format
```typescript
// Test file content only
// No explanations outside code comments
```

## Test Categories
1. Unit tests for pure functions
2. Integration tests for API routes
3. Mock tests for external services

## Validation
- All tests must be syntactically valid
- Imports must reference actual exports
- Mocks must match real API shapes
