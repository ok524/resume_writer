# Resume4Jobs Website (React Version)
The website of Resume4Jobs.

Resume4Jobs is a resume builder with AI technology integrated. It can help job seekers write a systematic, complete and correct resume when they want to apply a job. The website will guide the user write their resume step-by-step to avoid any information missing. Also, the AI of this resume builder will check what kind of information is suitable for the job user want to apply so that user does not need to worry about the resume will contain some unrelated information.

## Libraries Used
- [Material-UI](https://material-ui.com/)
- [React](https://reactjs.org/)

## Changelog
- 2019/10/14
  - Initial release.
- 2019/10/15
  - Updated the color scheme of the website.
  - Added the step number at **Build Your Resume in 4 Simple Steps** section in the homepage.
  - Added **Why you should choose us?** section in the homepage.
    - Related component: `src/components/Index/Benefits`
  - Moved the components of homepage to `src/components/Index/` folder.
- 2019/10/16
  - The menu in navigation bar will now be collapsed in mobile version.
  - Added **Footer** section in the website.
    - Related component: `src/components/Footer`
- 2019/10/17
  - Added **Sign Up** button in the navigation bar.
  - Added **Login** page.
    - Related resources: `src/components/AccountProcess/Login`
  - Self-hosted **Roboto** fonts at `src/fonts` folder.
  - Adjusted the size of **Get Started For Free** button in the **Hero** component.
  - **Login** button is now disappear in the **Footer** section.
- 2019/10/18
  - Added **Sign Up** page.
    - Related component: `src/components/AccountProcess/SignUp`
  - Created the link of **Sign Up** button in **Login** page to **Sign Up** page.
  - Created the link of **Get Started For Free** button in **Home** page to **Sign Up** page.
  - Various UI updated and optimized.
- 2019/10/19
  - Installed `Roboto` fonts via `npm`, and these font files will become the website theme font.
    - Original font library is [here](https://github.com/KyleAMathews/typefaces/tree/master/packages/roboto)
  - Deleted the original `Roboto` fonts from `src/fonts` folder since these font files cannot be read by the website.
  - Added **Forget Password?** button in **Login** page.
  - Added **Forget Password** page.
    - Related component: `src/components/AccountProcess/ForgetPassword`
- 2019/10/21
  - Added **Change Password** and **Personal Information** page.
    - Related component: `src/components/Account/ChangePassword` and `src/components/Account/PersonalInformation`

## Known Issues
- 2019/10/17
  - ~~The website font `Roboto` can only display the normal font weight even the css style has set `font-weight: bold` or `font-weight: 700`.~~ **Solved on 2019/10/19.**

## Related Resources

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting
This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size
This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App
This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration
This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment
This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `yarn build` fails to minify
This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
