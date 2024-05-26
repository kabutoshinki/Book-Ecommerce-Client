export const navLinks = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "About",
    path: "/about",
  },
  {
    name: "Shope",
    path: "/books",
  },
  {
    name: "Contact",
    path: "/contact",
  },
];

import { FiUser } from "react-icons/fi";
// import { VscSearch } from "react-icons/vsc";
import { BsBag } from "react-icons/bs";

export const navRight = {
  managements: [
    {
      id: 1,
      icon: FiUser,
      link: "/login",
    },
    {
      id: 2,
      icon: BsBag,
      link: "/cart",
    },
    // {
    //   id: 3,
    //   icon: VscSearch,
    //   link: "#",
    // },
  ],
};

import HBook1 from "../assets/HeaderBooks/headerBook1.png";
import HBook2 from "../assets/HeaderBooks/headerBook2.png";
import HBook3 from "../assets/HeaderBooks/headerBook3.png";

export const headerBooks = [
  {
    id: 1,
    img: HBook1,
    title: "Life of the wild",
    info: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eu feugiat <br> amet, libero ipsum enim pharetra hac. Urna commodo, lacus ut magna <br> velit eleifend. Amet, quis urna, a eu.",
    btnLink: "*",
  },
  {
    id: 2,
    img: HBook2,
    title: "Simple way of piece life",
    info: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eu feugiat <br> amet, libero ipsum enim pharetra hac. Urna commodo, lacus ut magna <br> velit eleifend. Amet, quis urna, a eu.",
    btnLink: "*",
  },
  {
    id: 3,
    img: HBook3,
    title: "Great travel at desert",
    info: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eu feugiat <br> amet, libero ipsum enim pharetra hac. Urna commodo, lacus ut magna <br> velit eleifend. Amet, quis urna, a eu.",
    btnLink: "*",
  },
];

import FeaturedBooks1 from "../assets/FeaturedBooksImages/FeaturedBook1.png";
import FeaturedBooks2 from "../assets/FeaturedBooksImages/FeaturedBook2.png";
import FeaturedBooks3 from "../assets/FeaturedBooksImages/FeaturedBook3.png";
import FeaturedBooks4 from "../assets/FeaturedBooksImages/FeaturedBook4.png";
import FeaturedBooks5 from "../assets/FeaturedBooksImages/FeaturedBook5.png";

export const featuredBooksData = [
  {
    id: 1,
    img: FeaturedBooks1,
    imgLlink: "*",
    nameLink: "*",
    name: "Great travel at desert",
    writer: "Sanchit Howdy",
    price: "$ 38.00 ",
  },
  {
    id: 2,
    img: FeaturedBooks2,
    imgLlink: "*",
    nameLink: "*",
    name: "Great travel at desert",
    writer: "Sanchit Howdy",
    price: "$ 38.00 ",
  },
  {
    id: 3,
    img: FeaturedBooks3,
    imgLlink: "*",
    nameLink: "*",
    name: "Great travel at desert",
    writer: "Sanchit Howdy",
    price: "$ 38.00 ",
  },
  {
    id: 4,
    img: FeaturedBooks4,
    imgLlink: "*",
    nameLink: "*",
    name: "Great travel at desert",
    writer: "Sanchit Howdy",
    price: "$ 38.00 ",
  },
  {
    id: 5,
    img: FeaturedBooks5,
    imgLlink: "*",
    nameLink: "*",
    name: "Great travel at desert",
    writer: "Sanchit Howdy",
    price: "$ 38.00 ",
  },
];
import sellingBookimage from "../assets/SellingBookImage/sellingBook.png";

export const sellingBooksData = [
  {
    id: 1,
    img: sellingBookimage,
    infoTitleTop: "By Timbur Hood",
    infoTitle: "Birds gonna be happy",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eu feugiat amet, libero ipsum enim pharetra hac",
    price: "$ 45.00",
    shopbtnLink: "*",
  },
];

// Popular Books Data.......................

import popularbook1 from "../assets/PopularBooksImage/book1.png";
import popularbook2 from "../assets/PopularBooksImage/book2.png";
import popularbook3 from "../assets/PopularBooksImage/book3.png";
import popularbook4 from "../assets/PopularBooksImage/book4.png";
import popularbook5 from "../assets/PopularBooksImage/book5.png";
import popularbook6 from "../assets/PopularBooksImage/book6.png";
import popularbook7 from "../assets/PopularBooksImage/book7.png";
import popularbook8 from "../assets/PopularBooksImage/book8.png";

export const galleryData = [
  {
    id: 1,
    name: "Great travel at desert",
    writer: "Sanchit Howdy",
    price: "$ 38.00 ",
    category: "Business",
    image: popularbook1,
  },
  {
    id: 2,
    name: "Great travel at desert",
    writer: "Sanchit Howdy",
    price: "$ 38.00 ",
    category: "Technology",
    image: popularbook2,
  },
  {
    id: 3,
    name: "Great travel at desert",
    writer: "Sanchit Howdy",
    price: "$ 38.00 ",
    category: "Adventure",
    image: popularbook3,
  },
  {
    id: 4,
    name: "Great travel at desert",
    writer: "Sanchit Howdy",
    price: "$ 38.00 ",
    category: "Romantic",
    image: popularbook4,
  },
  {
    id: 5,
    name: "Great travel at desert",
    writer: "Sanchit Howdy",
    price: "$ 38.00 ",
    category: "Fictional",
    image: popularbook5,
  },
  {
    id: 6,
    name: "Great travel at desert",
    writer: "Sanchit Howdy",
    price: "$ 38.00 ",
    category: "Business",
    image: popularbook6,
  },
  {
    id: 7,
    name: "Great travel at desert",
    writer: "Sanchit Howdy",
    price: "$ 38.00 ",
    category: "Technology",
    image: popularbook7,
  },
  {
    id: 8,
    name: "Great travel at desert",
    writer: "Sanchit Howdy",
    price: "$ 38.00 ",
    category: "Romantic",
    image: popularbook8,
  },
];
import { ImFacebook, ImBehance } from "react-icons/im";
import { FiInstagram } from "react-icons/fi";
import { RiTwitterXLine } from "react-icons/ri";
import { GrLinkedinOption } from "react-icons/gr";
export const FootersLinksData = {
  Aboutus: [
    { linkname: "vision ", link: "*" },
    { linkname: "articles ", link: "*" },
    { linkname: "careers ", link: "*" },
    { linkname: "service terms ", link: "*" },
    { linkname: "donate ", link: "*" },
  ],
  Discover: [
    { linkname: "Home ", link: "*" },
    { linkname: "articles ", link: "*" },
    { linkname: "Books ", link: "*" },
    { linkname: "Authors  ", link: "*" },
    { linkname: "Subjects ", link: "*" },
    { linkname: "Advanced Search ", link: "*" },
  ],
  Myaccount: [
    { linkname: "Sign In", link: "*" },
    { linkname: "articles ", link: "*" },
    { linkname: "View Cart", link: "*" },
    { linkname: "My Wishtlist  ", link: "*" },
    { linkname: "Track My Order ", link: "*" },
  ],

  Help: [
    { linkname: "Help center ", link: "*" },
    { linkname: "Report a problem  ", link: "*" },
    { linkname: "View Cart", link: "*" },
    { linkname: "Suggesting edits ", link: "#" },
    { linkname: "Contact us", link: "*" },
  ],

  socials: [
    { icon: ImFacebook, link: "https://www.facebook.com" },
    { icon: FiInstagram, link: "https://www.twitter.com" },
    { icon: GrLinkedinOption, link: "https://www.instagram.com" },
    { icon: RiTwitterXLine, link: "https://www.twitter.com" },
    { icon: ImBehance, link: "https://www.twitter.com" },
  ],
};

export const relatedBooks = [
  {
    title: "Terrible Madness",
    description: "THRILLER, DRAMA, HORROR",
    price: "45.4",
    image:
      "https://static.vecteezy.com/system/resources/thumbnails/009/384/332/small_2x/old-vintage-book-clipart-design-illustration-free-png.png",
  },
  {
    title: "Battle Drive",
    description: "THRILLER, DRAMA, HORROR",
    price: "45.4",
    image:
      "https://media.istockphoto.com/id/173015527/photo/a-single-red-book-on-a-white-surface.jpg?s=612x612&w=0&k=20&c=AeKmdZvg2_bRY2Yct7odWhZXav8CgDtLMc_5_pjSItY=",
  },
  {
    title: "Terrible Madness",
    description: "THRILLER, DRAMA, HORROR",
    price: "45.4",
    image: "https://cdn.pixabay.com/photo/2015/11/19/21/10/glasses-1052010_640.jpg",
  },
];

export const booksData = [
  {
    title: "Thunder Stunt",
    categories: ["Adventure", "Science Fiction"],
    rating: 4.5,
    price: 29.99,
    discount: 10, // Percentage discount
    image:
      "https://media.istockphoto.com/id/173015527/photo/a-single-red-book-on-a-white-surface.jpg?s=612x612&w=0&k=20&c=AeKmdZvg2_bRY2Yct7odWhZXav8CgDtLMc_5_pjSItY=",
  },
  {
    title: "A Heavy Lift",
    categories: ["Racing", "Drama"],
    rating: 4.2,
    price: 19.99,
    discount: 10,
    image: "https://ichef.bbci.co.uk/images/ic/1200x675/p0gl91h1.jpg",
  },
  {
    title: "Terrible Madness",
    categories: ["Sports", "Game"],
    rating: 4.8,
    price: 24.99,
    discount: 10,
    image:
      "https://hips.hearstapps.com/hmg-prod/images/pile-of-books-with-pages-open-by-wind-royalty-free-image-1600785994.jpg?crop=0.79555xw:1xh;center,top&resize=2048:*",
  },
  {
    title: "Such Fun Age",
    categories: ["Adventure"],
    rating: 4.7,
    price: 22.99,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8q_yk7kO4xC_cHxahxXdnyecdMfBgqA1G9Sqa6jF4iA&s",
  },
  {
    title: "Pushing Clouds",
    categories: ["Adventure"],
    rating: 4.6,
    price: 27.99,
    discount: 15,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8q_yk7kO4xC_cHxahxXdnyecdMfBgqA1G9Sqa6jF4iA&s",
  },
  {
    title: "Homie",
    categories: ["Horror", "Drama"],
    rating: 4.3,
    price: 18.99,
    discount: 10,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8q_yk7kO4xC_cHxahxXdnyecdMfBgqA1G9Sqa6jF4iA&s",
  },
  {
    title: "Seconds",
    categories: ["Drama"],
    rating: 4.1,
    price: 21.99,
    discount: 10,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8q_yk7kO4xC_cHxahxXdnyecdMfBgqA1G9Sqa6jF4iA&s",
  },
  {
    title: "Rework",
    categories: ["Business"],
    rating: 4.9,
    price: 34.99,
    discount: 10,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8q_yk7kO4xC_cHxahxXdnyecdMfBgqA1G9Sqa6jF4iA&s",
  },
  {
    title: "All Good News",
    categories: ["Drama"],
    rating: 4.4,
    price: 25.99,
    image: "https://www.sincera.in/wp-content/uploads/2015/08/best-books.jpg",
  },
  {
    title: "Journey to the Center of the Earth",
    categories: ["Science Fiction", "Adventure"],
    rating: 4.6,
    price: 23.99,
    discount: 10,
    image: "https://www.sincera.in/wp-content/uploads/2015/08/best-books.jpg",
  },
  {
    title: "The Great Gatsby",
    categories: ["Classic", "Drama"],
    rating: 4.8,
    price: 28.99,
    discount: 10,
    image: "https://www.sincera.in/wp-content/uploads/2015/08/best-books.jpg",
  },
  {
    title: "Harry Potter and the Philosopher's Stone",
    categories: ["Fantasy", "Adventure"],
    rating: 1.9,
    price: 31.99,
    image: "https://www.sincera.in/wp-content/uploads/2015/08/best-books.jpg",
  },
  {
    title: "To Kill a Mockingbird",
    categories: ["Classic", "Drama"],
    rating: 2.7,
    price: 26.99,
    image: "https://www.sincera.in/wp-content/uploads/2015/08/best-books.jpg",
  },
  {
    title: "The Catcher in the Rye",
    categories: ["Classic", "Drama"],
    rating: 3,
    price: 29.99,
    image: "https://www.sincera.in/wp-content/uploads/2015/08/best-books.jpg",
  },
  {
    title: "1984",
    categories: ["Classic", "Science Fiction"],
    rating: 4.6,
    price: 24.99,
    image: "https://www.sincera.in/wp-content/uploads/2015/08/best-books.jpg",
  },
  {
    title: "The Hobbit",
    categories: ["Fantasy", "Adventure"],
    rating: 4.8,
    price: 32.99,
    image: "https://www.sincera.in/wp-content/uploads/2015/08/best-books.jpg",
  },
  {
    title: "Lord of the Flies",
    categories: ["Classic", "Drama"],
    rating: 4.4,
    price: 27.99,
    image: "https://www.sincera.in/wp-content/uploads/2015/08/best-books.jpg",
  },
  {
    title: "Pride and Prejudice",
    categories: ["Classic", "Romance"],
    rating: 4.7,
    price: 28.99,
    image: "https://www.nea.org/sites/default/files/styles/1920wide/public/2021-01/Free-Book.jpg?itok=A0UCklYk",
  },
  {
    title: "The Lord of the Rings",
    categories: ["Fantasy", "Adventure"],
    rating: 4.9,
    price: 39.99,
    image: "https://www.nea.org/sites/default/files/styles/1920wide/public/2021-01/Free-Book.jpg?itok=A0UCklYk",
  },
  {
    title: "The Chronicles of Narnia",
    categories: [
      "Fantasy",
      "Adventure",
      "Adventure",
      "Adventure",
      "Adventure",
      "Adventure",
      "Adventure",
      "Adventure",
      "Adventure",
      "Adventure",
      "Adventure",
      "Adventure",
      "Adventure",
    ],
    rating: 4.6,
    price: 35.99,
    discount: 10,
    image: "https://www.nea.org/sites/default/files/styles/1920wide/public/2021-01/Free-Book.jpg?itok=A0UCklYk",
  },
];
