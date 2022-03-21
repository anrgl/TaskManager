# frozen_string_literal: true

module Web
  class ApplicationController < ApplicationController
    include AuthHelper
    helper_method :current_user
  end
end
