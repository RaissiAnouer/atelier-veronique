import login from "./login.jpg";
import home from "./home.png";
import home2 from "./home2.jpg";
import home3 from "./home3.jpeg";
import home4 from "./home4.jpeg";
import home5 from "./home5.png"
import next from "./next.svg"
import home6 from "./home6.jpeg"
import previous from "./previous.svg"
import arrowDown from "./arrow-down.svg"

import CaryWhitefONT from "./collection/images/carywhite_font.png/"
import CaryWhite from "./collection/images/carywhite.png";
import carywhitee from "./collection/images/carywhitee.png";
import ischia1 from "./collection/images/ischia1.png";
import ischia2 from "./collection/images/ischia2.jpeg";
import kendal1 from "./collection/images/kendal1.png";
import kendal2 from "./collection/images/kendal2.png";
import polo1 from "./collection/images/polo1.png";
import polo2 from "./collection/images/polo2.png";
import redshirt1 from "./collection/images/redshirt1.png";
import polo3 from "./collection/images/polo3.png";
import pant1 from "./collection/images/pant1.png";
import pant2 from "./collection/images/pant2.png";
import jacket1 from "./collection/images/jacket1.png";
import jacket2 from "./collection/images/jacket2.png";
import jacket2_2 from "./collection/images/jacket2_2.jpeg";
import jacket3 from "./collection/images/jacket3.png";
import jacket3_2 from "./collection/images/jacket3_2.jpeg";
import pant3 from "./collection/images/pant3.png";
import pant3_3 from "./collection/images/pant3_3.png";
import pant4 from "./collection/images/pant4.png";
import pant4_2 from "./collection/images/pant4_2.png";
import pant4_3 from "./collection/images/pant4_3.jpeg";

export const assets = {
    login, home, next, home2, home3, home4, home5
    , home6, previous, arrowDown
}

export const inventory = [
    {
        id: 1,
        name: "Cary White Shirt",
        price: 120,
        details: "A classic white shirt with a modern twist. Made from high-quality cotton, it offers both comfort and style. Perfect for any occasion, whether it's a day at the office or a night out.",
        image: [
            CaryWhitefONT,
            CaryWhite,
            carywhitee,
        ],
        category: "shirt",
        type: "top",
        size: ["xs", "s", "m", "l", "xl"]
    },
    {
        id: 2,
        name: "Ischia Blue Linen Shirt",
        price: 120,
        details: "Experience the perfect blend of comfort and style with our Ischia Blue Linen Shirt. Crafted from premium linen, this shirt is designed to keep you cool and stylish during warmer days. The vibrant blue hue adds a touch of sophistication to your wardrobe, making it ideal for both casual outings and semi-formal occasions.",
        image: [
            ischia1,
            ischia2,
        ],
        category: "shirt",
        type: "top",
        size: ["s", "m", "l", "xxl"]
    },
    {
        id: 3,
        name: "Kendal Blue Check \"Poplin\" Shirt",
        price: 120,
        details: "A stylish and versatile shirt featuring a classic blue check pattern. Made from high-quality poplin fabric, it offers a crisp and polished look while ensuring comfort throughout the day. Perfect for both casual and formal occasions, this shirt is a must-have addition to any wardrobe.",
        image: [kendal1, kendal2

        ],
        category: "shirt",
        type: "top",
        size: ["s", "m", "l", "xxl"]
    },
    {
        id: 4,
        name: "Polo Superfine Merino Navy",
        price: 180,
        details: "A refined and elegant polo shirt made from superfine merino wool. This navy blue shirt offers a perfect balance of comfort and sophistication, ideal for both professional and casual settings.",
        image: [
            polo1,
            polo2,
        ],
        category: "knitwear",
        type: "top",
        size: ["m", "l"]
    },
    {
        id: 5,
        name: "Polo \"Chunky Merino-Cashmere\" Burgundy",
        price: 210,
        details: "A luxurious and cozy polo shirt made from a blend of merino wool and cashmere. This burgundy shade offers a rich, elegant look while providing exceptional warmth and comfort.",
        image: [
            redshirt1,
        ],
        category: "knitwear",
        type: "top",
        size: ["s", "m", "l", "xl"]
    },
    {
        id: 6,
        name: "Polo Superfine Merino Light Brown",
        price: 210,
        details: "A refined and elegant polo shirt made from superfine merino wool. This light brown shirt offers a perfect balance of comfort and sophistication, ideal for both professional and casual settings.",
        image: [
            polo3,

        ],
        category: "knitwear",
        type: "top",
        size: ["s", "m", "l", "xl"]
    },
    {
        id: 7,
        name: "Trousers Fine Flannel \"VBC\" Navy",
        price: 210,
        details: "A pair of finely tailored trousers made from high-quality flannel fabric. The navy color adds a touch of sophistication, making these trousers perfect for both formal and semi-formal occasions.",
        image: [
            pant1,
            pant2
        ],
        category: "trouser",
        type: "bottom",
        size: ["m", "l", "xl"]
    },
    {
        id: 8,
        name: "Sondalo Grey \"Loro Piana\" Jacket",
        price: 210,
        details: "A stylish and versatile jacket made from luxurious Loro Piana fabric. The grey color offers a timeless and sophisticated look, making it an essential piece for any wardrobe.",
        image: [
            jacket1,
        ],
        category: "jacket",
        type: "top",
        size: ["m", "l", "xl", "xxl"]
    },
    {
        id: 9,
        name: "Sondalo Grey \"Loro Piana\" Jacket",
        price: 230,
        details: "A stylish and versatile jacket made from luxurious Loro Piana fabric. The grey color offers a timeless and sophisticated look, making it an essential piece for any wardrobe.",
        image: [
            jacket2, jacket2_2,
        ],
        category: "jacket",
        type: "top",
        size: ["l", "xl", "xxl"]
    },
    {
        id: 10,
        name: "Sondalo Grey \"Loro Piana\" Jacket",
        price: 230,
        details: "A stylish and versatile jacket made from luxurious Loro Piana fabric. The grey color offers a timeless and sophisticated look, making it an essential piece for any wardrobe.",
        image: [
            jacket3, jacket3_2
        ],
        category: "jacket",
        type: "top",
        size: ["l", "xl", "xxl"]
    },
    {
        id: 11,
        name: "Trousers Fine Flannel \"VBC\" Navy",
        price: 90,
        details: "A pair of finely tailored trousers made from high-quality flannel fabric. The navy color adds a touch of sophistication, making these trousers perfect for both formal and semi-formal occasions.",
        image: [
            pant3, pant3_3
        ],
        category: "trouser",
        type: "bottom",
        size: ['s', "m", "l", "xl", "xxl"]
    },
    {
        id: 12,
        name: "Trousers Fine Flannel \"VBC\" Navy",
        price: 90,
        details: "A pair of finely tailored trousers made from high-quality flannel fabric. The navy color adds a touch of sophistication, making these trousers perfect for both formal and semi-formal occasions.",
        image: [
            pant4, pant4_2, pant4_3
        ],
        category: "trouser",
        type: "bottom",
        size: ['s', "m", "l", "xl", "xxl"]
    },





]