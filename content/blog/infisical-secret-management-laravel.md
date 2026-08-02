---
title: "Secret Management in Laravel with Infisical: A Practical Guide"
description: "How to use Infisical to manage secrets in Laravel applications — inject environment variables in local development, collaborate as a team, and deploy safely with CI/CD."
date: "2026-08-02"
category: "DevOps"
readTime: "12 min read"
image: "/content-images/blackspike-wallpaper-03.avif"
---

## The Problem with .env Files

Every Laravel developer knows the ritual. You clone a project, hunt down the right `.env.example`, then pester a teammate on Slack for the production database password. Someone pastes it into a group chat. Someone else commits a real `.env` to git. Months later you're rotating credentials and hoping nothing was compromised.

The `.env` file works fine for one developer on one machine. It falls apart the moment a team shares an application:

- **Secrets live in many places.** Every developer's laptop, every CI runner, every server has its own copy. Nobody knows which copy is current.
- **No audit trail.** When a production API key leaks, you can't tell who had access, when it changed, or who last touched it.
- **Environment drift.** Staging uses one Stripe key, production another, and a local "temporary" key gets promoted to production by accident.
- **Onboarding is slow.** New team members spend their first days chasing down credentials instead of shipping.

Infisical solves this by making your secrets a **single source of truth** that every environment — local, staging, production — pulls from.

## What Infisical Is

Infisical is an open-source secret management platform. You store your secrets in a project (think of it as a vault), organised into **environments** like `dev`, `staging`, and `prod`. Applications, developers, and CI pipelines authenticate and pull exactly the secrets they're allowed to see.

It gives you:

- **Centralised storage** — one place for every API key, database credential, and configuration value.
- **Environment separation** — the same key name can hold different values per environment.
- **Role-based access control** — developers, senior engineers, and CI machines get different permissions.
- **Audit logs** — every read, write, and change is recorded.
- **Secret scanning** — catch leaked credentials before they hit your git history.
- **A CLI and SDKs** — inject secrets into any process, including Laravel.

You can use the hosted [Infisical Cloud](https://infisical.com) or self-host it, so you keep full control of where your secrets live.

## Getting Started

### 1. Install the CLI

The Infisical CLI is how you'll authenticate, fetch, and inject secrets. Install it for your platform:

```bash
# macOS
brew install infisical/get-cli/infisical

# Ubuntu / Debian
curl -1sLf 'https://artifacts-cli.infisical.com/setup.deb.sh' | sudo -E bash
sudo apt-get install -y infisical

# Or via npm anywhere
npm install -g @infisical/cli
```

Verify it's installed:

```bash
infisical --version
```

### 2. Log in and create a project

```bash
infisical login
```

This opens your browser to authenticate. Once logged in, create a project in the Infisical dashboard — you'll get a project like `my-laravel-app` with default environments `dev`, `staging`, `prod`.

### 3. Connect your Laravel project

From the root of your Laravel application, link the local folder to your Infisical project:

```bash
infisical init
```

This writes an `.infisical.json` file that records which project and workspace this folder maps to. **Commit this file** — it's not secret, and it lets every developer link the same project by simply running `infisical init` and choosing it.

### 4. Upload your existing secrets

Instead of typing every key by hand, push your current `.env` into Infisical as a starting point:

```bash
infisical secrets set $(grep -E '^[A-Z_]+=' .env | sed 's/^/--plain /' | tr '\n' ' ') --env dev
```

Or simpler — add them through the dashboard, or use the `--import` style flags:

```bash
infisical secrets --env dev --plain .env
```

Then delete the real values from your repo's `.env` and commit only `.env.example` with placeholders.

## Running Laravel with Infisical Secrets

### The magic command: `infisical run`

The cleanest way to use Infisical in development is to wrap your normal Laravel command:

```bash
infisical run -- php artisan serve
```

The CLI fetches the secrets for your linked project and environment, injects them as real environment variables, then starts the command. Laravel's configuration system reads these as if they came from `.env` — because to PHP, they do.

Run artisan commands the same way:

```bash
infisical run -- php artisan migrate
infisical run -- php artisan tinker
infisical run -- npm run dev
```

### Pin the environment

By default `infisical run` uses the environment you selected during `infisical init`. Override it per command:

```bash
infisical run --env=staging -- php artisan serve
infisical run --env=prod -- php artisan queue:work
```

### A note on `config:cache`

Laravel caches configuration with `php artisan config:cache`, which snapshots `env()` calls at build time. Two things to remember:

1. Never run `config:cache` in local development with real secrets baked in — it writes a cached file that lingers.
2. In production, run the cache step **inside** `infisical run` so the cache is built with the correct environment:

```bash
infisical run --env=prod -- php artisan config:cache
infisical run --env=prod -- php artisan migrate --force
infisical run --env=prod -- php artisan queue:restart
```

Because `infisical run` sets environment variables *before* the PHP process boots, `env()` and `config()` behave exactly as they did with `.env`.

## Adding a Service Provider for Resilience

If you'd rather not wrap every command, the `stechstudio/laravel-infisical` package merges Infisical secrets into your environment at boot:

```bash
composer require stechstudio/laravel-infisical
```

Configure it in `.env`:

```dotenv
INFISICAL_PROJECT_ID=your-project-id
INFISICAL_TOKEN=your-service-token
INFISICAL_ENVIRONMENT=dev
```

Then merge secrets on demand or automatically after every `composer install`:

```bash
php artisan infisical:merge --env=prod
```

```json
{
  "scripts": {
    "post-install-cmd": [
      "@php artisan infisical:merge"
    ]
  }
}
```

## Using the Official PHP SDK

For programmatic access — background workers, custom tooling, or apps that fetch secrets at runtime — use the official [Infisical PHP SDK](https://infisical.com/docs/sdks/languages/php):

```bash
composer require infisical/php-sdk
```

Authenticate with a **machine identity** (a non-human identity for servers and scripts) rather than a personal account:

```php
<?php

use Infisical\SDK\InfisicalSDK;
use Infisical\SDK\Models\ListSecretsParameters;

$sdk = new InfisicalSDK('https://app.infisical.com');

// Machine identity credentials — keep these in environment variables
$response = $sdk->auth()->universalAuth()->login(
    getenv('INFISICAL_MACHINE_CLIENT_ID'),
    getenv('INFISICAL_MACHINE_CLIENT_SECRET')
);

$secrets = $sdk->secrets()->list(new ListSecretsParameters(
    environment: 'prod',
    secretPath: '/',
    projectId: getenv('INFISICAL_PROJECT_ID'),
));

foreach ($secrets as $secret) {
    putenv("{$secret->secretKey}={$secret->secretValue}");
}
```

Create a small Artisan command to fetch secrets into your app at startup, or use the SDK in an external worker that needs to resolve credentials on demand. For most Laravel apps, though, `infisical run` is all you need.

## How It Eases Team Collaboration

This is where Infisical changes your workflow. The `.env`-copying ritual disappears because secrets are no longer a file to pass around.

### Environments that match your pipeline

One project holds `dev`, `staging`, and `prod`. A junior developer sees only `dev`. A deploy script for production sees only `prod`. The same `DB_HOST` key holds a localhost value for dev and your managed database host for prod.

### Roles and permissions

Create roles like **Developer**, **Senior Engineer**, and **CI**:

- Developers: read `dev`, write `dev`, no access to `prod`.
- Senior engineers: read/write `dev` and `staging`, read-only `prod`.
- CI machine identity: read the single environment it deploys to.

### Audit log

Every time a secret is read, changed, or deleted, it's recorded with the actor, timestamp, and environment. No more guessing who rotated the payment gateway key. If something breaks in production, you can trace exactly which secret changed and when.

### Secret references and rotation

Infisical lets one secret reference another (`${DATABASE_URL}` in a config value), so a single rotation propagates everywhere. Rotate a leaked credential in the dashboard and every environment picks up the new value on the next deploy — no file edits, no PRs for secrets.

### Onboarding in minutes

New developer joins? They install the CLI, `infisical login`, `infisical init`, pick the project, and `infisical run -- php artisan serve`. Done. No Slack dumps, no shared spreadsheets.

## Deploying with CI/CD

### GitHub Actions (recommended: OIDC)

The most secure pattern is [OIDC authentication](https://infisical.com/docs/integrations/cicd/githubactions). GitHub issues a short-lived token, Infisical validates it against your machine identity, and the workflow fetches secrets — no long-lived credentials stored in GitHub at all.

First, create a **machine identity** in Infisical with OIDC auth configured for your repository, and grant it read access to the `staging`/`prod` environments it deploys.

Then configure your workflow:

```yaml
name: Deploy Laravel

on:
  push:
    branches: [main]

permissions:
  id-token: write  # Required for OIDC
  contents: read

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: shivammathur/setup-php@v2
        with:
          php-version: '8.3'
          extensions: mbstring, intl, pdo_mysql

      # Fetch secrets from Infisical, injected as env vars
      - uses: Infisical/secrets-action@v1.0.9
        with:
          method: "oidc"
          identity-id: "your-machine-identity-id"
          project-slug: "my-laravel-app"
          env-slug: "prod"

      - run: composer install --no-dev --prefer-dist --optimize-autoloader
      - run: php artisan config:cache
      - run: php artisan migrate --force
      # ... your deploy step (e.g. rsync, Laravel Forge, serverless)
```

The `identity-id` is public and safe to commit. The OIDC token proves the workflow's identity at runtime, so nothing sensitive sits in your repository.

### Alternative: CLI with a machine identity token

If OIDC isn't an option for your provider, authenticate the CLI with a machine identity client ID and secret stored as a regular GitHub secret:

```yaml
- uses: actions/checkout@v4

- name: Install Infisical CLI
  run: |
    curl -1sLf 'https://artifacts-cli.infisical.com/setup.deb.sh' | sudo -E bash
    sudo apt-get install -y infisical

- name: Inject secrets and run checks
  run: infisical run --env=staging -- php artisan test
  env:
    INFISICAL_CLIENT_ID: ${{ secrets.INFISICAL_CLIENT_ID }}
    INFISICAL_CLIENT_SECRET: ${{ secrets.INFISICAL_CLIENT_SECRET }}
```

### Docker deployments

For containerised Laravel apps, `infisical run` works as your container entrypoint:

```dockerfile
FROM php:8.3-fpm

COPY . /var/www
WORKDIR /var/www

RUN curl -1sLf 'https://artifacts-cli.infisical.com/setup.deb.sh' | bash \
    && apt-get install -y infisical

ENTRYPOINT ["infisical", "run", "--env=prod", "--", "php-fpm"]
```

Pass `INFISICAL_CLIENT_ID` and `INFISICAL_CLIENT_SECRET` to the container as its only real secrets; everything else is resolved at startup.

## Scanning for Leaked Secrets

Prevention beats cleanup. Infisical's CLI can scan your repository and git history for committed secrets:

```bash
infisical scan
```

Scan staged changes before every commit to catch slips at the last second:

```bash
infisical scan --staged
```

Add it to your CI to block merges that introduce secrets:

```yaml
- name: Scan for leaked secrets
  run: infisical scan
```

Combine this with a pre-commit hook and you've eliminated the most common way credentials escape — a stray `.env` that gets committed.

## Best Practices Checklist

1. **Commit `.env.example`, never `.env`.** Keep `.env` in `.gitignore` and treat the file as a local cache, not a source of truth.
2. **Use machine identities for CI and servers.** Never reuse a personal account's token in a pipeline.
3. **Scope access per environment.** Give each role and identity only what it needs to do its job.
4. **Rotate credentials in Infisical, not in files.** The change propagates to every consumer on deploy.
5. **Scan before you commit.** Wire `infisical scan` into local hooks and CI.
6. **Pin the CLI version** in Docker and CI images so behaviour doesn't change under you.
7. **Never cache real secrets into `config:cache` in a local checkout** — always run it under `infisical run` in the target environment.

## Conclusion

Moving from `.env` files to Infisical isn't just a security upgrade — it's a workflow upgrade. Your team stops passing secrets around and starts pulling them from one governed source. Environments stay cleanly separated, every change is auditable, onboarding takes minutes instead of a day, and deployments resolve the correct credentials automatically.

For a Laravel team of any size, the cost of adoption is a CLI install and a weekend of discipline. The payoff is knowing the credential that unlocks your production database never lived in a group chat, a committed file, or a stray laptop.

Start with `infisical init` in your Laravel project and run `infisical run -- php artisan serve` on Monday. Your team will wonder how they worked any other way.
