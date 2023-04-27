
# Atomext

A simple scaffolding CLI tool for easily creating components in NextJS 13, using atomic design principles. Using this approach, global components are kept separate from page route components.


## Getting Started
Start with a fresh install of NextjS 13. Don't attempt to run on an existing project, this hasn't been tested.
```
npx create-next-app@latest --typescript
```

Install Atomext as a dev dependency with yarn/npm:
```
yarn add atomext --dev
```

Add a script to your package.json
```
"scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "ato": "atomext"
  },
```

Initialize the CLI to select the directory for your components, and which layers you want to include. Templates and pages have been deselected by default since it's likely these will be managed under the app directory. This can also include custom directories using a comma-separated list when prompted.
```
yarn ato init
```

Create a component:

```
yarn ato create
```

Follow the instructions in the CLI:

- Select the component type (atom, molecule etc.)
- Enter the component name in ReactFormat <-- like this
- Select whether you want to include a scss module file
- Select whether it is a client component

## Roadmap

- Support for app router components
- Support for api routes
- Support for Storybook integration
- Support for testing libraries
- ...what else would you like to see?

