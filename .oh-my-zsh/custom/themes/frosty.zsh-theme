#!/usr/bin/env zsh

local ICE="%(?,%{$fg_bold[blue]%}❆,%{$fg_bold[red]%}❆)"
if [[ "$USER" == "root" ]]; then USERCOLOR="red"; else USERCOLOR="magenta"; fi

# Git sometimes goes into a detached head state. git_prompt_info doesn't
# return anything in this case. So wrap it in another function and check
# for an empty string.
function check_git_prompt_info() {
    if git rev-parse --git-dir > /dev/null 2>&1; then
        if [[ -z $(git_prompt_info 2> /dev/null) ]]; then
            echo "%{$fg[blue]%}detached-head%{$reset_color%}) $(git_prompt_status)
%{$fg[yellow]%}→ "
        else
            echo "$(git_prompt_info 2> /dev/null) $(git_prompt_status)
%{$fg_bold[cyan]%}⋙ "
        fi
    else
        echo "%{$fg_bold[cyan]%}⋙ "
    fi
}

function get_time_stamp {
    echo "%*"
}

PROMPT=$'\n'$ICE'\
 %{$fg_bold[$USERCOLOR]%}%m\
 %{$fg_bold[blue]%}❆\
 %{$fg_no_bold[cyan]%}[%3~]\
 $(check_git_prompt_info)\
%{$reset_color%}'

# RPROMPT='$(get_right_prompt)'
RPROMPT="%{$fg_bold[blue]%}[%{$fg_bold[white]%}%T%{$fg_bold[blue]%}]"

# Format for git_prompt_info()
ZSH_THEME_GIT_PROMPT_PREFIX="%{$fg[blue]%} "
ZSH_THEME_GIT_PROMPT_SUFFIX="%{$reset_color%}"
ZSH_THEME_GIT_PROMPT_DIRTY=""
ZSH_THEME_GIT_PROMPT_CLEAN="%{$fg_bold[green]%}✴︎"

# Format for git_prompt_status()
ZSH_THEME_GIT_PROMPT_ADDED="%{$fg_bold[magenta]%}+"
ZSH_THEME_GIT_PROMPT_MODIFIED="%{$fg_bold[magenta]%}±"
ZSH_THEME_GIT_PROMPT_DELETED="%{$fg_bold[red]%}✗"
ZSH_THEME_GIT_PROMPT_RENAMED="%{$fg_bold[magenta]%}𝜽"
ZSH_THEME_GIT_PROMPT_UNMERGED="%{$fg_bold[yellow]%}‽"
ZSH_THEME_GIT_PROMPT_UNTRACKED="%{$fg_bold[yellow]%}✱"

# Format for git_prompt_ahead()
ZSH_THEME_GIT_PROMPT_AHEAD=" %{$fg_bold[white]%}𝝀"
