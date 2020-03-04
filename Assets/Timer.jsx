import React, {Component} from 'React';

class Timer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            seconds: 15
        }
    }

    componentDidMount() {
        this.myInterval = setInterval(() => {
            const { seconds } = this.state

            if (seconds > 0) {
                this.setState(({ seconds }) => ({
                    seconds: seconds - 1
                }))
            }
            if (seconds === 0) {
                setTimeout(this.props.nextQuestion(), 3000);
                this.setState({
                    seconds: 15
                });                
            } 
        }, 1000)
    }

    reset() {
        setTimeout(
            this.setState({
                seconds: 15
            }), 1000);
    }

    topuptime() {
        const currentTime = this.state.seconds;

        this.setState({
            seconds: currentTime + 10
        });
    }

    componentWillUnmount() {
        clearInterval(this.myInterval)
    }

    render() {
        const { seconds } = this.state
        return (
            <div>
                { seconds === 0
                    ? <h1>För långsam!</h1>
                    : <h1>Tid kvar: {seconds < 10 ? `0${seconds}` : seconds}</h1>
                }
            </div>
        )
    }
}
export default Timer;