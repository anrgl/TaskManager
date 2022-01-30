# frozen_string_literal: true

FactoryBot.define do
  factory :task do
    name
    description { 'MyString' }
    author factory: :manager
    assignee factory: :developer
    state { 'MyString' }
    expired_at { Time.now + 1.day }
  end
end