import React from 'react'
import '../assets/footer.css'

const Footer = () => {
    return (
        <>
            <footer className='mt-5'>
                <div className="container">
                    <div className="row footer-content">
                        <div className="col-md-4 col-sm-6">
                            <img src="src/assets/images/logo.png" alt="" />
                            <p className='mt-3'><a href="#">About us</a></p>
                            <p><a href="#">Careers</a></p>
                        </div>
                        <div className="col-md-4 col-sm-6">
                            <h3>SERVICE</h3>
                            <p><a href="#">Home</a></p>
                            <p><a href="#tenders">Search</a></p>
                            <p><a href="#tenders">Tenders</a></p>
                        </div>
                        <div className="col-md-4 col-sm-6">
                            <h3>CONTACT US</h3>
                            <p><a href="mailto:abcd@mail.ru">abcd@mail.ru</a></p>
                            <p>ADDRESS</p>
                            <p>Nizami 183</p>
                        </div>
                    </div>
                    <hr className='mt-5' />
                    <div className="social-icons mt-5 text-center">
                        <a href="#"><i className="fab fa-facebook-f"></i></a>
                        <a href="#"><i className="fab fa-twitter"></i></a>
                        <a href="#"><i className="fab fa-instagram"></i></a>
                        <a href="#"><i className="fab fa-linkedin-in"></i></a>
                    </div>
                    <div className="copyright text-center mt-3">
                        <p>&copy; 2024 EME, Inc.</p>
                    </div>
                </div>
            </footer>


        </>
    )
}

export default Footer