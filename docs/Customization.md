# Configuration

After running `evernym-sdk:configure` command all required modules and assets will set up with default values. 

**Ensure** that you completed build configuration for target platforms.

You should be able to run the application at this point or proceed to modify provided default configuration.

For more convenience, we grouped all configuration options by files representing either a corresponding application screen or piece of functionality.
For example `home.js` contains options for `Home` screen.

**Content:**
- [Configuration](#configuration)
  - [Application](#application)
    - [Receiving Message](#receiving-message)
    - [Color theme](#color-theme)
    - [Font](#font)
    - [Environment](#environment)
    - [End User License Agreement](#end-user-license-agreement)
    - [Start up](#start-up)
    - [Lock](#lock)
    - [Home](#home)
    - [Connections](#connections)
    - [Credentials](#credentials)
    - [Navigation Menu](#navigation-menu)
    - [Collecting log information](#collecting-log-information)
    - [Credential Offer](#credential-offer)
    - [Proof Request](#proof-request)
    - [Proof Proposal](#proof-proposal)
    - [Proof](#proof)
    - [Question](#question)
    - [Invite Action](#invite-action)
    - [Settings](#settings)
    - [Feedback](#feedback)
    - [Application information](#application-information)
    - [Splash screen and app icon](#splash-screen-and-app-icon)
    - [Credential attachments](#credential-attachments)
  - [Examples](#examples)
    - [Credential](#credential)
    - [Proof request](#proof-request-1)
  - [Advanced](#advanced)

## Application

The base application settings should be specified in `app.js` file.

* `APP_NAME` - (string, Mandatory) name of the application 
    ```javascript
    export const APP_NAME = 'AppName'
    ```

* `APP_ICON` - (image source, Optional) application icon 
    * to use default MSDK icon
        ```javascript
        export const APP_ICON = null
        ```
    * to use custom
        ```javascript
        export const APP_ICON = require('app_icon.png')
        ```

* `APP_LOGO` - (image source, Optional) small application logo used on several screens. 
    * to use default MSDK logo
        ```javascript
        export const APP_LOGO = null
        ```
    * to use custom
        ```javascript
        export const APP_LOGO = require('logo_app.png')
        ```

* `COMPANY_NAME` - (string, Optional) name of a company built app. 
    * to omit 
        ```javascript
        export const APP_LOGO = null
        ```
    * to use custom 
        ```javascript
        export const COMPANY_NAME = 'Company'
        ```

* `COMPANY_LOGO` - (image source, Optional) logo of a company built application. 
    * to omit 
         ```javascript
         export const COMPANY_LOGO = null
         ```
     * to use custom
         ```javascript
        export const COMPANY_LOGO = require('app_company.png')
         ```
 
* `DEFAULT_USER_AVATAR` - (image source, Optional) default user avatar placeholder.
    * to use default avatar
        ```javascript
        export const DEFAULT_USER_AVATAR = null
        ```
    * to use custom
        ```javascript
        export const DEFAULT_USER_AVATAR = require('user_avatar.png')
        ```
 
* `DEEP_LINK` - (string, Optional) Branch.io Deep link address.
  * to omit
      ```javascript
      export const DEEP_LINK = null
      ```
    * to use custom
        ```javascript
        export const DEEP_LINK = 'https://address.com'
        ```

### Receiving Message

There are two strategies regarding receiving messages by an application:

1. **Polling** - app once in a while calls Cloud Agent to get all new messages for all existing connections.

2. **Push Notifications** - There is configured Push Notification service which notifies the application about new messages.

By default, app uses **Polling** strategy which follows rules:

* Download messages by manual pulling screen down
* Download messages when a user navigates to `Home` screen.
* Download messages every 15 seconds when a user holds on `Home` screen. 
* Download messages in 30 second after taking some action (accepting Connection Invitation / Credential Offer / Proof Request)

If you wish to use **Push Notifications** strategy you need to set variable `USE_PUSH_NOTIFICATION` in the `app.js` module:
* `USE_PUSH_NOTIFICATION` - (boolean, Optional) whether you want to enable push notifications logic.
    * to use default - **false**
        ```javascript
        export const USE_PUSH_NOTIFICATION = null
        ```
    * to enable
        ```javascript
        export const USE_PUSH_NOTIFICATION = true
        ```
      
**NOTE** that if you decided to enable Push Notifications you **MUST** configure Firebase for target build platforms!
* [Android](./Build-Android.md#push-notifications-configuration)  
* [iOS](./Build-iOS.md#push-notifications-configuration)  
      
### Color theme

Application color theme is set by a group of constants provided in `colors.js` configuration module. 
It is used throughout the whole application.

* `COLORS` - (object, Optional) color palette to use.
    * to use default 
         ```javascript
         export const COMPANY_LOGO = null
         ```
         Default:
        ```
        {
          main: '#86B93B',
          secondary: 'rgba(134, 185, 59, 0.15)',
          green1: '#86B93B',
          green2: '#6C8E3A',
          green3: 'rgba(134, 185, 59, 0.15)',
          red: '#CE0B24',
          orange: '#EB9B2D',
          white: '#FFFFFF',
          gray5: '#F2F2F2',
          gray4: '#EAEAEA',
          gray3: '#A5A5A5',
          gray2: '#777777',
          gray1: '#505050',
          gray0: '#404040',
          black: '#000000',
          blue: '#236BAE',
        }
        ```
     * to use custom
         ```javascript
        export const COMPANY_LOGO = {
          main: '#236BAE',
          secondary: '#11ABAE',
          ...
        }
         ```

### Font

You can specify the font which will be used in the app inside the `font.js` module.

* `FONT_FAMILY` - (string, Optional) font family to use.

    * to use default - `Lato`
        ```javascript
        export const FONT_FAMILY = null
        ```
    * to use custom
        ```javascript
        export const FONT_FAMILY = 'Roboto'
        ```
  
* `FONT_SIZES` - (string, Optional)  grid to use for fonts.

    * to use default - `Lato`
        ```javascript
        export const FONT_SIZES = null
        ```
      Default:
      ```
      {
        size0: 42,
        size1: 26,
        size2: 23,
        size3: 19,
        size4: 17,
        size5: 15,
        size6: 14,
        size7: 13,
        size8: 11,
        size9: 10,
        size10: 9,
        size11: 8,
      }
      ```
    * to use custom
        ```
        export const FONT_SIZES = {
          size0: 36,
          size1: 22,
          ...
        ```

### Environment

You can configure a server environment used for agent provisioning inside the `provision.js` module.

* `SERVER_ENVIRONMENTS` - (object) additional custom server configurations:
    * to use default 
        ```javascript
        export const SERVER_ENVIRONMENTS = {}
        ```
      Default:
      * Debug - `DEVTEAM1`
           ```
            agencyUrl: 'https://agency-team1.pdev.evernym.com',
            agencyDID: 'TGLBMTcW9fHdkSqown9jD8',
            agencyVerificationKey: 'FKGV9jKvorzKPtPJPNLZkYPkLhiS1VbxdvBgd1RjcQHR',
            poolConfig: '{"reqSignature":{},"txn":{"data":{"data":{"alias":"Node1","blskey":"4N8aUNHSgjQVgkpm8nhNEfDf6txHznoYREg9kirmJrkivgL4oSEimFF6nsQ6M41QvhM2Z33nves5vfSn9n1UwNFJBYtWVnHYMATn76vLuL3zU88KyeAYcHfsih3He6UHcXDxcaecHVz6jhCYz1P2UZn2bDVruL5wXpehgBfBaLKm3Ba","blskey_pop":"RahHYiCvoNCtPTrVtP7nMC5eTYrsUA8WjXbdhNc8debh1agE9bGiJxWBXYNFbnJXoXhWFMvyqhqhRoq737YQemH5ik9oL7R4NTTCz2LEZhkgLJzB3QRQqJyBNyv7acbdHrAT8nQ9UkLbaVL9NBpnWXBTw4LEMePaSHEw66RzPNdAX1","client_ip":"54.71.181.31","client_port":9702,"node_ip":"54.71.181.31","node_port":9701,"services":["VALIDATOR"]},"dest":"Gw6pDLhcBcoQesN72qfotTgFa7cbuqZpkX3Xo6pLhPhv"},"metadata":{"from":"Th7MpTaRZVRYnPiabds81Y"},"type":"0"},"txnMetadata":{"seqNo":1,"txnId":"fea82e10e894419fe2bea7d96296a6d46f50f93f9eeda954ec461b2ed2950b62"},"ver":"1"}\n{"reqSignature":{},"txn":{"data":{"data":{"alias":"Node2","blskey":"37rAPpXVoxzKhz7d9gkUe52XuXryuLXoM6P6LbWDB7LSbG62Lsb33sfG7zqS8TK1MXwuCHj1FKNzVpsnafmqLG1vXN88rt38mNFs9TENzm4QHdBzsvCuoBnPH7rpYYDo9DZNJePaDvRvqJKByCabubJz3XXKbEeshzpz4Ma5QYpJqjk","blskey_pop":"Qr658mWZ2YC8JXGXwMDQTzuZCWF7NK9EwxphGmcBvCh6ybUuLxbG65nsX4JvD4SPNtkJ2w9ug1yLTj6fgmuDg41TgECXjLCij3RMsV8CwewBVgVN67wsA45DFWvqvLtu4rjNnE9JbdFTc1Z4WCPA3Xan44K1HoHAq9EVeaRYs8zoF5","client_ip":"54.71.181.31","client_port":9704,"node_ip":"54.71.181.31","node_port":9703,"services":["VALIDATOR"]},"dest":"8ECVSk179mjsjKRLWiQtssMLgp6EPhWXtaYyStWPSGAb"},"metadata":{"from":"EbP4aYNeTHL6q385GuVpRV"},"type":"0"},"txnMetadata":{"seqNo":2,"txnId":"1ac8aece2a18ced660fef8694b61aac3af08ba875ce3026a160acbc3a3af35fc"},"ver":"1"}\n{"reqSignature":{},"txn":{"data":{"data":{"alias":"Node3","blskey":"3WFpdbg7C5cnLYZwFZevJqhubkFALBfCBBok15GdrKMUhUjGsk3jV6QKj6MZgEubF7oqCafxNdkm7eswgA4sdKTRc82tLGzZBd6vNqU8dupzup6uYUf32KTHTPQbuUM8Yk4QFXjEf2Usu2TJcNkdgpyeUSX42u5LqdDDpNSWUK5deC5","blskey_pop":"QwDeb2CkNSx6r8QC8vGQK3GRv7Yndn84TGNijX8YXHPiagXajyfTjoR87rXUu4G4QLk2cF8NNyqWiYMus1623dELWwx57rLCFqGh7N4ZRbGDRP4fnVcaKg1BcUxQ866Ven4gw8y4N56S5HzxXNBZtLYmhGHvDtk6PFkFwCvxYrNYjh","client_ip":"54.71.181.31","client_port":9706,"node_ip":"54.71.181.31","node_port":9705,"services":["VALIDATOR"]},"dest":"DKVxG2fXXTU8yT5N7hGEbXB3dfdAnYv1JczDUHpmDxya"},"metadata":{"from":"4cU41vWW82ArfxJxHkzXPG"},"type":"0"},"txnMetadata":{"seqNo":3,"txnId":"7e9f355dffa78ed24668f0e0e369fd8c224076571c51e2ea8be5f26479edebe4"},"ver":"1"}\n{"reqSignature":{},"txn":{"data":{"data":{"alias":"Node4","blskey":"2zN3bHM1m4rLz54MJHYSwvqzPchYp8jkHswveCLAEJVcX6Mm1wHQD1SkPYMzUDTZvWvhuE6VNAkK3KxVeEmsanSmvjVkReDeBEMxeDaayjcZjFGPydyey1qxBHmTvAnBKoPydvuTAqx5f7YNNRAdeLmUi99gERUU7TD8KfAa6MpQ9bw","blskey_pop":"RPLagxaR5xdimFzwmzYnz4ZhWtYQEj8iR5ZU53T2gitPCyCHQneUn2Huc4oeLd2B2HzkGnjAff4hWTJT6C7qHYB1Mv2wU5iHHGFWkhnTX9WsEAbunJCV2qcaXScKj4tTfvdDKfLiVuU2av6hbsMztirRze7LvYBkRHV3tGwyCptsrP","client_ip":"54.71.181.31","client_port":9708,"node_ip":"54.71.181.31","node_port":9707,"services":["VALIDATOR"]},"dest":"4PS3EDQ3dW1tci1Bp6543CfuuebjFrg36kLAUcskGfaA"},"metadata":{"from":"TWwCRQRZ2ZHMJFn9TzLp7W"},"type":"0"},"txnMetadata":{"seqNo":4,"txnId":"aa5e817d7cc626170eca175822029339a444eb0ee8f0bd20d3b0b76e566fb008"},"ver":"1"}',
          ```
      * Production - `PROD`
          ```
            agencyUrl: 'https://agency.evernym.com',
            agencyDID: 'DwXzE7GdE5DNfsrRXJChSD',
            agencyVerificationKey: '844sJfb2snyeEugKvpY7Y4jZJk9LT6BnS6bnuKoiqbip',
            poolConfig: '{"reqSignature":{},"txn":{"data":{"data":{"alias":"ev1","client_ip":"54.207.36.81","client_port":"9702","node_ip":"18.231.96.215","node_port":"9701","services":["VALIDATOR"]},"dest":"GWgp6huggos5HrzHVDy5xeBkYHxPvrRZzjPNAyJAqpjA"},"metadata":{"from":"J4N1K1SEB8uY2muwmecY5q"},"type":"0"},"txnMetadata":{"seqNo":1,"txnId":"b0c82a3ade3497964cb8034be915da179459287823d92b5717e6d642784c50e6"},"ver":"1"}\n{"reqSignature":{},"txn":{"data":{"data":{"alias":"zaValidator","client_ip":"154.0.164.39","client_port":"9702","node_ip":"154.0.164.39","node_port":"9701","services":["VALIDATOR"]},"dest":"BnubzSjE3dDVakR77yuJAuDdNajBdsh71ZtWePKhZTWe"},"metadata":{"from":"UoFyxT8BAqotbkhiehxHCn"},"type":"0"},"txnMetadata":{"seqNo":2,"txnId":"d5f775f65e44af60ff69cfbcf4f081cd31a218bf16a941d949339dadd55024d0"},"ver":"1"}\n{"reqSignature":{},"txn":{"data":{"data":{"alias":"danube","client_ip":"128.130.204.35","client_port":"9722","node_ip":"128.130.204.35","node_port":"9721","services":["VALIDATOR"]},"dest":"476kwEjDj5rxH5ZcmTtgnWqDbAnYJAGGMgX7Sq183VED"},"metadata":{"from":"BrYDA5NubejDVHkCYBbpY5"},"type":"0"},"txnMetadata":{"seqNo":3,"txnId":"ebf340b317c044d970fcd0ca018d8903726fa70c8d8854752cd65e29d443686c"},"ver":"1"}\n{"reqSignature":{},"txn":{"data":{"data":{"alias":"royal_sovrin","client_ip":"35.167.133.255","client_port":"9702","node_ip":"35.167.133.255","node_port":"9701","services":["VALIDATOR"]},"dest":"Et6M1U7zXQksf7QM6Y61TtmXF1JU23nsHCwcp1M9S8Ly"},"metadata":{"from":"4ohadAwtb2kfqvXynfmfbq"},"type":"0"},"txnMetadata":{"seqNo":4,"txnId":"24d391604c62e0e142ea51c6527481ae114722102e27f7878144d405d40df88d"},"ver":"1"}\n{"reqSignature":{},"txn":{"data":{"data":{"alias":"digitalbazaar","client_ip":"34.226.105.29","client_port":"9701","node_ip":"34.226.105.29","node_port":"9700","services":["VALIDATOR"]},"dest":"D9oXgXC3b6ms3bXxrUu6KqR65TGhmC1eu7SUUanPoF71"},"metadata":{"from":"rckdVhnC5R5WvdtC83NQp"},"type":"0"},"txnMetadata":{"seqNo":5,"txnId":"56e1af48ef806615659304b1e5cf3ebf87050ad48e6310c5e8a8d9332ac5c0d8"},"ver":"1"}\n{"reqSignature":{},"txn":{"data":{"data":{"alias":"OASFCU","client_ip":"38.70.17.248","client_port":"9702","node_ip":"38.70.17.248","node_port":"9701","services":["VALIDATOR"]},"dest":"8gM8NHpq2cE13rJYF33iDroEGiyU6wWLiU1jd2J4jSBz"},"metadata":{"from":"BFAeui85mkcuNeQQhZfqQY"},"type":"0"},"txnMetadata":{"seqNo":6,"txnId":"825aeaa33bc238449ec9bd58374b2b747a0b4859c5418da0ad201e928c3049ad"},"ver":"1"}\n{"reqSignature":{},"txn":{"data":{"data":{"alias":"BIGAWSUSEAST1-001","client_ip":"34.224.255.108","client_port":"9796","node_ip":"34.224.255.108","node_port":"9769","services":["VALIDATOR"]},"dest":"HMJedzRbFkkuijvijASW2HZvQ93ooEVprxvNhqhCJUti"},"metadata":{"from":"L851TgZcjr6xqh4w6vYa34"},"type":"0"},"txnMetadata":{"seqNo":7,"txnId":"40fceb5fea4dbcadbd270be6d5752980e89692151baf77a6bb64c8ade42ac148"},"ver":"1"}\n{"reqSignature":{},"txn":{"data":{"data":{"alias":"DustStorm","client_ip":"207.224.246.57","client_port":"9712","node_ip":"207.224.246.57","node_port":"9711","services":["VALIDATOR"]},"dest":"8gGDjbrn6wdq6CEjwoVStjQCEj3r7FCxKrA5d3qqXxjm"},"metadata":{"from":"FjuHvTjq76Pr9kdZiDadqq"},"type":"0"},"txnMetadata":{"seqNo":8,"txnId":"6d1ee3eb2057b8435333b23f271ab5c255a598193090452e9767f1edf1b4c72b"},"ver":"1"}\n{"reqSignature":{},"txn":{"data":{"data":{"alias":"prosovitor","client_ip":"138.68.240.143","client_port":"9711","node_ip":"138.68.240.143","node_port":"9710","services":["VALIDATOR"]},"dest":"C8W35r9D2eubcrnAjyb4F3PC3vWQS1BHDg7UvDkvdV6Q"},"metadata":{"from":"Y1ENo59jsXYvTeP378hKWG"},"type":"0"},"txnMetadata":{"seqNo":9,"txnId":"15f22de8c95ef194f6448cfc03e93aeef199b9b1b7075c5ea13cfef71985bd83"},"ver":"1"}\n{"reqSignature":{},"txn":{"data":{"data":{"alias":"iRespond","client_ip":"52.187.10.28","client_port":"9702","node_ip":"52.187.10.28","node_port":"9701","services":["VALIDATOR"]},"dest":"3SD8yyJsK7iKYdesQjwuYbBGCPSs1Y9kYJizdwp2Q1zp"},"metadata":{"from":"JdJi97RRDH7Bx7khr1znAq"},"type":"0"},"txnMetadata":{"seqNo":10,"txnId":"b65ce086b631ed75722a4e1f28fc9cf6119b8bc695bbb77b7bdff53cfe0fc2e2"},"ver":"1"}',
          ```
    * to add custom environments
        ```javascript
        export const SERVER_ENVIRONMENTS = {
          'PROD2': {
            agencyUrl: 'https://agency.app.com',
            agencyDID: 'did',
            agencyVerificationKey: 'verkey',
            poolConfig:
              '{"reqSignature":{},"txn":{"data": pool config data},"ver":"1"}',
            paymentMethod: 'sov',
          },
          'DEVTEAM2': {
            agencyUrl: 'https://dev.agency.app.com',
            agencyDID: 'did',
            agencyVerificationKey: 'verkey',
            poolConfig:
              '{"reqSignature":{},"txn":{"data": pool config data},"ver":"1"}',
            paymentMethod: 'sov',
          }
        }
        ```

* `DEFAULT_SERVER_ENVIRONMENT` - (string, Optional) the name of environment to use by default.
    * to use default - (`DEVTEAM1` for development / `PROD` for production)
        ```javascript
        export const DEFAULT_SERVER_ENVIRONMENT = null
        ```
    * to use custom 
        ```javascript
        export const DEFAULT_SERVER_ENVIRONMENT = 'PROD2'
        ```

* Information used for application provisioning
    * `GET_PROVISION_TOKEN_FUNC` - function to be called to get provisioning token.
       ```
        /// example
        export const GET_PROVISION_TOKEN_FUNC = async (): [error: string | null, token: string | null]  => {
          try {
             const response = fetch_api(your_endpoint)
             /// process response
             return [null, response.token]
          } catch (error) {
             return [error.message, null]
          }
        }
      ```
       
    * `SPONSOR_ID` - An ID given to you from Evernym's Support Team after the Sponsor onboarding process is complete.

          ```javascript
          export const SPONSOR_ID = 'sponsorid'
          ```

### End User License Agreement

You can configure EULA and privacy terms inside the `eula.js` module.

* `TERMS_AND_CONDITIONS_TITLE` - (string, Optional)  the text which will be used for the label.
    * to use default - `Terms and Conditions`
        ```javascript
        export const TERMS_AND_CONDITIONS_TITLE = null
        ```
    * to use custom
        ```javascript
        export const TERMS_AND_CONDITIONS_TITLE = 'Custom Terms and Conditions'
        ```

* `PRIVACY_POLICY_TITLE` - (string, Optional) the text which will be used for the label.
    * to use default - `Privacy Policy`
        ```javascript
        export const PRIVACY_POLICY_TITLE = null
        ```
    * to use custom
        ```javascript
        export const PRIVACY_POLICY_TITLE = 'Custom Privacy Policy'
        ```
  
* `CustomEulaScreen` - (React Component) custom component for Eula screen rendering (instead of predefined one).
    * to use default
        ```javascript
        export const CustomEulaScreen = null
        ```    
    * to use custom 
        ```javascript
        export const CustomEulaScreen = () => <Text>Custom Eula</Text>
        ```  
  
There are two type variables used for specifying documents location:
* URL - url address leading to web document version (is used by default)
    * `ANDROID_EULA_URL` - (string, Optional) url leading to EULA for android app 
        * to use default - `https://www.connect.me/google.html`
            ```javascript
            export const ANDROID_EULA_URL = null
            ```
        * to use custom
            ```javascript
            export const ANDROID_EULA_URL = 'https://www.custom./androud_eula.html'
            ```
      
    * `IOS_EULA_URL` -(string, Optional)  url leading to EULA for ios app
        * to use default - `https://www.connect.me/ios_eula.html`
            ```javascript
            export const IOS_EULA_URL = null
            ```
        * to use custom
            ```javascript
            export const IOS_EULA_URL = 'https://www.custom.me/ios_eula.html'
            ```
      
    * `PRIVACY_POLICY_URL` - (string, Optional) url leading to Privacy policy document
        * to use default - `https://www.connect.me/privacy.html`
            ```javascript
            export const PRIVACY_POLICY_URL = null
            ```
        * to use custom
            ```javascript
            export const PRIVACY_POLICY_URL = 'https://www.connect.me/privacy.html'
            ```

* LOCAL - path to local asset
    * `ANDROID_EULA_LOCAL` - (string, Optional) path to local EULA file for android app 
        * to use default - `None`
            ```javascript
            export const ANDROID_EULA_LOCAL = null
            ```
        * to use custom
            ```javascript
            export const ANDROID_EULA_LOCAL = 'file:///eula_android.html'
            ```
      
    * `IOS_EULA_LOCAL` - (string, Optional) path to local EULA file for ios app 
        * to use default - `None`
            ```javascript
            export const IOS_EULA_LOCAL = null
            ```
        * to use custom
            ```javascript
            export const IOS_EULA_LOCAL = './eula_ios.html'
            ```
      
    * `ANDROID_PRIVACY_POLICY_LOCAL` - (string, Optional) path to local Privacy policy document for android app
        * to use default - `None`
            ```javascript
            export const ANDROID_PRIVACY_POLICY_LOCAL = null
            ```
        * to use custom
            ```javascript
            export const ANDROID_PRIVACY_POLICY_LOCAL = 'file:///privacy.html'
            ```
      
    * `IOS_PRIVACY_POLICY_LOCAL` - (string, Optional) path to local Privacy policy document for ios app
        * to use default - `None`
            ```javascript
            export const IOS_PRIVACY_POLICY_LOCAL = null
            ```
        * to use custom
            ```javascript
            export const IOS_PRIVACY_POLICY_LOCAL = './privacy.html'
            ```

Note: By default, MSDK tries to use web versions of documents. Local assets will be used when there are connectivity issues.

### Start up

You can configure application startup wizard which is shown for the newly installed application inside the `startup.js` module. 

* `BACKGROUND_IMAGE` - (image source, Optional) image to use as a background:
    * to use default MSDK star up background
        ```javascript
        export const BACKGROUND_IMAGE = null
        ```
    * to use custom
        ```javascript
        export const BACKGROUND_IMAGE = require('setup.png')
        ```
  
* `CustomStartUpScreen` - (React Component) custom component for Start Up screen rendering (instead of predefined one).
    * to use default
        ```javascript
        export const CustomStartUpScreen = null
        ```    
    * to use custom 
        ```javascript
        export const CustomStartUpScreen = () => <Text>Custom Start Up</Text>
        ```  

* `ANDROID_DEVICE_CHECK_API_KEY` - (Android device verification API key generated from Google cloud console). This SDK also provides option to secure your app such that your app is authorized to run only on non-rooted devices and only on real devices. if you set this key this, SDK will check for device integrity and will show messages as you configure them using below constants. Although the name of variable has Android in it, SDK will run check on both Android and iOS if this key is set. If `null` is passed, then device verification will not be done on both Android and iOS.

* `deviceSecurityCheckFailedMessage` - This message is shown if device is rooted or if release build is running on simulator/emulator.

* `devicePlayServiceUpdateRequiredMessage` - This message is shown only for Android devices. If an Android device has incompatible version or old version of Play Service, then this message will be show to user with an option to update play service.

* `devicePlayServiceRequiredMessage` - This message is shown only for Android devices. If an Android device has play services disabled, then this message will be shown along with an option to enable from `Settings`.

### Lock

You can configure application locking screens (set up / enter / change password) inside the `lock.js` module.

* `LockHeader` - (React Component, Optional)component which will be displayed as the header (above password input):
    * to omit
        ```javascript
        export const LockHeader = null
        ```
    * to use custom
        ```javascript
        export const LockHeader = () => <Text>Hello</Text>
        ```

### Home

You can configure application `Home` screen inside the `home.js` module.

* `HEADLINE` - (string, Optional) the text which will be used for the header.
    * to use default - `Home`
        ```javascript
        export const HEADLINE = null
        ```
    * to use custom
        ```javascript
        export const HEADLINE = 'Custom Home'
        ```

* `HomeViewEmptyState` - (React Component, Optional) component to be displayed at the home screen in cases of no recent notifications.

    This will usually happen after new installation of the application.
    
    You can provide a greeting message as in this example:
    
    * to use default 
        ```javascript
        export const HomeViewEmptyState = null
        ```
    * to omit 
        ```javascript
        export const HomeViewEmptyState = () => null
        ```
    * to use custom
        ```javascript
        export const HomeViewEmptyState = () => {
          return (
            <Text>Hello, you now have a digital wallet!</Text>
          )
        }
        ```

* `SHOW_EVENTS_HISTORY` - (boolean, Optional) a flag indicating whether you want to show the history of events on the Home view.   
    * to use default - `show`
        ```javascript
        export const SHOW_EVENTS_HISTORY = null
        ```
    * to use custom
        ```javascript
        export const SHOW_EVENTS_HISTORY = true
        ```
      
* `CustomMyConnectionsScreen` - (React Component) custom component for Connections screen rendering (instead of predefined one).
  * to use default
      ```javascript
      export const CustomHomeScreen = null
      ```    
  * to use custom
      ```javascript
      export const CustomHomeScreen = () => <Text>Custom Home</Text>
      ``` 
    
### Connections

You can configure application `Connections` screen inside the `connections.js` module.

* `HEADLINE` - (string, Optional) the text which will be used for the header.
    * to use default - `show`
        ```javascript
        export const HEADLINE = null
        ```
    * to use custom
        ```javascript
        export const HEADLINE = 'Custom Connections'
        ```

* `MyConnectionsViewEmptyState` - (React Component, Optional) component to be displayed at the connections screen in cases of no connections made yet.
    * to use default 
        ```javascript
        export const MyConnectionsViewEmptyState = null
        ```
    * to omit 
        ```javascript
        export const MyConnectionsViewEmptyState = () => null
        ```
    * to use custom
        ```javascript
        export const MyConnectionsViewEmptyState = () => {
          return (
            <Text>You do not have connections yet!</Text>
          )
        }
        ```

* `SHOW_CAMERA_BUTTON` - (boolean, Optional) flag indicating whether you want to show camera button.
    * to use default - `true`
        ```javascript
        export const SHOW_CAMERA_BUTTON = null
        ```
    * to use custom
        ```javascript
        export const SHOW_CAMERA_BUTTON = false
        ```

* `CustomMyConnectionsScreen` - (React Component) custom component for Connections screen rendering (instead of predefined one).
    * to use default
        ```javascript
        export const CustomMyConnectionsScreen = null
        ```    
    * to use custom 
        ```javascript
        export const CustomMyConnectionsScreen = () => <Text>Custom Connections</Text>
        ``` 

* `CustomConnectionDetailsScreen` - (React Component) custom component for Connection Details screen rendering (instead of predefined one).
    * to use default
        ```javascript
        export const CustomConnectionDetailsScreen = null
        ```    
    * to use custom 
        ```javascript
        export const CustomConnectionDetailsScreen = () => <Text>Custom Connection Details</Text>
        ``` 

### Credentials

You can configure application `Credentials` screen inside the `credentials.js` module.

* `HEADLINE` - (string, Optional) the text which will be used for the header.
    * to use default - `show`
        ```javascript
        export const HEADLINE = null
        ```
    * to use custom
        ```javascript
        export const HEADLINE = 'Custom Credentials'
        ```

* `MyCredentialsViewEmptyState` - (React Component, Optional) component to be displayed at the credentials screen in cases of no credentials made yet.
    * to use default 
        ```javascript
        export const MyCredentialsViewEmptyState = null
        ```
    * to omit 
        ```javascript
        export const MyCredentialsViewEmptyState = () => null
        ```
    * to use custom
        ```javascript
        export const MyCredentialsViewEmptyState = () => {
          return (
            <Text>You do not have credentials yet!</Text>
          )
        }
        ```

* `SHOW_CAMERA_BUTTON` - (boolean, Optional) flag indicating whether you want to show camera button.
    * to use default - `true`
        ```javascript
        export const SHOW_CAMERA_BUTTON = null
        ```
    * to use custom
        ```javascript
        export const SHOW_CAMERA_BUTTON = false
        ```

* `CustomMyCredentialsScreen` - (React Component) custom component for Credentials screen rendering (instead of predefined one).
    * to use default
        ```javascript
        export const CustomMyCredentialsScreen = null
        ```    
    * to use custom 
        ```javascript
        export const CustomMyCredentialsScreen = () => <Text>Custom Credentials</Text>
        ``` 

* `CustomCredentialDetailsScreen` - (React Component) custom component for Credential Details screen rendering (instead of predefined one).
    * to use default
        ```javascript
        export const CustomCredentialDetailsScreen = null
        ```    
    * to use custom 
        ```javascript
        export const CustomCredentialDetailsScreen = () => <Text>Custom Credential Details</Text>
        ``` 
You can also configure application `Show Credentail` modal dialog or disable this feature.

* `SHOW_CREDENTIAL` - (boolean, Optional) whether you want to use the feature of presenting a credential (it reveals credential data to Verifier scanning QR code).
  * to use default - `true`
      ```javascript
      export const SHOW_CREDENTIAL = null
      ```
  * to use custom
      ```javascript
      export const SHOW_CREDENTIAL = false
    
* `AUTO_ACCEPT_CREDENTIAL_PRESENTATION_REQUEST` - (boolean, Optional) whether you want to automatically accept following `presentation request` and generate proof or show it to user for manually accepting.
  
  **NOTE**: acceptably if `SHOW_CREDENTIAL` feature is enable
  * to use default - `false`
      ```javascript
      export const AUTO_ACCEPT_CREDENTIAL_PRESENTATION_REQUEST = null
      ```
  * to use custom
      ```javascript
      export const AUTO_ACCEPT_CREDENTIAL_PRESENTATION_REQUEST = true

* `SHOW_CREDENTIAL_HEADLINE` - (string, Optional) the text which will be used for the header.
  * to use default - `show`
      ```javascript
      export const SHOW_CREDENTIAL_HEADLINE = null
      ```
  * to use custom
      ```javascript
      export const SHOW_CREDENTIAL_HEADLINE = 'Custom Show Credential'
      ```

* `CustomShowCredentialModal` - (React Component) custom component for Show Credential modal window rendering (instead of predefined one).
  * to use default
      ```javascript
      export const CustomShowCredentialModal = null
      ```    
  * to use custom
      ```javascript
      export const CustomShowCredentialModal = {
          screen: () => <Text>Custom Proof CustomShowCredentialModal</Text>, // Optional, React Component
          navigationOptions: {}, // Optional, ModalStack.Screen Options - https://reactnavigation.org/docs/screen-options
      } 
      ``` 

### Navigation Menu

You can configure navigation menu and app navigation inside the `navigator.js` module.

* `MENU_NAVIGATION_OPTIONS` - (object) The set of navigation options (and their labels) to be shown.
    * to use default
        ```javascript
        export const MENU_NAVIGATION_OPTIONS = null
        ```
        Default tabs:
        * Home
        * Connections
        * Credentials
        * Settings
    * to change predefined (for predefined routes `name, label, route, icon` are optional fields / defaults will be used if they are not specified) 
        ```javascript
        // Menu contains Home and Connections tabs
        export const MENU_NAVIGATION_OPTIONS = [
          {
            name: 'Connections',
            label: 'Other Connection Label'
          }
        ]     
        ```
    * to change order
        ```javascript
        export const MENU_NAVIGATION_OPTIONS = [
          {
            name: 'Settings',
          },
          {
            name: 'Connections',
          },
          {
            name: 'Credentials',
          }
        ]     
        ```
    * to add new route
        ```javascript
        // Menu contains Home and My Route tabs
        export const Component = () => {
          return <Text style={{color: colors.black}}>MY SCREEN</Text>
        }
        export const MENU_NAVIGATION_OPTIONS = [
          { 
            name: 'My Route', // id
            label: 'My Route', // label to show
            route: 'route', // route name
            icon: <Icon name="my" />, // icon to use
            component: Component // React Component to render
          }
        ]     
        ```

    **Note** - `Home` screen is always included.

* `DrawerHeaderContent` - (React Component) You can provide component to be displayed in the navigation drawer at the top, above the navigation section.
    * to use default 
        ```javascript
        export const DrawerHeaderContent = null
        ```
    * to omit 
        ```javascript
        export const DrawerHeaderContent = () => null
        ```
    * to use custom 
        ```javascript
        export const DrawerHeaderContent = (props: {
          height: number,
          width: number,
          fill: string,
        }) => <Text>You are using sdk-app</Text>
        ```

* `DrawerFooterContent` - (React Component) You can provide component to be displayed in the navigation drawer at the bottom, below the navigation section.
    * to use default 
        ```javascript
        export const DrawerFooterContent = null
        ```    
    * to omit 
        ```javascript
        export const DrawerFooterContent = () => null
        ```
    * to use custom 
        ```javascript
        export const DrawerFooterContent = () => <Text>You are using wallet 1.0.0</Text>
        ```

* `EXTRA_SCREENS` - (object) additional routes need to be registered in the app navigator inside **Screens** Stack Navigator (see https://reactnavigation.org/docs/stack-navigator/)
    * to use default
        ```javascript
        export const EXTRA_SCREENS = null
        export const EXTRA_SCREENS = []
        ```
    * to add custom 
        ```javascript
        export const Component = () => {
          return <Text style={{color: colors.black}}>MY SCREEN</Text>
        }
        export const EXTRA_SCREENS = [
          { 
            route: 'route', // route name
            component: Component, // React Component to render
            options: { title: 'Awesome app' } // see https://reactnavigation.org/docs/screen-options
          }
        ]
        ```

* `EXTRA_MODALS` - (object) additional routes need to be registered in the app navigator inside **Modal Windows** Stack Navigator (see https://reactnavigation.org/docs/stack-navigator/)
    * to use default
        ```javascript
        export const EXTRA_MODALS = null
        export const EXTRA_MODALS = []
        ```
    * to add custom 
        ```javascript
        export const Component = () => {
          return <Text style={{color: colors.black}}>MY SCREEN</Text>
        }
        export const EXTRA_MODALS = [
          { 
            route: 'route', // route name
            component: Component, // React Component to render
            options: { title: 'Awesome app' } // see https://reactnavigation.org/docs/screen-options
          }
        ]
        ```

### Collecting log information

You can configure data used for logging in the `logs.js` module.

You can receive encrypted log file by email.

* `SEND_LOGS_EMAIL` - (string) - email to send logs.
    * to use default - `cmsupport@evernym.com`
        ```javascript
        export const SEND_LOGS_EMAIL = null
        ```
    * to use custom 
        ```javascript
        export const SEND_LOGS_EMAIL = 'support@app.com'
        ```

* `CUSTOM_LOG_UTILS` - (object) key or URL to the file containing key used for log encryption.

    ```javascript
    export let CUSTOM_LOG_UTILS = {
      publicKeyUrl: '...',
      encryptionKey: '...',
    }
    ```

### Credential Offer

You can customize `Credential Offer` dialog in the `credential-offer.js` module.

* `HEADLINE` - (string) the text which will be used for the header.
    * to use default - `Credential Offer`
        ```javascript
        export const HEADLINE = null
        ```
    * to use custom 
        ```javascript
        export const HEADLINE = 'Custom Credential Offer'
        ```

* `ACCEPT_BUTTON_TEXT` - (string) the text which will be used for top (accept) button.
    * to use default - `Accept Credential`
        ```javascript
        export const ACCEPT_BUTTON_TEXT = null
        ```
    * to use custom 
        ```javascript
        export const ACCEPT_BUTTON_TEXT = 'Accept'
        ```

* `DENY_BUTTON_TEXT` - (string) the text which will be used for bottom (deny) button.
    * to use default - `Reject`
        ```javascript
        export const DENY_BUTTON_TEXT = null
        ```
    * to use custom 
        ```javascript
        export const DENY_BUTTON_TEXT = 'Deny'
        ```

* `CustomCredentialOfferModal` - (React Component) custom component for Credential Offer dialog rendering (instead of predefined one).
    * to use default
        ```javascript
        export const CustomCredentialOfferModal = null
        ```    
    * to use custom
        ```javascript
        export const CustomCredentialOfferModal = {
            screen: () => <Text>Custom Credential Offer Dialog</Text>, // Optional, React Component
            navigationOptions: {}, // Optional, ModalStack.Screen Options - https://reactnavigation.org/docs/screen-options
        } 
        ``` 

* `CustomCredentialOfferModal` - (React Component) custom component for received Credential dialog rendering (instead of predefined one).
    * to use default
        ```javascript
        export const CustomCredentialModal = null
        ```    
    * to use custom 
        ```javascript
        export const CustomCredentialModal = {
            screen: () => <Text>Custom Credential Dialog</Text>, // Optional, React Component
            navigationOptions: {}, // ModalStack.Screen Options - https://reactnavigation.org/docs/screen-options
        }        
       ``` 

### Proof Request 

You can customize `Proof Request` dialog in the `proof-request.js` module.

* `HEADLINE` - (string) the text which will be used for the header.
    * to use default - `Proof Request`
        ```javascript
        export const HEADLINE = null
        ```
    * to use custom 
        ```javascript
        export const HEADLINE = 'Custom Request'
        ```

* `ACCEPT_BUTTON_TEXT` - (string) the text which will be used for top (accept) button.
    * to use default - `Share Attributes`
        ```javascript
        export const ACCEPT_BUTTON_TEXT = null
        ```
    * to use custom 
        ```javascript
        export const ACCEPT_BUTTON_TEXT = 'Accept'
        ```

* `DENY_BUTTON_TEXT` - (string) the text which will be used for bottom (deny) button.
    * to use default - `Reject`
        ```javascript
        export const DENY_BUTTON_TEXT = null
        ```
    * to use custom 
        ```javascript
        export const DENY_BUTTON_TEXT = 'Deny'
        ```
      
* `CustomProofRequestModal` - (React Component) custom component for received Proof Request dialog rendering (instead of predefined one).
    * to use default
        ```javascript
        export const CustomProofRequestModal = null
        ```    
    * to use custom 
        ```javascript
        export const CustomProofRequestModal = {
            screen: () => <Text>Custom Proof Request Dialog</Text>, // Optional, React Component
            navigationOptions: {}, // Optional, ModalStack.Screen Options - https://reactnavigation.org/docs/screen-options
        } 
        ``` 
  
* `CustomSelectAttributeValueModal` - (React Component) custom component for selecting a credential for filling a requested attribute in Proof (instead of predefined one).
    * to use default
        ```javascript
        export const CustomSelectAttributeValueModal = null
        ```    
    * to use custom 
        ```javascript
        export const CustomSelectAttributeValueModal = {
            screen: () => <Text>Custom Dialog</Text>, // Optional, React Component
            navigationOptions: {}, // Optional, ModalStack.Screen Options - https://reactnavigation.org/docs/screen-options
        }         
      ``` 

* `CustomSelectAttributesValuesModal` - (React Component) custom component for selecting a credential for filling a requested attribute group in Proof (instead of predefined one).
    * to use default
        ```javascript
        export const CustomSelectAttributesValuesModal = null
        ```    
    * to use custom 
        ```javascript
        export const CustomSelectAttributesValuesModal = {
            screen: () => <Text>Custom Dialog</Text>, // Optional, React Component
            navigationOptions: {}, // Optional, ModalStack.Screen Options - https://reactnavigation.org/docs/screen-options
        }          
      ``` 

* `CustomEnterAttributeValueModal` - (React Component) custom component for entering a custom value for a requested attribute which can be self attested in Proof (instead of predefined one).
    * to use default
        ```javascript
        export const CustomEnterAttributeValueModal = null
        ```    
    * to use custom 
        ```javascript
        export const CustomEnterAttributeValueModal = {
            screen: () => <Text>Custom Dialog</Text>, // Optional, React Component
            navigationOptions: {}, // Optional, ModalStack.Screen Options - https://reactnavigation.org/docs/screen-options
        }         
      ``` 

### Proof Proposal

You can customize `Proof Proposal` dialog in the `proof-proposal.js` module.

* `HEADLINE` - (string) the text which will be used for the header.
  * to use default - `Proof Proposal`
      ```javascript
      export const HEADLINE = null
      ```
  * to use custom
      ```javascript
      export const HEADLINE = 'Custom Proposal'
      ```

* `ACCEPT_BUTTON_TEXT` - (string) the text which will be used for top (accept) button.
  * to use default - `Accept`
      ```javascript
      export const ACCEPT_BUTTON_TEXT = null
      ```
  * to use custom
      ```javascript
      export const ACCEPT_BUTTON_TEXT = 'Ok'
      ```

* `DENY_BUTTON_TEXT` - (string) the text which will be used for bottom (deny) button.
  * to use default - `Cancel`
      ```javascript
      export const DENY_BUTTON_TEXT = null
      ```
  * to use custom
      ```javascript
      export const DENY_BUTTON_TEXT = 'Deny'
      ```

* `CustomProofProposalModal` - (React Component) custom component for received Proof Proposal dialog rendering (instead of predefined one).
  * to use default
      ```javascript
      export const CustomProofProposalModal = null
      ```    
  * to use custom
      ```javascript
      export const CustomProofProposalModal = {
          screen: () => <Text>Custom Proof Proposal Dialog</Text>, // Optional, React Component
          navigationOptions: {}, // Optional, ModalStack.Screen Options - https://reactnavigation.org/docs/screen-options
      } 
      ``` 

### Proof

You can customize `Shared Proof` and `Received Proof` dialogs in the `proof.js` module.

* `SHARED_PROOF_HEADLINE` - (string) the text which will be used for the header of `Shared Proof` dialog.
  * to use default - `Proof`
      ```javascript
      export const SHARED_PROOF_HEADLINE = null
      ```
  * to use custom
      ```javascript
      export const SHARED_PROOF_HEADLINE = 'Custom Header'
      ```

* `CustomSharedProofModal` - (React Component) custom component for received Shared Proof dialog rendering (instead of predefined one).
  * to use default
      ```javascript
      export const CustomSharedProofModal = null
      ```    
  * to use custom
      ```javascript
      export const CustomSharedProofModal = {
          screen: () => <Text>Custom Proof Dialog</Text>, // Optional, React Component
          navigationOptions: {}, // Optional, ModalStack.Screen Options - https://reactnavigation.org/docs/screen-options
      } 
      ``` 

* `RECEIVED_PROOF_HEADLINE` - (string) the text which will be used for the header of `Received Proof` dialog.
  * to use default - `Proof`
      ```javascript
      export const RECEIVED_PROOF_HEADLINE = null
      ```
  * to use custom
      ```javascript
      export const RECEIVED_PROOF_HEADLINE = 'Custom Header'
      ```

* `CustomProofProposalModal` - (React Component) custom component for received Proof dialog rendering (instead of predefined one).
  * to use default
      ```javascript
      export const CustomProofProposalModal = null
      ```    
  * to use custom
      ```javascript
      export const CustomReceivedProofModal = {
          screen: () => <Text>Custom Proof Dialog</Text>, // Optional, React Component
          navigationOptions: {}, // Optional, ModalStack.Screen Options - https://reactnavigation.org/docs/screen-options
      } 
      ``` 

### Question 

You can customize `Question` dialog in the `question-dialog.js` module.

* `HEADLINE` - (string) the text which will be used for the header.
    * to use default - `Proof Request`
        ```javascript
        export const HEADLINE = null
        ```
    * to use custom 
        ```javascript
        export const HEADLINE = 'Custom Request'
        ```

* `CustomQuestionModal` - (React Component) custom component for rendering of Question dialog (instead of predefined one).
    * to use default
        ```javascript
        export const CustomQuestionModal = null
        ```    
    * to use custom 
        ```javascript
        export const CustomQuestionModal = {
            screen: () => <Text>Custom Question Dialog</Text>, // Optional, React Component
            navigationOptions: {}, // Optional, ModalStack.Screen Options - https://reactnavigation.org/docs/screen-options
        }         
      ``` 
### Invite Action

You can customize `Invite Action` dialog in the `invite-action.js` module.

* `HEADLINE` - (string) the text which will be used for the header.
    * to use default - `New Message`
        ```javascript
        export const HEADLINE = null
        ```
    * to use custom 
        ```javascript
        export const HEADLINE = 'Custom Headline'
        ```

* `ACCEPT_BUTTON_TEXT` - (string) the text which will be used for top (accept) button.
    * to use default - `Accept`
        ```javascript
        export const ACCEPT_BUTTON_TEXT = null
        ```
    * to use custom 
        ```javascript
        export const ACCEPT_BUTTON_TEXT = 'Ok'
        ```

* `DENY_BUTTON_TEXT` - (string) the text which will be used for bottom (deny) button.
    * to use default - `Reject`
        ```javascript
        export const DENY_BUTTON_TEXT = null
        ```
    * to use custom 
        ```javascript
        export const DENY_BUTTON_TEXT = 'Deny'
        ```

* `CustomInviteActionModal` - (React Component) custom component for Invite Action dialog rendering (instead of predefined one).
    * to use default
        ```javascript
        export const CustomInviteActionModal = null
        ```    
    * to use custom 
        ```javascript
        export const CustomInviteActionModal = {
            screen: () => <Text>Custom Question Dialog</Text>, // Optional, React Component
            navigationOptions: {}, // Optional, ModalStack.Screen Options - https://reactnavigation.org/docs/screen-options
        }        
      ``` 
      
### Settings

You can customize `Settings` view in the `settings.js` module.

1. `HEADLINE` - (string) the text which will be used for the header.
    * to use default - `Settings`
        ```javascript
        export const HEADLINE = null
        ```
    * to use custom 
        ```javascript
        export const HEADLINE = 'Custom Settings'
        ```
   
1. `settingsOptions` - (object) The set of options to be shown. Optionally, you can also specify option title, subtitle, and icon. 
    * to use default
        ```javascript
        export const SETTINGS_OPTIONS = null
        ```
        Defaults:
        * Biometrics
        * Passcode
        * Logs
        * About
        
        Predefined Options: 
        * `Biometrics` - enable/disable using finger or face to secure app 
        * `Passcode` - change your app passcode
        * `Logs` - send logs to development team
        * `About` - application information
        * `Feedback` - give the app a feedback
        * `ManualBackup` - ability to create the application local backup file which can be used for restoring or sharing the app. Note, that you may need to configure document picker: https://github.com/rnmods/react-native-document-picker/blob/4053e6106440a8f711a0e82a74949c7e51213105/install-old.md
        * `ViewRecoveryPassphrase` - show passphrase used for local backup generation (works only if `ManualBackup` is enabled).
    * to change predefined (for predefined options `title, subtitle, avatar, rightIcon, onPress` are optional fields / defaults will be used if they are not specified) 
        ```javascript
        // Menu contains Home and Connections tabs
        export const SETTINGS_OPTIONS = [
          {
            name: 'Biometrics',
            label: 'Other Biometrics Label'
          }
        ]     
        ```
    * to change order
        ```javascript
        export const SETTINGS_OPTIONS = [
          {
            name: 'About',
          },
          {
            name: 'Biometrics',
          },
          {
            name: 'Logs',
          }
        ]     
        ```
    * to add new setting
        ```javascript
        // Settings contains Biometrics and Custom settings
        export const SETTINGS_OPTIONS = [
            {
              name: 'Biometrics',
            },
            {
              name: 'Custom',
              title: 'Custom Option', // title
              subtitle: null, // (optional) - description 
              avatar: null, // (optional) - icon to show on the left
              rightIcon: null, // (optional) - icon to show on the right
              onPress: null, // (optional) - handler on touch
            },
        ]     
        ```

* `SHOW_CAMERA_BUTTON` - (boolean, Optional) flag indicating whether you want to show camera button.
    * to use default - `true`
        ```javascript
        export const SHOW_CAMERA_BUTTON = null
        ```
    * to use custom
        ```javascript
        export const SHOW_CAMERA_BUTTON = false
        ```

* `CustomSettingsScreen` - (React Component) custom component for rendering of Settings screen (instead of predefined one).
    * to use default
        ```javascript
        export const CustomSettingsScreen = null
        ```    
    * to use custom 
        ```javascript
        export const CustomSettingsScreen = () => <Text>Custom Settings</Text>
        ``` 

### Feedback

In order to gather application feedback is used `Apptentive`. 
You can provide credentials to be used for setting up `Apptentive` module in `feedback.js` file.
Note: This variable is mandatory if you want to enable `feedback` option on `Settings` screen.

```javascript
export const APPTENTIVE_CREDENTIALS = Platform.select({
  ios: {
    apptentiveKey: '-',
    apptentiveSignature: '-',
  },
  android: {
    apptentiveKey: '-',
    apptentiveSignature: '-',
  },
})
```

### Application information

The information about the application which will be shown on `About` screen can be configured in `app.js` file.

* `INFO` - (object) object specifying which information need to be show
    * to use default - `appLogo, appName, appVersion, appEnvironment, builtBy, poweredBy, termsAndConditions, privacyPolicy`
        ```javascript
        export const INFO = null
        ```
    * to use custom 
        ```javascript
        export const INFO = {
            appLogo: true, // show application logo
            appName: true, // show application name
        }
        ```

      Options: 
        * `appLogo` - show application logo
        * `appName` - show application name
        * `appVersion` - show application version
        * `appEnvironment` - show application environment
        * `builtBy` - show company label/name built application 
        * `poweredBy` - powered by Evernym label
        * `termsAndConditions` - end user license agreement
        * `privacyPolicy` - privacy policy document

* `AdditionalInfo` - (React Component) some additional information which will be show on the screen
    * to omit
        ```javascript
        export const AdditionalInfo = null
        ```
    * to use custom 
        ```javascript
        export const AdditionalInfo = () => <Text>Extra data</Text>
        ```

* `CustomAboutAppScreen` - (React Component) custom component for rendering of About screen (instead of predefined one).
    * to use default
        ```javascript
        export const CustomAboutAppScreen = null
        ```    
    * to use custom 
        ```javascript
        export const CustomAboutAppScreen = () => <Text>Custom About</Text>
        ```

### Splash screen and app icon

These are configured inside your application for specific platforms.

* Android:
    
    * Splash Screen: 
        
        * Added following code into your `MainActivity.java` file:
            ```
               import org.devio.rn.splashscreen.SplashScreen;
               import android.os.Bundle; 
              ...
              
              public class MainActivity extends ReactActivity {
              ...
                    @Override
                    protected void onCreate(Bundle savedInstanceState) {
                        SplashScreen.show(this);
                        super.onCreate(savedInstanceState);
                    }
              ...
              }
              ```

         * copy `files/layout` and `files/drawable-mdpi` directories into your `android/app/src/main/res` directory.
          
    * Application icon: replace file `ic_launcher.png` in `android/app/src/main/res/mipmap-hdpi` directory with a desired one.
    
* iOS: TODO

### Credential attachments

When app gets an attribute with `_link` postfix (example `Photo_link`), it tries to render its value as attachment according to defined mime type.

**Supported mime types:**

* Photo types:
  * `image/jpeg`
  * `image/png`
  * `image/jpg`
* MS Word types:
  * `application/msword`
  * `application/vnd.openxmlformats-officedocument.wordprocessingml.document`
  * `application/vnd.openxmlformats-officedocument.wordprocessingml.template`
  * `application/vnd.ms-word.document.macroEnabled.12`
  * `application/vnd.ms-word.template.macroEnabled.12`
* MS Excel types:
  * `application/vnd.ms-excel`
  * `application/vnd.openxmlformats-officedocument.spreadsheetml.sheet`
  * `application/vnd.openxmlformats-officedocument.spreadsheetml.template`
  * `application/vnd.ms-excel.sheet.macroEnabled.12`
  * `application/vnd.ms-excel.template.macroEnabled.12`
  * `application/vnd.ms-excel.addin.macroEnabled.12`
  * `application/vnd.ms-excel.sheet.binary.macroEnabled.12`
* MS Powerpoint types:
  * `application/vnd.ms-powerpoint`
  * `application/vnd.openxmlformats-officedocument.presentationml.presentation`
  * `application/vnd.openxmlformats-officedocument.presentationml.template`
  * `application/vnd.openxmlformats-officedocument.presentationml.slideshow`
  * `application/vnd.ms-powerpoint.addin.macroEnabled.12`
  * `application/vnd.ms-powerpoint.presentation.macroEnabled.12`
  * `application/vnd.ms-powerpoint.template.macroEnabled.12`
  * `application/vnd.ms-powerpoint.slideshow.macroEnabled.12`
* CSV:
  * `text/csv`
* PDF types:
  * `application/pdf`
* Audio and video types:
  * `audio/mp4`
  * `audio/mpeg`
  * `audio/mp3`
  * `video/mp4`

## Examples

### Credential

Credential containing attachments:

```json
{
    'First Name': 'Faber',
    'Photo_link': '{\"mime-type\": \"image/jpeg\", \"extension\": \"jpeg\", \"name\": \"my_photo.jpeg\",\"data\": { \"base64\": \"data:image/jpeg;base64,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\"}}',
    'PDF_link': '{"mime-type": "application/pdf", "extension": "pdf", "name": "my_pdf.pdf","data": { "base64": "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CmVuZG9iagoKOSAwIG9iago8PC9UeXBlL0ZvbnQvU3VidHlwZS9UcnVlVHlwZS9CYXNlRm9udC9CQUFBQUErQXJpYWwtQm9sZE1UCi9GaXJzdENoYXIgMAovTGFzdENoYXIgMTEKL1dpZHRoc1s3NTAgNzIyIDYxMCA4ODkgNTU2IDI3NyA2NjYgNjEwIDMzMyAyNzcgMjc3IDU1NiBdCi9Gb250RGVzY3JpcHRvciA3IDAgUgovVG9Vbmljb2RlIDggMCBSCj4+CmVuZG9iagoKMTAgMCBvYmoKPDwKL0YxIDkgMCBSCj4+CmVuZG9iagoKMTEgMCBvYmoKPDwvRm9udCAxMCAwIFIKL1Byb2NTZXRbL1BERi9UZXh0XT4+CmVuZG9iagoKMSAwIG9iago8PC9UeXBlL1BhZ2UvUGFyZW50IDQgMCBSL1Jlc291cmNlcyAxMSAwIFIvTWVkaWFCb3hbMCAwIDU5NSA4NDJdL0dyb3VwPDwvUy9UcmFuc3BhcmVuY3kvQ1MvRGV2aWNlUkdCL0kgdHJ1ZT4+L0NvbnRlbnRzIDIgMCBSPj4KZW5kb2JqCgoxMiAwIG9iago8PC9Db3VudCAxL0ZpcnN0IDEzIDAgUi9MYXN0IDEzIDAgUgo+PgplbmRvYmoKCjEzIDAgb2JqCjw8L1RpdGxlPEZFRkYwMDQ0MDA3NTAwNkQwMDZEMDA3OTAwMjAwMDUwMDA0NDAwNDYwMDIwMDA2NjAwNjkwMDZDMDA2NT4KL0Rlc3RbMSAwIFIvWFlaIDU2LjcgNzczLjMgMF0vUGFyZW50IDEyIDAgUj4+CmVuZG9iagoKNCAwIG9iago8PC9UeXBlL1BhZ2VzCi9SZXNvdXJjZXMgMTEgMCBSCi9NZWRpYUJveFsgMCAwIDU5NSA4NDIgXQovS2lkc1sgMSAwIFIgXQovQ291bnQgMT4+CmVuZG9iagoKMTQgMCBvYmoKPDwvVHlwZS9DYXRhbG9nL1BhZ2VzIDQgMCBSCi9PdXRsaW5lcyAxMiAwIFIKPj4KZW5kb2JqCgoxNSAwIG9iago8PC9BdXRob3I8RkVGRjAwNDUwMDc2MDA2MTAwNkUwMDY3MDA2NTAwNkMwMDZGMDA3MzAwMjAwMDU2MDA2QzAwNjEwMDYzMDA2ODAwNkYwMDY3MDA2OTAwNjEwMDZFMDA2RTAwNjkwMDczPgovQ3JlYXRvcjxGRUZGMDA1NzAwNzIwMDY5MDA3NDAwNjUwMDcyPgovUHJvZHVjZXI8RkVGRjAwNEYwMDcwMDA2NTAwNkUwMDRGMDA2NjAwNjYwMDY5MDA2MzAwNjUwMDJFMDA2RjAwNzIwMDY3MDAyMDAwMzIwMDJFMDAzMT4KL0NyZWF0aW9uRGF0ZShEOjIwMDcwMjIzMTc1NjM3KzAyJzAwJyk+PgplbmRvYmoKCnhyZWYKMCAxNgowMDAwMDAwMDAwIDY1NTM1IGYgCjAwMDAwMTE5OTcgMDAwMDAgbiAKMDAwMDAwMDAxOSAwMDAwMCBuIAowMDAwMDAwMjI0IDAwMDAwIG4gCjAwMDAwMTIzMzAgMDAwMDAgbiAKMDAwMDAwMDI0NCAwMDAwMCBuIAowMDAwMDExMTU0IDAwMDAwIG4gCjAwMDAwMTExNzYgMDAwMDAgbiAKMDAwMDAxMTM2OCAwMDAwMCBuIAowMDAwMDExNzA5IDAwMDAwIG4gCjAwMDAwMTE5MTAgMDAwMDAgbiAKMDAwMDAxMTk0MyAwMDAwMCBuIAowMDAwMDEyMTQwIDAwMDAwIG4gCjAwMDAwMTIxOTYgMDAwMDAgbiAKMDAwMDAxMjQyOSAwMDAwMCBuIAowMDAwMDEyNDk0IDAwMDAwIG4gCnRyYWlsZXIKPDwvU2l6ZSAxNi9Sb290IDE0IDAgUgovSW5mbyAxNSAwIFIKL0lEIFsgPEY3RDc3QjNEMjJCOUY5MjgyOUQ0OUZGNUQ3OEI4RjI4Pgo8RjdENzdCM0QyMkI5RjkyODI5RDQ5RkY1RDc4QjhGMjg+IF0KPj4Kc3RhcnR4cmVmCjEyNzg3CiUlRU9GCg=="}}',
    'DOCX_link': '{"mime-type": "application/msword", "extension": "docx", "name": "my_docx.docx","data": { "base64": "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"}}',
    'CSV_link': '{"mime-type": "text/csv", "extension": "csv", "name": "my_csv.csv","data": { "base64": "VXNlcm5hbWU7IElkZW50aWZpZXI7Rmlyc3QgbmFtZTtMYXN0IG5hbWUKYm9va2VyMTI7OTAxMjtSYWNoZWw7Qm9va2VyCmdyZXkwNzsyMDcwO0xhdXJhO0dyZXkKam9obnNvbjgxOzQwODE7Q3JhaWc7Sm9obnNvbgpqZW5raW5zNDY7OTM0NjtNYXJ5O0plbmtpbnMKc21pdGg3OTs1MDc5O0phbWllO1NtaXRoCgo="}}',
} 
```

### Proof request

Proof Request containing attachments:

```json
{
  "requested_attributes": {
    "attr_1": {
      "name": "First Name"
    },
    "attr_2": {
      "name": "Photo_link"
    }
  }
}
```

## Advanced

For advanced customizations, you can refer to this [document](./Advanced.md) describing MSDK internals.
