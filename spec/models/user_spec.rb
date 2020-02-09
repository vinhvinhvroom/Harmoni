require 'spec_helper'
require 'rails_helper'

describe User do

it { should have_valid(:email).when("zain@zain.com") }

it { should_not have_valid(:email).when(nil, "", "zain@", "zain", "zain.com") }

it { should have_valid(:encrypted_password).when("password", "123456", "I am long enough") }

it { should_not have_valid(:encrypted_password).when(nil, "", "short") }

it { should have_valid(:username).when("zainiac") }

it { should_not have_valid(:username).when(nil, "") }

it { should have_valid(:city).when("Boston") }

it { should_not have_valid(:city).when(nil, "") }

it { should have_valid(:state).when("MA") }

it { should_not have_valid(:state).when(nil, "") }

it { should have_valid(:zip).when("02116") }

it { should_not have_valid(:zip).when(nil, "") }


end

describe "#admin?" do

it "is not an admin if the role is not admin" do
  user = User.create(
    id:1,
    email:"zain@gmail.com",
    password:"password",
    username:"zaniac",
    city:"Boston",
    state:"MA",
    zip:"02116",
    role: "member"
  )
  expect(user.admin?).to eq(false)
end

it "is an admin if the role is admin" do
  user = User.create(
    id:1,
    email:"zain@gmail.com",
    password:"password",
    username:"zaniac",
    city:"Boston",
    state:"MA",
    zip:"02116",
    role: "admin"
  )
  expect(user.admin?).to eq(true)
end
end
