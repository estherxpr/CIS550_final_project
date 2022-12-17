import React from "react";




function SpeciesHeader() {
    let speciesHeader = React.createRef();


    React.useEffect(() => {
        if (window.innerWidth > 991) {
            const updateScroll = () => {
                let windowScrollTop = window.pageYOffset / 3;
                speciesHeader.current.style.transform =
                    "translate3d(0," + windowScrollTop + "px,0)";
            };
            window.addEventListener("scroll", updateScroll);
            return function cleanup() {
                window.removeEventListener("scroll", updateScroll);
            };
        }
    });
    return (
        <>
            <div
                className="page-header clear-filter page-header-small"
                filter-color="blue"
            >
                <div
                    className="page-header-image"
                    style={{
                        backgroundImage: "url(" + require("assets/img/species_all.jpg") + ")"
                    }}
                    ref={speciesHeader}
                ></div>
                 <h3 className="title">Species</h3>
            
            </div>
        </>
    );
}

export default SpeciesHeader;
