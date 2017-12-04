 (ns lt.plugins.gibo
  (:require [lt.plugins.gibo.files :as gf]
            [lt.plugins.gibo.list  :as gl]
            [lt.object             :as object]
            [lt.objs.command       :as cmd]
            [lt.objs.files         :as fs]
            [lt.objs.notifos       :as notifos]
            [lt.objs.opener        :as opener]
            [lt.objs.proc          :as proc])
  (:require-macros [lt.macros :refer [behavior]]))


(declare gibo)


;;;; git processes and notification ;;;;

(behavior ::on-out
          :triggers #{:proc.out}
          :reaction (fn[this data]
                      (let [out (str data)]
                          (println out))))

(behavior ::on-exit
          :triggers #{:proc.exit}
          :reaction (fn [this data]
                      (let [out (str data)]
                        (case out
                          "0" (do (notifos/done-working "Git operation successful; refreshing .gitignore boilerplates.")
                                  (object/raise (:selector @gibo) :force-refresh!))
                          "1" (do (notifos/done-working)
                                  (notifos/set-msg! "Git operation failed with exit code 1." {:class "error"}))
                          (do (notifos/done-working)
                              (notifos/set-msg! "Git operation failed; see console for details." {:class "error"})
                              (.error js/console (str "Git exit code: " out)))))))

(behavior ::on-error
          :triggers #{:proc.error}
          :reaction (fn [this data]
                      (let [out (str data)]
                        (do
                          (notifos/done-working)
                          (notifos/set-msg! "Git encountered an error; see console for details.")
                          (println out)))))


;;;; repository manager ;;;;

(def gh-default (fs/join (fs/home) ".gitignore-boilerplates"))
(def gh-remote "https://github.com/github/gitignore.git")

(behavior ::set-gh-local
          :triggers #{:object.instant}
          :desc "gibo: set local github/gitignore repository"
          :type :user
          :params [{:label "Absolute path"
                    :type :string}]
          :reaction (fn [this gh-custom]
                      (if gh-custom
                        (object/merge! this {:gh-local gh-custom})
                        (object/merge! this {:gh-local gh-default}))))

(behavior ::custom
          :triggers #{:object.instant}
          :desc "gibo: add custom local repositories"
          :type :user
          :params [{:label "Absolute path"
                    :type :string}
                   {:label "& more"
                    :type :string}]
          :reaction (fn [this & paths]
                      (object/merge! this {:custom (set paths)})
                      (when-let [selector (:selector @gibo)]
                        (object/raise selector :force-refresh!))))

(behavior ::prompt-for-clone
          :triggers #{:clone?}
          :reaction (fn [this]
                      (popup/popup! {:header "Gitignore boilerplates not found."
                                     :body "To use gibo, you need a local copy of github/gitignore. Clone it now?"
                                     :buttons [{:label "Clone github/gitignore"
                                                :action (fn []
                                                          (object/raise this :create! (:gh-local @this)))}
                                               popup/cancel-button]})))

(behavior ::clone-gh!
          :triggers #{:create!}
          :reaction (fn [this local]
                      (notifos/working (str "Cloning into " local))
                      (proc/exec {:command "git"
                                  :args ["clone" gh-remote local]
                                  :cwd (gf/pwd)
                                  :env nil
                                  :obj this})))
(behavior ::pull-gh!
          :triggers #{:update!}
          :reaction (fn [this]
                      (if (gf/git? (:gh-local @this))
                        (do
                          (notifos/working (str "Updating " (:gh-local @this) " to latest github/gitignore"))
                          (proc/exec {:command "git"
                                      :args ["pull" "origin" "master"]
                                      :cwd (:gh-local @this)
                                      :env nil
                                      :obj this}))
                        (object/raise this :clone?))))

(object/object* ::repo
                :tags #{:gibo-repo}
                :gh-local gh-default
                :custom #{}
                :init (fn [this]))


;;;; filter-list ;;;;

;;; items

(def reviewer {:name "gibo: Review"
               :action (fn []
                         (object/raise gibo :review!))})

(def writer {:name "gibo: Write"
             :action (fn []
                       (object/raise gibo :write!))})

(def undoer {:name "-"
             :action (fn []
                       (object/raise gibo :remove!))})

(def action-items [writer reviewer undoer])

;;; behaviors and definition

(behavior ::add-boilerplate
          :triggers #{:select}
          :reaction (fn [this item]
                      (if-let [f (:action item)]
                        (f)
                        (do
                          (object/raise this :clear!)
                          (object/raise gibo :add! item)))))

(behavior ::repo-check
          :triggers #{:focus!}
          :reaction (fn [this]
                      (let [local-repo (:repo @gibo)]
                        (when-not (gf/git? (:gh-local @local-repo))
                          (object/raise local-repo :clone?)))))

(behavior ::refresh
          :triggers #{:force-refresh!}
          :reaction (fn [this]
                      (object/merge! this {:items (gl/enlist (:repo @gibo) action-items)})
                      (object/raise this :refresh!)))


;;;; let there be gibo ;;;;

;;; object and behaviors

(behavior ::add!
          :triggers #{:add!}
          :reaction (fn [this bo]
                      (object/update! this [:bos] conj bo)
                      (object/raise this :display-buffer)))

(behavior ::remove!
          :triggers #{:remove!}
          :reaction (fn [this]
                      (let [last-added (last (:bos @this))]
                        (object/update! this [:bos] disj last-added))
                      (object/raise this :display-buffer)))

(behavior ::review!
          :triggers #{:review!}
          :reaction (fn [this]
                      (let [content (gf/gitignore<- (:bos @this))
                            info {:mime "plaintext"
                                  :tags [:editor.plaintext :editor.transient]
                                  :name ".gitignore"
                                  :content content}
                            selector (:selector @this)]
                        (object/raise opener/opener :open-info! info)
                        (object/update! this [:bos] empty)
                        (cmd/exec! :close-sidebar)
                        (object/raise selector :escape! false))))

(defn notify-of-save [path]
  (notifos/done-working (str ".gitignore saved at " path))
  nil)

(defn prepend-blank-lines? [path content]
  (if (fs/exists? (gf/gitignore-at path))
    (str "\n\n" content)
    content))

(behavior ::write!
          :triggers #{:write!}
          :reaction (fn [this]
                      (let [content (gf/gitignore<- (:bos @this))
                            selector (:selector @this)]
                        (if-let [path (gf/pwd)]
                          (do (notifos/working "Saving .gitignore…")
                            (fs/append (gf/gitignore-at path)
                                       (prepend-blank-lines? path content)
                                       (notify-of-save path))
                            (object/update! this [:bos] empty)
                            (cmd/exec! :close-sidebar)
                            (object/raise selector :escape! false))
                          (object/raise this :review!)))))

(behavior ::display-buffer
          :triggers #{:display-buffer}
          :reaction (fn [this]
                      (let [bo-names (map :name (:bos @this))]
                        (notifos/set-msg! (apply str "gibo: "
                                                 (interpose ", " bo-names))))))

(object/object* ::gibo
                :tags #{:gibo}
                :bos #{}
                :selector nil
                :repo nil
                :init (fn [this]
                        (let [repo (object/create ::repo)
                              gibo-flist (gl/create {:items (gl/enlist repo action-items)
                                                     :key :name})]
                          (object/merge! this {:repo repo})
                          (object/merge! this {:selector gibo-flist}))))

(def gibo (object/create ::gibo))


;;;; user-reachable commands ;;;;

(cmd/command {:command :gibo.new
              :desc "gibo: new gitignore"
              :options (:selector @gibo)
              :exec (fn [coll])})

(cmd/command {:command :gibo.update
              :desc "gibo: update boilerplates"
              :exec (fn[]
                      (object/raise (:repo @gibo) :update!))})
