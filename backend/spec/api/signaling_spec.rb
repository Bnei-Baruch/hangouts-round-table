require_relative '../spec_helper'

describe RoundTable::API do
  it "should fail when accessing directly" do
    get '/socket'
    expect(last_response).to be_bad_request
  end

end
