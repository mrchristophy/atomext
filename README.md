
# Atomext

A simple scaffolding tool for NextJS 13 using atomic design principles.




## Documentation

Init the program to select the directory for your components, and which layers you want to include. Templates and pages have been deselected by default since it's likely these will be managed under the app directory. This can also include custom directories using a comma-separated list when prompted.
```
atomext init
```

Create a component:

```
atomext create [type] [name] --css --client

type: atom, molecule, organism, template, page (or custom)
name: the name of your component (currently no checking for CamelCase so please enter this correctly!)
--css: if set this will create a css module file and link it to the component
--client: if set this will enable "use client" for client side components

```

Example

```
atomext create atom ButtonPrimary --css --client
```


