# CLAUDE.md

This file provides guidance for AI assistants (Claude Code and similar tools) working in this repository.

## Repository Overview

**Name:** prototypes
**Owner:** danielkolkman
**Status:** Early-stage / bootstrapped

This repository is a prototypes workspace — a place for exploratory, experimental, or proof-of-concept projects. It currently contains only a README and is ready to grow.

## Repository Structure

```
prototypes/
└── README.md        # Project overview
```

As prototypes are added, expect directories organized by project or technology area. Update this section as the structure evolves.

## Git Workflow

### Branch Naming

Claude Code branches follow a structured naming scheme:

```
claude/<task-slug>-<session-id>
```

Example: `claude/claude-md-mm63rmu185cet5ne-taHyP`

Human branches should use descriptive names:

```
feature/<short-description>
fix/<short-description>
chore/<short-description>
```

### Push Convention

Always push with tracking set:

```bash
git push -u origin <branch-name>
```

Only push to the branch designated for the current task. Never push to `master` or another user's branch without explicit permission.

### Commit Style

- Use the imperative mood in the subject line ("Add feature" not "Added feature")
- Keep the subject line under 72 characters
- Separate subject from body with a blank line if a body is needed
- Reference issue numbers where relevant

## Development Conventions

Since this is a prototypes repo, conventions are deliberately lightweight:

1. **Experiment freely** — prototypes are expected to be rough; don't over-engineer.
2. **Document intent** — add a short comment or README section explaining what each prototype explores.
3. **Isolate prototypes** — keep each prototype in its own directory to avoid cross-contamination.
4. **Clean up or promote** — either delete dead prototypes or graduate successful ones to their own repositories.

## AI Assistant Instructions

When working in this repository:

- **Read before editing** — always read files before modifying them.
- **Stay scoped** — only change files relevant to the current task; do not refactor unrelated code.
- **Avoid bloat** — don't add unnecessary dependencies, configs, or abstractions for one-off experiments.
- **Branch discipline** — develop on the designated `claude/` branch, commit with clear messages, and push when done.
- **No force pushes to master** — treat `master` as protected.
- **Update this file** — if you materially change the repo structure, workflows, or conventions, update CLAUDE.md to reflect the new state.

## Adding a New Prototype

When introducing a new prototype:

1. Create a dedicated directory: `mkdir <prototype-name>/`
2. Add a brief `README.md` inside it describing the goal and approach
3. List key dependencies at the top of the README or in a `package.json` / `pyproject.toml` / etc.
4. Keep the prototype self-contained where possible

## Notes

- No CI/CD pipeline is configured yet. Add a `.github/workflows/` directory when automation is needed.
- No linting or test framework is set up at the repo level. Individual prototypes may have their own.
- This CLAUDE.md should be updated as the repository matures.
