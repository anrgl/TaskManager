# frozen_string_literal: true

source 'https://rubygems.org'
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby '2.7.1'

gem 'jbuilder', '~> 2.7'
gem 'pg', '~> 1.1'
gem 'puma', '~> 5.0'
gem 'rails', '~> 6.1.4', '>= 6.1.4.4'
gem 'sass-rails', '>= 6'
gem 'webpacker', '~> 5.0'
gem 'active_model_serializers'
gem 'bcrypt', '~> 3.1.7'
gem 'kaminari'
gem 'ransack', github: 'activerecord-hackery/ransack'
gem 'responders'
gem 'simple_form'
gem 'slim-rails'
gem 'state_machines'
gem 'state_machines-activerecord'
gem 'bootsnap', '>= 1.4.4', require: false
gem 'simple_form'
gem 'state_machines'
gem 'state_machines-activerecord'

group :development, :test do
  gem 'byebug', platforms: %i[mri mingw x64_mingw]
  gem 'factory_bot_rails'
  gem 'rubocop'
end

group :development do
  gem 'listen', '~> 3.3'
  gem 'rack-mini-profiler', '~> 2.0'
  gem 'web-console', '>= 4.1.0'
end

group :test do
  gem 'capybara', '>= 3.26'
  gem 'selenium-webdriver'
  gem 'webdrivers'
end

gem 'tzinfo-data', platforms: %i[mingw mswin x64_mingw jruby]
