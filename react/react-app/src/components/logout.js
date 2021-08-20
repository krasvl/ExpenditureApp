import {Redirect} from "react-router";
import {useEffect} from "react";
import {connect} from "react-redux";
import {logout} from "../redux/actions/accountActions";

const Logout = props => {

    useEffect(() => {
        props.logout()
    })

    return(

        <Redirect to='/login'/>
    )
}

const mapDispatchToProps = {
    logout
}

export default connect(null, mapDispatchToProps)(Logout)