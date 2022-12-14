import React from 'react';
import '../../node_modules/react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel } from 'react-responsive-carousel';

import {
    Card,
    CardBody,
  } from "reactstrap";
import { Link } from 'react-router-dom';
import  * as All from '../assets/img/parks/index.js';

const parkArr = { parks: [
  {
    code: 'ACAD',
    name:'Acadia National Park',
    src: All.ACAD
  },
  {
    code: "ARCH",
    name: "Arches National Park",
    src: All.ARCH
    },
    {
    code: "BADL",
    name: "Badlands National Park",
    src: All.BADL
    },
    {
    code: "BIBE",
    name: "Big Bend National Park",
    src: All.BIBE
    },
    {
    code: "BISC",
    name: "Biscayne National Park",
    src: All.BISC
    },
    {
    code: "BLCA",
    name: "Black Canyon of the Gunnison National Park",
    src: All.BLCA
    },
    {
    code: "BRCA",
    name: "Bryce Canyon National Park",
    src: All.BRCA
    },
    {
    code: "CANY",
    name: "Canyonlands National Park",
    src: All.CANY
    },
    {
    code: "CARE",
    name: "Capitol Reef National Park",
    src: All.CARE
    },
    {
    code: "CAVE",
    name: "Carlsbad Caverns National Park",
    src: All.CAVE
    },
    {
    code: "CHIS",
    name: "Channel Islands National Park",
    src: All.CHIS
    },
    {
    code: "CONG",
    name: "Congaree National Park",
    src: All.CONG
    },
    {
    code: "CRLA",
    name: "Crater Lake National Park",
    src: All.CRLA
    },
    {
    code: "CUVA",
    name: "Cuyahoga Valley National Park",
    src: All.CUVA
    },
    {
    code: "DENA",
    name: "Denali National Park and Preserve",
    src: All.DENA
    },
    {
    code: "DEVA",
    name: "Death Valley National Park",
    src: All.DEVA
    },
    {
    code: "DRTO",
    name: "Dry Tortugas National Park",
    src: All.DRTO
    },
    {
    code: "EVER",
    name: "Everglades National Park",
    src: All.EVER
    },
    {
    code: "GAAR",
    name: "Gates Of The Arctic National Park and Preserve",
    src: All.GAAR
    },
    {
    code: "GLAC",
    name: "Glacier National Park",
    src: All.GLAC
    },
    {
    code: "GLBA",
    name: "Glacier Bay National Park and Preserve",
    src: All.GLBA
    },
    {
    code: "GRBA",
    name: "Great Basin National Park",
    src: All.GRBA
    },
    {
    code: "GRCA",
    name: "Grand Canyon National Park",
    src: All.GRCA
    },
    {
    code: "GRSA",
    name: "Great Sand Dunes National Park and Preserve",
    src: All.GRSA
    },
    {
    code: "GRSM",
    name: "Great Smoky Mountains National Park",
    src: All.GRSM
    },
    {
    code: "GRTE",
    name: "Grand Teton National Park",
    src: All.GRTE
    },
    {
    code: "GUMO",
    name: "Guadalupe Mountains National Park",
    src: All.GUMO
    },
    {
    code: "HALE",
    name: "Haleakala National Park",
    src: All.HALE
    },
    {
    code: "HAVO",
    name: "Hawaii Volcanoes National Park",
    src: All.HAVO
    },
    {
    code: "HOSP",
    name: "Hot Springs National Park",
    src: All.HOSP
    },
    {
    code: "ISRO",
    name: "Isle Royale National Park",
    src: All.ISRO
    },
    {
    code: "JOTR",
    name: "Joshua Tree National Park",
    src: All.JOTR
    },
    {
    code: "KATM",
    name: "Katmai National Park and Preserve",
    src: All.KATM
    },
    {
    code: "KEFJ",
    name: "Kenai Fjords National Park",
    src: All.KEFJ
    },
    {
    code: "KOVA",
    name: "Kobuk Valley National Park",
    src: All.KOVA
    },
    {
    code: "LACL",
    name: "Lake Clark National Park and Preserve",
    src: All.LACL
    },
    {
    code: "LAVO",
    name: "Lassen Volcanic National Park",
    src: All.LAVO
    },
    {
    code: "MACA",
    name: "Mammoth Cave National Park",
    src: All.MACA
    },
    {
    code: "MEVE",
    name: "Mesa Verde National Park",
    src: All.MEVE
    },
    {
    code: "MORA",
    name: "Mount Rainier National Park",
    src: All.MORA
    },
    {
    code: "NOCA",
    name: "North Cascades National Park",
    src: All.NOCA
    },
    {
    code: "OLYM",
    name: "Olympic National Park",
    src: All.OLYM
    },
    {
    code: "PEFO",
    name: "Petrified Forest National Park",
    src: All.PEFO
    },
    {
    code: "PINN",
    name: "Pinnacles National Park",
    src: All.PINN
    },
    {
    code: "REDW",
    name: "Redwood National Park",
    src: All.REDW
    },
    {
    code: "ROMO",
    name: "Rocky Mountain National Park",
    src: All.ROMO
    },
    {
    code: "SAGU",
    name: "Saguaro National Park",
    src: All.SAGU
    },
    {
    code: "SEKI",
    name: "Sequoia and Kings Canyon National Parks",
    src: All.SEKI
    },
    {
    code: "SHEN",
    name: "Shenandoah National Park",
    src: All.SHEN
    },
    {
    code: "THRO",
    name: "Theodore Roosevelt National Park",
    src: All.THRO
    },
    {
    code: "VOYA",
    name: "Voyageurs National Park",
    src: All.VOYA
    },
    {
    code: "WICA",
    name: "Wind Cave National Park",
    src: All.WICA
    },
    {
    code: "WRST",
    name: "Wrangell - St Elias National Park and Preserve",
    src: All.WRST
    },
    {
    code: "YELL",
    name: "Yellowstone National Park",
    src: All.YELL
    },
    {
    code: "YOSE",
    name: "Yosemite National Park",
    src: All.YOSE
    },
    {
    code: "ZION",
    name: "Zion National Park",
    src: All.ZION
    }
]
}


function ParksScroll() {
  return (
    <Carousel
        key={parkArr.parks.length}
        showStatus={false}
        infiniteLoop={true}
        autoPlay={true}
        showThumbs={false}
        showArrows = {true}
        showIndicators = {false}
        centerMode = {true}
        centerSlidePercentage = {30}
      >
        {parkArr.parks.map(({ code, name, src }) => (
        
        <Card key={code}>
          <Link to={`/parks/${name}`}>
            <CardBody>
                <h6 className="text-muted">{name}</h6>
                <img src={src} alt={code} width = "400px" height="400px" />
            </CardBody>
         </Link>
     </Card>
      ))}
    </Carousel>
  );
}

export default ParksScroll;