class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable

  has_many :comments

  validates :email, presence: true
  validates :encrypted_password, presence: true, length: { minimum: 6 }
  validates :username, presence: true
  validates :city, presence: true
  validates :state, presence: true, format: { with: /(?:A[KLRZ]|C[AOT]|D[CE]|FL|GA|HI|I[ADLN]|K[SY]|LA|M[ADEINOST]|N[CDEHJMVY]|O[HKR]|PA|RI|S[CD]|T[NX]|UT|V[AT]|W[AIVY])\z/, message: "only allows valid States" }
  validates :zip, presence: true, format: { with: /([0-9]{5}(?:-[0-9]{4})?)\z/, message: "only allows valid Zip Codes" }

  def admin?
    role == "admin"
  end

  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable


end
