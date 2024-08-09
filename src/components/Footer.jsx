import React from 'react'
import '../assets/footer.css'
const Footer = () => {
    return (
        <>
            <footer className='mt-5'>
                <div className="footer-content">
                    <div>
                        <img src="src/assets/images/logo.png" alt="" />
                        <p className='mt-3'><a href="#">About us</a></p>
                        <p><a href="#">Careers</a></p>
                    </div>
                    <div>
                        <h3>SERVICE</h3>
                        <p><a href="#">Home</a></p>
                        <p><a href="#">Search</a></p>
                        <p><a href="#">Tenders</a></p>
                        <p><a href="#">Implementers</a></p>
                    </div>
                    <div>
                        <h3>CONTACT US</h3>
                        <p><a href="mailto:abcd@mail.ru">abcd@mail.ru</a></p>
                        <p>ADDRESS</p>
                        <p>Nizami 183</p>
                    </div>
                </div>
                <hr className='mt-5'/>
                <div className="social-icons mt-5">
                    <a href="#"><i className="fab fa-facebook-f"></i></a>
                    <a href="#"><i className="fab fa-twitter"></i></a>
                    <a href="#"><i className="fab fa-instagram"></i></a>
                    <a href="#"><i className="fab fa-linkedin-in"></i></a>
                </div>
                <div className="copyright">
                    <p>&copy; 2024 EME, Inc.</p>
                </div>
            </footer>

        </>
    )
}

export default Footer