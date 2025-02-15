require "json"

package = JSON.parse(File.read(File.join(__dir__, "package.json")))

Pod::Spec.new do |s|
  s.name         = "react-native-white-label-app"
  s.version      = package["version"]
  s.summary      = "React Native version of Evernym's ConnectMe mobileSDK."
  s.description  = package["description"]
  s.homepage     = "https://gitlab.com/evernym/mobile/react-native-white-label-app.git"
  # brief license entry:
  s.license      =  { :type => 'MIT', :file => 'LICENSE' }
  s.authors      = { "Evernym Inc." => "info@evernym.com" }
  s.platforms    = { :ios => "11.0" }
  s.source       = { :git => "https://gitlab.com/evernym/mobile/react-native-white-label-app.git", :tag => "#{s.version}" }
  s.swift_version = '4.0'

  s.source_files = "ios/**/*.{h,c,m,swift}"
  s.requires_arc = true

  s.dependency "React-Core"
  s.dependency "vcx"

end
