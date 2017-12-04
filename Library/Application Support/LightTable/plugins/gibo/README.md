# gibo
gibo (short for “.gitignore boilerplates”) allows you to quickly add common `.gitignore` templates to your local repo without leaving Light Table. It relies on [github/gitignore](https://github.com/github/gitignore).

light-gibo is, of course, a port of the eponymous [gibo](https://github.com/simonwhitaker/gibo) by Simon Whitaker.

## Usage
Launch gibo from the command bar:  
`^SPACE`  
`gibo: new gitignore`

Select the boilerplates you wish to add to your local .gitignore:  
`Leiningen`  
`Java`  
`…`

If you make a mistake:  
`-` to remove the latest boilerplate

Finally:  
- `gibo: Write` to save the selected boilerplates to (top workspace folder)/.gitignore  
- `gibo: Review` to open the current `gibo` buffer in a new tab.


## Boilerplates
### GitHub
Upon first launch of the command, `gibo` checks if a repository exists at the configured location; if it doesn't, it creates the folder and therein clones github/gitignore. The default location is `~/.gitignore-boilerplates` (consistently with [gibo.sh](https://github.com/simonwhitaker/gibo)), but a custom one can be set by adding `:lt.plugins.gibo/set-gh-local` to your `user.behaviors`.

```clojure
{:+ {:gibo-repo [(:lt.plugins.gibo/set-gh-local "/Absolute/Path/To/Repo")]}}
```

### Optional
For custom boilerplates, you can set additional sources in your `user.behaviors`. These repositories are assumed to follow the convention used by github/gitignore: one `name.gitignore` file for each boilerplate, located either at the root or under a "Global" folder. 

```clojure
{:+ {:gibo-repo [(:lt.plugins.gibo/custom "/Absolute/Path/One" "/Absolute/Path/Two")]}}
```
