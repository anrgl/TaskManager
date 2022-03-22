# frozen_string_literal: true

FactoryBot.define do
  sequence :string, aliases: %i[first_name last_name password name] do |n|
    "string#{n}"
  end

  sequence :email do |n|
    "user#{n}@email.com"
  end
end
