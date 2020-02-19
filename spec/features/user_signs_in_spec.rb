require 'rails_helper'

feature 'user signs in', %Q{
  As a signed up user
  I want to sign in
  So that I can regain access to my account
} do
  scenario 'specify valid credentials' do

    user = User.create(
      email: "email@email.com",
      password: "password123",
      username: "username",
      city: "Boston",
      state: "MA",
      zip: "02116"
    )
    visit new_user_session_path

    fill_in 'Email', with: user.email
    fill_in 'Password', with: user.password
    fill_in 'User Name', with: user.username

    click_button 'Log in'

    expect(page).to have_content('Sign Out')
  end

  scenario 'specify invalid credentials' do
    visit new_user_session_path

    click_button 'Log in'
    expect(page).to_not have_content('Sign Out')
  end
end
