import React from "react";
import localFont from "next/font/local";
import Image from "next/image";
import compare from "../../app/images/compare.svg";
import store from "../../app/images/store.svg";
import online from "../../app/images/online.svg";



const noir = localFont({
  src: [
    {
      path: "../../app/fonts/NoirPro-Light.ttf",
      weight: "200",
      style: "normal",
    },
    {
      path: "../../app/fonts/NoirPro-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../app/fonts/NoirPro-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../app/fonts/NoirPro-Medium.otf",
      weight: "500",
      style: "normal",
    },
  ],
});

const index = () => {
  return (
    <div style={{paddingTop:"32px",paddingBottom: "270px"}}>
      <div
        style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
      >
        <Image src={store} width={40} height={40} alt="chart" />
        <h1
          style={{
            fontSize: "22px",
            fontWeight: "600",
            paddingBottom: "0px",
            marginBottom: "0px",
          }}
          className={noir.className}
        >
          Select Multiple Stores
        </h1>
      </div>
      <p
        style={{ marginTop: "2px", fontSize: "16px" }}
        className={noir.className}
      >
        With Shoppy Scan, you have the power to choose from a vast array of stores. Whether it's your local supermarket, favorite online retailer, or specialty boutique, you can effortlessly add them to your list of selected stores.
      </p>
      <div
        style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
      >
        <Image src={compare} width={40} height={40} alt="chart" />
        <h1
          style={{
            fontSize: "22px",
            fontWeight: "600",
            paddingBottom: "0px",
            marginBottom: "0px",
          }}
          className={noir.className}
        >
          Compare Prices
        </h1>
      </div>
      <p
        style={{ marginTop: "2px", fontSize: "16px" }}
        className={noir.className}
      >
        Shoppy Scan empowers you to compare prices across all the stores you've selected. Easily find the best deals and make informed decisions on your purchases. Say goodbye to guesswork and hello to savings!
      </p>
      <div
        style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
      >
        <Image src={online} width={40} height={40} alt="chart" />
        <h1
          style={{
            fontSize: "22px",
            fontWeight: "600",
            paddingBottom: "0px",
            marginBottom: "0px",
          }}
          className={noir.className}
        >
          Add to List for Total Price
        </h1>
      </div>
      <p
        style={{ marginTop: "2px", fontSize: "16px" }}
        className={noir.className}
      >
       As you browse through products, simply add them to your cart with a click. Shop Scan automatically calculates the total price of your selections in each selected store. This means you can see the total cost of your shopping list across all your chosen stores before making a purchase.
      </p>
    </div>
  );
};

export default index;
