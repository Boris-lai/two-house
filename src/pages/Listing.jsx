import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import { getDoc, doc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "../firebase.config";
import Spinner from "../components/Spinner";
import shareIcon from "../assets/svg/shareIcon.svg";
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

function Listing() {
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [shareLinkCopied, setShareLinkCopied] = useState(false);

  const navigate = useNavigate();
  const params = useParams();
  const auth = getAuth();

  useEffect(() => {
    const fetchListing = async () => {
      const docRef = doc(db, "listings", params.listingId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log(docSnap.data());
        setListing(docSnap.data());
        setLoading(false);
      }
    };
    fetchListing();
  }, [navigate, params.listingId]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <main>
      <Swiper slidesPerView={1} pagination={{ clickable: true }}>
        {listing.imageUrls.map((url, index) => (
          <SwiperSlide key={index}>
            <div
              style={{
                background: `url(${listing.imageUrls[index]}) center no-repeat`,
                backgroundSize: "cover",
              }}
              className="swiperSlideDiv"
            ></div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div
        className="shareIconDiv"
        onClick={() => {
          navigator.clipboard.writeText(window.location.href);
          setShareLinkCopied(true);
          setTimeout(() => {
            setShareLinkCopied(false);
          }, 2000);
        }}
      >
        <img src={shareIcon} alt="" />
      </div>

      {shareLinkCopied && <p className="linkCopied">Link Copied!</p>}

      <div className="listingDetails">
        <p className="listingName">{listing.name}</p>

        <p className="listingName">
          <span style={{ color: "#0b703d" }}>
            ${" "}
            {listing.offer
              ? listing.discountedPrice
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              : listing.regularPrice
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            {listing.type === "rent" && " / 月 "}
          </span>
          <span style={{ color: "#ADADAD" }}>
            {listing.type === "rent" && "押金二個月"}
          </span>
        </p>

        <br />
        <p className="listingLocation">地址：{listing.location}</p>

        {/* <p className="listingType">
          {listing.type === "rent" ? "出租" : "出租"}
        </p> */}

        {listing.offer && (
          <p className="discountPrice">
            折價 ${listing.regularPrice - listing.discountedPrice}
          </p>
        )}

        <ul className="listingDetailsList">
          <li>
            {listing.bedrooms > 1 ? `${listing.bedrooms} 房` : "1 房"}
            {"、"}
          </li>
          <li>
            {listing.livingroom > 1 ? `${listing.livingroom} 廳` : "1 廳"}
            {"、"}
          </li>
          <li>{listing.bathrooms > 1 ? `${listing.bathrooms} 衛` : "1 衛"}</li>
          <li>
            {listing.parking && "附停車位"}
            {"、"}
          </li>
          <li>{listing.furnished && "附傢俱"}</li>
        </ul>

        <br /> 

        <ul className="listingDetailsList">
          <li>
            樓層：{listing.floors > 1 ? `${listing.floors}F` : "1F" } &nbsp;&nbsp;&nbsp;&nbsp;
          </li>
          
          <li>
            坪數：{listing.square > 1 ? `${listing.square} 坪` : "1坪" }
          </li>
        </ul>

        <p>{listing.message}</p>

        

        <p className="listingLocationTitle">位置：</p>

        <div className="leafletContainer">
          <MapContainer
            style={{ height: "100%", width: "100%" }}
            center={[listing.geolocation.lat, listing.geolocation.lng]}
            zoom={13}
            scrollWheelZoom={false}
          >
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png"
            />

            <Marker
              position={[listing.geolocation.lat, listing.geolocation.lng]}
            >
              <Popup>{listing.location}</Popup>
            </Marker>
          </MapContainer>
        </div>

        {auth.currentUser?.uid !== listing.userRef && (
          <Link
            to={`/contact/${listing.userRef}?listingName=${listing.name}`}
            className="primaryButton"
          >
            與我們聯繫
          </Link>
        )}
      </div>
    </main>
  );
}

export default Listing;
