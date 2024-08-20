# Emumba Frontend CLI Plugin Guide

Welcome to the documentation for the Emumba Node Plugin project. This project aims to streamline the creation of Node applications by providing a CLI tool that sets up a boilerplate project with selected options.

## Table of Contents

- [Introduction](#introduction)
- [Installation & Setup](#installation--setup)
- [Usage](#usage)
- [Configuration](#configuration)
- [Understanding the File Structure](#understanding-the-file-structure)

## Introduction

The Emumba Node Plugin is a CLI tool designed to simplify the process of creating new Node applications by providing a set of prompts to customize the project setup. It allows developers to choose various configurations and architectural appraoch.

## Installation & Setup

1. Clone the Emumba Plugin repository from Github:

   ```bash
   git clone https://github.com/EmumbaOrg/emumba-nx-boilerplate-plugin.git
   ```

2. Install project dependencies:

   ```bash
   npm install
   ```

3. Set up a local registry for testing and run the project locally. In one terminal, run:

   ```bash
   npx nx local-registry
   ```

Now, by default, Verdaccio is running at http://localhost:4873/. Clicking this link will redirect you to Verdaccio.


4. In a second terminal, publish the package locally using verdaccio (e.g., version 1.0.0):
   ```bash
   npx nx run-many --targets publish --ver 1.0.0 --tag latest
   ```

Note: Remember to change the version number each time you publish to Verdaccio. When you are done with testing, make sure to set your registry back to the original because your registry is set to local Verdaccio. Use the following command:
   ```bash
   npm set registry https://registry.npmjs.org/
   ```

## Usage

To create a new Node project using the Emumba Plugin, follow these simple steps:

1. Open your terminal.

2. Run the following command:

```bash
npx @emumbaorg/nx-project-setup@latest my-app
```
3. Follow the on-screen prompts to configure your project. You can select options for authetications and architectural appraoch such as monolithic or micro-services.

4. The Emumba Plugin will create the project with your chosen configurations.

5. To start your project, navigate to the project directory. If you've created a standalone app, use the command `npm start`.

## Configuration

The Emumba Node Plugin allows you to configure various aspects of your project, including:

- **Type of Application:** Choose between monolithic or micro-service.

- **Authentication:** Choose between token based or session based authentication.

- **Framework:** Express framework for building your application.

- **Dynamic Routes:** Dynamic route setup for the entire project tree.

- **Testing:** Integrated Jest setup for unit and integration testing.

- **Caching:** Redis integration for caching and session management.

- **CORS:** Configurable Cross-Origin Resource Sharing (CORS) to manage access control.

- **Containerization:** Docker setup for easy deployment and consistent development environments.

You can customize these options during project setup, and the Emumba Node Plugin will generate a project that adheres to your choices.

## Understanding the File Structure

Here's an overview of the project's directory structure:

```
├── packages
│   ├── node-plugin
│   │   ├── src
│   │   │   ├── generators
│   │   │   │   ├── preset
│   │   │   │   │   ├── files
│   │   │   │   │   │   ├── apps
│   │   │   │   │   │   │   │── modules
│   │   │   │   │   │   │   │── tests
│   │   │   │   │   │   ├── src
│   │   │   │   │   │   │   ├── models
│   │   │   │   │   │   │   ├── services
│   │   │   │   │   │   │   ├── controllers
│   │   │   │   │   │   │   ├── routes
│   │   │   │   │   │   │   ├── tests
│   │   │   │   │   ├── .env
│   │   │   │   │   ├── eslintrc.json
│   │   │   │   │   └── app.ts
│   │   │   │   │   └── server.ts
│   │   │   │   │   └── dockerfile
│   │   │   │   │   └── docker-compose.yml
│   │   │   │   │   └── jest.config.ts
│   │   │   │   │   └── redis.ts
│   │   │   │   │   └── tsconfig.json
│   └── create-emumba-node-app
│       ├── bin
│       │   └── index.ts
├── project.json
├── README.md
└── tsconfig.base.json
```

In preset files folder you can see we have two main folders one is app/modules which is following micro-service architecture and second is
src which is following monolithic architecture.

## Key Components

### `create-emumba-node-app`

This directory contains the core logic for generating boilerplates based on user preferences. It includes the following elements:

- `bin/index.ts`: This is the entry point of the CLI tool. It utilizes the `enquirer` npm package to prompt users and collect their choices regarding project configuration.

### `node-plugin/src/generators/preset`

This directory encompasses the code responsible for generating project files and adding dependencies. The central file in this directory is:

- `generator.ts`: This file handles the appropriate file generation and dependency management based on the user's prompt selections.

### `node-plugin/src/generators/preset/files`

This directory holds templates for the components that will be generated/added based on the user's selections. It includes subdirectories for various components, such as Jest Libraries (e.g., Jest and mocha in `/tests/example.test.ts`) and other options.
