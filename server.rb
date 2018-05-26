require "dotenv/load"
require "haml"
require "tilt/haml"
require 'sinatra'
require "pg"
require "sinatra/activerecord"
require 'active_support/all'
require "sinatra/json"
require "sinatra/reloader" if development?
require "sinatra/cookies"
require "cloudinary"
require "securerandom"

require 'twilio-ruby'

require "./selfie"


def create_grant(room,identity)

  # put your own account credentials here:
  account_sid = ENV['TWILIO_ACCOUNT_SID']
  api_key = ENV['TWILIO_API_KEY']
  api_secret = ENV['TWILIO_API_SECRET']
  auth_token = ENV['TWILIO_AUTH_TOKEN']

  # Create Video grant for our token
  video_grant = Twilio::JWT::AccessToken::VideoGrant.new
  video_grant.room = room

  # Create an Access Token
  token = Twilio::JWT::AccessToken.new(
    account_sid,
    api_key,
    api_secret,
    [video_grant],
    identity: identity
  )

  token.to_jwt
end


def get_recording_url(sid)
  account_sid = ENV['TWILIO_ACCOUNT_SID']
  auth_token = ENV['TWILIO_AUTH_TOKEN']

  client = Twilio::REST::Client.new account_sid, auth_token

  rec = client.video.recordings.list(grouping_sid: sid).first
  uri = rec.links["media"]

  response = client.request('video.twilio.com', 443, 'GET', uri)
  response.body['redirect_to']
end

def upload_video_to_cloudinary(url)
  video =  Cloudinary::Uploader.upload(url, :resource_type => :video)
  video["secure_url"].gsub(/\.mkv$/,".mp4")
end


Time.zone = "Eastern Time (US & Canada)"

def make_token
  SecureRandom.urlsafe_base64(64).gsub(/\-/,"")[0..47].downcase
end

class SelfieApp < Sinatra::Base
  register Sinatra::ActiveRecordExtension
  helpers Sinatra::Cookies

  configure :production do
    set :host, "www.selfielove.us"
    set :force_ssl, true
  end
  

  get '/' do
    token = create_grant("record",request.ip.to_s)
    cookies[:token] ||= make_token

    @props  = { token: token }
    haml :index
  end

  post '/selfie' do
    sid = params["sid"]

    recording_url = nil
    while recording_url == nil do
      sleep 0.25 
      recording_url = get_recording_url(sid)
    end

    cookies[:token] ||= make_token
    
    sleep 0.25 
    video_url = upload_video_to_cloudinary(recording_url)

    selfie = Selfie.create(
      ip_address: request.ip,
      selfie_url: video_url,
      token: cookies[:token]
    )
    
    status 202
  end

  get '/show' do
    cookies[:token] ||= make_token
    my_selfie = Selfie.where(token: cookies[:token]).last
    @selfies = Selfie.where.not(token: cookies[:token]).last(40).uniq { |s| s.token }
    @selfies = [ my_selfie ] + @selfies
    @selfies = @selfies.compact.first(4)
    @props = { display: 'view' }
    haml :show
  end
end

