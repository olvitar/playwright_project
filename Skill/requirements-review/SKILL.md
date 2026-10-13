---
name: requirements-review
description: Use when reviewing requirements, user stories, or acceptance criteria.
---

# Requirements Review Skill

When reviewing requirements:

1. Check if requirement is clear and unambiguous.
2. Identify missing acceptance criteria.
3. Detect contradictions or conflicts.
4. Check testability of the requirement.
5. Suggest edge cases.
6. Propose questions for clarification.

Output format:
- Issues found
- Missing information
- Questions
- Suggested test cases

## Operational Instructions (Built-in Tools)

### File System Action:
- Do not output the final markdown report to the chat window.
- Instead, automatically create a folder named `Documentation/reviews/` in the project root if it does not exist.
- Identify the main feature name from the input requirements and save the final output into a file named 
`{feature_name}_analysis_report.md` (converted to kebab-case, e.g., `user-authentication_analysis_report.md`).
**Always create a new file; do not overwrite existing ones.**

### Terminal Integration:
- Immediately after saving the file, open the built-in terminal and execute the following system command
to list all existing reviews and check for potential duplicates:`ls Documentation/reviews`

### Local Script Execution (via Terminal Tool):
- After executing the previous steps, open the terminal again to run our local JavaScript validator. 
Pass the path of the newly created file as an argument to automatically verify that the report structure complies with company standards:
  `node scripts/validate_report.js Documentation/reviews/{feature_name}_analysis_report.md`

### MCP Automation (Playwright MCP only — `user-playwright`):
**Only `user-playwright` MCP for browser actions — no other MCP, shell, or CLI.**
After report validation:
- From the user story, extract the page URL (e.g. `https://testing101.net/checkout`).
- `browser_navigate` → `browser_take_screenshot` (full page).
- Save as `Documentation/reviews/{feature_name}_ui_snapshot.png`.