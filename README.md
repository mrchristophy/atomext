
# Atomext

A simple scaffolding tool for NextJS 13 using atomic design principles.




## Documentation
Start with a fresh install of NextjS 13. Don't attempt to run on an existing project, this hasn't been tested.
```
npx create-next-app@latest --typescript
```

Install Atomext with yarn/npm:
```
yarn add atomext
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

Init the program to select the directory for your components, and which layers you want to include. Templates and pages have been deselected by default since it's likely these will be managed under the app directory. This can also include custom directories using a comma-separated list when prompted.
```
yarn ato init
```

Create a component:

```
yarn ato create [type] [name] --css --client

type: atom, molecule, organism, template, page (or custom)
name: the name of your component (currently no checking for CamelCase so please enter this correctly!)
--css: if set this will create a css module file and link it to the component
--client: if set this will enable "use client" for client side components

```

Full Example

```
yarn ato create atom ButtonPrimary --css --client
```


