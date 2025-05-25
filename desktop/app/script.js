import React,{useState, useMemo} from 'react';
import { render } from 'react-dom';

const App = () => {
    const [status, setStatus] = useState('off');
    const [timer, setTimer] = useState(null);
    const [time, setTime] = useState(0);
    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;

        const pad = (n) => n.toString().padStart(2, '0');
        return `${pad(minutes)}:${pad(seconds)}`;
    };

    const startTimer = () => {
        setStatus('work');
        setTime(1200);

        const newTimer = setInterval(() => {
            setTime(time => {
                if (time === 1) {

                    setStatus(prevStatus => {
                        const newStatus = prevStatus === 'work' ? 'rest' : 'work';
                        setTime(newStatus === 'work' ? 1200 : 20);
                        return newStatus;
                    });
                    return 0;
                }

                return time - 1;
            });
        }, 1000);

        setTimer(newTimer);
    };

    const stopTimer = () => {
        clearInterval(timer);
        setTimer(null);
        setTime(0);
        setStatus('off')
    }

    const closeApp = () => {
        window.close()
    }

    const formattedTime = useMemo(() => formatTime(time), [time]);

    return (
        <div>
            <h1>Protect your eyes</h1>
            { status === 'off' && (
                <div>
                    <p>According to optometrists in order to save your eyes, you should follow the 20/20/20. It means you should to rest your eyes every 20 minutes for 20 seconds by looking more than 20 feet away.</p>
                    <p>This app will help you track your time and inform you when it's time to rest.</p>
                </div>
            )}
            { status === 'work' && (<img src="./images/work.png" />)}
            { status === 'rest' && (<img src="./images/rest.png" />)}
            { status !== 'off' && (
                <div className="timer">
                    {formattedTime}
                </div>
            )}
            { status === 'off' && (<button className="btn" onClick={startTimer}>Start</button>)}
            { status !== 'off' && (<button className="btn" onClick={stopTimer}>Stop</button>)}
            <button className="btn btn-close" onClick={closeApp}>X</button>
        </div>
    );
};

render(<App />, document.querySelector('#app'));
