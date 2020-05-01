import React, { lazy, Suspense } from 'react';
import { Switch } from 'react-router';
import { Route, withRouter } from 'react-router-dom';

import NavBar from '../../components/NavBar/NavBar';
import Loading from '../../components/Loading/Loading';
import Footer from '../../components/Footer/Footer';

const LazyHome = lazy(() => import(/* webpackChunkName: "home" */ '../../containers/Landing'));
const LazyResumeTemplates = lazy(() => import(/* webpackChunkName: "resume-templates" */ '../../containers/Landing/ResumeTemplates'));
const LazySignUp = lazy(() => import(/* webpackChunkName: "sign-up" */ '../../containers/Landing/SignUp'));
const LazyLogin = lazy(() => import(/* webpackChunkName: "login" */ '../../containers/Landing/Login'));
const LazyForgetPassword = lazy(() => import(/* webpackChunkName: "forget-password" */ '../../containers/Landing/ForgetPassword'));

const LazyChangePassword = lazy(() => import(/* webpackChunkName: "change-password" */ '../../containers/Landing/Account/ChangePassword'));
const LazyPersonalInformation = lazy(() => import(/* webpackChunkName: "personal-information" */ '../../containers/Landing/Account/PersonalInformation'));

const LazyResumeHomepage = lazy(() => import('../../containers/Landing/Resume/Homepage'));
const LazyMyResume = lazy(() => import('../../containers/Landing/Resume/MyResume'))
const LazyResumeNewbie = lazy(() => import('../../containers/Landing/Resume/NewbieResume'));

const Landing = () => (
    <>
        <NavBar/>
        <Suspense fallback={<Loading/>}>
        <Switch>
            <Route exact path='/' component={LazyHome} />
            <Route exact path='/resume-templates' component={LazyResumeTemplates} />
            <Route exact path='/cover-letter-templates' component={LazyResumeTemplates} />
            <Route exact path='/career-blog' component={LazyResumeTemplates} />
            <Route exact path='/sign-up' component={LazySignUp} />
            <Route exact path='/login' component={LazyLogin} />
            <Route exact path='/forget-password' component={LazyForgetPassword} />
            <Route exact path='/account/change-password' component={LazyChangePassword} />
            <Route exact path='/profile' component={LazyPersonalInformation} />
            <Route exact path='/resume' component={LazyResumeHomepage} />
            <Route exact path='/my-resume' component={LazyMyResume} />
            <Route path='/resume/:resumeId?/edit/:step' component={LazyResumeNewbie} />
            <Route exact path='/resume/edit' component={LazyResumeNewbie} />
            <Route /*Page Not Found*/ component={LazyHome} />
        </Switch>
        </Suspense>
        <Footer />
    </>
)

export default withRouter(Landing);
