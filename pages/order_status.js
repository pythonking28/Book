import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import { clearCart } from "../redux/bookSlice";
import { useDispatch } from "react-redux";
import Head from "next/head";

const activeStatusTransform = {
  style: "translate(-20px, 0) scale(1.08)",
};

let socket;

export default function OrderStatus(props) {
  const { order } = props;
  const dispatch = useDispatch();
  const [status, setStatus] = useState(order.status);
  const socketInit = async () => {
    await fetch(`/api/init_ws_connection`);
    socket = io();
    socket.on("connect", () => {
      socket.emit("join-room", order.order_id);
    });
    socket.on("setStatus", (status) => {
      setStatus(status);
    });
  };
  useEffect(() => {
    if (!socket) socketInit();
    dispatch(clearCart());
  }, []);
  return (
    <>
      <Head>
        <title>Track order | {order.order_id}</title>
      </Head>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/line-awesome/1.3.0/line-awesome/css/line-awesome.min.css"
        integrity="sha512-vebUliqxrVkBy3gucMhClmyQP9On/HAWQdKDXRaAlb/FKuTbxkjPKUyqVOxAcGwFDka79eTF+YXwfke1h3/wfg=="
        crossOrigin="anonymous"
      />
      <section>
        <div className="order_status_container">
          <h1 style={{ color: "grey" }}>Track delivery status</h1>
          <div className="order_info">
            <div>Order_ID: {order.order_id}</div>
            <div>
              <i className="icon las la-user"></i>
              {order.name}
            </div>
            <div>
              <i className="icon las la-phone"></i>
              {order.contact}
            </div>
            <div>
              <i className="icon las la-location-arrow"></i>Delivering to:{" "}
              <span>{order.delivery_address}</span>
            </div>
          </div>
          <ul className="icons_container">
            <li
              style={{
                color: status === "in progress" ? "green" : "orange",
                width: status !== "in progress" ? "50%" : "80%",
                transform:
                  status === "in progress" ? activeStatusTransform.style : "",
              }}
            >
              <div>
                <i className="icon las la-clipboard-check"></i>
              </div>
              <div>Order placed</div>
              <div>
                <i
                  style={{
                    marginLeft: 30,
                    fontSize: 25,
                  }}
                  className="icon las la-check-square"
                ></i>
              </div>
              {status === "in progress" && (
                <div className="status_info">
                  Your order was received at {order.time}. We&apos;ll contact
                  you soon to confirm your order and will dispatch the books to
                  you as soon as possible.
                </div>
              )}
            </li>
            <li
              style={{
                color:
                  status === "on its way"
                    ? "green"
                    : status === "completed"
                    ? "orange"
                    : "#8080808c",
                width: status !== "on its way" ? "50%" : "80%",
                transform:
                  status === "on its way" ? activeStatusTransform.style : "",
              }}
            >
              <div>
                <i className=" icon las la-truck"></i>
              </div>
              <div>Order processed</div>
              <div>
                <i
                  style={{ marginLeft: 30, fontSize: 25 }}
                  className="icon las la-check-square"
                ></i>
              </div>
              {status === "on its way" && (
                <div className="status_info">
                  Your order was processed and the books are on the way.
                </div>
              )}
            </li>
            <li
              style={{
                color: status === "completed" ? "green" : "#8080808c",
                width: status !== "completed" ? "50%" : "80%",
                transform:
                  status === "completed" ? activeStatusTransform.style : "",
              }}
            >
              <div>
                <i className=" icon las la-check"></i>
              </div>
              <div>Order complete</div>
              <div>
                <i
                  style={{
                    marginLeft: 30,
                    fontSize: 25,
                    display: status !== "completed" ? "block" : "none",
                  }}
                  className="icon las la-check-square"
                ></i>
              </div>
              {status === "completed" && (
                <div className="status_info">
                  Your order was completed. We hope you liked our service and we
                  hope to see you soon.
                </div>
              )}
            </li>
          </ul>
        </div>
      </section>
    </>
  );
}

export async function getServerSideProps(context) {
  const { get_customer_order } = await import("../db/db");
  const order = await get_customer_order(context.query.o_id);
  const props = { order };
  return {
    props,
  };
}
