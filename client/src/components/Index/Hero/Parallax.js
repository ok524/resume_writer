import React from 'react';

class Parallax extends React.Component {
    constructor() {
        super()
        this.state = {
            offset: 0
        };
    }

    componentDidMount() {
        window.addEventListener('scroll', this.parallaxShift);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.parallaxShift);
    }

    parallaxShift = () => {
        this.setState({
            offset: window.pageYOffset
        });
    };

    render() {
        return(
            this.state.offset
        );
    }
}

export default Parallax;