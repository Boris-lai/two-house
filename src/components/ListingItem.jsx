import { Link } from "react-router-dom";
import { ReactComponent as DeleteIcon } from "../assets/svg/deleteIcon.svg";
import { ReactComponent as EditIcon } from "../assets/svg/editIcon.svg";
import bedIcon from "../assets/svg/bedIcon.svg";
import bathtubIcon from "../assets/svg/bathtubIcon.svg";
import homeIcon from "../assets/svg/homeIcon.svg";

function ListingItem({ listing, id, onEdit, onDelete }) {
  return (
    <li className="categoryListing">
      <Link
        to={`/category/${listing.type}/${id}`}
        className="categoryListingLink"
      >
        <img
          src={listing.imageUrls[0]}
          alt={listing.name}
          className="categoryListingImg"
        />
        <div className="categoryListingDetails">
            <p className="categoryListingLocation">
                {listing.location}
            </p>
            <p className="categoryListingName">{listing.name}</p>
            <p className="categoryListingPrice">
            ${" "}
             {listing.offer
              ? listing.discountedPrice
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              : listing.regularPrice
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            {listing.type === 'rent' && ' / 月'}
          </p>
          <div className="categoryListingInfoDiv">
              <img src={bedIcon} alt="bed"/>
              <p className="categoryListingInfoText">
                  {listing.bedrooms > 1 ? `${listing.bedrooms} 房` : "1房"}
              </p>
              <img src={homeIcon} alt="livingroom"/>
              <p className="categoryListingInfoText">
                  {listing.livingroom > 1 ? `${listing.livingroom} 廳` : "1 廳"}
              </p>
              <img src={bathtubIcon} alt="bath"/>
              <p className="categoryListingInfoText">
                  {listing.bedrooms > 1 ? `${listing.bedrooms} 衛` : "1衛"}
              </p>
          </div>
        </div>
      </Link>

      {onDelete && (
          <DeleteIcon className="removeIcon" fill="rgb(231, 76, 60)" onClick={() => onDelete(listing.id, listing.name)} />
      )}

      {onEdit && <EditIcon className="editIcon" onClick={() => onEdit(id)} />}
    </li>
  );
}

export default ListingItem;
