require_relative 'spec_helper'

describe RoundTable::API do
  def app; RoundTable::API.new; end

  it "should fail when accessing directly" do
    get '/socket'
    expect(last_response).to be_bad_request
  end

end
