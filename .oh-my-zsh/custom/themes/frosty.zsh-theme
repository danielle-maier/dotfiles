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
local arrow="⋙"

# Format for git_prompt_info()
ZSH_THEME_GIT_PROMPT_PREFIX="%{$blue%} "
ZSH_THEME_GIT_PROMPT_SUFFIX="%{$reset_color%}"
ZSH_THEME_GIT_PROMPT_CLEAN="%{$cyan_bold%} ✔ "
ZSH_THEME_GIT_PROMPT_DIRTY="%{$magenta_bold%} ✘ "

# Format for git_prompt_status()
ZSH_THEME_GIT_PROMPT_ADDED="%{$green_bold%}+"
ZSH_THEME_GIT_PROMPT_MODIFIED="%{$magenta_bold%}≅"
ZSH_THEME_GIT_PROMPT_DELETED="%{$red_bold%}-"
ZSH_THEME_GIT_PROMPT_RENAMED="%{$blue_bold%}≻"
ZSH_THEME_GIT_PROMPT_UNMERGED="%{$cyan_bold%}≠"
ZSH_THEME_GIT_PROMPT_UNTRACKED="%{$yellow_bold%}‽"

# Format for git_prompt_ahead()
ZSH_THEME_GIT_PROMPT_AHEAD=" %{$white_bold%}𝝀"

# Colors vary depending on time lapsed.
ZSH_THEME_GIT_TIME_SINCE_COMMIT_SHORT="%{$white%}"
ZSH_THEME_GIT_TIME_SHORT_COMMIT_MEDIUM="%{$cyan%}"
ZSH_THEME_GIT_TIME_SINCE_COMMIT_LONG="%{$blue%}"
ZSH_THEME_GIT_TIME_SINCE_COMMIT_NEUTRAL="%{$magenta%}"

# display machine name and change color for root status
function get_name {
    local name="%m"
    if [[ "$USER" == 'root' ]]; then
        name="%{$red_bold%}$flake%{$red_bold%}$name%{$red_bold%}$flake%{$reset_color%}"
    else
        name="%{$white_bold%}$flake%{$magenta_bold%}$name%{$white_bold%}$flake%{$reset_color%}"
    fi
    echo $name
}

# show current cpu time
function get_time {
    echo "%*"
}

# show current working dir starting from $PWD
function get_dir {
    echo "%3~"
}

# Determine the time since last commit. If branch is clean,
# use a neutral color, otherwise colors will vary according to time.
function git_time_since_commit() {
    if git rev-parse --git-dir > /dev/null 2>&1; then
        # Only proceed if there is actually a commit.
        if git log -n 1  > /dev/null 2>&1; then
            # Get the last commit.
            last_commit=`git log --pretty=format:'%at' -1 2> /dev/null`
            now=`date +%s`
            seconds_since_last_commit=$((now-last_commit))

            # Totals
            MINUTES=$((seconds_since_last_commit / 60))
            HOURS=$((seconds_since_last_commit/3600))

            # Sub-hours and sub-minutes
            DAYS=$((seconds_since_last_commit / 86400))
            SUB_HOURS=$((HOURS % 24))
            SUB_MINUTES=$((MINUTES % 60))

            if [[ -n $(git status -s 2> /dev/null) ]]; then
                if [ "$MINUTES" -gt 30 ]; then
                    COLOR="$ZSH_THEME_GIT_TIME_SINCE_COMMIT_LONG"
                elif [ "$MINUTES" -gt 10 ]; then
                    COLOR="$ZSH_THEME_GIT_TIME_SHORT_COMMIT_MEDIUM"
                else
                    COLOR="$ZSH_THEME_GIT_TIME_SINCE_COMMIT_SHORT"
                fi
            else
                COLOR="$ZSH_THEME_GIT_TIME_SINCE_COMMIT_NEUTRAL"
            fi

            if [ "$HOURS" -gt 24 ]; then
                echo "$COLOR${DAYS}d${SUB_HOURS}h${SUB_MINUTES}m%{$reset_color%}"
            elif [ "$MINUTES" -gt 60 ]; then
                echo "$COLOR${HOURS}h${SUB_MINUTES}m%{$reset_color%}"
            else
                echo "$COLOR${MINUTES}m%{$reset_color%}"
            fi
        else
            COLOR="$ZSH_THEME_GIT_TIME_SINCE_COMMIT_NEUTRAL"
            echo "$COLOR"
        fi
    fi
}

# assign indicators to the different status of branch
function get_git_prompt {
    if [[ -n $(git rev-parse --is-inside-work-tree 2>/dev/null) ]]; then
        local git_status="$(git_prompt_status)"
        if [[ -n $git_status ]]; then
            git_status="[$git_status%{$reset_color%}]"
        fi
        local git_prompt=" $(git_prompt_info)$git_status"
        echo $git_prompt
    fi
}

# move time since commit to far right side of prompt head
function get_space {
    local str=$1$2
    local zero='%([BSUbfksu]|([FB]|){*})'
    local len=${#${(S%%)str//$~zero/}}
    local size=$(( $COLUMNS - $len - 1 ))
    local space=""
    while [[ $size -gt 0 ]]; do
        space="$space "
        let size=$size-1
    done
    echo $space
}

# prompt head ❆(machine name)❆ [~/(current dir)]  (branch) git status
function print_prompt_head {
    local left_prompt="$(get_name)\
 %{$cyan%}[$(get_dir)]\
$(get_git_prompt)\
%{$reset_color%}"
    local right_prompt="%{$white%}[$(git_time_since_commit)%{$white%}]"
    print -rP "$left_prompt$(get_space $left_prompt $right_prompt)$right_prompt"
}

#change prompt color based on user lever
function get_prompt_indicator {
    if [[ $? -eq 0 ]]; then
        echo "%{$magenta_bold%}$arrow %{$reset_color%}"
    else
        echo "%{$red_bold%}$arrow %{$reset_color%}"
    fi
}

autoload -U add-zsh-hook
add-zsh-hook precmd print_prompt_head
setopt prompt_subst

PROMPT='$(get_prompt_indicator)'
RPROMPT="%{$blue%}[%{$white%}$(get_time)%{$blue%}]"
