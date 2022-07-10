import {React, useState, useEffect} from "react";
import breakfastIcon from "../assets/icons/sunrise.svg";

// Dynamically build table of contents from displayed elements
// Modified from https://www.emgoto.com/react-table-of-contents/
const useHeadingsData = () => {
    const [nestedHeadings, setNestedHeadings] = useState([]);
  
    useEffect(() => {
      const headingElements = Array.from(
        document.querySelectorAll("h1, h2")
      );
  
      const newNestedHeadings = getNestedHeadings(headingElements);
      setNestedHeadings(newNestedHeadings);
    }, []);
  
    return { nestedHeadings };
};

const getNestedHeadings = (headingElements) => {
    const nestedHeadings = [];
  
    headingElements.forEach((heading, index) => {
      const { innerText: title, id } = heading;
  
      if (heading.nodeName === "H1") {
        nestedHeadings.push({ id, title, items: [] });
      } else if (heading.nodeName === "H2" && nestedHeadings.length > 0) {
        nestedHeadings[nestedHeadings.length - 1].items.push({
          id,
          title,
        });
      }
    });
  
    return nestedHeadings;
};

// Display as navbar
const Headings = ({ headings }) => (
    <ul>
        {headings.map((heading) => (
            <li key={heading.id}>
                <a href={`#${heading.id}`}>{heading.title}</a>
                {heading.items.length > 0 && (
                    <ul>
                        {heading.items.map((child) => (
                        <li key={child.id}>
                            <a href={`#${child.id}`}>{child.title}</a>
                        </li>
                        ))}
                    </ul>
                )}
            </li>
        ))}
    </ul>
);

const Navbar = () => {
        const { nestedHeadings } = useHeadingsData();
        return (
            <div className="container-fluid navbar">
                <div className="row">
                    <nav aria-label="Table of contents">
                        <Headings headings={nestedHeadings} />
                    </nav>
                </div>
            </div>
        )

    // return (
    //     <div className="container-fluid navbar">
    //         <div className="row justify-content-center">
    //             <div className="col">
    //                 <a href="#Breakfast">Breakfast</a>
    //             </div>
    //             <div className="col">
    //                 <a href="#Lunch">Lunch</a>
    //             </div>
    //             <div className="col">
    //                 <a href="#Dinner">Dinner</a>
    //             </div>
    //             <div className="col">
    //                 <a href="#"><img className="mealtime-icon" alt="Breakfast" src={breakfastIcon} /></a>
    //             </div>
    //         </div>
    //     </div>
    // );
}

export default Navbar;
