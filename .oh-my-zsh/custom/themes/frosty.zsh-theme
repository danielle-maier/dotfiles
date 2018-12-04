#!/usr/bin/env zsh

local black=$fg[black]
local red=$fg[red]
local blue=$fg[blue]
local green=$fg[green]
local yellow=$fg[yellow]
local magenta=$fg[magenta]
local cyan=$fg[cyan]
local white=$fg[white]

local black_bold=$fg_bold[black]
local red_bold=$fg_bold[red]
local blue_bold=$fg_bold[blue]
local green_bold=$fg_bold[green]
local yellow_bold=$fg_bold[yellow]
local magenta_bold=$fg_bold[magenta]
local cyan_bold=$fg_bold[cyan]
local white_bold=$fg_bold[white]

local flake="❆"

function get_name {
    local name="%m"
    if [[ "$USER" == 'root' ]]; then
        name="%{$red_bold%}$flake%{$red_bold%}$name%{$red_bold%}$flake%{$reset_color%}"
    else
        name="%{$white_bold%}$flake%{$magenta_bold%}$name%{$white_bold%}$flake%{$reset_color%}"
    fi
    echo $name
}

function get_time {
    echo "%*"
}

function get_dir {
    echo "%3~"
}
# Git sometimes goes into a detached head state. git_prompt_info doesn't
# return anything in this case. So wrap it in another function and check
# for an empty string.
function check_git_prompt_info() {
    if git rev-parse --git-dir > /dev/null 2>&1; then
        if [[ -z $(git_prompt_info 2> /dev/null) ]]; then
            echo "%{$fblue]%}detached-head%{$reset_color%}) $(git_prompt_status)
%{$yellow%}→ "
        else
            echo "$(git_prompt_info 2> /dev/null) $(git_prompt_status)
%{$cyan_bold%}⋙ "
        fi
    else
        echo "%{$cyan_bold%}⋙ "
    fi
}

# Format for git_prompt_info()
ZSH_THEME_GIT_PROMPT_PREFIX="%{$blue%} "
ZSH_THEME_GIT_PROMPT_SUFFIX="%{$reset_color%}"
ZSH_THEME_GIT_PROMPT_CLEAN="%{$green_bold%} ✔ "
ZSH_THEME_GIT_PROMPT_DIRTY="%{$red_bold%} ✘ "

# Format for git_prompt_status()
ZSH_THEME_GIT_PROMPT_ADDED="%{$magenta_bold%}+"
ZSH_THEME_GIT_PROMPT_MODIFIED="%{$magenta_bold%}±"
ZSH_THEME_GIT_PROMPT_DELETED="%{$red_bold%}-"
ZSH_THEME_GIT_PROMPT_RENAMED="%{$blue_bold%}≻"
ZSH_THEME_GIT_PROMPT_UNMERGED="%{$cyan_bold%}≠"
ZSH_THEME_GIT_PROMPT_UNTRACKED="%{$yellow_bold%}‽"

# Format for git_prompt_ahead()
ZSH_THEME_GIT_PROMPT_AHEAD=" %{$white_bold%}𝝀"

PROMPT="$(get_name)\
 %{$cyan%}[$(get_dir)]\
 $(check_git_prompt_info)\
%{$reset_color%}"

RPROMPT="%{$blue%}[%{$white%}$(get_time)%{$blue%}]"
