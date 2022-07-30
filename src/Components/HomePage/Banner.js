import React from 'react';
import { Carousel } from 'react-bootstrap';
import slider1 from '../../images/slider/slider1.jpg'
import slider2 from '../../images/slider/slider2.jpg'
import slider3 from '../../images/slider/slider3.jpg'

const Banner = () => {
    return (
        <div >
            <Carousel controls={false} indicators interval={2500} pause={false}>
                <Carousel.Item>
                    <img
                        className="d-block w-100 custom-img"
                        src={slider1}
                        alt="First slide"
                        style={{ height: "100vh" }}
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100 custom-img"
                        src={slider2}
                        alt="First slide"
                        style={{ height: "100vh" }}
                    />
                </Carousel.Item>
               
                <Carousel.Item>
                    <img
                        className="d-block w-100 custom-img"
                        src={slider3}
                        alt="First slide"
                        style={{ height: "100vh" }}
                    />
                </Carousel.Item>  
                               
            </Carousel>
        </div>
    );
};

export default Banner;