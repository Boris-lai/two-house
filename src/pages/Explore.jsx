import { Link } from "react-router-dom"
import Slider from "../components/Slider"
import rentCategoryImage from "../assets/jpg/rentCategoryImage.jpg"
import saleCategoryImage from "../assets/jpg/saleCategoryImage.jpg"

function Explore() {
    return (
        <div className="explore">
            <header>
                <p className="pageHeader">二東家專業管理出租套房😊</p>
            </header>

            <main>
                {/* eslint-disable-next-line */}
                {/* <Slider /> */}

                <h2 className="exploreCategoryHeading">精選物件</h2>
                <div className="exploreCategories">
                    <Link to="/category/rent">
                        <img src={rentCategoryImage} alt="rent" className="exploreCategoryImg"/>
                        <h3 className="exploreCategoryName">精選出租</h3>
                    </Link>
                    <Link to="/category/sale">
                        <img src={saleCategoryImage} alt="sale" className="exploreCategoryImg"/>
                        <h3 className="exploreCategoryName">精選出售</h3>
                    </Link>
                </div>
            </main>
        </div>
    )
}

export default Explore
