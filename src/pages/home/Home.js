import React, {Component} from 'react';
import './css/fontawesome-all.css';
import './css/swiper.css';
import './css/magnific-popup.css';
import './css/styles.css';
import pic from './images/Videocall.png';
import logo1 from './images/features-icon-1.svg';
import logo2 from './images/features-icon-2.svg';
import logo3 from './images/features-icon-3.svg';
import logo4 from './images/features-icon-6.svg';
import {Link} from 'react-router-dom';


export default class HomePage extends Component{
    render(){
        return(
           <div>
                <nav class="navbar fixed-top">
            <div class="container sm:px-4 lg:px-8 flex flex-wrap items-center justify-between lg:flex-nowrap">
                <div>
                    <h2 class="inline-block mt-3 mr-4 py-0.5 whitespace-nowrap">Mychat</h2>
                </div>

                <div class="navbar-collapse offcanvas-collapse lg:flex lg:flex-grow lg:items-center" id="navbarsExampleDefault">
                    <ul class="pl-0 mb-2 ml-auto flex flex-col list-none lg:mb-0 lg:flex-row">
                        <li>
                            <a class="nav-link page-scroll active" href="#header">Home</a>
                        </li>
                        <li>
                            <a class="nav-link page-scroll" href="#features">Features</a>
                        </li>
                    </ul>
                    
                </div> 
            </div> 
        </nav> 

        <header id="header" class="header py-28 text-center md:pt-36 lg:text-left xl:pt-44 xl:pb-32">
            <div class="container px-4 sm:px-8 lg:grid lg:grid-cols-2 lg:gap-x-8">
                <div class="mb-16 lg:mt-32 xl:mt-40 xl:mr-12">
                    <h1 class="h1-large mb-5">Team management web application</h1>
                    <p class="p-large mb-8">Start getting things done together with your team based on Mychat revolutionary team management features</p>
                    
                    <Link to="/login" variant="body2">
                        <button class="btn-solid-lg">
                            Login
                        </button>
                    </Link>
                    <Link to="/signup" variant="body2">
                    <button class="btn-solid-lg secondary">Signup</button>
                    </Link>
                </div>
                <div class="xl:text-right">
                    <img class="inline pt-20 mt-20" src={pic} alt="alternative" />
                </div>
            </div> 
        </header> 

        <div class="pt-4 pb-14 text-center">
            <div class="container px-4 sm:px-8 xl:px-4">
                <p class="mb-4 text-gray-800 text-3xl leading-10 lg:max-w-5xl lg:mx-auto">Don’t hesitate to give it a try today and you will fall in love with it</p>
            </div> 
        </div>

        <div id="features" class="cards-1">
            <div class="container px-4 sm:px-8 xl:px-4">

                <div class="card">
                    <div class="card-image">
                        <img src={logo1} alt="alternative" />
                    </div>
                    <div class="card-body">
                        <h5 class="card-title">Get Started</h5>
                        <p class="mb-4">Just register yourself and start chatting and videocalling with your Team</p>
                    </div>
                </div>
              
                <div class="card">
                    <div class="card-image">
                        <img src={logo2} alt="alternative" />
                    </div>
                    <div class="card-body">
                        <h5 class="card-title">Media sharing</h5>
                        <p class="mb-4">You can share images with your friends for better experience</p>
                    </div>
                </div>
                
                <div class="card">
                    <div class="card-image">
                        <img src={logo3} alt="alternative" />
                    </div>
                    <div class="card-body">
                        <h5 class="card-title">Great Performance</h5>
                        <p class="mb-4">Firebase Authentication is used which insure no delays and ultra-fast responsiveness</p>
                    </div>
                </div>
               
                <div class="card">
                    <div class="card-image">
                        <img src={logo4} alt="alternative" />
                    </div>
                    <div class="card-body">
                        <h5 class="card-title">Features</h5>
                        <p class="mb-4">Can chat with all users registered and can call, screenshare with any user who are online</p>
                    </div>
                </div>
              

            </div> 
        </div> 
                
           </div>
        )
    }
}
