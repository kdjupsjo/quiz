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
                
                this.props.nextQuestion();
                this.setState({
                    seconds: 15
                });                
            } 
        }, 1000)
    }

    componentWillUnmount() {
        clearInterval(this.myInterval)
    }

    render() {
        const { seconds } = this.state
        return (
            <div>
                { seconds === 0
                    ? <h1>Busted!</h1>
                    : <h1>Time Remaining: {seconds < 10 ? `0${seconds}` : seconds}</h1>
                }
            </div>
        )
    }
}
export default Timer;