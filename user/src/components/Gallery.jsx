import gallery1 from '../assets/gallery1.jpg';
import gallery2 from '../assets/gallery2.jpg';
import gallery3 from '../assets/gallery3.jpg';
import gallery4 from '../assets/gallery4.webp';
import gallery5 from '../assets/gallery5.jpg';
import gallery6 from '../assets/gallery6.jpg';
import gallery7 from '../assets/gallery7.jpg';
import gallery8 from '../assets/gallery8.jpg';
const Gallery = () => {
    return (
        <div>
            <br></br>
            <h1 className='gallery'>VIEW OUR GALLERY</h1>
            <div class="responsive">

                <div class="gallery">
                    <a target="_blank" href={gallery1}>
                        <img src={gallery1} alt="Discover" className='left-image' />
                    </a>
                    <div class="desc ">Creativity Guest Rooms</div>
                </div>
            </div>


            <div class="responsive">
                <div class="gallery">
                    <a target="_blank" href={gallery2}>
                        <img src={gallery2} alt="Discover" className='left-image' />

                    </a>
                    <div class="desc">Guru Guest Room</div>

                </div>
            </div>

            <div class="responsive">
                <div class="gallery">
                    <a target="_blank" href={gallery3}>
                        <img src={gallery3} alt="Discover" className='left-image' />
                    </a>
                    <div class="desc">Akshaya Villa</div>
                </div>
            </div>

            <div class="responsive">
                <div class="gallery">
                    <a target="_blank" href={gallery4}>
                        <img src={gallery4} alt="Discover" className='left-image' />
                    </a>
                    <div class="desc">Black Box Rooms</div>
                </div>
            </div>
            <div class="responsive">
                <div class="gallery">
                    <a target="_blank" href={gallery8}>
                        <img src={gallery8} alt="Discover" className='left-image' />
                    </a>
                    <div class="desc">Trustful Rooms</div>
                </div>
            </div>

            <div class="responsive">
                <div class="gallery">
                    <a target="_blank" href={gallery5}>
                        <img src={gallery5} alt="Discover" className='left-image' />
                    </a>
                    <div class="desc">Nandhika Guest Rooms</div>
                </div>
            </div>
            <div class="responsive">
                <div class="gallery">
                    <a target="_blank" href={gallery6}>
                        <img src={gallery6} alt="Discover" className='left-image' />
                    </a>
                    <div class="desc">Surya Rooms</div>
                </div>
            </div>

            <div class="responsive">
                <div class="gallery">
                    <a target="_blank" href={gallery7}>
                        <img src={gallery7} alt="Discover" className='left-image' />
                    </a>
                    <div class="desc">Broots Guest Rooms</div>
                </div>
            </div>



        </div>
    )
}
export default Gallery;