import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

function mapStateToProps(state){
    return {
        canvas: state.canvas.canvas
    }
}

export default function withRedirect(Component) {
    let redirectComponent = connect(mapStateToProps)(function (props) {
        if(props.canvas) return <Component {...props}></Component>
        else return <Redirect to='/draw'></Redirect>
    });
    return redirectComponent;
}

