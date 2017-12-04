(ns lt.plugins.gibo.files
  (:require [lt.objs.files     :as fs]
            [lt.objs.workspace :as ws]
            [clojure.string    :as string]))


;;;; file and path helpers ;;;;

(defn pwd
  "Returns the Presumably Working Directory."
  []
  (first (:folders @ws/current-ws)))

(defn bo-name
  ""
  [file]
  (fs/basename file ".gitignore"))

(defn gitignore?
  ""
  [file]
  (= (fs/ext file) "gitignore"))

(defn git?
  "Checks if a .git repository exists at the given path."
  [path]
  (fs/exists? (fs/join path ".git")))

(defn gitignore-at

  [path]
  (fs/join path ".gitignore"))


;;;; boilerplate reading and processing ;;;;

(defn local-bos

  [r]
  (sort-by #(string/lower-case (bo-name %))
           (filter gitignore? (repo-path-ls r))))

(defn repo-path-ls
  [p]
  (let [global (fn [_] (fs/join _ "Global"))]
    (concat (->> (map fs/full-path-ls p)
                 (apply concat))
            (->> p
                 (filter #(fs/dir? (global %)))
                 (map #(global %))
                 (map fs/full-path-ls)
                 (apply concat)))))

(defn ->content [coll]
  (str "## " (:name coll)
       " ##\n\n"
       (fs/bomless-read (:file coll))))

(defn gitignore<- [coll]
  (string/join (interpose "\n\n" (map #(->content %) coll))))

(defn ->bo [coll]
  (map #(hash-map :name (bo-name %)
                  :file %)
       coll))
