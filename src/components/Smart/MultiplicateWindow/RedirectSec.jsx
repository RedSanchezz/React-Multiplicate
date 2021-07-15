import store from '../../../redux/store';
import MultiplicateWindow from './MultiplicateWindow';
import {Redirect} from 'react-router-dom';


export default function RedirectSec(params) {

    let state = store.getState();
    return <div>
        {state.canvas.canvas === null ? <Redirect to='/draw'></Redirect> : <MultiplicateWindow></MultiplicateWindow>}
    </div>;

};

