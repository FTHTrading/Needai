# TASK: Code Review

## Input
- File path or code content
- Review focus (security, performance, style, all)

## Constraints
- Reference specific line numbers
- Cite actual code, not summaries
- Categorize issues by severity (critical, warning, info)
- Suggest fixes, not just problems

## Output Format
```json
{
  "summary": "string",
  "issues": [
    {
      "line": number,
      "severity": "critical|warning|info",
      "category": "security|performance|style|logic|types",
      "description": "string",
      "suggestion": "string",
      "code_before": "string",
      "code_after": "string"
    }
  ],
  "metrics": {
    "total_issues": number,
    "critical": number,
    "warnings": number,
    "info": number
  },
  "approved": boolean
}
```

## Review Checklist
- [ ] No hardcoded secrets
- [ ] Proper error handling
- [ ] Type safety
- [ ] Input validation
- [ ] No SQL/command injection
- [ ] Consistent style
- [ ] No unused imports/variables

## Validation
- Output must be valid JSON
- All line numbers must be accurate
- Code samples must be exact quotes
