(ns lt.plugins.gibo.list
  (:require [lt.plugins.gibo.files   :as gf]
            [lt.objs.sidebar.command :as scmd]
            [lt.object               :as object])
  (:require-macros [lt.macros :refer [behavior]]))


(defn create [opts]
  (let [flist (object/create ::boilerplate-flist opts)]
    (object/raise flist :refresh!)
    flist))

(defn repo->items [repo]
  (let [custom (:custom @repo)
        gh (:gh-local @repo)
        all (conj custom gh)]
    (gf/->bo (gf/local-bos all))))

(defn enlist [repo actions]
  (when (gf/git? (:gh-local @repo))
    (concat actions
            (repo->items repo))))

(object/object* ::boilerplate-flist
                :tags #{:filter-list :gibo-list}
                :selected 0
                :placeholder "search boilerplates"
                :items []
                :search ""
                :init (fn [this opts]
                        (let [opts (merge {:size 100} opts)
                              lis (for [i (range (:size opts))]
                                    (scmd/item this i))]
                          (object/merge! this (merge {:lis (vec lis)} opts))
                          [:div.filter-list.empty
                           (scmd/input this)
                           [:ul
                            lis]])))
