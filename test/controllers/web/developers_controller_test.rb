# frozen_string_literal: true

require 'test_helper'

module Web
  class DevelopersControllerTest < ActionController::TestCase
    test 'should get new' do
      get :new
      assert_response :success
    end

    test 'should post create' do
      post :create, params: { developer: attributes_for(:developer) }
      assert_response :redirect
    end
  end
end
