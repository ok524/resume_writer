import React, { useEffect } from 'react';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import './Loading.css';

const Loading = () => {
    useEffect(() => {
        //NProgress.configure({ minimum: 0.2 });
        NProgress.configure({
            trickle: true,
            trickleRate: 0.02,
            trickleSpeed: 100,
            showSpinner: false
        });
        NProgress.start();
        return () => {
            NProgress.done();
        };
    }, []);

    return (
        <React.Fragment />
    )
};

export default Loading;