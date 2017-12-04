
# Path to your oh-my-zsh installation.
export ZSH="$HOME/.oh-my-zsh"

# Set name of the theme to load.
# Look in ~/.oh-my-zsh/themes/
# Optionally, if you set this to "random", it'll load a random theme each
# time that oh-my-zsh is loaded.
ZSH_THEME="dogenpunk"

# Uncomment the following line to enable command auto-correction.
# ENABLE_CORRECTION="true"
# DISABLE_AUTO_TITLE="true"

# Uncomment the following line to display red dots whilst waiting for completion.
COMPLETION_WAITING_DOTS="true"

# Uncomment the following line if you want to change the command execution time
# stamp shown in the history command output.
# The optional three formats: "mm/dd/yyyy"|"dd.mm.yyyy"|"yyyy-mm-dd"
HIST_STAMPS="yyyy-mm-dd"

# Which plugins would you like to load? (plugins can be found in ~/.oh-my-zsh/plugins/*)
# Custom plugins may be added to ~/.oh-my-zsh/custom/plugins/
# Example format: plugins=(rails git textmate ruby lighthouse)
# Add wisely, as too many plugins slow down shell startup.
plugins=(git git-extras web-search bower command-not-found common-aliases debian npm sudo vi-mode)

# User configuration

# PATH
export PATH="/usr/bin:/usr/local/bin:/usr/bin:/bin:/usr/local/games:/usr/games:/usr/java/jdk1.8.0_74/bin:$PATH"
export PATH="/usr/local/heroku/bin:$PATH"
export SSH_KEY_PATH="~/.ssh/rsa_id"

# Oh-My-ZSH
source $ZSH/oh-my-zsh.sh

# shell
bindkey -v
bindkey -M viins 'jj' vi-cmd-mode
bindkey '^R' history-incremental-search-backward
setopt extendedglob nocaseglob globdots
export VISUAL=vim
export EDITOR="$VISUAL"
export DEFAULT_USER="daniellemaier"
export LANG="en_US.UTF-8"
export GEM_HOME="$HOME/.gems"
export PATH="$PATH:$HOME/.rvm/bin"
export PATH="/usr/local/opt/sqlite/bin:$PATH"


# Aliases
source ~/.aliases
