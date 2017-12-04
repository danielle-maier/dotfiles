if(!lt.util.load.provided_QMARK_('lt.plugins.gibo.files')) {
goog.provide('lt.plugins.gibo.files');
goog.require('cljs.core');
goog.require('clojure.string');
goog.require('clojure.string');
goog.require('lt.objs.workspace');
goog.require('lt.objs.workspace');
goog.require('lt.objs.files');
goog.require('lt.objs.files');
/**
* Returns the Presumably Working Directory.
*/
lt.plugins.gibo.files.pwd = (function pwd(){return cljs.core.first.call(null,new cljs.core.Keyword(null,"folders","folders",4625622327).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,lt.objs.workspace.current_ws)));
});
/**
* 
*/
lt.plugins.gibo.files.bo_name = (function bo_name(file){return lt.objs.files.basename.call(null,file,".gitignore");
});
/**
* 
*/
lt.plugins.gibo.files.gitignore_QMARK_ = (function gitignore_QMARK_(file){return cljs.core._EQ_.call(null,lt.objs.files.ext.call(null,file),"gitignore");
});
/**
* Checks if a .git repository exists at the given path.
*/
lt.plugins.gibo.files.git_QMARK_ = (function git_QMARK_(path){return lt.objs.files.exists_QMARK_.call(null,lt.objs.files.join.call(null,path,".git"));
});
lt.plugins.gibo.files.gitignore_at = (function gitignore_at(path){return lt.objs.files.join.call(null,path,".gitignore");
});
lt.plugins.gibo.files.local_bos = (function local_bos(r){return cljs.core.sort_by.call(null,(function (p1__7898_SHARP_){return clojure.string.lower_case.call(null,lt.plugins.gibo.files.bo_name.call(null,p1__7898_SHARP_));
}),cljs.core.filter.call(null,lt.plugins.gibo.files.gitignore_QMARK_,lt.plugins.gibo.files.repo_path_ls.call(null,r)));
});
lt.plugins.gibo.files.repo_path_ls = (function repo_path_ls(p){var global = (function (_){return lt.objs.files.join.call(null,_,"Global");
});return cljs.core.concat.call(null,cljs.core.apply.call(null,cljs.core.concat,cljs.core.map.call(null,lt.objs.files.full_path_ls,p)),cljs.core.apply.call(null,cljs.core.concat,cljs.core.map.call(null,lt.objs.files.full_path_ls,cljs.core.map.call(null,((function (global){
return (function (p1__7900_SHARP_){return global.call(null,p1__7900_SHARP_);
});})(global))
,cljs.core.filter.call(null,((function (global){
return (function (p1__7899_SHARP_){return lt.objs.files.dir_QMARK_.call(null,global.call(null,p1__7899_SHARP_));
});})(global))
,p)))));
});
lt.plugins.gibo.files.__GT_content = (function __GT_content(coll){return [cljs.core.str("## "),cljs.core.str(new cljs.core.Keyword(null,"name","name",1017277949).cljs$core$IFn$_invoke$arity$1(coll)),cljs.core.str(" ##\n\n"),cljs.core.str(lt.objs.files.bomless_read.call(null,new cljs.core.Keyword(null,"file","file",1017047278).cljs$core$IFn$_invoke$arity$1(coll)))].join('');
});
lt.plugins.gibo.files.gitignore_LT__ = (function gitignore_LT__(coll){return clojure.string.join.call(null,cljs.core.interpose.call(null,"\n\n",cljs.core.map.call(null,(function (p1__7901_SHARP_){return lt.plugins.gibo.files.__GT_content.call(null,p1__7901_SHARP_);
}),coll)));
});
lt.plugins.gibo.files.__GT_bo = (function __GT_bo(coll){return cljs.core.map.call(null,(function (p1__7902_SHARP_){return cljs.core.PersistentHashMap.fromArrays.call(null,[new cljs.core.Keyword(null,"name","name",1017277949),new cljs.core.Keyword(null,"file","file",1017047278)],[lt.plugins.gibo.files.bo_name.call(null,p1__7902_SHARP_),p1__7902_SHARP_]);
}),coll);
});
}
if(!lt.util.load.provided_QMARK_('lt.plugins.gibo.list')) {
goog.provide('lt.plugins.gibo.list');
goog.require('cljs.core');
goog.require('lt.object');
goog.require('lt.object');
goog.require('lt.objs.sidebar.command');
goog.require('lt.objs.sidebar.command');
goog.require('lt.plugins.gibo.files');
goog.require('lt.plugins.gibo.files');
lt.plugins.gibo.list.create = (function create(opts){var flist = lt.object.create.call(null,new cljs.core.Keyword("lt.plugins.gibo.list","boilerplate-flist","lt.plugins.gibo.list/boilerplate-flist",2356345771),opts);lt.object.raise.call(null,flist,new cljs.core.Keyword(null,"refresh!","refresh!",4597922840));
return flist;
});
lt.plugins.gibo.list.repo__GT_items = (function repo__GT_items(repo){var custom = new cljs.core.Keyword(null,"custom","custom",3959783139).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,repo));var gh = new cljs.core.Keyword(null,"gh-local","gh-local",3632269041).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,repo));var all = cljs.core.conj.call(null,custom,gh);return lt.plugins.gibo.files.__GT_bo.call(null,lt.plugins.gibo.files.local_bos.call(null,all));
});
lt.plugins.gibo.list.enlist = (function enlist(repo,actions){if(cljs.core.truth_(lt.plugins.gibo.files.git_QMARK_.call(null,new cljs.core.Keyword(null,"gh-local","gh-local",3632269041).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,repo)))))
{return cljs.core.concat.call(null,actions,lt.plugins.gibo.list.repo__GT_items.call(null,repo));
} else
{return null;
}
});
lt.object.object_STAR_.call(null,new cljs.core.Keyword("lt.plugins.gibo.list","boilerplate-flist","lt.plugins.gibo.list/boilerplate-flist",2356345771),new cljs.core.Keyword(null,"tags","tags",1017456523),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"gibo-list","gibo-list",2139910766),null,new cljs.core.Keyword(null,"filter-list","filter-list",4372522309),null], null), null),new cljs.core.Keyword(null,"selected","selected",2205476365),0,new cljs.core.Keyword(null,"placeholder","placeholder",1612151013),"search boilerplates",new cljs.core.Keyword(null,"items","items",1114430258),cljs.core.PersistentVector.EMPTY,new cljs.core.Keyword(null,"search","search",4402534682),"",new cljs.core.Keyword(null,"init","init",1017141378),(function (this$,opts){var opts__$1 = cljs.core.merge.call(null,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"size","size",1017434995),100], null),opts);var lis = (function (){var iter__7081__auto__ = ((function (opts__$1){
return (function iter__7903(s__7904){return (new cljs.core.LazySeq(null,((function (opts__$1){
return (function (){var s__7904__$1 = s__7904;while(true){
var temp__4126__auto__ = cljs.core.seq.call(null,s__7904__$1);if(temp__4126__auto__)
{var s__7904__$2 = temp__4126__auto__;if(cljs.core.chunked_seq_QMARK_.call(null,s__7904__$2))
{var c__7079__auto__ = cljs.core.chunk_first.call(null,s__7904__$2);var size__7080__auto__ = cljs.core.count.call(null,c__7079__auto__);var b__7906 = cljs.core.chunk_buffer.call(null,size__7080__auto__);if((function (){var i__7905 = 0;while(true){
if((i__7905 < size__7080__auto__))
{var i = cljs.core._nth.call(null,c__7079__auto__,i__7905);cljs.core.chunk_append.call(null,b__7906,lt.objs.sidebar.command.item.call(null,this$,i));
{
var G__7907 = (i__7905 + 1);
i__7905 = G__7907;
continue;
}
} else
{return true;
}
break;
}
})())
{return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__7906),iter__7903.call(null,cljs.core.chunk_rest.call(null,s__7904__$2)));
} else
{return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__7906),null);
}
} else
{var i = cljs.core.first.call(null,s__7904__$2);return cljs.core.cons.call(null,lt.objs.sidebar.command.item.call(null,this$,i),iter__7903.call(null,cljs.core.rest.call(null,s__7904__$2)));
}
} else
{return null;
}
break;
}
});})(opts__$1))
,null,null));
});})(opts__$1))
;return iter__7081__auto__.call(null,cljs.core.range.call(null,new cljs.core.Keyword(null,"size","size",1017434995).cljs$core$IFn$_invoke$arity$1(opts__$1)));
})();lt.object.merge_BANG_.call(null,this$,cljs.core.merge.call(null,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"lis","lis",1014011400),cljs.core.vec.call(null,lis)], null),opts__$1));
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.filter-list.empty","div.filter-list.empty",3131797703),lt.objs.sidebar.command.input.call(null,this$),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"ul","ul",1013907977),lis], null)], null);
}));
}
if(!lt.util.load.provided_QMARK_('lt.plugins.gibo')) {
goog.provide('lt.plugins.gibo');
goog.require('cljs.core');
goog.require('lt.objs.command');
goog.require('lt.objs.notifos');
goog.require('lt.objs.opener');
goog.require('lt.objs.proc');
goog.require('lt.objs.files');
goog.require('lt.object');
goog.require('lt.objs.proc');
goog.require('lt.objs.files');
goog.require('lt.objs.command');
goog.require('lt.plugins.gibo.files');
goog.require('lt.plugins.gibo.list');
goog.require('lt.objs.notifos');
goog.require('lt.plugins.gibo.list');
goog.require('lt.plugins.gibo.files');
goog.require('lt.objs.opener');
goog.require('lt.object');
lt.plugins.gibo.__BEH__on_out = (function __BEH__on_out(this$,data){var out = [cljs.core.str(data)].join('');return cljs.core.println.call(null,out);
});
lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.plugins.gibo","on-out","lt.plugins.gibo/on-out",3422445995),new cljs.core.Keyword(null,"triggers","triggers",2516997421),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"proc.out","proc.out",4302083112),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",4441361819),lt.plugins.gibo.__BEH__on_out);
lt.plugins.gibo.__BEH__on_exit = (function __BEH__on_exit(this$,data){var out = [cljs.core.str(data)].join('');var G__7855 = out;if(cljs.core._EQ_.call(null,"1",G__7855))
{lt.objs.notifos.done_working.call(null);
return lt.objs.notifos.set_msg_BANG_.call(null,"Git operation failed with exit code 1.",new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"class","class",1108647146),"error"], null));
} else
{if(cljs.core._EQ_.call(null,"0",G__7855))
{lt.objs.notifos.done_working.call(null,"Git operation successful; refreshing .gitignore boilerplates.");
return lt.object.raise.call(null,new cljs.core.Keyword(null,"selector","selector",2205476689).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,lt.plugins.gibo.gibo)),new cljs.core.Keyword(null,"force-refresh!","force-refresh!",3989490874));
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{lt.objs.notifos.done_working.call(null);
lt.objs.notifos.set_msg_BANG_.call(null,"Git operation failed; see console for details.",new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"class","class",1108647146),"error"], null));
return console.error([cljs.core.str("Git exit code: "),cljs.core.str(out)].join(''));
} else
{return null;
}
}
}
});
lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.plugins.gibo","on-exit","lt.plugins.gibo/on-exit",3570984407),new cljs.core.Keyword(null,"triggers","triggers",2516997421),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"proc.exit","proc.exit",4162906152),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",4441361819),lt.plugins.gibo.__BEH__on_exit);
lt.plugins.gibo.__BEH__on_error = (function __BEH__on_error(this$,data){var out = [cljs.core.str(data)].join('');lt.objs.notifos.done_working.call(null);
lt.objs.notifos.set_msg_BANG_.call(null,"Git encountered an error; see console for details.");
return cljs.core.println.call(null,out);
});
lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.plugins.gibo","on-error","lt.plugins.gibo/on-error",4136408929),new cljs.core.Keyword(null,"triggers","triggers",2516997421),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"proc.error","proc.error",4143512802),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",4441361819),lt.plugins.gibo.__BEH__on_error);
lt.plugins.gibo.gh_default = lt.objs.files.join.call(null,lt.objs.files.home.call(null),".gitignore-boilerplates");
lt.plugins.gibo.gh_remote = "https://github.com/github/gitignore.git";
lt.plugins.gibo.__BEH__set_gh_local = (function __BEH__set_gh_local(this$,gh_custom){if(cljs.core.truth_(gh_custom))
{return lt.object.merge_BANG_.call(null,this$,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"gh-local","gh-local",3632269041),gh_custom], null));
} else
{return lt.object.merge_BANG_.call(null,this$,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"gh-local","gh-local",3632269041),lt.plugins.gibo.gh_default], null));
}
});
lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.plugins.gibo","set-gh-local","lt.plugins.gibo/set-gh-local",1859379089),new cljs.core.Keyword(null,"desc","desc",1016984067),"gibo: set local github/gitignore repository",new cljs.core.Keyword(null,"params","params",4313443576),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"label","label",1116631654),"Absolute path",new cljs.core.Keyword(null,"type","type",1017479852),new cljs.core.Keyword(null,"string","string",4416885635)], null)], null),new cljs.core.Keyword(null,"type","type",1017479852),new cljs.core.Keyword(null,"user","user",1017503549),new cljs.core.Keyword(null,"triggers","triggers",2516997421),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"object.instant","object.instant",773332388),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",4441361819),lt.plugins.gibo.__BEH__set_gh_local);
/**
* @param {...*} var_args
*/
lt.plugins.gibo.__BEH__custom = (function() { 
var __BEH__custom__delegate = function (this$,paths){lt.object.merge_BANG_.call(null,this$,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"custom","custom",3959783139),cljs.core.set.call(null,paths)], null));
var temp__4126__auto__ = new cljs.core.Keyword(null,"selector","selector",2205476689).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,lt.plugins.gibo.gibo));if(cljs.core.truth_(temp__4126__auto__))
{var selector = temp__4126__auto__;return lt.object.raise.call(null,selector,new cljs.core.Keyword(null,"force-refresh!","force-refresh!",3989490874));
} else
{return null;
}
};
var __BEH__custom = function (this$,var_args){
var paths = null;if (arguments.length > 1) {
  paths = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1),0);} 
return __BEH__custom__delegate.call(this,this$,paths);};
__BEH__custom.cljs$lang$maxFixedArity = 1;
__BEH__custom.cljs$lang$applyTo = (function (arglist__7866){
var this$ = cljs.core.first(arglist__7866);
var paths = cljs.core.rest(arglist__7866);
return __BEH__custom__delegate(this$,paths);
});
__BEH__custom.cljs$core$IFn$_invoke$arity$variadic = __BEH__custom__delegate;
return __BEH__custom;
})()
;
lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.plugins.gibo","custom","lt.plugins.gibo/custom",3489976954),new cljs.core.Keyword(null,"desc","desc",1016984067),"gibo: add custom local repositories",new cljs.core.Keyword(null,"params","params",4313443576),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"label","label",1116631654),"Absolute path",new cljs.core.Keyword(null,"type","type",1017479852),new cljs.core.Keyword(null,"string","string",4416885635)], null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"label","label",1116631654),"& more",new cljs.core.Keyword(null,"type","type",1017479852),new cljs.core.Keyword(null,"string","string",4416885635)], null)], null),new cljs.core.Keyword(null,"type","type",1017479852),new cljs.core.Keyword(null,"user","user",1017503549),new cljs.core.Keyword(null,"triggers","triggers",2516997421),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"object.instant","object.instant",773332388),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",4441361819),lt.plugins.gibo.__BEH__custom);
lt.plugins.gibo.__BEH__prompt_for_clone = (function __BEH__prompt_for_clone(this$){return popup.popup_BANG_.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"header","header",4087600639),"Gitignore boilerplates not found.",new cljs.core.Keyword(null,"body","body",1016933652),"To use gibo, you need a local copy of github/gitignore. Clone it now?",new cljs.core.Keyword(null,"buttons","buttons",1255256819),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"label","label",1116631654),"Clone github/gitignore",new cljs.core.Keyword(null,"action","action",3885920680),(function (){return lt.object.raise.call(null,this$,new cljs.core.Keyword(null,"create!","create!",2042458647),new cljs.core.Keyword(null,"gh-local","gh-local",3632269041).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$)));
})], null),popup.cancel_button], null)], null));
});
lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.plugins.gibo","prompt-for-clone","lt.plugins.gibo/prompt-for-clone",4798388155),new cljs.core.Keyword(null,"triggers","triggers",2516997421),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"clone?","clone?",3951346164),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",4441361819),lt.plugins.gibo.__BEH__prompt_for_clone);
lt.plugins.gibo.__BEH__clone_gh_BANG_ = (function __BEH__clone_gh_BANG_(this$,local){lt.objs.notifos.working.call(null,[cljs.core.str("Cloning into "),cljs.core.str(local)].join(''));
return lt.objs.proc.exec.call(null,new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"command","command",1964298941),"git",new cljs.core.Keyword(null,"args","args",1016906831),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, ["clone",lt.plugins.gibo.gh_remote,local], null),new cljs.core.Keyword(null,"cwd","cwd",1014003170),lt.plugins.gibo.files.pwd.call(null),new cljs.core.Keyword(null,"env","env",1014004831),null,new cljs.core.Keyword(null,"obj","obj",1014014057),this$], null));
});
lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.plugins.gibo","clone-gh!","lt.plugins.gibo/clone-gh!",3104284923),new cljs.core.Keyword(null,"triggers","triggers",2516997421),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"create!","create!",2042458647),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",4441361819),lt.plugins.gibo.__BEH__clone_gh_BANG_);
lt.plugins.gibo.__BEH__pull_gh_BANG_ = (function __BEH__pull_gh_BANG_(this$){if(cljs.core.truth_(lt.plugins.gibo.files.git_QMARK_.call(null,new cljs.core.Keyword(null,"gh-local","gh-local",3632269041).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$)))))
{lt.objs.notifos.working.call(null,[cljs.core.str("Updating "),cljs.core.str(new cljs.core.Keyword(null,"gh-local","gh-local",3632269041).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$))),cljs.core.str(" to latest github/gitignore")].join(''));
return lt.objs.proc.exec.call(null,new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"command","command",1964298941),"git",new cljs.core.Keyword(null,"args","args",1016906831),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, ["pull","origin","master"], null),new cljs.core.Keyword(null,"cwd","cwd",1014003170),new cljs.core.Keyword(null,"gh-local","gh-local",3632269041).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$)),new cljs.core.Keyword(null,"env","env",1014004831),null,new cljs.core.Keyword(null,"obj","obj",1014014057),this$], null));
} else
{return lt.object.raise.call(null,this$,new cljs.core.Keyword(null,"clone?","clone?",3951346164));
}
});
lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.plugins.gibo","pull-gh!","lt.plugins.gibo/pull-gh!",612122147),new cljs.core.Keyword(null,"triggers","triggers",2516997421),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"update!","update!",779473898),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",4441361819),lt.plugins.gibo.__BEH__pull_gh_BANG_);
lt.object.object_STAR_.call(null,new cljs.core.Keyword("lt.plugins.gibo","repo","lt.plugins.gibo/repo",4276560505),new cljs.core.Keyword(null,"tags","tags",1017456523),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"gibo-repo","gibo-repo",2140085570),null], null), null),new cljs.core.Keyword(null,"gh-local","gh-local",3632269041),lt.plugins.gibo.gh_default,new cljs.core.Keyword(null,"custom","custom",3959783139),cljs.core.PersistentHashSet.EMPTY,new cljs.core.Keyword(null,"init","init",1017141378),(function (this$){return null;
}));
lt.plugins.gibo.reviewer = new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"name","name",1017277949),"gibo: Review",new cljs.core.Keyword(null,"action","action",3885920680),(function (){return lt.object.raise.call(null,lt.plugins.gibo.gibo,new cljs.core.Keyword(null,"review!","review!",2113857339));
})], null);
lt.plugins.gibo.writer = new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"name","name",1017277949),"gibo: Write",new cljs.core.Keyword(null,"action","action",3885920680),(function (){return lt.object.raise.call(null,lt.plugins.gibo.gibo,new cljs.core.Keyword(null,"write!","write!",4529297300));
})], null);
lt.plugins.gibo.undoer = new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"name","name",1017277949),"-",new cljs.core.Keyword(null,"action","action",3885920680),(function (){return lt.object.raise.call(null,lt.plugins.gibo.gibo,new cljs.core.Keyword(null,"remove!","remove!",2105740175));
})], null);
lt.plugins.gibo.action_items = new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [lt.plugins.gibo.writer,lt.plugins.gibo.reviewer,lt.plugins.gibo.undoer], null);
lt.plugins.gibo.__BEH__add_boilerplate = (function __BEH__add_boilerplate(this$,item){var temp__4124__auto__ = new cljs.core.Keyword(null,"action","action",3885920680).cljs$core$IFn$_invoke$arity$1(item);if(cljs.core.truth_(temp__4124__auto__))
{var f = temp__4124__auto__;return f.call(null);
} else
{lt.object.raise.call(null,this$,new cljs.core.Keyword(null,"clear!","clear!",3951036134));
return lt.object.raise.call(null,lt.plugins.gibo.gibo,new cljs.core.Keyword(null,"add!","add!",1016893202),item);
}
});
lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.plugins.gibo","add-boilerplate","lt.plugins.gibo/add-boilerplate",4308470006),new cljs.core.Keyword(null,"triggers","triggers",2516997421),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"select","select",4402849902),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",4441361819),lt.plugins.gibo.__BEH__add_boilerplate);
lt.plugins.gibo.__BEH__repo_check = (function __BEH__repo_check(this$){var local_repo = new cljs.core.Keyword(null,"repo","repo",1017401060).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,lt.plugins.gibo.gibo));if(cljs.core.truth_(lt.plugins.gibo.files.git_QMARK_.call(null,new cljs.core.Keyword(null,"gh-local","gh-local",3632269041).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,local_repo)))))
{return null;
} else
{return lt.object.raise.call(null,local_repo,new cljs.core.Keyword(null,"clone?","clone?",3951346164));
}
});
lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.plugins.gibo","repo-check","lt.plugins.gibo/repo-check",4347604278),new cljs.core.Keyword(null,"triggers","triggers",2516997421),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"focus!","focus!",4039653819),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",4441361819),lt.plugins.gibo.__BEH__repo_check);
lt.plugins.gibo.__BEH__refresh = (function __BEH__refresh(this$){lt.object.merge_BANG_.call(null,this$,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"items","items",1114430258),lt.plugins.gibo.list.enlist.call(null,new cljs.core.Keyword(null,"repo","repo",1017401060).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,lt.plugins.gibo.gibo)),lt.plugins.gibo.action_items)], null));
return lt.object.raise.call(null,this$,new cljs.core.Keyword(null,"refresh!","refresh!",4597922840));
});
lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.plugins.gibo","refresh","lt.plugins.gibo/refresh",1096341800),new cljs.core.Keyword(null,"triggers","triggers",2516997421),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"force-refresh!","force-refresh!",3989490874),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",4441361819),lt.plugins.gibo.__BEH__refresh);
lt.plugins.gibo.__BEH__add_BANG_ = (function __BEH__add_BANG_(this$,bo){lt.object.update_BANG_.call(null,this$,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"bos","bos",1014001976)], null),cljs.core.conj,bo);
return lt.object.raise.call(null,this$,new cljs.core.Keyword(null,"display-buffer","display-buffer",878107421));
});
lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.plugins.gibo","add!","lt.plugins.gibo/add!",4275954283),new cljs.core.Keyword(null,"triggers","triggers",2516997421),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"add!","add!",1016893202),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",4441361819),lt.plugins.gibo.__BEH__add_BANG_);
lt.plugins.gibo.__BEH__remove_BANG_ = (function __BEH__remove_BANG_(this$){var last_added_7867 = cljs.core.last.call(null,new cljs.core.Keyword(null,"bos","bos",1014001976).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$)));lt.object.update_BANG_.call(null,this$,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"bos","bos",1014001976)], null),cljs.core.disj,last_added_7867);
return lt.object.raise.call(null,this$,new cljs.core.Keyword(null,"display-buffer","display-buffer",878107421));
});
lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.plugins.gibo","remove!","lt.plugins.gibo/remove!",1098403302),new cljs.core.Keyword(null,"triggers","triggers",2516997421),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"remove!","remove!",2105740175),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",4441361819),lt.plugins.gibo.__BEH__remove_BANG_);
lt.plugins.gibo.__BEH__review_BANG_ = (function __BEH__review_BANG_(this$){var content = lt.plugins.gibo.files.gitignore_LT__.call(null,new cljs.core.Keyword(null,"bos","bos",1014001976).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$)));var info = new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"mime","mime",1017255846),"plaintext",new cljs.core.Keyword(null,"tags","tags",1017456523),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"editor.plaintext","editor.plaintext",4474629672),new cljs.core.Keyword(null,"editor.transient","editor.transient",3554141883)], null),new cljs.core.Keyword(null,"name","name",1017277949),".gitignore",new cljs.core.Keyword(null,"content","content",1965434859),content], null);var selector = new cljs.core.Keyword(null,"selector","selector",2205476689).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$));lt.object.raise.call(null,lt.objs.opener.opener,new cljs.core.Keyword(null,"open-info!","open-info!",4559273826),info);
lt.object.update_BANG_.call(null,this$,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"bos","bos",1014001976)], null),cljs.core.empty);
lt.objs.command.exec_BANG_.call(null,new cljs.core.Keyword(null,"close-sidebar","close-sidebar",1108494329));
return lt.object.raise.call(null,selector,new cljs.core.Keyword(null,"escape!","escape!",3844244274),false);
});
lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.plugins.gibo","review!","lt.plugins.gibo/review!",1107012178),new cljs.core.Keyword(null,"triggers","triggers",2516997421),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"review!","review!",2113857339),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",4441361819),lt.plugins.gibo.__BEH__review_BANG_);
lt.plugins.gibo.notify_of_save = (function notify_of_save(path){lt.objs.notifos.done_working.call(null,[cljs.core.str(".gitignore saved at "),cljs.core.str(path)].join(''));
return null;
});
lt.plugins.gibo.prepend_blank_lines_QMARK_ = (function prepend_blank_lines_QMARK_(path,content){if(cljs.core.truth_(lt.objs.files.exists_QMARK_.call(null,lt.plugins.gibo.files.gitignore_at.call(null,path))))
{return [cljs.core.str("\n\n"),cljs.core.str(content)].join('');
} else
{return content;
}
});
lt.plugins.gibo.__BEH__write_BANG_ = (function __BEH__write_BANG_(this$){var content = lt.plugins.gibo.files.gitignore_LT__.call(null,new cljs.core.Keyword(null,"bos","bos",1014001976).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$)));var selector = new cljs.core.Keyword(null,"selector","selector",2205476689).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$));var temp__4124__auto__ = lt.plugins.gibo.files.pwd.call(null);if(cljs.core.truth_(temp__4124__auto__))
{var path = temp__4124__auto__;lt.objs.notifos.working.call(null,"Saving .gitignore\u2026");
lt.objs.files.append.call(null,lt.plugins.gibo.files.gitignore_at.call(null,path),lt.plugins.gibo.prepend_blank_lines_QMARK_.call(null,path,content),lt.plugins.gibo.notify_of_save.call(null,path));
lt.object.update_BANG_.call(null,this$,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"bos","bos",1014001976)], null),cljs.core.empty);
lt.objs.command.exec_BANG_.call(null,new cljs.core.Keyword(null,"close-sidebar","close-sidebar",1108494329));
return lt.object.raise.call(null,selector,new cljs.core.Keyword(null,"escape!","escape!",3844244274),false);
} else
{return lt.object.raise.call(null,this$,new cljs.core.Keyword(null,"review!","review!",2113857339));
}
});
lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.plugins.gibo","write!","lt.plugins.gibo/write!",2989677033),new cljs.core.Keyword(null,"triggers","triggers",2516997421),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"write!","write!",4529297300),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",4441361819),lt.plugins.gibo.__BEH__write_BANG_);
lt.plugins.gibo.__BEH__display_buffer = (function __BEH__display_buffer(this$){var bo_names = cljs.core.map.call(null,new cljs.core.Keyword(null,"name","name",1017277949),new cljs.core.Keyword(null,"bos","bos",1014001976).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$)));return lt.objs.notifos.set_msg_BANG_.call(null,cljs.core.apply.call(null,cljs.core.str,"gibo: ",cljs.core.interpose.call(null,", ",bo_names)));
});
lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.plugins.gibo","display-buffer","lt.plugins.gibo/display-buffer",4669546104),new cljs.core.Keyword(null,"triggers","triggers",2516997421),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"display-buffer","display-buffer",878107421),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",4441361819),lt.plugins.gibo.__BEH__display_buffer);
lt.object.object_STAR_.call(null,new cljs.core.Keyword("lt.plugins.gibo","gibo","lt.plugins.gibo/gibo",4275838780),new cljs.core.Keyword(null,"tags","tags",1017456523),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"gibo","gibo",1017076769),null], null), null),new cljs.core.Keyword(null,"bos","bos",1014001976),cljs.core.PersistentHashSet.EMPTY,new cljs.core.Keyword(null,"selector","selector",2205476689),null,new cljs.core.Keyword(null,"repo","repo",1017401060),null,new cljs.core.Keyword(null,"init","init",1017141378),(function (this$){var repo = lt.object.create.call(null,new cljs.core.Keyword("lt.plugins.gibo","repo","lt.plugins.gibo/repo",4276560505));var gibo_flist = lt.plugins.gibo.list.create.call(null,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"items","items",1114430258),lt.plugins.gibo.list.enlist.call(null,repo,lt.plugins.gibo.action_items),new cljs.core.Keyword(null,"key","key",1014010321),new cljs.core.Keyword(null,"name","name",1017277949)], null));lt.object.merge_BANG_.call(null,this$,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"repo","repo",1017401060),repo], null));
return lt.object.merge_BANG_.call(null,this$,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"selector","selector",2205476689),gibo_flist], null));
}));
lt.plugins.gibo.gibo = lt.object.create.call(null,new cljs.core.Keyword("lt.plugins.gibo","gibo","lt.plugins.gibo/gibo",4275838780));
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"command","command",1964298941),new cljs.core.Keyword(null,"gibo.new","gibo.new",1742995283),new cljs.core.Keyword(null,"desc","desc",1016984067),"gibo: new gitignore",new cljs.core.Keyword(null,"options","options",4059396624),new cljs.core.Keyword(null,"selector","selector",2205476689).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,lt.plugins.gibo.gibo)),new cljs.core.Keyword(null,"exec","exec",1017031683),(function (coll){return null;
})], null));
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",1964298941),new cljs.core.Keyword(null,"gibo.update","gibo.update",1925584474),new cljs.core.Keyword(null,"desc","desc",1016984067),"gibo: update boilerplates",new cljs.core.Keyword(null,"exec","exec",1017031683),(function (){return lt.object.raise.call(null,new cljs.core.Keyword(null,"repo","repo",1017401060).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,lt.plugins.gibo.gibo)),new cljs.core.Keyword(null,"update!","update!",779473898));
})], null));
}

//# sourceMappingURL=gibo_compiled.js.map