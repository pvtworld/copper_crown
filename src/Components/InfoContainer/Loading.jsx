import React from 'react'
import Spinner from 'react-spinkit'

export default class Loading extends React.Component{
    render(){
        if(this.props.isLoadingCopper){
            return(
                <Spinner spinnerName="chasing-dots" noFadeIn />
            )
        }
        return null;
    }
}