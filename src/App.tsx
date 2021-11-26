import React, { useEffect } from 'react'
import './App.css'
import Header from "./components/Header/Header"
import { NavBar } from "./components/NavBar/NavBar"

import { BrowserRouter, Route } from "react-router-dom"
import ProfileContainer from './components/Profile/ProfileContainer'
import Dialogs from "./components/Dialogs/Dialogs"
import { Login } from "./components/Login/Login"
import { Users } from './components/Users/Users'
import { useDispatch, useSelector } from 'react-redux'
import { AppStateType } from './redux/redux-store'
import { Preloader } from './components/Common/Preloader/Preloader'
import { initApp } from './redux/appReducer'
import { selectIsAuth, selectIsInitialised } from './redux/selectors'


const App = () => {
    const isAuth = useSelector<AppStateType, boolean>( selectIsAuth )
    const isInitialised = useSelector<AppStateType, boolean>( selectIsInitialised )
    const dispatch = useDispatch()

    useEffect( () => {
        dispatch( initApp() )
    }, [] )

    return (
        <BrowserRouter>
            {
                isInitialised ? <div className="app-wrapper">
                        <Header/>
                        <NavBar/>
                        <div className={ 'app-wrapper-content' }>

                            <Route exact path={ '/' } render={ () => <ProfileContainer/> }/>
                            <Route path={ '/profile/:userId?' } render={ () => <ProfileContainer/> }/>
                            <Route path={ '/dialogs' } render={ () => <Dialogs/> }/>
                            <Route path={ '/users' } render={ () => <Users/> }/>
                            <Route path={ '/login' } render={ () => <Login/> }/>

                        </div>
                    </div>

                    : <Preloader/>
            }
        </BrowserRouter>
    )
}

export default App

