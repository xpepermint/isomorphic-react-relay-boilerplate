# Project Initialization

We start a node project by creating and initializing a directory.

```
mkdir myapp && cd myapp && npm init .
```

Then we initialize the git repository and do a commit.

```
git init .; echo .DS_Store >> .gitignore; echo node_modules >> .gitignore
git add .
git commit -m 'project initialized'
```
