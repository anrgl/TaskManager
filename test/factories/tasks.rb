# frozen_string_literal: true

FactoryBot.define do
  factory :task do
    name
    description { 'MyString' }
    author_id { 1 }
    assignee_id { 1 }
    state { 'MyString' }
    expired_at { Time.now + 1.day }
  end
end