"use client";
import React, { useRef } from "react";
import Image from "next/image";
import basket from "../../app/images/cart.svg";
import localFont from "next/font/local";
import axios from "axios";
import { useState, useEffect } from "react";
import SlidingPane from "react-sliding-pane";
import "react-sliding-pane/dist/react-sliding-pane.css";
import "../products/products.css";
import generatePDF, { Margin } from "react-to-pdf";
import Spiner from "../spiner";
import del from "../../app/images/de.svg";
import plus from "../../app/images/plus.svg";
import minus from "../../app/images/minus.svg";
import "./styles.css";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

const options = {
  filename: "test.pdf",
  //   page: {
  //     margin:Margin.SMALL,
  //  },
};

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
  ],
});

// Retrieve cart dFromata from localStorag
const Cart = () => {
  const [theme, setTheme] = useState([]);
  const [sale, setSale] = useState([]);
  const [data, setData] = useState([]);
  const [response, setResponseData] = useState(null);
  const [special, setSpecial] = useState();
  const [len, setLen] = useState(null);
  const [name, setName] = useState([]);
  const [num, setNum] = useState();
  const [quantity, setQuantity] = useState(null);
  const [carttt, setCart] = useState([]);
  const [tit, setTitle] = useState();
  const [change, setChange] = useState();
  const [filtered,setFiltered] = useState();
  const [hideButtons, setHideButtons] = useState(false);
  const [tabIndex, setTabIndex] = useState(0);
  const [state, setState] = useState({
    isPaneOpen: false,
    isPaneOpenLeft: false,
  });
  const [isMobile, setIsMobile] = useState(false);

  const pdfRef = useRef();

  useEffect(() => {
    window.addEventListener("storage", () => {
      const handleStorage = () => {
        const stores = sessionStorage.getItem("stores");
        const storesArray = JSON.parse(stores);
      };
    });
  }, []);

  // React.useEffect(() => {
  //   const handleStorageChange = () => {
  //     const theme = JSON.parse(sessionStorage.getItem("stores_1234"));
  //     const sale = JSON.parse(sessionStorage.getItem("cart"));
  //     const name = JSON.parse(sessionStorage.getItem("storesName")); 
  //     const special = JSON.parse(sessionStorage.getItem("special"));
  //     const filteredStores = name.filter((store) =>
  //       theme.includes(store.id.toString())
  //     );
  //     sessionStorage.setItem("storeSale", JSON.stringify(filteredStores));
  //     setTheme(theme);
  //     setSale(sale);
  //     setSpecial(special);
  //     setName(name);
  //   };
  //   window.addEventListener("storage", handleStorageChange);
  //   return () => {
  //     window.removeEventListener("storage", handleStorageChange);
  //   };
  // }, []);

 const getSessionData = (key) => JSON.parse(sessionStorage.getItem(key));
 const setSessionData = (key, data) => sessionStorage.setItem(key, JSON.stringify(data));


  useEffect(() => {
  const handleStorageChange = () => {
    const theme = getSessionData("stores_1234") || [];
    const sale = getSessionData("cart");
    const name = getSessionData("storesName") || [];
    const special = getSessionData("special");

    const filteredStores = name.filter((store) => theme.includes(store.id.toString()));

      // let filteredStores;
      // if (name != null && theme != null) {
      //   filteredStores = name.filter((store) =>
      //     theme.includes(store.id.toString())
      //   );
      // }
    setSessionData("storeSale", filteredStores);
    
    setTheme(theme);
    setSale(sale);
    setSpecial(special);
    setName(name);
    setFiltered(filteredStores)
  };
  
  window.addEventListener("storage", handleStorageChange);
  return () => window.removeEventListener("storage", handleStorageChange);
}, []);


  React.useEffect(() => {
    if (data && data.length > 0 && data[0].value) {
      const len = data[0].value.length;
      setLen(len);
    }
  }, [data, len]);

  // const getNames = async (sale, theme, name) => {
  //   try {
  //     const response = await axios.post(
  //       "http://localhost:8080/api/sale/name",
  //       { sale: sale, theme: theme, name: name } // Wrap the sale data in an object with the key "sale"
  //     );
  //     const responses = response.data;
  //     setResponseData(responses);
  //   } catch (error) {
  //     console.error();
  //   }
  // };

  const getNames = async (sale, theme, name) => {
    // Проверяем, что все параметры не равны нулю или пустой строке
    if (!sale && !theme && !name) {
      console.log("Запрос не отправлен, так как все параметры равны нулю.");
      return; // Выход из функции, если все параметры нулевые или пустые
    }
  
    try {
      const response = await axios.post(
        "http://localhost:8080/api/sale/name",
        { sale, theme, name }
      );
      const responses = response.data;
      setResponseData(responses);
    } catch (error) {
      console.error("Ошибка при выполнении запроса:", error);
    }
  };


  const removeStore = (storeId) => {
    const updatedData = response.filter((store) => store.id != storeId);
    setResponseData(updatedData);
    const get = JSON.parse(sessionStorage.getItem("stores_1234"));
    // const get1 = JSON.parse(sessionStorage.getItem("stores_1"));
    const st = JSON.parse(sessionStorage.getItem("storesLength"));
    const change = st - 1;
    setChange(change);
    if(change === 0){
      sessionStorage.removeItem("cart")
      sessionStorage.removeItem("names")
    }
    console.log("CHANGE", change);
    const da = get.filter((store) => store != storeId);
    sessionStorage.setItem("stores_1234", JSON.stringify(da));
    sessionStorage.setItem("stores1", JSON.stringify(da));
    sessionStorage.setItem("stores", JSON.stringify(da)); //changed
    sessionStorage.setItem("storesLength", JSON.stringify(change));
    window.dispatchEvent(new Event("storage"));
  };


  let title, storesName, cart;
  if (typeof window !== "undefined") {
    title = JSON.parse(sessionStorage.getItem("names"));
    cart = JSON.parse(sessionStorage.getItem("cart"));
    storesName = JSON.parse(sessionStorage.getItem("storesName"));
  }

  const mergedData = data.map((item) => {
    const match = storesName.find((store) => store.id == item.id);
    if (match) {
      return { ...item, store: match.store, location: match.location };
    }
    return item;
  });
  let length = 0;
  if (
    mergedData &&
    mergedData.length > 0 &&
    mergedData[0] &&
    mergedData[0].value
  ) {
    length = mergedData[0].value.length;
  }
  let titleLength = 0; // Declare titleLength variable outside of the conditional block and initialize it

  if (title && title.length > 0) {
    titleLength = title.length; // Update titleLength if conditions are met
  }

  let cartLength = 0; // Declare titleLength variable outside of the conditional block and initialize it

  if (cart && cart.length > 0) {
    cartLength = cart.length; // Update titleLength if conditions are met
  }

  //const targetRef = useRef();
  let totalQuantity;
  if (response && response.length != 0) {
    totalQuantity = response[0].items.reduce(
      (sum, product) => sum + product.quantity,
      0
    );
  }

  useEffect(() => {
    setQuantity(titleLength);
  }, [titleLength]); // Срабатывает при изменении response
  

  const increaseQuantity = (itemId) => {
    const updatedResponse = response.map((store) => {
      const updatedItems = store.items.map((item) => {
        if (item.productID === itemId) {
          const name = item.title;
          let title = JSON.parse(sessionStorage.getItem("names")) || []; // Получаем массив или создаем пустой
          title.push(name);
          sessionStorage.setItem("names", JSON.stringify(title)); // Сохраняем обновленный
          const newQuantity = item.quantity + 1;
          const newPrice = parseFloat(
            (newQuantity * (item.regprice || item.saleprice || 0)).toFixed(2)
          );
          return { ...item, quantity: newQuantity, prices: newPrice };
        }
        return item;
      });

      // Пересчитываем totalPrices после обновления items
      const totalPrices = updatedItems.reduce(
        (sum, item) => sum + item.prices,
        0
      );

      return {
        ...store,
        items: updatedItems,
        totalPrices,
      };
    });

    setResponseData(updatedResponse);

    let cart = JSON.parse(sessionStorage.getItem("cart")) || [];

    // Добавляем ID продукта в корзину
    cart.push(itemId);

    // Сохраняем обновленную корзину в sessionStorage
    sessionStorage.setItem("cart", JSON.stringify(cart));

    // Обновление состояния в других вкладках
    window.dispatchEvent(new Event("storage"));
  };

  const decreaseQuantity = (itemId) => {
    const updatedResponse = response.map((store) => {
      const updatedItems = store.items.map((item) => {
        if (item.productID === itemId) {
          const name = item.title;
          let title = JSON.parse(sessionStorage.getItem("names")) || [];

          // Находим индекс первого вхождения `name` и удаляем его
          const nameIndex = title.indexOf(name);
          if (nameIndex !== -1) {
            title.splice(nameIndex, 1); // Удаляем только одно вхождение
          }

          // Сохраняем обновленный массив обратно в sessionStorage
          sessionStorage.setItem("names", JSON.stringify(title));

          // Уменьшаем количество, но проверяем, чтобы оно не стало меньше 1
          const newQuantity = Math.max(item.quantity - 1, 1);
          const newPrice = parseFloat(
            (newQuantity * (item.regprice || item.saleprice || 0)).toFixed(2)
          );
          return { ...item, quantity: newQuantity, prices: newPrice };
        }
        return item;
      });

      // Пересчитываем totalPrices после обновления items
      const totalPrices = updatedItems.reduce(
        (sum, item) => sum + item.prices,
        0
      );

      return {
        ...store,
        items: updatedItems,
        totalPrices,
      };
    });

    setResponseData(updatedResponse);

    let cart = JSON.parse(sessionStorage.getItem("cart")) || [];

    // Находим индекс элемента в корзине и удаляем, если его количество стало 0
    const itemIndex = cart.indexOf(itemId);
    if (itemIndex !== -1) {
      cart.splice(itemIndex, 1);
    }

    // Сохраняем обновленную корзину в sessionStorage
    sessionStorage.setItem("cart", JSON.stringify(cart));

    // Обновление состояния в других вкладках
    window.dispatchEvent(new Event("storage"));
  };

  useEffect(() => {
    const existingItems = JSON.parse(sessionStorage.getItem("cart")) || [];
  }, []);

  const handleAddToCart = async (product) => {
    const existingItems = JSON.parse(sessionStorage.getItem("cart")) || [];
    existingItems.push(product);
    sessionStorage.setItem("cart", JSON.stringify(existingItems));
    getNames(sale, theme, name);
    // Опционально: можно использовать событие для обновления состояния в других вкладках
    // window.dispatchEvent(new Event("storage")); // Обновление других вкладок
  };

  // useEffect(() => {
  //   const handleResize = () => {
  //     setIsMobile(window.innerWidth <= 768);
  //   };
  //   handleResize();
  //   window.addEventListener("resize", handleResize);
  //   return () => {
  //     window.removeEventListener("resize", handleResize);
  //   };
  // }, []);

    useEffect(() => {
    if (typeof window !== "undefined") { // Проверка на наличие `window`
      const handleResize = () => {
        setIsMobile(window.innerWidth <= 768);
      };
      handleResize();
      window.addEventListener("resize", handleResize);
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);

  const targetRef = useRef();

  return (
    <div className="cart">
      <div 
      style={{ display: "flex", cursor: "pointer",alignItems: "center" }}>
        <img
          alt="shopping"
          src={basket.src || basket}
   style={{     width: "60px",
    height: "60px",
    cursor: "pointer",
    marginBottom: "16px"}}
          onClick={() => {
            getNames(sale, theme, name);
            setState({ isPaneOpen: true });
          }}
        />
        <p
          className={`${noir.className} list`}
          onClick={() => {
            getNames(sale, theme, name);
            setState({ isPaneOpen: true });
          }}
        >
          List
        </p>
        {/* {(quantity === null || change === 0) ? (
          <p style={{ fontSize: "18px" }}>(0)</p>
        ) : (
          <p style={{ fontSize: "18px" }}>({cartLength})</p>
        )} */}
         <p 
           className={`${noir.className} list`}
           onClick={() => {
            getNames(sale, theme, name);
            setState({ isPaneOpen: true });
          }}
           style={{ fontSize: "18px" }}>({cartLength})
           
</p>
      </div>

            <SlidingPane
        // style={{
        //   width: window.innerWidth <= 768 ? "100%" : "70%", // Изменение ширины на мобильных устройствах
        // }}
        width='window.innerWidth <= 768 ? "100%" : "70%"'
        overlayClassName="overlay"
        className={`${noir.className} panel`}
        isOpen={state.isPaneOpen}
        title="List"
        onRequestClose={() => {
          setState({ isPaneOpen: false });
        }}
      >
        {isMobile ? (
         
          <div style={{ display: "flex", flexDirection: "column" }}>
            {response && response.length === 0 ? (
              <p
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                Nothing here yet, but you can add 3 stores in total to compare
                prices
              </p>
            ) : (
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  {response &&
                    response != null &&
                    response.map((item) => (
                      <div>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                          }}
                        >
                          <div style={{ width: "100%" }}>
                            <p
                              style={{
                                paddingRight: "10%",
                                fontWeight: "700",
                              }}
                            >
                              {item.storetype}
                            </p>
                            <p style={{ paddingRight: "8%" }}>
                              {item.storeName}
                            </p>
                          </div>

                          <p style={{ fontWeight: "700", lineHeight: "214%" }}>
                            Total: ${item.totalPrices.toFixed(2)}
                          </p>
                          <button
                            style={{
                              outline: "0px",
                              // marginLeft: "20px"
                              fontSize: "21px",
                              fontWeight: "500",
                              lineHeight: "20px",
                              verticalAlign: "middle",
                              color: "red",
                              border: "0px",
                              cursor: "pointer",
                              backgroundColor: "transparent",
                            }}
                            className={noir.className}
                            onClick={() => removeStore(item.id)}
                            title="Delete Store"
                          >
                            <img src={del.src || del} style={{width:"30px", height:"30px"}} />
                          </button>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}
            <Tabs
              selectedIndex={tabIndex}
              onSelect={(index) => setTabIndex(index)}
            >
              <TabList>
                <Tab>Products</Tab>
                {response != null &&
                  response.map((item) => <Tab>{item.storetype}</Tab>)}
              </TabList>
              <TabPanel>
                {response && response.length === 0 ? (
                  <p
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    Nothing here yet, but you can add 3 stores in total to
                    compare prices
                  </p>
                ) : (
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <div style={{ paddingTop: "10%" }}>
                      <p
                        style={{
                          alignContent: "center",
                        }}
                      >
                        <b>Products</b>
                      </p>
                      {response &&
                        response.length != null &&
                        response[0].items.map((item, index) => {
                          // Проверка на наличие изображения
                          const imageSrc =
                            item.image ||
                            response[1]?.items?.[index]?.image ||
                            response[2]?.items?.[index]?.image;

                          // Проверка на наличие title
                          const title =
                            item.title ||
                            response[1]?.items?.[index]?.title ||
                            response[2]?.items?.[index]?.title;

                          return (
                            <li
                              key={item.productID}
                              style={{
                                display: "flex",
                                borderBottom: "1px solid #ccc",
                                margin: "10px 0",
                                alignItems: "center",
                              }}
                            >
                              <img
                                alt={title} // Используем title в alt
                                style={{width:"30px", height:"30px",paddingRight: "8px"}}
                                 src={imageSrc.src || imageSrc}
                              />
                              <p
                                style={{
                                  textOverflow: "ellipsis",
                                  whiteSpace: "nowrap",
                                  overflow: "hidden",
                                  width: "100%",
                                }}
                              >
                                {title} {/* Отображаем title */}
                              </p>

                              <button
                                onClick={() => decreaseQuantity(item.productID)}
                                style={{
                                  display: hideButtons ? "none" : "block",
                                  outline: "0px",
                                  fontSize: "21px",
                                  fontWeight: "500",
                                  lineHeight: "20px",
                                  verticalAlign: "middle",
                                  color: "red",
                                  border: "0px",
                                  cursor: "pointer",
                                  backgroundColor: "transparent ",
                                }}
                              >
                                <img style={{width:"30px", height:"30px"}} src={minus.src || minus} />
                              </button>

                              <p>{item.quantity}</p>
                              <button
                                onClick={() => increaseQuantity(item.productID)}
                                style={{
                                  outline: "0px",
                                  fontSize: "21px",
                                  fontWeight: "500",
                                  lineHeight: "20px",
                                  verticalAlign: "middle",
                                  color: "red",
                                  border: "0px",
                                  cursor: "pointer",
                                  backgroundColor: "transparent",
                                }}
                              >
                                <img style={{width:"30px", height:"30px"}} src={plus.src || plus} />
                              </button>
                            </li>
                          );
                        })}
                    </div>
                  </div>
                )}
              </TabPanel>
              {response != null &&
                response.map((item, index) => (
                  <TabPanel key={index}>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <p style={{ marginBottom: "0px" }}>
                        <b>{item.storetype}</b>
                      </p>
                      <p>{item.storeName}</p>
                    </div>

                    <div>
                      <div style={{ display: "flex" }}>
                        <ul
                          style={{
                            margin: "0",
                            padding: "0",
                            width: "40%",
                            paddingRight: "10%",
                          }}
                        >
                          {item.items.map((li, liIndex) => (
                            <li
                              style={{
                                display: "flex",
                                borderBottom: "1px solid rgb(204, 204, 204)",
                                margin: "10px 0px",
                                alignItems: "center",
                              }}
                              key={liIndex}
                            >
                              <img
                                alt={title} // Используем title в alt
                                width={30}
                                height={30}
                                src={li.image} // Используем выбранное изображение
                                style={{ paddingRight: "8px" }}
                              />
                              <p
                                style={{
                                  textOverflow: "ellipsis",
                                  whiteSpace: "nowrap",
                                  overflow: "hidden",
                                  width: "200px",
                                }}
                              >
                                {li.title}
                              </p>
                              <p>({li.quantity})</p>
                            </li>
                          ))}
                        </ul>
                        <ul
                          style={{
                            margin: "0",
                            padding: "0",
                            paddingTop: "10px",
                          }}
                        >
                          {item.items.map((it) => (
                            <li
                              style={{
                                display: "flex",
                                justifyContent: "center",
                                borderBottom: "1px solid #ccc",
                                marginBottom: "10px",
                              }}
                            >
                              {it.quantity > 1 &&
                              it.non_member_price == null &&
                              it.regprice == null ? (
                                <p style={{ color: "rgb(225, 37, 27)" }}>
                                  ${it.prices.toFixed(2)}
                                  {it.saleprice != null ? (
                                    <span
                                      style={{
                                        color: "rgb(125, 120, 120)",
                                        marginLeft: "4px",
                                      }}
                                    >
                                      (${it.saleprice} ea)
                                    </span>
                                  ) : (
                                    <span
                                      style={{ color: "rgb(125, 120, 120)" }}
                                    >
                                      (${it.regprice} ea)
                                    </span>
                                  )}
                                </p>
                              ) : it.quantity > 1 &&
                                it.regprice != null &&
                                it.stock != "Out of Stock" ? (
                                <p>
                                  ${it.prices.toFixed(2)}
                                  {it.saleprice != null ? (
                                    <span
                                      style={{
                                        color: "rgb(125, 120, 120)",
                                        marginLeft: "4px",
                                      }}
                                    >
                                      (${it.saleprice} ea)
                                    </span>
                                  ) : (
                                    <span
                                      style={{ color: "rgb(125, 120, 120)" }}
                                    >
                                      (${it.regprice} ea)
                                    </span>
                                  )}
                                </p>
                              ) : it.saleprice != null &&
                                it.non_member_price != null &&
                                it.regprice == null &&
                                it.quantity > 1 ? (
                                <p style={{ color: "rgb(225, 37, 27)" }}>
                                  ${it.prices.toFixed(2)}
                                  {it.saleprice != null && (
                                    <span
                                      style={{
                                        color: "rgb(125, 120, 120)",
                                        marginLeft: "4px",
                                      }}
                                    >
                                      (${it.non_member_price} ea)
                                    </span>
                                  )}
                                </p>
                              ) : (
                                <>
                                  {it.stock === "Out of Stock" &&
                                    it.quantity >= 1 && (
                                      <p style={{ color: "rgb(225, 37, 27)" }}>
                                        Sold Out ($0)
                                      </p>
                                    )}
                                  {it.non_member_price != null &&
                                    it.non_member_price !== 0 && (
                                      <p style={{ color: "rgb(225, 37, 27)" }}>
                                        ${it.non_member_price}
                                      </p>
                                    )}
                                  {it.saleprice !== null &&
                                    it.saleprice !== 0 &&
                                    it.non_member_price && (
                                      <div
                                        style={{
                                          display: "flex",
                                          alignItems: "center",
                                        }}
                                      >
                                        {/* <span style={{ color: "rgb(225, 37, 27)",}}>On sale</span> */}
                                        {it.quantity > 2 && (
                                          <p
                                            style={{
                                              color: "rgb(225, 37, 27)",
                                              paddingLeft: "4px",
                                            }}
                                          >
                                            SALE PRICE ${it.non_member_price}
                                          </p>
                                        )}

                                        {/* <s
                                      style={{ color: "rgb(125, 120, 120)" }}
                                    >
                                      WAS PRICE (${it.wasprice} ea)
                                    </s> */}
                                      </div>
                                    )}
                                  {it.regprice != null &&
                                    it.non_member_price !== 0 && (
                                      <p>${it.regprice}</p>
                                    )}
                                  {it.non_member_price == null &&
                                    it.regprice == null && (
                                      <p style={{ color: "rgb(225, 37, 27)" }}>
                                        ${it.saleprice}
                                      </p>
                                    )}
                                </>
                              )}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <p
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          paddingTop: "16px",
                          fontWeight: "700",
                        }}
                      >
                        Total: ${item.totalPrices.toFixed(2)}
                      </p>
                    </div>
                  </TabPanel>
                ))}
            </Tabs>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column" }}>
            {response && response.length === 0 ? (
              <p
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                Nothing here yet, but you can add 3 stores in total to compare
                prices
              </p>
            ) : cartLength != null && cartLength !== totalQuantity ? (
              <>
                <Spiner />
                <p>Checking latest prices for you...</p>
              </>
            ) : (
              <div style={{ display: "flex" }}>
                <div ref={targetRef}>
                  <p
                    style={{
                      width: "144px",
                      height: "131px",
                      alignContent: "center",
                    }}
                  >
                    <b>Products</b>
                  </p>
                  {response.length != null &&
                    response[0].items.map((item, index) => {
                      // Проверка на наличие изображения
                      const imageSrc =
                        item.image ||
                        response[1]?.items?.[index]?.image ||
                        response[2]?.items?.[index]?.image;

                      // Проверка на наличие title
                      const title =
                        item.title ||
                        response[1]?.items?.[index]?.title ||
                        response[2]?.items?.[index]?.title;

                      return (
                        <li
                          key={item.productID}
                          style={{
                            display: "flex",
                            borderBottom: "1px solid #ccc",
                            margin: "10px 0",
                            alignItems: "center",
                          }}
                        >
                          <img
                            alt={title} // Используем title в alt
                            src={imageSrc} // Используем выбранное изображение
                            style={{ paddingRight: "8px",height:"30px",width:"30px" }}
                          />
                          <p
                            style={{
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                              width: "200px",
                            }}
                          >
                            {title} {/* Отображаем title */}
                          </p>

                          <button
                            onClick={() => decreaseQuantity(item.productID)}
                            style={{
                              outline: "0px",
                              fontSize: "21px",
                              fontWeight: "500",
                              lineHeight: "20px",
                              verticalAlign: "middle",
                              color: "red",
                              border: "0px",
                              cursor: "pointer",
                              backgroundColor: "transparent",
                            }}
                          >
                            <Image width={30} height={30} src={minus} />
                          </button>

                          <p>{item.quantity}</p>
                          <button
                            onClick={() => increaseQuantity(item.productID)}
                            style={{
                              outline: "0px",
                              fontSize: "21px",
                              fontWeight: "500",
                              lineHeight: "20px",
                              verticalAlign: "middle",
                              color: "red",
                              border: "0px",
                              cursor: "pointer",
                              backgroundColor: "transparent",
                            }}
                          >
                            <Image width={30} height={30} src={plus} />
                          </button>
                        </li>
                      );
                    })}
                </div>

                <div style={{ display: "flex" }}>
                  {response != null &&
                    response.map((item) => (
                      <div style={{ paddingLeft: "36px" }}>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column-reverse",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <p
                            style={{
                              textAlign: "center",
                              width: "144px",
                              height: "99px",
                              alignContent: "center",
                            }}
                          >
                            <b>{item.storetype}:</b>
                            <p>{item.storeName}</p>
                          </p>
                          <button
                            style={{
                              outline: "0px",
                              // marginLeft: "20px"
                              fontSize: "21px",
                              fontWeight: "500",
                              lineHeight: "20px",
                              verticalAlign: "middle",
                              color: "red",
                              border: "0px",
                              cursor: "pointer",
                              backgroundColor: "transparent",
                            }}
                            className={noir.className}
                            onClick={() => removeStore(item.id)}
                            title="Delete Store"
                          >
                            <img src={del.src || del} style={{width:"30px", height:"30px"}} />
                          </button>
                        </div>

                        <>
                          {item.items.map((it) => (
                            <li
                              style={{
                                display: "flex",
                                justifyContent: "center",
                                borderBottom: "1px solid #ccc",
                                marginBottom: "10px",
                              }}
                            >
                              {it.quantity > 1 &&
                              it.non_member_price == null &&
                              it.regprice == null ? (
                                <p style={{ color: "rgb(225, 37, 27)" }}>
                                  ${it.prices.toFixed(2)}
                                  {it.saleprice != null ? (
                                    <span
                                      style={{
                                        color: "rgb(125, 120, 120)",
                                        marginLeft: "4px",
                                      }}
                                    >
                                      (${it.saleprice} ea)
                                    </span>
                                  ) : (
                                    <span
                                      style={{ color: "rgb(125, 120, 120)" }}
                                    >
                                      (${it.regprice} ea)
                                    </span>
                                  )}
                                </p>
                              ) : it.quantity > 1 &&
                                it.regprice != null &&
                                it.stock != "Out of Stock" ? (
                                <p>
                                  ${it.prices.toFixed(2)}
                                  {it.saleprice != null ? (
                                    <span
                                      style={{
                                        color: "rgb(125, 120, 120)",
                                        marginLeft: "4px",
                                      }}
                                    >
                                      (${it.saleprice} ea)
                                    </span>
                                  ) : (
                                    <span
                                      style={{ color: "rgb(125, 120, 120)" }}
                                    >
                                      (${it.regprice} ea)
                                    </span>
                                  )}
                                </p>
                              ) : it.saleprice != null &&
                                it.non_member_price != null &&
                                it.regprice == null &&
                                it.quantity > 1 ? (
                                <p style={{ color: "rgb(225, 37, 27)" }}>
                                  ${it.prices}
                                  {it.saleprice != null && (
                                    <span
                                      style={{
                                        color: "rgb(125, 120, 120)",
                                        marginLeft: "4px",
                                      }}
                                    >
                                      (${it.non_member_price} ea)
                                    </span>
                                  )}
                                </p>
                              ) : (
                                <>
                                  {it.stock === "Out of Stock" &&
                                    it.quantity >= 1 && (
                                      <p style={{ color: "rgb(225, 37, 27)" }}>
                                        Sold Out ($0)
                                      </p>
                                    )}
                                  {it.non_member_price != null &&
                                    it.non_member_price !== 0 && (
                                      <p style={{ color: "rgb(225, 37, 27)" }}>
                                        ${it.non_member_price}
                                      </p>
                                    )}
                                  {it.saleprice !== null &&
                                    it.saleprice !== 0 &&
                                    it.non_member_price && (
                                      <div
                                        style={{
                                          display: "flex",
                                          alignItems: "center",
                                        }}
                                      >
                                        {/* <span style={{ color: "rgb(225, 37, 27)",}}>On sale</span> */}
                                        {it.quantity > 2 && (
                                          <p
                                            style={{
                                              color: "rgb(225, 37, 27)",
                                              paddingLeft: "4px",
                                            }}
                                          >
                                            SALE PRICE ${it.non_member_price}
                                          </p>
                                        )}

                                        {/* <s
                                        style={{ color: "rgb(125, 120, 120)" }}
                                      >
                                        WAS PRICE (${it.wasprice} ea)
                                      </s> */}
                                      </div>
                                    )}
                                  {it.regprice != null &&
                                    it.non_member_price !== 0 && (
                                      <p>${it.regprice}</p>
                                    )}
                                  {it.non_member_price == null &&
                                    it.regprice == null && (
                                      <p style={{ color: "rgb(225, 37, 27)" }}>
                                        ${it.saleprice}
                                      </p>
                                    )}
                                </>
                              )}
                            </li>
                          ))}
                          <p
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              paddingTop: "16px",
                              fontWeight: "700",
                            }}
                          >
                            Total: ${item.totalPrices.toFixed(2)}
                          </p>
                        </>
                      </div>
                    ))}
                </div>
                <button
                  className={`${noir.className} box`}
                  style={{
                    marginLeft: "auto",
                    width: "190px",
                    outline: "0",
                    cursor: "pointer",
                    height: "38px",
                    padding: "5px 16px",
                    fontSize: "14px",
                    fontWeight: "500",
                    lineHeight: "20px",
                    verticalAlign: "middle",
                    border: "1px solid",
                    borderRadius: " 6px",
                    color: " #24292e",
                    backgroundColor: "#fafbfc",
                    borderColor: "#1b1f2326",
                    transition: "0.2s cubic-bezier(0.3, 0, 0.5, 1)",
                  }}
                  // onClick={() => generatePDF(targetRef, options)}
                  onClick={() => {
                    setHideButtons(true); // Скрываем кнопки
                    setTimeout(() => {
                      generatePDF(targetRef, options);
                      setHideButtons(false); // Возвращаем кнопки после генерации PDF
                    }, 1000);
                  }}
                >
                  Download products List
                </button>
              </div>
            )}
          </div>
        )}
      </SlidingPane>

 
    </div>
  );
};

export default Cart;
