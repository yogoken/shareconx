# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20170518181023) do

  create_table "bookmarks", force: :cascade do |t|
    t.integer  "tweet_id",   limit: 4
    t.integer  "user_id",    limit: 4
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "bookmarks", ["tweet_id"], name: "index_bookmarks_on_tweet_id", using: :btree
  add_index "bookmarks", ["user_id"], name: "index_bookmarks_on_user_id", using: :btree

  create_table "comment_likes", force: :cascade do |t|
    t.integer  "user_id",    limit: 4
    t.integer  "comment_id", limit: 4
    t.integer  "tweet_id",   limit: 4
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "comments", force: :cascade do |t|
    t.integer  "user_id",               limit: 4
    t.integer  "tweet_id",              limit: 4
    t.text     "text",                  limit: 65535
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "user_nickname",         limit: 255
    t.string   "company_cd",            limit: 255
    t.integer  "comment_replies_count", limit: 4
    t.integer  "comment_likes_count",   limit: 4
  end

  create_table "companies", force: :cascade do |t|
    t.string   "company_cd",        limit: 255
    t.string   "company_full_name", limit: 255
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "feed_contents", force: :cascade do |t|
    t.integer  "content_id",   limit: 4
    t.string   "content_type", limit: 255
    t.integer  "tweet_id",     limit: 4
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "comment_id",   limit: 4
  end

  create_table "pvs", force: :cascade do |t|
    t.integer  "tweet_id",   limit: 4
    t.integer  "user_id",    limit: 4
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "replies", force: :cascade do |t|
    t.integer  "comment_id",    limit: 4
    t.integer  "user_id",       limit: 4
    t.string   "user_nickname", limit: 255
    t.text     "text",          limit: 65535
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "tweet_id",      limit: 4
    t.string   "company_cd",    limit: 255
  end

  create_table "tweet_likes", force: :cascade do |t|
    t.integer  "user_id",    limit: 4
    t.integer  "tweet_id",   limit: 4
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "tweets", force: :cascade do |t|
    t.integer  "user_id",                limit: 4
    t.text     "text",                   limit: 65535
    t.datetime "created_at"
    t.datetime "updated_at"
    t.text     "title",                  limit: 65535
    t.string   "nickname",               limit: 255
    t.integer  "room_id",                limit: 4
    t.string   "company_cd",             limit: 255
    t.integer  "tweet_likes_count",      limit: 4
    t.integer  "tweet_comments_count",   limit: 4
    t.integer  "tweet_replies_count",    limit: 4
    t.integer  "pvs",                    limit: 4
    t.integer  "comment_likes_count",    limit: 4
    t.integer  "bookmarked_count",       limit: 4
    t.integer  "violation_report_count", limit: 4
    t.integer  "judge_flg",              limit: 4
  end

  create_table "users", force: :cascade do |t|
    t.string   "email",                  limit: 255,   default: "", null: false
    t.string   "encrypted_password",     limit: 255,   default: "", null: false
    t.string   "reset_password_token",   limit: 255
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          limit: 4,     default: 0,  null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip",     limit: 255
    t.string   "last_sign_in_ip",        limit: 255
    t.datetime "created_at",                                        null: false
    t.datetime "updated_at",                                        null: false
    t.text     "nickname",               limit: 65535
    t.integer  "company_id",             limit: 4
    t.integer  "bookmarks_count",        limit: 4
    t.datetime "company_updated_at"
    t.string   "confirmation_token",     limit: 255
    t.datetime "confirmed_at"
    t.datetime "confirmation_sent_at"
    t.string   "unconfirmed_email",      limit: 255
  end

  add_index "users", ["confirmation_token"], name: "index_users_on_confirmation_token", unique: true, using: :btree
  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree
  add_index "users", ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree

  create_table "violation_reports", force: :cascade do |t|
    t.integer  "user_id",    limit: 4
    t.text     "text",       limit: 65535
    t.datetime "created_at",               null: false
    t.datetime "updated_at",               null: false
    t.string   "option",     limit: 255
    t.integer  "tweet_id",   limit: 4
  end

end
